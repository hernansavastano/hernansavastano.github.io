import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { SiBandcamp } from "react-icons/si";
import { useLocation } from "wouter";

interface UnreleasedTrackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trackTitle?: string;
}

export function UnreleasedTrackDialog({ open, onOpenChange, trackTitle }: UnreleasedTrackDialogProps) {
  const [, setLocation] = useLocation();

  const handleReadStories = () => {
    onOpenChange(false);
    setLocation("/songbook");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: 'hsl(50, 55%, 93%)' }}>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-futura text-foreground flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Coming Soon!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="text-base font-futura text-foreground mb-4">
            {trackTitle ? (
              <>
                <span className="font-bold">"{trackTitle}"</span> will be available when the full album releases on <span className="font-bold">11/7/25</span>
              </>
            ) : (
              <>
                This track will be available when the full album releases on <span className="font-bold">11/7/25</span>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => window.open('https://hernansavastano.bandcamp.com/album/mi-canci-n', '_blank')}
            className="w-full"
            data-testid="button-bandcamp-unreleased"
          >
            <SiBandcamp className="mr-2 h-4 w-4" />
            Pre-Buy on Bandcamp
          </Button>
          <Button
            onClick={() => window.open('https://open.spotify.com/artist/5nWEuoL8EaSs5N9fyMCXTg?si=ximnrgUgRxmv-6LZG90AZg', '_blank')}
            variant="secondary"
            className="w-full"
            data-testid="button-spotify-unreleased"
          >
            <FaSpotify className="mr-2 h-4 w-4" />
            Listen on Spotify
          </Button>
          <Button
            onClick={handleReadStories}
            variant="secondary"
            className="w-full"
            data-testid="button-read-stories-unreleased"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Read Song Stories
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
