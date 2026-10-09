import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Music } from "lucide-react";
import { useLocation } from "wouter";

interface ReleaseAnnouncementProps {
  onPlaySingle: () => void;
}

export function ReleaseAnnouncement({ onPlaySingle }: ReleaseAnnouncementProps) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Adaptive background logic (exactly same as navigation and audio player)
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

  // Dynamic styling based on page background (same logic as navigation and audio player)
  const isDarkBackground = location === "/" && !isScrolled;
  
  
  // Announcement banner background: vintage yellow over dark backgrounds, dark slate over light backgrounds
  const bannerBackgroundClass = isDarkBackground 
    ? "bg-yellow-50/85 backdrop-blur-md border-yellow-200/30" 
    : "bg-slate-900/85 backdrop-blur-md border-slate-400/20";
  
  // Text colors: dark blue over vintage yellow banner, yellow over dark banner
  const textColorClass = isDarkBackground 
    ? "text-slate-800" 
    : "text-yellow-100/90";
    
  const mutedTextClass = isDarkBackground 
    ? "text-slate-600" 
    : "text-yellow-200/70";

  // Button adaptive styling: invert colors based on background
  const buttonClass = isDarkBackground
    ? "bg-slate-700 hover:bg-slate-600 text-yellow-100 border-slate-600" // Dark button on vintage yellow background
    : "bg-yellow-500 hover:bg-yellow-400 text-slate-900 border-yellow-400"; // Bright button on dark background
  
  // Badge adaptive styling: using proper secondary button colors
  const badgeClass = isDarkBackground
    ? "bg-secondary text-secondary-foreground backdrop-blur-sm" // Secondary button colors on vintage yellow background
    : "bg-secondary text-secondary-foreground backdrop-blur-sm"; // Secondary button colors on dark background
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 h-16 border-t transition-all duration-300 ${bannerBackgroundClass}`} data-testid="release-announcement">
      <div className="max-w-6xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between gap-2 h-full">
          {/* Release Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Music className={`w-5 h-5 ${textColorClass} hidden sm:block`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Badge className={`text-xs inline-flex items-center whitespace-nowrap px-2 py-1 font-normal ${badgeClass}`}>
                  <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="hidden sm:inline">This Friday</span>
                  <span className="sm:hidden">Fri</span>
                </Badge>
                <span className={`text-sm font-futura font-semibold ${textColorClass} truncate`}>
                  "Stress Of The Machinery" Single
                </span>
              </div>
            </div>
          </div>

          {/* Listen Button */}
          <Button 
            size="sm"
            onClick={onPlaySingle}
            className={`shadow-sm text-xs backdrop-blur-sm px-2 py-1 font-futura font-semibold transition-colors ${buttonClass}`}
            data-testid="listen-announcement-button"
          >
            <Play className="w-4 h-4 mr-2" />
            Listen
          </Button>
        </div>
      </div>
    </div>
  );
}