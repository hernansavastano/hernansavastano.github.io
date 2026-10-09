import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import type { Track } from "@shared/schema";
import { trackSongPlay, trackSongPause, trackSongComplete } from "@/lib/analytics";

interface MusicPlayerContextType {
  currentTrack: Track | undefined;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playlist: Track[];
  play: (track: Track) => Promise<void>;
  pause: () => void;
  toggle: (track: Track) => Promise<void>;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  setCurrentTrack: (track: Track | undefined) => void;
  setIsPlaying: (playing: boolean) => void;
  handlePlayTrack: (track: Track) => void;
  setPlaylist: (tracks: Track[]) => void;
  next: () => void;
  previous: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const trackBeingPlayedRef = useRef<Track | undefined>(undefined);

  // Initialize audio element once
  useEffect(() => {
    // Don't create new Audio() since we're using the ref from the rendered element
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.preload = 'auto'; // Preload more data for faster playback

    const handlePlay = () => {
      // Play event fires when playback is requested, not when actually playing
      setIsLoading(true);
    };

    const handlePlaying = () => {
      // Playing event fires when audio actually starts playing
      console.log('Audio playing event fired!');
      setIsPlaying(true);
      setIsLoading(false);
      
      // Track song play in Google Analytics
      if (trackBeingPlayedRef.current) {
        trackSongPlay(trackBeingPlayedRef.current);
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
      
      // Track song pause in Google Analytics
      if (trackBeingPlayedRef.current) {
        trackSongPause(trackBeingPlayedRef.current);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsLoading(false);
      
      // Track song completion in Google Analytics
      if (trackBeingPlayedRef.current) {
        trackSongComplete(trackBeingPlayedRef.current);
      }
    };

    const handleWaiting = () => {
      // Audio is waiting for data - but don't interfere if already playing smoothly
      console.log('Audio waiting event fired, readyState:', audio.readyState);
      if (audio.readyState < 2) {
        setIsLoading(true);
      }
    };

    const handleStalled = () => {
      // Audio stalled while buffering - but don't interfere if already playing smoothly  
      console.log('Audio stalled event fired, readyState:', audio.readyState);
      if (audio.readyState < 2) {
        setIsLoading(true);
      }
    };

    const handleError = () => {
      console.error('Audio error event fired!');
      console.error('Audio error:', audio.error);
      console.error('Audio src:', audio.src);
      console.error('Audio readyState:', audio.readyState);
      console.error('Audio networkState:', audio.networkState);
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleTimeUpdate);
    audio.addEventListener('loadstart', handleLoadStart);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleTimeUpdate);
      audio.removeEventListener('loadstart', handleLoadStart);
      // Don't pause on cleanup - only on unmount
    };
  }, []); // Run once on mount only

  const play = async (track: Track) => {
    if (!audioRef.current) return;
    
    // Wait for any existing play promise to complete
    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch {
        // Ignore errors from previous play attempts
      }
    }
    
    setIsLoading(true);
    
    // Always set src based on audio element state, not currentTrack comparison
    const encodedUrl = track.audioUrl ? encodeURI(track.audioUrl) : '';
    const absoluteUrl = encodedUrl ? new URL(encodedUrl, window.location.origin).href : '';
    
    console.log('Track comparison debug:', { 
      currentTrackId: currentTrack?.id, 
      incomingId: track.id, 
      audioSrc: audioRef.current.src,
      absoluteUrl 
    });
    
    // Set src if audio element doesn't have the correct source
    if (!audioRef.current.src || audioRef.current.src !== absoluteUrl) {
      console.log('Setting audio src:', absoluteUrl);
      audioRef.current.src = absoluteUrl;
      setCurrentTrack(track);
      trackBeingPlayedRef.current = track;
      audioRef.current.load();
      
      // Wait for audio to be ready before playing
      console.log('Audio readyState before waiting:', audioRef.current.readyState);
      if (audioRef.current.readyState < 2) {
        console.log('Waiting for canplay event...');
        try {
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              console.log('Timeout waiting for canplay - proceeding anyway');
              audioRef.current?.removeEventListener('canplay', handleCanPlay);
              resolve(null); // Resolve instead of reject to continue
            }, 10000); // 10 seconds for large files like .wav
            
            const handleCanPlay = () => {
              console.log('Canplay event fired!');
              clearTimeout(timeout);
              audioRef.current?.removeEventListener('canplay', handleCanPlay);
              resolve(null);
            };
            
            audioRef.current?.addEventListener('canplay', handleCanPlay);
          });
        } catch (error) {
          console.log('Error waiting for canplay:', error);
        }
      }
      console.log('Audio readyState after waiting:', audioRef.current?.readyState);
    } else {
      console.log('Audio src already set correctly, skipping load');
    }
    
    try {
      // Only call play() if we're paused
      if (audioRef.current.paused) {
        console.log('Calling audio.play()...');
        playPromiseRef.current = audioRef.current.play();
        await playPromiseRef.current;
        console.log('Audio.play() successful!');
      } else {
        console.log('Audio already playing, skipping play() call');
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
      }
      console.error('Track URL:', track.audioUrl);
      setIsLoading(false);
      setIsPlaying(false);
    } finally {
      playPromiseRef.current = null;
    }
  };

  const pause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  };

  const toggle = async (track: Track) => {
    console.log('Toggle called:', { isLoading, isPlaying, currentTrackId: currentTrack?.id, incomingId: track.id });
    
    if (isPlaying && currentTrack?.id === track.id) {
      console.log('Pausing current track');
      pause();
    } else {
      console.log('Playing track');
      await play(track);
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  const next = () => {
    if (!currentTrack || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    if (currentIndex === -1) return;
    
    const nextIndex = (currentIndex + 1) % playlist.length;
    play(playlist[nextIndex]);
  };

  const previous = () => {
    if (!currentTrack || playlist.length === 0) return;
    
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    if (currentIndex === -1) return;
    
    const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    play(playlist[previousIndex]);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        volume,
        playlist,
        play,
        pause,
        toggle,
        seekTo,
        setVolume,
        setCurrentTrack,
        setIsPlaying,
        handlePlayTrack,
        setPlaylist,
        next,
        previous,
      }}
    >
      {/* Hidden audio element for DOM access and testing */}
      <audio 
        ref={audioRef}
        aria-label="Audio player" 
        data-testid="audio-element"
        style={{ display: 'none' }}
      />
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}