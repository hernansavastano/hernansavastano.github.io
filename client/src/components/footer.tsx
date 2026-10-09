import { FaFacebook, FaInstagram, FaYoutube, FaSpotify, FaApple } from "react-icons/fa";
import { SiBandcamp } from "react-icons/si";

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-white border-t border-border py-12 pb-24" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-4" data-testid="footer-title">Hernán Savastano</h3>
            <p className="text-muted-foreground mb-4" data-testid="footer-description">
              Original folk medicine songs celebrating the healing power of music and nature's wisdom.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/hernan.savastano" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-facebook">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://www.instagram.com/hernans/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://hernansavastano.bandcamp.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-bandcamp">
                <SiBandcamp className="text-xl" />
              </a>
              <a href="https://open.spotify.com/artist/5nWEuoL8EaSs5N9fyMCXTg?si=ximnrgUgRxmv-6LZG90AZg" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-spotify">
                <FaSpotify className="text-xl" />
              </a>
              <a href="https://music.apple.com/us/artist/hernan-savastano/1673066040" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-apple">
                <FaApple className="text-xl" />
              </a>
              <a href="https://www.youtube.com/@hernansavastano" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-youtube">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4" data-testid="footer-quick-links-title">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-about"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("album")} 
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-album"
                >
                  Album
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("gallery")} 
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-gallery"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4" data-testid="footer-listen-title">Listen On</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="https://open.spotify.com/artist/5nWEuoL8EaSs5N9fyMCXTg?si=ximnrgUgRxmv-6LZG90AZg" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="footer-platform-spotify">Spotify</a></li>
              <li><a href="https://music.apple.com/us/artist/hernan-savastano/1673066040" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="footer-platform-apple">Apple Music</a></li>
              <li><a href="https://music.youtube.com/channel/UCoyOIhxS0uiGlgi6prNzpRQ?si=o2McHY5liZ2qkcSn" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="footer-platform-youtube">YouTube Music</a></li>
              <li><a href="https://soundcloud.com/hernans" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="footer-platform-soundcloud">SoundCloud</a></li>
              <li><a href="https://hernansavastano.bandcamp.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" data-testid="footer-platform-bandcamp">Bandcamp</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center" style={{backgroundColor: 'hsl(var(--background))', margin: '-48px -32px -96px -32px', padding: '32px 32px 96px 32px', marginTop: '32px'}}>
          <p className="text-muted-foreground text-sm" data-testid="footer-copyright">
            © 2025 Hernán Savastano. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-privacy">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
