import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { AlbumSection } from "@/components/album-section";
import { GallerySection } from "@/components/gallery-section";
import { ContactSection } from "@/components/contact-section";
import { FeaturedSingle } from "@/components/featured-single";
import { SecondSingle } from "@/components/second-single";
import { Footer } from "@/components/footer";
import { useMusicPlayer } from "@/contexts/music-player-context";
import type { Track } from "@shared/schema";

export default function Home() {
  const { currentTrack, isPlaying, handlePlayTrack, setCurrentTrack, play, pause, setPlaylist } = useMusicPlayer();

  const { data: tracks = [] } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });

  // Set playlist when tracks are loaded
  useEffect(() => {
    if (tracks.length > 0) {
      setPlaylist(tracks);
    }
  }, [tracks, setPlaylist]);

  const handlePlayAlbum = () => {
    if (tracks.length > 0) {
      play(tracks[0]);
    }
  };

  const handlePauseAlbum = () => {
    pause();
  };

  const isAlbumPlaying = isPlaying;

  const handlePlaySingle = () => {
    const stressOfMachineryTrack = tracks.find(track => track.id === "track-2") || tracks[0];
    if (stressOfMachineryTrack) {
      handlePlayTrack(stressOfMachineryTrack);
    }
  };

  // Auto-load "Stress Of The Machinery" when tracks load (but don't auto-play due to browser restrictions)
  useEffect(() => {
    if (tracks.length > 0 && !currentTrack) {
      const stressOfMachineryTrack = tracks.find(track => track.id === "track-2") || tracks[0];
      if (stressOfMachineryTrack) {
        // Just set the current track without triggering playback
        setCurrentTrack(stressOfMachineryTrack);
      }
    }
  }, [tracks, currentTrack, setCurrentTrack]);

  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Navigation />
      
      <div className="pt-16">
        <main>
        <HeroSection 
          onPlayAlbum={handlePlayAlbum} 
          onPauseAlbum={handlePauseAlbum}
          isAlbumPlaying={isAlbumPlaying}
        />
        <AboutSection />
        <FeaturedSingle 
          onPlayTrack={handlePlayTrack}
          isCurrentlyPlaying={currentTrack?.id === "track-2" && isPlaying}
        />
        <SecondSingle 
          onPlayTrack={handlePlayTrack}
          isCurrentlyPlaying={currentTrack?.id === "track-3" && isPlaying}
        />
        <AlbumSection 
          onPlayAlbum={handlePlayAlbum}
          onPauseAlbum={handlePauseAlbum}
          isAlbumPlaying={isAlbumPlaying}
          onPlayTrack={handlePlayTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
        />
        <GallerySection />
        <ContactSection />
        </main>

        <Footer />
      </div>
      
      
    </div>
  );
}
