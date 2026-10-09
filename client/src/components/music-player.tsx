import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMusicPlayer } from "@/contexts/music-player-context";
import { useLocation } from "wouter";
import albumCover from "@assets/mi-cancion-album-cover-1757570375483.jpg";

export function MusicPlayer() {
  const { currentTrack, isPlaying, isLoading, currentTime, duration, volume, toggle, setVolume, seekTo, next, previous } = useMusicPlayer();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (value: number[]) => {
    seekTo(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  // Adaptive background logic (exactly same as navigation)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // For home page, check if we're over dark sections (hero or gallery photos only)
      if (location === "/") {
        let isDarkSection = false;
        
        // Check if we're still over the hero section by detecting the hero element
        const heroSection = document.querySelector('[data-testid="hero-section"]') as HTMLElement;
        if (heroSection) {
          const heroRect = heroSection.getBoundingClientRect();
          const heroBottom = heroRect.bottom;
          const navHeight = 64; // Navigation bar height (h-16 = 64px)
          // Switch to dark nav exactly when hero bottom reaches bottom of navigation bar
          if (heroBottom > navHeight) {
            isDarkSection = true;
          }
        } else {
          // Fallback: use viewport height if hero element not found
          const heroHeight = window.innerHeight;
          if (scrollPosition <= heroHeight * 0.9) {
            isDarkSection = true;
          }
        }
        
        // Check if we're in the gallery section (actual photos only, not text sections)
        const gallerySection = document.getElementById("gallery");
        if (gallerySection) {
          const photoGrids = gallerySection.querySelectorAll('[data-testid="gallery-grid"]');
          for (let i = 0; i < photoGrids.length; i++) {
            const grid = photoGrids[i] as HTMLElement;
            if (grid) {
              const gridRect = grid.getBoundingClientRect();
              const gridTop = gridRect.top + window.scrollY - 80;
              const gridBottom = gridTop + grid.offsetHeight;
              if (scrollPosition >= gridTop && scrollPosition <= gridBottom) {
                isDarkSection = true;
                break;
              }
            }
          }
        }
        
        setIsScrolled(!isDarkSection);
        return;
      }
      
      // For all other pages, use dark background since they have light backgrounds
      setIsScrolled(true);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Dynamic styling based on page background (same logic as navigation)
  const isDarkBackground = location === "/" && !isScrolled;
  
  // Audio player background: vintage yellow over dark backgrounds, dark slate over light backgrounds
  const playerBackgroundClass = isDarkBackground 
    ? "backdrop-blur-md border-yellow-200/30" 
    : "bg-slate-900/85 backdrop-blur-md border-slate-400/20";
  
  const playerBackgroundStyle = isDarkBackground 
    ? { backgroundColor: 'hsl(var(--background) / 0.85)' } 
    : {};
  
  // Text colors: dark blue over vintage yellow player, yellow over dark player
  const textColorClass = isDarkBackground 
    ? "text-slate-800" 
    : "text-yellow-100/90";
    
  const mutedTextClass = isDarkBackground 
    ? "text-slate-600" 
    : "text-yellow-200/70";

  if (!currentTrack) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 music-player border-t h-16 transition-all duration-300 ${playerBackgroundClass}`} style={playerBackgroundStyle} data-testid="audio-player">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <img 
            src={currentTrack.artworkUrl || albumCover} 
            alt={currentTrack.title} 
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            data-testid="current-track-image"
          />
          <div className="min-w-0 flex-1">
            <p className={`font-futura font-bold text-sm ${textColorClass} truncate`} data-testid="audio-player-track-title">{currentTrack.title}</p>
            <p className={`font-futura text-xs ${mutedTextClass} truncate`} data-testid="audio-player-artist-name">Hernán Savastano</p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={previous}
            data-testid="button-previous"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button 
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Play/pause button clicked');
              toggle(currentTrack as any);
            }}
            className=""
            data-testid="audio-player-play-pause-button"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={next}
            data-testid="button-next"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-xs mx-4">
          <span className={`font-futura text-xs ${mutedTextClass}`} data-testid="current-time">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={handleProgressChange}
            className="flex-1 ml-2"
            data-testid="progress-slider"
          />
          <span className={`font-futura text-xs ${mutedTextClass}`} data-testid="duration">
            {formatTime(duration)}
          </span>
        </div>
        
        {/* Volume */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" data-testid="button-volume">
            <Volume2 className="h-4 w-4" />
          </Button>
          <div className="hidden md:block w-20">
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              data-testid="volume-slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
