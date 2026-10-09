import { useState, useRef, useEffect } from "react";
import { useMusicPlayer } from "@/contexts/music-player-context";

interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentTrack: string | null;
}

export function useAudioPlayer() {
  const { currentTrack: globalCurrentTrack, isPlaying: globalIsPlaying, setIsPlaying: setGlobalIsPlaying } = useMusicPlayer();
  
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: globalIsPlaying,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    currentTrack: globalCurrentTrack?.id || null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync state with global context
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isPlaying: globalIsPlaying,
      currentTrack: globalCurrentTrack?.id || null,
    }));
  }, [globalIsPlaying, globalCurrentTrack]);

  const play = async (trackId?: string, audioUrl?: string) => {
    if (!audioRef.current) return;
    
    // Set loading state immediately
    setState(prev => ({ ...prev, isLoading: true }));
    
    if (trackId && audioUrl && (!audioRef.current.src || !audioRef.current.src.includes(audioUrl))) {
      audioRef.current.src = audioUrl;
      audioRef.current.load(); // Ensure audio is loaded
      setState(prev => ({ ...prev, currentTrack: trackId }));
    }
    
    try {
      await audioRef.current.play();
      // Playing state will be set by the 'play' event listener
    } catch (error) {
      console.error("Error playing audio:", error);
      setState(prev => ({ ...prev, isLoading: false }));
      setGlobalIsPlaying(false);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
      setGlobalIsPlaying(false);
    }
  };

  const toggle = (trackId?: string, audioUrl?: string) => {
    // Use global state for more reliable toggle logic
    if (globalIsPlaying && globalCurrentTrack?.id === trackId) {
      pause();
    } else {
      play(trackId, audioUrl);
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setState(prev => ({ ...prev, volume }));
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const updateTime = () => {
      setState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handlePlay = () => {
      setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
      setGlobalIsPlaying(true);
    };

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false, isLoading: false }));
      setGlobalIsPlaying(false);
    };

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false, isLoading: false }));
      setGlobalIsPlaying(false);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.volume = state.volume;

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  return {
    ...state,
    play,
    pause,
    toggle,
    setVolume,
    seekTo,
  };
}
