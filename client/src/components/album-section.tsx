import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, Pause, BookOpen, Calendar } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { UnreleasedTrackDialog } from "@/components/unreleased-track-dialog";
import { useMusicPlayer } from "@/contexts/music-player-context";
import type { Track } from "@shared/schema";
import albumCover from "@assets/mi-cancion-album-cover-1757570375483.jpg";

interface AlbumSectionProps {
  onPlayAlbum: () => void;
  onPauseAlbum: () => void;
  isAlbumPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  currentTrack?: Track;
  isPlaying: boolean;
}

export function AlbumSection({ onPlayAlbum, onPauseAlbum, isAlbumPlaying, onPlayTrack, currentTrack, isPlaying }: AlbumSectionProps) {
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [showUnreleasedDialog, setShowUnreleasedDialog] = useState(false);
  const [selectedUnreleasedTrack, setSelectedUnreleasedTrack] = useState<Track | null>(null);
  const { toggle } = useMusicPlayer();

  const { data: tracks = [], isLoading } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });

  const displayedTracks = showAllTracks ? tracks : tracks.slice(0, 6);

  const totalDuration = tracks.reduce((acc, track) => {
    const [minutes, seconds] = track.duration.split(':').map(Number);
    return acc + minutes * 60 + seconds;
  }, 0);

  const formatTotalDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrackClick = (track: Track) => {
    if (!track.isReleased) {
      setSelectedUnreleasedTrack(track);
      setShowUnreleasedDialog(true);
    } else {
      toggle(track);
    }
  };

  return (
    <section id="album" className="py-14 bg-background" data-testid="album-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 font-futura" data-testid="release-date-badge">
            <Calendar className="w-3 h-3 mr-2" />
            Release Date: Nov 7, 2025
          </Badge>
          <h2 className="text-3xl md:text-4xl font-futura font-bold text-foreground mb-4 tracking-wide" data-testid="album-title">
            Mi Canción
          </h2>
          <p className="text-xl font-futura text-muted-foreground max-w-2xl mx-auto" data-testid="album-description">
            A journey through sound and spirit - the healing path from disconnection to awakening, told through eleven songs of transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Album Cover & Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <img 
                  src={albumCover} 
                  alt="Mi Canción album artwork" 
                  className="w-full rounded-xl shadow-lg border border-gray-300 mb-3"
                  data-testid="album-artwork"
                />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-futura font-bold text-foreground tracking-wide" data-testid="album-info-title">Mi Canción</h3>
                    <p className="font-futura text-muted-foreground" data-testid="album-info-year">Hernán Savastano • 2025</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span data-testid="track-count">{tracks.length} tracks</span>
                    <span data-testid="total-duration">{formatTotalDuration(totalDuration)}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full"
                      onClick={isAlbumPlaying ? onPauseAlbum : onPlayAlbum}
                      data-testid="button-play-album"
                    >
                      {isAlbumPlaying ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Album
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Play Album
                        </>
                      )}
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="secondary"
                        className="w-full"
                        onClick={() => window.open('https://hernansavastano.bandcamp.com/album/mi-canci-n', '_blank')}
                        data-testid="button-bandcamp"
                      >
                        <FaShoppingCart className="mr-2 h-4 w-4" />
                        Support on Bandcamp
                      </Button>
                      <Link href="/songbook" className="w-full">
                        <Button 
                          variant="secondary" 
                          className="w-full"
                          data-testid="button-songbook"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Read Song Stories
                        </Button>
                      </Link>
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
                <h3 className="text-2xl font-futura font-bold text-foreground mb-6 tracking-wide" data-testid="tracklist-title">Track Listing</h3>
                
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {displayedTracks.map((track) => (
                      <div 
                        key={track.id}
                        className={`flex items-center justify-between p-4 rounded-lg transition-colors group ${
                          track.isReleased 
                            ? 'hover:bg-accent cursor-pointer' 
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                        onClick={() => handleTrackClick(track)}
                        data-testid={`track-${track.id}`}
                      >
                        <div className="flex items-center space-x-4">
                          <span className={`w-8 text-muted-foreground ${track.isReleased ? 'group-hover:hidden' : ''}`} data-testid={`track-number-${track.id}`}>
                            {track.trackNumber.toString().padStart(2, '0')}
                          </span>
                          {track.isReleased && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 hidden group-hover:flex"
                              data-testid={`button-play-track-${track.id}`}
                            >
                              {currentTrack?.id === track.id && isPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                          <div>
                            <h4 className="font-futura font-bold text-foreground" data-testid={`track-title-${track.id}`}>{track.title}</h4>
                            <p className="font-futura text-sm text-muted-foreground" data-testid={`track-description-${track.id}`}>{track.description}</p>
                          </div>
                        </div>
                        <span className="text-muted-foreground text-sm" data-testid={`track-duration-${track.id}`}>{track.duration}</span>
                      </div>
                    ))}
                    
                    {tracks.length > 6 && (
                      <Button
                        variant="default"
                        className="w-full text-center py-4"
                        onClick={() => setShowAllTracks(!showAllTracks)}
                        data-testid="button-view-all-tracks"
                      >
                        {showAllTracks ? "Show less" : `View all ${tracks.length} tracks`}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <UnreleasedTrackDialog 
        open={showUnreleasedDialog} 
        onOpenChange={setShowUnreleasedDialog}
        trackTitle={selectedUnreleasedTrack?.title}
      />
    </section>
  );
}
