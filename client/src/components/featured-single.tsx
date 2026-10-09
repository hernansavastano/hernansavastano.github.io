import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Calendar, Music } from "lucide-react";
import { useState } from "react";
import type { Track } from "@shared/schema";
import { useMusicPlayer } from "@/contexts/music-player-context";

interface FeaturedSingleProps {
  onPlayTrack?: (track: Track) => void;
  isCurrentlyPlaying?: boolean;
}

export function FeaturedSingle({ onPlayTrack, isCurrentlyPlaying = false }: FeaturedSingleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, toggle } = useMusicPlayer();

  const stressOfMachineryTrack: Track = {
    id: "track-2",
    title: "Stress Of The Machinery",
    description: "Reflections on modern life's pressures",
    duration: "5:40",
    trackNumber: 2,
    audioUrl: "/attached_assets/Stress of the Machinery - Master 1644 - V2_1760053096700.mp3",
    artworkUrl: "/attached_assets/Smoking with Grandpa Jun 74 copy_1757590772173.jpg",
    isFeatureed: false,
    albumType: "album",
    isReleased: true
  };

  const handlePlayClick = () => {
    // Single source of truth - just use toggle
    toggle(stressOfMachineryTrack);
  };

  return (
    <section className="py-14 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="mb-4 font-futura">
            <Calendar className="w-3 h-3 mr-2" />
            Released Sept 12, 2025
          </Badge>
          <h2 className="text-4xl font-futura font-bold text-foreground mb-2">
            First Single
          </h2>
        </div>

        <Card 
          className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Album Art Side */}
              <div 
                className="relative p-8 flex flex-col items-center justify-between bg-contain bg-no-repeat bg-center min-h-[300px]"
                style={{ backgroundImage: `url("${encodeURI(stressOfMachineryTrack.artworkUrl || '')}")` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                
                {/* Musical note icon in center */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <Music className="w-16 h-16 text-white opacity-70 drop-shadow-lg" />
                </div>
                
                {/* Text at bottom */}
                <div className="relative z-10 text-center text-white">
                  <h3 className="text-2xl font-futura font-bold mb-2 drop-shadow-lg">Stress Of The Machinery</h3>
                  <p className="text-slate-200 font-futura drop-shadow-md">Hernán Savastano</p>
                </div>
                
                <div 
                  className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Track Info Side */}
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-futura font-bold text-foreground mb-2">
                    Stress Of The Machinery
                  </h3>
                  <p className="text-muted-foreground font-futura leading-relaxed">
                    A reflection on modern life's pressures, this track confronts the impact of anxiety, dread, and political turbulence. It turns to nature to heal collective trauma and reminds us that even in dark times we have dreams coming to reality. The artwork features a 5-year old me smoking a cigarette as my grandfather's office desk. Different teaching methods back then.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full font-futura"
                    onClick={handlePlayClick}
                    data-testid="play-featured-single"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Loading...
                      </>
                    ) : isCurrentlyPlaying ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Play Single
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}