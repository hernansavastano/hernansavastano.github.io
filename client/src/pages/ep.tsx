import { useQuery } from "@tanstack/react-query";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaSpotify, FaShoppingCart } from "react-icons/fa";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useMusicPlayer } from "@/contexts/music-player-context";
import type { Track } from "@shared/schema";

export default function EpPage() {
  const { currentTrack, isPlaying, handlePlayTrack } = useMusicPlayer();

  const { data: tracks = [], isLoading } = useQuery<Track[]>({
    queryKey: ["/api/ep-tracks"],
  });

  const totalDuration = tracks.reduce((acc, track) => {
    const [minutes, seconds] = track.duration.split(':').map(Number);
    return acc + minutes * 60 + seconds;
  }, 0);

  const formatTotalDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background" data-testid="ep-page">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-background" data-testid="ep-hero-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-futura font-bold text-foreground mb-4 tracking-wide" data-testid="ep-title">
                The Milk Sessions
              </h1>
              <p className="text-xl font-futura text-muted-foreground" data-testid="ep-subtitle">
                An intimate EP by Hernán Savastano
              </p>
              <p className="text-lg font-futura text-muted-foreground max-w-3xl mx-auto" data-testid="ep-description">
                Three gentle acoustic compositions recorded in the quiet hours of dawn, 
                capturing the soft warmth of morning light and the tender simplicity of everyday moments.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-center flex-wrap gap-4">
                  <Button 
                    onClick={() => tracks[0] && handlePlayTrack(tracks[0])}
                    className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                    data-testid="button-listen-ep"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Listen Now
                  </Button>
                  <Button 
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                    data-testid="button-buy-ep"
                  >
                    <FaShoppingCart className="mr-2 h-4 w-4" />
                    Buy EP
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-fade-in">
                <img 
                  src="/attached_assets/Milk Sessions Cover_1756777910588.jpeg" 
                  alt="The Milk Sessions EP Cover" 
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                  data-testid="ep-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg" data-testid="ep-badge">
                  EP • 2025
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Track Listing Section */}
        <section className="py-20 bg-background" data-testid="ep-tracks-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* EP Cover & Info */}
              <div className="lg:col-span-1">
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-8">
                    <img 
                      src="/attached_assets/Milk Sessions Cover_1756777910588.jpeg" 
                      alt="The Milk Sessions EP artwork" 
                      className="w-full rounded-xl shadow-lg mb-6"
                      data-testid="ep-artwork"
                    />
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-foreground" data-testid="ep-info-title">The Milk Sessions</h3>
                        <p className="text-muted-foreground" data-testid="ep-info-artist">Hernán Savastano • 2025</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span data-testid="ep-track-count">{tracks.length} tracks</span>
                        <span data-testid="ep-total-duration">{formatTotalDuration(totalDuration)}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                          onClick={() => tracks[0] && handlePlayTrack(tracks[0])}
                          data-testid="button-play-ep-full"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Play EP
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            variant="secondary" 
                            className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                            onClick={() => window.open('https://open.spotify.com/artist/5nWEuoL8EaSs5N9fyMCXTg?si=ximnrgUgRxmv-6LZG90AZg', '_blank')}
                            data-testid="button-spotify-ep"
                          >
                            <FaSpotify className="mr-2 h-4 w-4" />
                            Spotify
                          </Button>
                          <Button 
                            className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                            data-testid="button-buy-ep-full"
                          >
                            <FaShoppingCart className="mr-2 h-4 w-4" />
                            Buy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Track Listing */}
              <div className="lg:col-span-2">
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-6" data-testid="ep-tracklist-title">Track Listing</h3>
                    
                    {isLoading ? (
                      <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {tracks.map((track) => (
                          <div 
                            key={track.id}
                            className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors cursor-pointer group"
                            onClick={() => handlePlayTrack(track)}
                            data-testid={`ep-track-${track.id}`}
                          >
                            <div className="flex items-center space-x-4">
                              <span className="w-8 text-muted-foreground group-hover:hidden" data-testid={`ep-track-number-${track.id}`}>
                                {track.trackNumber.toString().padStart(2, '0')}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 hidden group-hover:flex text-primary"
                                data-testid={`button-play-ep-track-${track.id}`}
                              >
                                {currentTrack?.id === track.id && isPlaying ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <div>
                                <h4 className="font-medium text-foreground" data-testid={`ep-track-title-${track.id}`}>{track.title}</h4>
                                <p className="text-sm text-muted-foreground" data-testid={`ep-track-description-${track.id}`}>{track.description}</p>
                              </div>
                            </div>
                            <span className="text-muted-foreground text-sm" data-testid={`ep-track-duration-${track.id}`}>{track.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
    </div>
  );
}