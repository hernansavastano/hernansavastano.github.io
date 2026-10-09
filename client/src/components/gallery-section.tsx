import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { GalleryImage } from "@shared/schema";

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  return (
    <section id="gallery" className="py-14 bg-background" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-futura font-bold text-foreground mb-4 tracking-wide" data-testid="gallery-title">
            Gallery
          </h2>
          <p className="text-xl font-futura text-muted-foreground" data-testid="gallery-description">
Behind the scenes, studio sessions, and the musical journey that inspires the songs
          </p>
        </div>

{isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {/* Current Project */}
            <div>
              <h3 className="text-2xl font-futura font-light text-foreground mb-8 text-center" data-testid="gallery-heading-current">
                Hernán & Friends
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.filter(image => image.caption?.includes("Hernán & Friends")).map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <div 
                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                        data-testid={`gallery-image-${image.id}`}
                      >
                        <img 
                          src={image.imageUrl}
                          alt={image.altText}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Expand className="text-white text-2xl" />
                        </div>
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <p className="font-futura text-white text-sm" data-testid={`gallery-caption-${image.id}`}>{image.caption}</p>
                          </div>
                        )}
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                      <div className="relative">
                        <img 
                          src={image.imageUrl}
                          alt={image.altText}
                          className="w-full h-auto max-h-[80vh] object-contain"
                        />
                        {image.caption && (
                          <div className="p-6 bg-card">
                            <p className="font-futura text-foreground text-center">{image.caption}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>

            {/* La Dulce Vida */}
            <div>
              <h3 className="text-2xl font-futura font-light text-foreground mb-8 text-center" data-testid="gallery-heading-ldv">
                La Dulce Vida
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.filter(image => image.caption?.includes("La Dulce Vida")).map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <div 
                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                        data-testid={`gallery-image-${image.id}`}
                      >
                        <img 
                          src={image.imageUrl}
                          alt={image.altText}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Expand className="text-white text-2xl" />
                        </div>
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <p className="font-futura text-white text-sm" data-testid={`gallery-caption-${image.id}`}>{image.caption}</p>
                          </div>
                        )}
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                      <div className="relative">
                        <img 
                          src={image.imageUrl}
                          alt={image.altText}
                          className="w-full h-auto max-h-[80vh] object-contain"
                        />
                        {image.caption && (
                          <div className="p-6 bg-card">
                            <p className="font-futura text-foreground text-center">{image.caption}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>

            {/* The Sweetheart Army */}
            <div>
              <h3 className="text-2xl font-futura font-light text-foreground mb-8 text-center" data-testid="gallery-heading-tsa">
                The Sweetheart Army
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.filter(image => image.caption?.includes("The Sweetheart Army")).map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <div 
                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                        data-testid={`gallery-image-${image.id}`}
                      >
                        <img 
                          src={image.imageUrl}
                          alt={image.altText}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Expand className="text-white text-2xl" />
                        </div>
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <p className="font-futura text-white text-sm" data-testid={`gallery-caption-${image.id}`}>{image.caption}</p>
                          </div>
                        )}
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                      <div className="relative">
                        <img 
                          src={image.imageUrl}
                          alt={image.altText}
                          className="w-full h-auto max-h-[80vh] object-contain"
                        />
                        {image.caption && (
                          <div className="p-6 bg-card">
                            <p className="font-futura text-foreground text-center">{image.caption}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
