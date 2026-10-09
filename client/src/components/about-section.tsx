import bandPhotoUrl from '@assets/OlderMePhoto_1758005876675.png';

export function AboutSection() {
  return (
    <section id="about" className="py-14 bg-background" data-testid="about-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground" data-testid="about-title">
            About Hernán Savastano
          </h2>
          <div className="flex flex-col gap-4 text-lg leading-relaxed">
            <p className="text-foreground" data-testid="about-paragraph-1">
              Hernán Savastano is an Argentine-American singer-songwriter based in the Pacific Northwest. His music blends folk and world influences with themes of healing, gratitude, and connection to nature. He composes acoustic, heart-centered songs that chronicle his personal and spiritual journey working with Mother Earth's timeless medicines.
            </p>
            <p className="text-muted-foreground" data-testid="about-paragraph-2">
              Born in Buenos Aires in 1971, Hernán's journey to music began with upheaval and transformation. When political instability forced his mother to bring their family to the United States as refugees when he was ten, music became an unexpected anchor in a life of major change. Like many Argentine children, Hernán lived for fútbol, but his mother insisted he learn an instrument. Choosing drums to rebel against her musical aspirations, he eventually picked up the guitar his father gifted him and discovered his first musical influences in artists like Prince and The Replacements.
            </p>
            <p className="text-foreground" data-testid="about-paragraph-3">
              After years performing with Seattle folk-pop duo Sweetheart Army in the early 2000s, Hernán found himself trapped in corporate life. A plant medicine experience in 2012 lifted him out of depression and reconnected him to his heart, leading him to leave the city for mountain wilderness and form the band La Dulce Vida, which performed at various PNW transformational music festivals.
            </p>
            <p className="text-muted-foreground" data-testid="about-paragraph-4">
              The journey has been non-linear and filled with struggle, battling addiction and navigating turbulent relationships. Through his twelve-year path with natural medicines, Hernán learned that healing is a lifelong journey he continues to work through daily. Today, he creates healing songs informed and inspired by the wisdom of the natural elements, finding along the way deep gratitude for his heart, his family, his community, and the medicines that guide his ongoing work. His debut album "Mi Canción" (My Song) documents this transformation, much of it sung in his native tongue as a way of healing childhood trauma and embracing the young boy shown in the album cover.
            </p>
            <div className="bg-white p-6 rounded-lg mt-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-foreground mb-4" data-testid="album-subtitle">
                About Mi Canción
              </h3>
              <p className="text-foreground leading-relaxed" data-testid="album-summary-content">
                "Mi Canción" traces a journey of transformation, weaving together personal healing, spiritual growth and artistic rebirth. These songs emerged from the desire to keep creating even in pain, turning wounds into art and vulnerability into connection, with the creative process itself becoming both part of the healing path and its destination. This is ultimately an album about remembering our connection to Mother Earth, to our ancestors, and to our authentic creative voice. The songs emerge from sacred ceremonies, encounters with nature, family reconciliation, and moments of vulnerability, creating a musical map for anyone seeking their own path through creative expression.
              </p>
            </div>

            <div className="relative mt-16">
              <img 
                src={bandPhotoUrl} 
                alt="Hernán playing acoustic guitar in comfortable home setting with fireplace" 
                className="w-full rounded-2xl shadow-2xl"
                data-testid="artist-portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
