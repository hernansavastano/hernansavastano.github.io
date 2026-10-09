import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MusicPlayerProvider, useMusicPlayer } from "@/contexts/music-player-context";
import { MusicPlayer } from "@/components/music-player";
import Home from "@/pages/home";
import EpPage from "@/pages/ep";
import VideosPage from "@/pages/videos";
import TourPage from "@/pages/tour";
import SongbookPage from "@/pages/songbook";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MusicPlayerProvider>
          <AppContent />
        </MusicPlayerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const { currentTrack } = useMusicPlayer();
  
  return (
    <>
      <Toaster />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ep" component={EpPage} />
        <Route path="/videos" component={VideosPage} />
        <Route path="/tour" component={TourPage} />
        <Route path="/songbook" component={SongbookPage} />
        <Route component={NotFound} />
      </Switch>
      
      {/* Global persistent music player */}
      {currentTrack && <MusicPlayer />}
    </>
  );
}

export default App;
