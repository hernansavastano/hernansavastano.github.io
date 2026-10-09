import { type Track, type InsertTrack, type InsertEpTrack, type GalleryImage, type InsertGalleryImage, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Tracks
  getTracks(): Promise<Track[]>;
  getTrack(id: string): Promise<Track | undefined>;
  createTrack(track: InsertTrack): Promise<Track>;
  getEpTracks(): Promise<Track[]>;
  createEpTrack(track: InsertEpTrack): Promise<Track>;
  
  // Gallery
  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: string): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  
  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private tracks: Map<string, Track>;
  private galleryImages: Map<string, GalleryImage>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.tracks = new Map();
    this.galleryImages = new Map();
    this.contactMessages = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Mi Canción album tracks
    const sampleTracks: Track[] = [
      {
        id: "track-1",
        title: "Our Journey",
        description: "Opening track that sets the journey's tone",
        duration: "6:04",
        trackNumber: 1,
        audioUrl: "/attached_assets/1 Our Journey_1762501800370.mp3",
        artworkUrl: null,
        isFeatureed: true,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-2",
        title: "Stress Of The Machinery",
        description: "Reflections on modern life's pressures",
        duration: "5:40",
        trackNumber: 2,
        audioUrl: "/attached_assets/2 Stress of the Machinery_1762501800370.mp3",
        artworkUrl: "/attached_assets/Smoking with Grandpa Jun 74 copy_1757590772173.jpg",
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-3",
        title: "Agua Sagrada",
        description: "Sacred water, sacred moments",
        duration: "4:30",
        trackNumber: 3,
        audioUrl: "/attached_assets/3 Agua Sagrada_1762501800371.mp3",
        artworkUrl: "/attached_assets/RainaAgua_1760681195633.jpeg",
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-4",
        title: "Como Se Dice Gracias",
        description: "A bilingual exploration of gratitude",
        duration: "4:15",
        trackNumber: 4,
        audioUrl: "/attached_assets/4 Como Se Dice Gracias_1762501800371.mp3",
        artworkUrl: null,
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-5",
        title: "Mami, Te Quiero",
        description: "A heartfelt tribute to motherly love",
        duration: "4:34",
        trackNumber: 5,
        audioUrl: "/attached_assets/5 Mami Te Quiero_1762501800372.mp3",
        artworkUrl: null,
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-6",
        title: "Many Ways to Love",
        description: "Exploring love's many forms and expressions",
        duration: "6:18",
        trackNumber: 6,
        audioUrl: "/attached_assets/6 Many Ways to Love_1762501800372.mp3",
        artworkUrl: null,
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-7",
        title: "Aya Divina",
        description: "A spiritual journey through ancient wisdom",
        duration: "6:21",
        trackNumber: 7,
        audioUrl: "/attached_assets/7 Aya Divina_1762501800372.mp3",
        artworkUrl: null,
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-8",
        title: "Thirsty Rain",
        description: "When the earth calls for healing waters",
        duration: "6:12",
        trackNumber: 8,
        audioUrl: "/attached_assets/8 Thirsty Rain_1762501800372.mp3",
        artworkUrl: null,
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-9",
        title: "Jesus Lizard",
        description: "Desert visions and unexpected encounters",
        duration: "4:34",
        trackNumber: 9,
        audioUrl: "/attached_assets/9 Jesus Lizard_1762501800373.mp3",
        artworkUrl: null,
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-10",
        title: "Mi Cancion",
        description: "The album's namesake, a personal reflection",
        duration: "5:38",
        trackNumber: 10,
        audioUrl: "/attached_assets/10 Mi Cancion_1762501800373.mp3",
        artworkUrl: null,
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
      {
        id: "track-11",
        title: "La Poesia",
        description: "Poetry in motion, words as music",
        duration: "4:30",
        trackNumber: 11,
        audioUrl: "/attached_assets/11 La Posiea_1762501993238.mp3",
        artworkUrl: null,
        isFeatureed: false,
        albumType: "album",
        isReleased: true,
      },
    ];

    sampleTracks.forEach(track => this.tracks.set(track.id, track));

    // The Milk Sessions EP tracks
    const epTracks: Track[] = [
      {
        id: "ep-track-1",
        title: "Father and Dad",
        description: "Intimate reflections on family relationships",
        duration: "4:36",
        trackNumber: 1,
        audioUrl: null,
        artworkUrl: null,
        isFeatureed: true,
        albumType: "ep",
        isReleased: false,
      },
      {
        id: "ep-track-2",
        title: "Como Se Dice Gracias",
        description: "A bilingual exploration of gratitude (EP version)",
        duration: "3:59",
        trackNumber: 2,
        audioUrl: null,
        artworkUrl: null,
        isFeatureed: false,
        albumType: "ep",
        isReleased: false,
      },
      {
        id: "ep-track-3",
        title: "Many Ways To Love",
        description: "Exploring love's many forms and expressions (EP version)",
        duration: "5:40",
        trackNumber: 3,
        audioUrl: null,
        artworkUrl: null,
        isFeatureed: false,
        albumType: "ep",
        isReleased: false,
      },
    ];

    epTracks.forEach(track => this.tracks.set(track.id, track));

    // Gallery images grouped by musical project in reverse chronological order
    const sampleImages: GalleryImage[] = [
      // CURRENT (most recent with Nora, Ben and other friends, performing under your name)
      {
        id: "img-1",
        imageUrl: "/attached_assets/Current Concrescence Aug 2025 with Nora & Ben_1756548337059.png",
        altText: "Trio performance with Nora and Ben at Concrescence Festival with colorful mural backdrop",
        caption: "2025 • Hernán & Friends • Concrescence Festival",
      },
      {
        id: "img-2",
        imageUrl: "/attached_assets/Current with Nora & Ben at Clear Heart Sanctuary 2025_1756548093519.png",
        altText: "Trio performance with Nora and Ben at Clear Heart Sanctuary in forest setting",
        caption: "2025 • Hernán & Friends • Clear Heart Sanctuary",
      },
      {
        id: "img-3",
        imageUrl: "/attached_assets/Current Imagine 2024_1756548093519.png",
        altText: "Ensemble performance at Imagine Festival 2024 with sacred geometry tent backdrop",
        caption: "2024 • Hernán & Friends • Imagine Festival",
      },
      {
        id: "img-4",
        imageUrl: "/attached_assets/Imagine 2023 with friends_1756543264378.JPG",
        altText: "Group performance at Imagine Festival 2023 with friends in ceremonial setting",
        caption: "2023 • Hernán & Friends • Imagine Festival",
      },
      {
        id: "img-5",
        imageUrl: "/attached_assets/Current Solo Blooming Heart 2022_1756548093519.png",
        altText: "Solo acoustic performance with guitar and drum at Blooming Heart Festival",
        caption: "2022 • Hernán & Friends • Blooming Heart Festival",
      },
      {
        id: "img-6",
        imageUrl: "/attached_assets/Water Sines Live_1756546317064.JPG",
        altText: "Solo performance under cosmic mural backdrop with acoustic guitar",
        caption: "2016 • Hernán & Friends • Water Sines Venue",
      },

      // LA DULCE VIDA (with Elyse, David, and Nick)
      {
        id: "img-7",
        imageUrl: "/attached_assets/_MG_3616_1756848982530.jpg",
        altText: "La Dulce Vida indoor performance at Snowgrass Lodge with warm red lighting",
        caption: "2018 • La Dulce Vida • Snowgrass Lodge",
      },
      {
        id: "img-7b",
        imageUrl: "/attached_assets/LDV Snowgrass copy_1756774727028.jpg",
        altText: "La Dulce Vida at Snowgrass Lodge with dramatic red stage lighting",
        caption: "2018 • La Dulce Vida • Snowgrass Lodge",
      },
      {
        id: "img-7d",
        imageUrl: "/attached_assets/La Dulce Vida at Imagine 2018_1756549996912.jpg",
        altText: "La Dulce Vida full ensemble performance at Imagine Festival 2018 with colorful tent backdrop",
        caption: "2018 • La Dulce Vida • Imagine Festival",
      },
      {
        id: "img-7e",
        imageUrl: "/attached_assets/Full band_1756854997886.jpg",
        altText: "La Dulce Vida full band performance at Imagine Festival 2018 with ceremonial tent backdrop and atmospheric lighting",
        caption: "2018 • La Dulce Vida • Imagine Festival",
      },
      {
        id: "img-9",
        imageUrl: "/attached_assets/LDV ZAG with Jila copy_1756546317064.jpg",
        altText: "La Dulce Vida at ZAG house concert with Jila and cello",
        caption: "2018 • La Dulce Vida • ZAG House Concert",
      },
      {
        id: "img-10",
        imageUrl: "/attached_assets/LDV ZAG copy_1756546317064.png",
        altText: "La Dulce Vida ensemble with vocal harmonies",
        caption: "2018 • La Dulce Vida • ZAG House Concert",
      },
      {
        id: "img-11",
        imageUrl: "/attached_assets/LDV at ZAG 2018_1756546634729.jpeg",
        altText: "La Dulce Vida at ZAG house concert series from 2018",
        caption: "2018 • La Dulce Vida • ZAG House Concert",
      },
      {
        id: "img-12",
        imageUrl: "/attached_assets/LDV Resonance 2017 copy_1756774334250.jpg",
        altText: "La Dulce Vida ensemble at Resonance 2017 with ceremonial tent and sacred objects",
        caption: "2017 • La Dulce Vida • Resonance Festival",
      },
      {
        id: "img-12b",
        imageUrl: "/attached_assets/LDV Coffee copy_1756774334250.png",
        altText: "La Dulce Vida intimate coffee shop performance with atmospheric lighting",
        caption: "2018 • La Dulce Vida • La Copa Coffee House",
      },
      // THE SWEETHEART ARMY (with Ali Marcus)
      {
        id: "img-13",
        imageUrl: "/attached_assets/tsa 1_1756543205085.jpg",
        altText: "The Sweetheart Army performance with red stage lighting",
        caption: "2008 • The Sweetheart Army • The Mix",
      },
      {
        id: "img-14",
        imageUrl: "/attached_assets/tsa mix ali_1756546736011.jpg",
        altText: "The Sweetheart Army with Ali under dramatic red stage lighting",
        caption: "2008 • The Sweetheart Army • The Mix",
      },
      {
        id: "img-15",
        imageUrl: "/attached_assets/tsa station 2_1756543205085.jpg",
        altText: "The Sweetheart Army at The Station venue",
        caption: "2008 • The Sweetheart Army • The Station",
      },
      {
        id: "img-16",
        imageUrl: "/attached_assets/tsa at the station with ali_1756543205085.jpg",
        altText: "The Sweetheart Army duo with Ali at The Station",
        caption: "2008 • The Sweetheart Army • The Station",
      },
      {
        id: "img-17",
        imageUrl: "/attached_assets/tsa at high dive_1756543205085.jpg",
        altText: "The Sweetheart Army at High Dive venue",
        caption: "2008 • The Sweetheart Army • High Dive",
      },
      {
        id: "img-18",
        imageUrl: "/attached_assets/tsa station 3_1756543264378.JPG",
        altText: "The Sweetheart Army solo acoustic performance at venue",
        caption: "2008 • The Sweetheart Army • Venue Performance",
      },

    ];

    sampleImages.forEach(image => this.galleryImages.set(image.id, image));
  }

  async getTracks(): Promise<Track[]> {
    return Array.from(this.tracks.values())
      .filter(track => track.albumType === "album")
      .sort((a, b) => a.trackNumber - b.trackNumber);
  }

  async getEpTracks(): Promise<Track[]> {
    return Array.from(this.tracks.values())
      .filter(track => track.albumType === "ep")
      .sort((a, b) => a.trackNumber - b.trackNumber);
  }

  async getTrack(id: string): Promise<Track | undefined> {
    return this.tracks.get(id);
  }

  async createTrack(insertTrack: InsertTrack): Promise<Track> {
    const id = randomUUID();
    const track: Track = { 
      ...insertTrack, 
      id,
      audioUrl: insertTrack.audioUrl ?? null,
      artworkUrl: insertTrack.artworkUrl ?? null,
      isFeatureed: insertTrack.isFeatureed ?? false,
      albumType: insertTrack.albumType ?? "album",
      isReleased: insertTrack.isReleased ?? false
    };
    this.tracks.set(id, track);
    return track;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values());
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const image: GalleryImage = { 
      ...insertImage, 
      id,
      caption: insertImage.caption ?? null
    };
    this.galleryImages.set(id, image);
    return image;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async createEpTrack(insertTrack: InsertEpTrack): Promise<Track> {
    const id = randomUUID();
    const track: Track = { 
      ...insertTrack, 
      id,
      audioUrl: insertTrack.audioUrl ?? null,
      artworkUrl: insertTrack.artworkUrl ?? null,
      isFeatureed: insertTrack.isFeatureed ?? false,
      albumType: "ep",
      isReleased: insertTrack.isReleased ?? false
    };
    this.tracks.set(id, track);
    return track;
  }
}

export const storage = new MemStorage();
