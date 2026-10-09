import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play, ExternalLink, X } from "lucide-react";

interface Video {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  thumbnailUrl: string;
  videoUrl: string;
  platform: "youtube" | "vimeo" | "bandcamp";
}

// Live performance videos from Hernán's YouTube channel
const liveVideos: Video[] = [
  {
    id: "imagine-sept-2025",
    title: "Live at Imagine Festival Sept 2025 (Full Set)",
    description: "Live performance with Nora B. Heath (Ukulele & Vox), Benjamin Jay Thomas (Guitar & Vox), & Mica Akullian (Cajon) in the Council Tent",
    venue: "Imagine Festival",
    date: "September 2025",
    thumbnailUrl: "https://img.youtube.com/vi/zxh7XNT6fcU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/zxh7XNT6fcU",
    platform: "youtube"
  },
  {
    id: "plant-ally-2025",
    title: "Live at the Plant Ally Aug 2025 (Thirsty Rain)",
    description: "Performing the song \"Thirsty Rain\" at the \"Bring Forth Launch Party\" with Nora Heath, Benjamin Thomas, and Mica Akullian",
    venue: "The Plant Ally",
    date: "August 2025",
    thumbnailUrl: "https://img.youtube.com/vi/vf-dfDUu3sc/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/vf-dfDUu3sc",
    platform: "youtube"
  },
  {
    id: "clear-heart-2025",
    title: "Live at Clear Heart Sanctuary Aug 2025 (Full Set)",
    description: "Opening set for Andy Fischer-Price with Nora Heath and Benjamin Jay Thomas",
    venue: "Clear Heart Sanctuary",
    date: "August 2025",
    thumbnailUrl: "https://img.youtube.com/vi/2IfgM4WdvkY/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/2IfgM4WdvkY",
    platform: "youtube"
  },
  {
    id: "imagine-2024",
    title: "Live at Imagine Festival Sept 2024 (Full Set)",
    description: "Complete performance in the Council Tent with friends",
    venue: "Imagine Festival",
    date: "September 2024",
    thumbnailUrl: "https://img.youtube.com/vi/Rm9Ew51mV6g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Rm9Ew51mV6g",
    platform: "youtube"
  },
  {
    id: "imagine-2023",
    title: "Live at Imagine Festival Sept 2023 (Full Set)", 
    description: "Medicine songs and healing music from the festival stage",
    venue: "Imagine Festival",
    date: "September 2023",
    thumbnailUrl: "https://img.youtube.com/vi/H4yGcBKZVVA/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/H4yGcBKZVVA",
    platform: "youtube"
  },
  {
    id: "imagine-2023-set2",
    title: "Live at Imagine Festival Sept 2023 (Full Set #2)",
    description: "Recent live performance sharing healing songs and transformational music",
    venue: "Imagine Festival",
    date: "September 2023",
    thumbnailUrl: "https://img.youtube.com/vi/eypeCqbyqwM/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/eypeCqbyqwM",
    platform: "youtube"
  },
  {
    id: "mt-mazama-2023",
    title: "Mt Mazama - First Collaboration with Daughter Raina",
    description: "A special father-daughter musical collaboration exploring nature and connection",
    venue: "Studio Collaboration",
    date: "June 2023",
    thumbnailUrl: "https://img.youtube.com/vi/mQOyB38by5k/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/mQOyB38by5k",
    platform: "youtube"
  },
  {
    id: "blooming-heart-2022",
    title: "Live at Blooming Heart Festival 2022 (Full Set)",
    description: "Songs dedicated to daughter Raina on her golden birthday",
    venue: "Blooming Heart Festival, Orcas Island",
    date: "July 2022",
    thumbnailUrl: "https://img.youtube.com/vi/Rj4Hl2MH2rQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Rj4Hl2MH2rQ",
    platform: "youtube"
  },
  {
    id: "zag-2018",
    title: "La Dulce Vida Live at ZAG Oct 2018",
    description: "Medicine song band performance at transformational festival",
    venue: "ZAG Festival",
    date: "October 2018",
    thumbnailUrl: "https://img.youtube.com/vi/1UFiaBTFFlw/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/1UFiaBTFFlw",
    platform: "youtube"
  },
  {
    id: "snowgrass-2018",
    title: "La Dulce Vida Live at Snowgrass Apr 2018 (Opening for Yaima)",
    description: "Opening performance for Yaima at Snowgrass Music Festival",
    venue: "Snowgrass Music Festival",
    date: "April 2018",
    thumbnailUrl: "https://img.youtube.com/vi/vGWgepTz8gQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/vGWgepTz8gQ",
    platform: "youtube"
  },
  {
    id: "zag-2017",
    title: "La Dulce Vida Live at ZAG Dec 2017 (Opening for Yaima)",
    description: "Opening performance for Yaima at ZAG Festival",
    venue: "ZAG Festival",
    date: "December 2017",
    thumbnailUrl: "https://img.youtube.com/vi/I491Tt5psVk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/I491Tt5psVk",
    platform: "youtube"
  },
  {
    id: "resonance-2017",
    title: "La Dulce Vida Live at Resonance Festival July 2017",
    description: "Medicine song band performance at transformational festival",
    venue: "Resonance Festival",
    date: "July 2017",
    thumbnailUrl: "https://img.youtube.com/vi/LFz7P8JIbB0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/LFz7P8JIbB0",
    platform: "youtube"
  },
  {
    id: "water-sines-2017",
    title: "Live at Water Sines Studios Jan 2017",
    description: "Intimate benefit house concert performance",
    venue: "Water Sines Studios",
    date: "January 2017",
    thumbnailUrl: "https://img.youtube.com/vi/80l79EBMEB8/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/80l79EBMEB8",
    platform: "youtube"
  },
  {
    id: "blooming-heart-2016",
    title: "Live at Blooming Heart Festival July 2016 (Full Set)",
    description: "Early healing songs and medicine music performance",
    venue: "Blooming Heart Festival",
    date: "July 2016",
    thumbnailUrl: "https://img.youtube.com/vi/NdyMfLwkT1E/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/NdyMfLwkT1E",
    platform: "youtube"
  },
  {
    id: "gracias-2016",
    title: "Gracias A La Vida - Live at Blooming Heart Festival",
    description: "Beautiful rendition of Violeta Parra's classic, originally sung by Mercedes Sosa",
    venue: "Blooming Heart Festival",
    date: "November 2016",
    thumbnailUrl: "https://img.youtube.com/vi/YMwiY-DfRQo/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/YMwiY-DfRQo",
    platform: "youtube"
  },
  {
    id: "standing-rock-2016",
    title: "Live for Standing Rock Fundraiser at Om Culture Oct 2016 (Opening for Yaima)",
    description: "Benefit performance supporting Standing Rock water protectors, opening for Yaima",
    venue: "Om Culture",
    date: "October 2016",
    thumbnailUrl: "https://img.youtube.com/vi/6QUocI3PoI0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/6QUocI3PoI0",
    platform: "youtube"
  }
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-futura font-bold text-foreground mb-4 tracking-wide" data-testid="videos-title">
                Live Performances
              </h1>
              <p className="text-xl font-futura text-muted-foreground max-w-3xl mx-auto" data-testid="videos-description">
                Captured moments of performances at festivals, intimate venues, and studio sessions. Little brings me more joy in life than sharing songs in a live setting and singing from the heart together with a group of humans.
              </p>
            </div>
          </div>
        </section>

        {/* Videos Grid */}
        <section className="pt-0 pb-8 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveVideos.map((video) => (
                <Card key={video.id} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div 
                      className="relative group cursor-pointer" 
                      data-testid={`video-${video.id}`}
                      onClick={() => openVideo(video)}
                    >
                      <img 
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-lg">
                        <Play className="text-white text-4xl drop-shadow-lg" />
                      </div>
                      <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-futura font-medium">
                        {video.platform.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-futura font-bold text-foreground mb-2" data-testid={`video-title-${video.id}`}>
                        {video.title}
                      </h3>
                      <p className="font-futura text-muted-foreground text-sm mb-3" data-testid={`video-description-${video.id}`}>
                        {video.description}
                      </p>
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                        <span className="font-futura" data-testid={`video-venue-${video.id}`}>{video.venue}</span>
                        <span className="font-futura" data-testid={`video-date-${video.id}`}>{video.date}</span>
                      </div>
                      <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
                        data-testid={`button-watch-${video.id}`}
                        onClick={() => openVideo(video)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Watch Performance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-futura font-light text-foreground mb-4 tracking-wide">
              Subscribe for New Videos
            </h2>
            <p className="font-futura text-muted-foreground mb-8">
              Get notified when new live performances and studio sessions are released
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-red-600 text-white hover:bg-red-700" data-testid="button-youtube-subscribe">
                <ExternalLink className="mr-2 h-4 w-4" />
                Subscribe on YouTube
              </Button>
              <Button variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/80" data-testid="button-newsletter">
                Newsletter Updates
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={closeVideo}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black">
          <DialogTitle className="sr-only">
            {selectedVideo?.title}
          </DialogTitle>
          <div className="relative">
            <Button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              size="icon"
              data-testid="button-close-video"
            >
              <X className="h-4 w-4" />
            </Button>
            {selectedVideo && (
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  data-testid="video-iframe"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}