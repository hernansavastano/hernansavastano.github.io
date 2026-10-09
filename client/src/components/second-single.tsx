import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Calendar, Music } from "lucide-react";
import { useState } from "react";
import type { Track } from "@shared/schema";
import { useMusicPlayer } from "@/contexts/music-player-context";
import aguaSagradaArt from "@assets/RainaAgua_1760681195633.jpeg";

interface SecondSingleProps {
  onPlayTrack?: (track: Track) => void;
  isCurrentlyPlaying?: boolean;
}

export function SecondSingle({ onPlayTrack, isCurrentlyPlaying = false }: SecondSingleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, toggle } = useMusicPlayer();

  const aguaSagradaTrack: Track = {
    id: "track-3",
    title: "Agua Sagrada",
    description: "Sacred water, sacred moments",
    duration: "4:30",
    trackNumber: 3,
    audioUrl: "/attached_assets/03 - Agua Sagrada - Master 2448_1760691501915.mp3",
    artworkUrl: aguaSagradaArt,
    isFeatureed: false,
    albumType: "album",
    isReleased: true
  };

  const handlePlayClick = () => {
    toggle(aguaSagradaTrack);
  };

  return (
    <section className="py-14 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="mb-4 font-futura" data-testid="second-single-badge">
            <Calendar className="w-3 h-3 mr-2" />
            Released Oct 17, 2025
          </Badge>
          <h2 className="text-4xl font-futura font-bold text-foreground mb-2">
            Second Single
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
                className="relative p-8 flex flex-col items-center justify-between bg-cover bg-center min-h-[300px]"
                style={{ backgroundImage: `url("${aguaSagradaArt}")` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                
                {/* Musical note icon in center */}
                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <Music className="w-16 h-16 text-white opacity-70 drop-shadow-lg" />
                </div>
                
                {/* Text at bottom */}
                <div className="relative z-10 text-center text-white">
                  <h3 className="text-2xl font-futura font-bold mb-2 drop-shadow-lg">Agua Sagrada</h3>
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
                    Agua Sagrada
                  </h3>
                  <p className="text-muted-foreground font-futura leading-relaxed">
                    My first song in Spanish, "Agua Sagrada" celebrates water as the giver of life, weaving together the sacred teachings of nature's elements with the restorative power that comes from singing in my native tongue. The artwork features my daughter Raina in blissful harmony with the elements in a creek near my mom's place in Argentina.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full font-futura"
                    onClick={handlePlayClick}
                    data-testid="play-second-single"
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
