import { Play, Pause, ShoppingCart } from "lucide-react";
import { FaFacebook, FaInstagram, FaSpotify, FaApple } from "react-icons/fa";
import { SiBandcamp } from "react-icons/si";
import { useMusicPlayer } from "@/contexts/music-player-context";
import type { Track } from "@shared/schema";
import heroImage from "@assets/Mi Cancion Photo_1756448222763.jpg";

interface HeroSectionProps {
  onPlayAlbum: () => void;
  onPauseAlbum: () => void;
  isAlbumPlaying: boolean;
}

export function HeroSection({ onPlayAlbum, onPauseAlbum, isAlbumPlaying }: HeroSectionProps) {
  const { isPlaying } = useMusicPlayer();
  
  // Check if mobile device
  const isMobile = window.innerWidth <= 768;

  const handleBuyOnBandcamp = () => {
    window.open('https://hernansavastano.bandcamp.com/album/mi-canci-n', '_blank');
  };
  
  return (
    <section id="home" className="pb-11 relative flex items-center" data-testid="hero-section" style={{backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundAttachment: isMobile ? 'scroll' : 'fixed', minHeight: isMobile ? '100svh' : 'calc(100vh - 4rem)'}}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 w-full h-full">
        <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 text-right w-56 md:w-64 space-y-6 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-futura font-light text-white leading-tight drop-shadow-lg tracking-wide" data-testid="hero-title">
              Mi Canción
            </h1>
            <p className="text-lg md:text-xl text-white font-futura font-light drop-shadow-md tracking-wide" data-testid="hero-subtitle">
              Hernán Savastano
            </p>
            <p className="text-sm md:text-base text-white drop-shadow-md" data-testid="hero-description">
              A journey through sound and spirit, connecting hearts to Mother Earth's timeless medicines
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col items-end gap-3 mb-4">
            {/* Play/Pause Album Button */}
            <div
              onClick={isAlbumPlaying ? onPauseAlbum : onPlayAlbum}
              className="w-56 h-10 bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
              data-testid="button-play-album"
            >
              {isAlbumPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span className="text-sm md:text-base font-futura font-medium">
                {isAlbumPlaying ? 'Pause Album' : 'Play Album'}
              </span>
            </div>

            {/* Support Us on Bandcamp Button */}
            <div
              onClick={handleBuyOnBandcamp}
              className="w-56 h-10 bg-secondary text-secondary-foreground flex items-center justify-center gap-2 rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
              data-testid="button-buy-bandcamp"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm md:text-base font-futura font-medium">Support on Bandcamp</span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs md:text-sm text-white/90 drop-shadow-md italic font-futura text-right mb-6" data-testid="bandcamp-tagline">
            All Proceeds split 50/50 between <a href="https://bringforth.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors" data-testid="link-bring-forth">Bring Forth</a> and the <a href="https://www.yawanawaspirit.com/the-experience" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors" data-testid="link-yawanawa">Yawanawa people</a>
          </p>

          <div className="flex justify-end items-center space-x-6">
            <a href="https://open.spotify.com/artist/5nWEuoL8EaSs5N9fyMCXTg?si=ximnrgUgRxmv-6LZG90AZg" target="_blank" rel="noopener noreferrer" className="text-slate-300/70 hover:text-accent transition-colors" data-testid="link-spotify">
              <FaSpotify className="text-2xl drop-shadow-md" />
            </a>
            <a href="https://music.apple.com/us/artist/hernan-savastano/1673066040" target="_blank" rel="noopener noreferrer" className="text-slate-300/70 hover:text-accent transition-colors" data-testid="link-apple">
              <FaApple className="text-2xl drop-shadow-md" />
            </a>
            <a href="https://hernansavastano.bandcamp.com" target="_blank" rel="noopener noreferrer" className="text-slate-300/70 hover:text-accent transition-colors" data-testid="link-bandcamp">
              <SiBandcamp className="text-2xl drop-shadow-md" />
            </a>
            <a href="https://www.facebook.com/hernan.savastano" target="_blank" rel="noopener noreferrer" className="text-slate-300/70 hover:text-accent transition-colors" data-testid="link-facebook">
              <FaFacebook className="text-2xl drop-shadow-md" />
            </a>
            <a href="https://www.instagram.com/hernans/" target="_blank" rel="noopener noreferrer" className="text-slate-300/70 hover:text-accent transition-colors" data-testid="link-instagram">
              <FaInstagram className="text-2xl drop-shadow-md" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
