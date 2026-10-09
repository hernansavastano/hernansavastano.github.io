import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PreOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PreOrderDialog({ open, onOpenChange }: PreOrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: 'hsl(50, 55%, 93%)' }}>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-futura text-foreground">
            Stay tuned for "Mi Canción" album release on 11/7/25
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={() => window.open('https://hernansavastano.bandcamp.com/', '_blank')}
            className="w-full"
            data-testid="button-bandcamp"
          >
            Pre-Buy on Bandcamp
          </Button>
          <Button
            onClick={() => window.open('https://open.spotify.com/artist/5nWEuoL8EaSs5N9fyMCXTg?si=ximnrgUgRxmv-6LZG90AZg', '_blank')}
            variant="secondary"
            className="w-full"
            data-testid="button-spotify"
          >
            Listen on Spotify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
