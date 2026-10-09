import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "#about", label: "About" },
  { href: "/tour", label: "Tour" },
  { href: "/videos", label: "Videos" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const albumItems = [
  { href: "#album", label: "Mi Canción" },
  { href: "/songbook", label: "Mi Canción Songbook" },
  { href: "/ep", label: "The Milk Sessions EP" },
];

export function Navigation() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(location !== "/"); // Start with vintage yellow only on home page
  
  // Scroll to top when location changes (for page navigation)
  // Skip if there's a hash - let hash scrolling happen naturally
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) return;
    window.scrollTo(0, 0);
  }, [location]);

  // Handle hash scrolling with retry for mobile reliability
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      if (location === '/' && hash) {
        const id = hash.slice(1);
        
        // Retry until element exists (handles lazy loading)
        const scrollToElement = (attempts = 0) => {
          const el = document.getElementById(id);
          if (el) {
            // For Gallery section, wait extra time for images to load and layout to stabilize
            const extraDelay = id === 'gallery' ? 300 : 100;
            setTimeout(() => {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, extraDelay);
          } else if (attempts < 60) { // ~3 seconds max for cross-page navigation
            setTimeout(() => scrollToElement(attempts + 1), 50);
          }
        };
        
        // For cross-page navigation, add extra delay to ensure content is loaded
        const delay = window.performance?.navigation?.type === 1 ? 200 : 0; // 200ms delay for page reloads/navigations
        setTimeout(() => scrollToElement(), delay);
      }
    };

    // Handle both location changes AND hash changes
    handleHashScroll();
    
    // Listen for hash changes (for same-page navigation between sections)
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [location]);

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
      
      // For videos page, check if scrolling over actual video content
      if (location === "/videos") {
        const videosGrid = document.querySelector('[data-testid="videos-grid"]') as HTMLElement;
        if (videosGrid) {
          const gridRect = videosGrid.getBoundingClientRect();
          const gridTop = gridRect.top + window.scrollY - 80;
          const gridBottom = gridTop + videosGrid.offsetHeight;
          const isDarkSection = scrollPosition >= gridTop && scrollPosition <= gridBottom;
          setIsScrolled(!isDarkSection);
        } else {
          setIsScrolled(true); // Default to dark text if grid not found
        }
        return;
      }
      
      // For all other pages, use dark text since they have light backgrounds
      setIsScrolled(true);
    };

    // Initial check for current page
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Dynamic background and text color classes based on page background
  const isDarkBackground = location === "/" && !isScrolled; // Only home page hero and gallery photos
  
  // Navigation background: vintage yellow over dark backgrounds, dark slate over light backgrounds
  const navBackgroundClass = isDarkBackground 
    ? "backdrop-blur-md border-yellow-200/30" 
    : "bg-slate-900/85 backdrop-blur-md border-slate-400/20";
  
  const navBackgroundStyle = isDarkBackground 
    ? { backgroundColor: 'hsl(var(--background) / 0.85)' } 
    : {};
  
  // Text colors: dark blue over vintage yellow nav, yellow over dark nav
  const textColorClass = isDarkBackground 
    ? "text-slate-800 hover:text-slate-600 transition-colors" 
    : "text-yellow-100/90 hover:text-yellow-200 transition-colors";
    
  // Dropdown text needs !important to override shadcn defaults
  const dropdownTextColorClass = isDarkBackground 
    ? "!text-slate-800 hover:!text-slate-600 !transition-colors" 
    : "!text-slate-800 hover:!text-slate-600 !transition-colors";
    
  const logoColorClass = isDarkBackground 
    ? "text-slate-800" 
    : "text-yellow-100/90";

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu first
    setIsOpen(false);
    
    // Wait for mobile Sheet to close and scroll lock to release (critical for mobile)
    setTimeout(() => {
      const id = sectionId.replace("#", "");
      
      // If already on homepage, scroll directly and update hash
      if (location === "/") {
        const el = document.getElementById(id);
        if (el) {
          // Calculate scroll position accounting for fixed nav height
          const navHeight = 64; // h-16 = 64px
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        // Update hash to reflect current section (fires hashchange for history)
        if (window.location.hash !== `#${id}`) {
          window.location.hash = `#${id}`;
        }
      } else {
        // Navigate from other pages using wouter
        setLocation(`/#${id}`);
      }
    }, 300);
  };

  const handleLogoClick = () => {
    // If we're already on the home page, scroll to the top
    if (location === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // If we're on another page, navigate to home page
      setLocation("/");
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${navBackgroundClass}`} style={navBackgroundStyle} data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button onClick={handleLogoClick}>
              <h1 className={`text-xl font-futura font-bold cursor-pointer tracking-wide transition-colors ${logoColorClass}`} data-testid="logo">
                Hernán Savastano
              </h1>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* About First */}
              <button
                onClick={() => scrollToSection("#about")}
                className={`font-futura font-medium transition-colors cursor-pointer ${textColorClass}`}
                data-testid="nav-about"
              >
                About
              </button>
              
              {/* Albums Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`font-futura font-medium transition-colors cursor-pointer flex items-center gap-1 focus:outline-none focus:ring-0 ${textColorClass}`} data-testid="nav-albums">
                    Albums
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`!bg-white/20 supports-[backdrop-filter]:bg-white/10 backdrop-blur-xl backdrop-saturate-200 backdrop-brightness-110 border-white/30 shadow-2xl ring-1 ring-1/20 !text-slate-800`}>
                  {albumItems.map((album) => (
                    album.href.startsWith('/') ? (
                      <DropdownMenuItem key={album.href} asChild>
                        <Link href={album.href}>
                          <span className={`font-futura cursor-pointer w-full ${dropdownTextColorClass}`} data-testid={`nav-album-${album.label.toLowerCase().replace(/\s+/g, '-')}`}>
                            {album.label}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem key={album.href} asChild>
                        <button
                          onClick={() => scrollToSection(album.href)}
                          className={`font-futura cursor-pointer w-full text-left ${dropdownTextColorClass}`}
                          data-testid={`nav-album-${album.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {album.label}
                        </button>
                      </DropdownMenuItem>
                    )
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Remaining navigation items */}
              {navItems.slice(1).map((item) => (
                item.href.startsWith('/') ? (
                  <Link key={item.href} href={item.href}>
                    <span className={`font-futura font-medium transition-colors cursor-pointer drop-shadow-md ${textColorClass}`} data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`font-futura font-medium transition-colors cursor-pointer ${textColorClass}`}
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                  <Menu className={`h-6 w-6 ${isDarkBackground ? "text-slate-800" : "text-yellow-100/90"}`} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Albums Section */}
                  <div className="border-b border-border pb-4 mb-4">
                    <h3 className="font-futura text-lg font-bold text-foreground mb-2">Albums</h3>
                    <div className="flex flex-col space-y-2 ml-4">
                      {albumItems.map((album) => (
                        album.href.startsWith('/') ? (
                          <Link key={album.href} href={album.href}>
                            <span className="font-futura text-left text-base text-foreground hover:text-primary transition-colors" data-testid={`mobile-nav-album-${album.label.toLowerCase().replace(/\s+/g, '-')}`}>
                              {album.label}
                            </span>
                          </Link>
                        ) : (
                          <button
                            key={album.href}
                            onClick={() => scrollToSection(album.href)}
                            className="font-futura text-left text-base text-foreground hover:text-primary transition-colors"
                            data-testid={`mobile-nav-album-${album.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {album.label}
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                  
                  {navItems.map((item) => (
                    item.href.startsWith('/') ? (
                      <Link key={item.href} href={item.href}>
                        <span className="font-futura text-left text-lg text-foreground hover:text-primary transition-colors" data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                          {item.label}
                        </span>
                      </Link>
                    ) : (
                      <button
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className="font-futura text-left text-lg text-foreground hover:text-primary transition-colors"
                        data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.label}
                      </button>
                    )
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
