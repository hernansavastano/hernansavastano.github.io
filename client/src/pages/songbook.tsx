import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Music, Heart, Droplets, Users, Flower, Eye, Home, ArrowLeft, Play, Pause, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMusicPlayer } from "@/contexts/music-player-context";
import { UnreleasedTrackDialog } from "@/components/unreleased-track-dialog";
import type { Track } from "@shared/schema";

const getTrackTheme = (trackNumber: number): string => {
  const themes = {
    1: "**Foundation & Earth Connection** - This opening track establishes the album's core premise: our fundamental relationship with Mother Earth as source of all healing. The song serves as both invocation and promise, calling in the protective motherly energy that will guide the entire healing journey. By interweaving planetary ecology with personal fertility, it reveals how our individual healing cannot be separated from our relationship with the living earth. The repeated phrase 'dreams that our mother holds in her arms' suggests we are both creators and creations, held within a larger loving consciousness that forgives our mistakes and guides us home.",
    
    2: "**Transforming Fear Through Nature** - This track confronts the overwhelming anxiety of modern life and political turbulence by offering nature as medicine for our collective trauma. The 'machinery' represents both external systemic oppression and internal mental chaos, while the natural imagery (jaguars, eagles, mountains, rivers) provides the antidote. The song's arc from dystopian vision to hopeful dreaming shows how spiritual work can transform fear into empowerment. It teaches that when we feel crushed by forces beyond our control, we can remember our connection to something vast and wild that cannot be mechanized or controlled.",
    
    3: "**Plant Medicine Calling** - This track marks the first direct invitation from the natural teachers, establishing a healing practice that honors indigenous wisdom and traditional context. The Quechua name 'Pacha Mama' (Earth Mother) connects this work directly to the motherly earth energy from Track 1, showing how nature is earth's way of healing her children. The song bridges ancient wisdom with personal healing need while acknowledging the power to heal modern trauma. It represents the moment of saying 'yes' to the healing journey, despite not knowing where it will lead.",
    
    4: "**Generational Trauma Healing** - This powerful track confronts inherited family trauma from Argentina's military dictatorship, showing how healing work can address wounds that span generations. The song demonstrates that personal healing often requires facing family patterns of violence, fear, and survival. By calling on spiritual protection, it honors both indigenous wisdom and spiritual traditions, showing how healing can bridge multiple paths. The track reveals that sometimes our individual healing work is actually healing our entire ancestral line.",
    
    5: "**Forgiveness & Family Reconciliation** - This deeply moving track shows how healing work can transform our relationship with family trauma and childhood resentment. The progression from apology ('Lo Siento') to gratitude ('Te Quiero') demonstrates the healing journey from victim consciousness to empowered understanding. The song honors the impossible choices parents sometimes face during historical trauma while taking responsibility for our own healing. It shows that true forgiveness includes grieving what we lost while appreciating what we gained.",
    
    6: "**Love as Universal Medicine** - Born from collective heartbreak during a moment of political despair, this track demonstrates how creative expression can transform suffering into healing practice. The expanding circles of love (stranger, neighbor, family, friends, lovers) emerged not from a healed place, but from the courageous choice to create beauty in darkness. The song teaches that love is both feeling and practice - and that sometimes we discover what we believe by singing it into existence. This track serves as the album's heart, showing how the act of creating art about love becomes the very practice of love itself.",
    
    7: "**Sacred Joy & Play** - This celebratory track captures the pure joy that can emerge from spiritual work when we align with our hearts rather than our minds. The song honors the divine teacher and source of life's beauty, bridging serious healing work with playful celebration. The connection between vision flowers and real children shows how spiritual insight enhances our appreciation of earthly love. It demonstrates that authentic healing includes reclaiming our capacity for wonder and joy.",
    
    8: "**Environmental Reverence & Daily Practice** - This track transforms a basic human need (water) into sacred ceremony and environmental teaching. The communion with rain during ceremony becomes a daily gratitude practice, showing how spiritual insights can be integrated into ordinary life. The song bridges spiritual experience with environmental activism, suggesting that honoring water is both personal healing practice and planetary service. It demonstrates how ceremony can transform our relationship with the elements from taking to receiving with gratitude.",
    
    9: "**Sacred Humor & Present Moment** - This playful track uses humor to deliver spiritual teaching about finding the divine in nature rather than seeking it in distant heavens. The Jesus Lizard becomes a perfect metaphor for miraculous abilities that are actually natural, questioning why we elevate the sacred when it surrounds us. The song integrates spiritual teachings with lighthearted wisdom, showing that spiritual insight can be both meaningful and playful. It invites us to be 'lovers' with the natural world rather than lonely seekers of transcendence.",
    
    10: "**Creative Self-Actualization** - The title track represents the culmination of the healing journey: the irrepressible need to share our story through creative expression. The central question 'Como No Voy A Cantar' (How can I not sing) reveals how creativity becomes both the natural outcome of healing work AND the very mechanism of healing itself. The song moves from individual ('mi canción') to collective ('nuestra canción'), showing how personal creative expression becomes medicine for the world. This track demonstrates that we don't need to wait until we're 'healed enough' to create - the act of vulnerable artistic expression IS the healing.",
    
    11: "**Integration & Peaceful Rest** - This dreamy lullaby provides the perfect conclusion to an intense healing journey, creating space for integration and rest. The song honors how poetry emerges from both love and pain, acknowledging the full spectrum of human experience. The gentle, repetitive nature mirrors the meditative state needed for integrating profound transformation. It sends listeners to peaceful rest with hearts full of wonder for life's inherent poetry, completing the circle from disconnection to grateful appreciation for the beauty of existence."
  };
  
  return themes[trackNumber as keyof typeof themes] || "Theme to be added";
};

const trackData = [
  {
    number: 1,
    title: "Our Journey",
    summary: "This song was born during my first journey into the Amazon in 2019 to visit the Yawanawa people. My wife Angela and I had been trying to have a child for many years and make one last attempt before leaving. During my first ceremony there, I saw a beautiful vision of Mother Earth holding all of us like her children, which then transformed into an image of Angela holding our child to be. The medicine revealed that we had finally gotten pregnant! The whole song then poured out of me. On its surface, the song honors Mother Earth, but it ultimately celebrates the universal force of motherly love- from the planet, our families, and our dreams of creating new life.",
    theme: "**Foundation & Earth Connection** - This opening track establishes the album's core premise: our fundamental relationship with Mother Earth as source of all healing. The song serves as both invocation and promise, calling in the protective motherly energy that will guide the entire healing journey. By interweaving planetary ecology with personal fertility, it reveals how our individual healing cannot be separated from our relationship with the living earth. The repeated phrase 'dreams that our mother holds in her arms' suggests we are both creators and creations, held within a larger loving consciousness that forgives our mistakes and guides us home.",
    lyrics: `Our journey begins
As we inherit the earth
It's more than just carbon
We need a rebirth

In a cradle of leaves
And motherly care
We lay under her trees
Just to breathe the fresh air

<strong>Her only desire is
To keep us from harm 
We're just dreams that
Our mother holds in her arms</strong>

So may our… 
First words be "Thank you"
For this gift of a life
And the first waters flowing
Be the tears in your eyes

Yeah we'll cry from the joy
We'll cry from the pain
That our mother will soothe
With a warm summer rain

<strong>Because her only desire is
To keep us from harm 
We're just dreams that
Our mother hold in her arms</strong>

We'll grow up to be children
Who still make mistakes
But if we listen more closely 
And give more than we take

And for all that is sacred
May we learn to protect 
We can't possibly prosper
From what we don't respect

<strong>So may we listen to her
And do no more harm 
We're just dreams that
Our mother holds in her arms</strong>

I know que yo soy parte de ti
(that I'm a part of you)
I know that you're a part of me
I know that you're a part of me`,
    hasTranslation: false
  },
  {
    number: 2,
    title: "Stress Of The Machinery",
    summary: "Born during a 2018 ceremony while I was grappling with our country's political chaos, this song channels the Orwellian visions I kept seeing—grinding machinery, endless production lines—images that reminded me of Argentina's military dictatorship from my childhood. The medicine guided me outside to a fire under the stars, where I saw a jaguar in the constellations and an eagle flying low. The universe was saying 'there's still beauty even in darkness' and 'just remember we have dreams coming to reality'—which became the chorus.",
    theme: "**Transforming Fear Through Nature** - This track confronts the overwhelming anxiety of modern life and political turbulence by offering nature as medicine for our collective trauma. The 'machinery' represents both external systemic oppression and internal mental chaos, while the natural imagery (jaguars, eagles, mountains, rivers) provides the antidote. The song's arc from dystopian vision to hopeful dreaming shows how plant medicine can transform fear into empowerment. It teaches that when we feel crushed by forces beyond our control, we can remember our connection to something vast and wild that cannot be mechanized or controlled.",
    lyrics: `When the stress of the machinery
Cultivates insanity
Here we are on earth, 
Living with the vanity
Of our thoughts and our illusions
Stealing from the fantasy
Just remember we have dreams
Coming to reality

Here we are on earth
Remembering our
Dreams we have on earth

To appreciate the majesty
The monuments of nature
Snowy mountain ranges 
Melting to the valleys
Deep inside the hollows
Here comes the rain again
Collecting all our sorrows
There is a new tomorrow

The river washes them away
Welcoming another day…

Here we are on earth
Remembering our dreams
We have on earth

To appreciate the majesty
Our moment in the galaxy 
We look up at the sky
And see jaguars in the stars
We see eagles flying low
Daring us to soar
When the stress of the machinery
Roars beneath the floor
Just remember we have dreams
Opening the door

Here we are on earth
Remembering our dreams
We have on earth

Here we are on earth
Remembering our dreams
We have on earth

Here we are on earth 
To appreciate the majesty`,
    hasTranslation: false
  },
  {
    number: 3,
    title: "Agua Sagrada",
    summary: "The first song I ever wrote in Spanish came fairly late in life. One of the biggest gifts I received from plant medicine was the encouragement to sing in my native tongue as a way to heal early childhood wounds, including the disconnection from my heritage that resulted from trying so hard to assimilate into American culture after we fled Argentina as political refugees when I was ten years old. Another gift was an atunement the teachings of nature's sacred elements: the way water cleanses our hearts, the earth keeps us grounded, the air lifts our spirits; and the fire ignites our passions. The first half of the song became a prayer to these elemental blessings, while the back half is a full-on celebration of water as the main healer and giver of life. The artwork is a photo of our daughter, Raina, relaxing in the blissful balance of the elements in a creek near my mom's home in Argentina.",
    lyrics: `El agua limpia tu corazón
El Sol 'pues viene con su pasión 
Despierta el alma de mi canción
El viento lleva su bendición

La tierra calma tu corazón
El sol pues viene con su calor
Derrite el frio de tu temor
Y cura el cuerpo de su dolor

El aire levanta tu corazón
El viento sopla con su fervor
Despierta el alma de mi canción
La melodia de mi amor

El fuego calienta tu corazón
El sol pues brilla con su fervor
Enciende el fondo de mi pasión
Y trae a tierra su bendición

Oooh… Agua
Oooh… Mi agua 
Mi agua sagrada

Agua que limpia
Agua que sana
Agua Sagrada
Con agua you rezo

Oooh mi agua
Mi agua sagrada
Agua Sagrada`,
    translation: `Water cleanses your heart
The sun comes with its passion
Awakens the soul of my song
The wind carries its blessing

The earth calms your heart
The sun comes with its warmth
Melts the cold of your fear
And heals the body of its pain

The air lifts your heart
The wind blows with its fervor
Awakens the soul of my song
The melody of my love

Fire warms your heart
The sun shines with its fervor
Ignites the depths of my passion
And brings its blessing back to earth

Oooh... Water
Oooh... My water
My sacred water

Water that cleanses
Water that heals
Sacred water
With water I pray

Oooh my water
My sacred water
Sacred water`,
    hasTranslation: true
  },
  {
    number: 4,
    title: "Como Se Dice Gracias",
    summary: "This song was born of embarrassment at the Beloved Festival in Aug 2019. When my friend, Jila Ji, pointed out that I had a booger, I instinctively said, 'Oh, sorry!' In her typically direct fashion, Jila replied, 'Don't say sorry, say thank you!' She was so right—why do we apologize when we mean to express gratitude? Why is it so hard to accept the simple loving gesture of a friend? I realized I'd been saying 'sorry' instead of feeling gratitude. The song emerged in Spanish as a chant about finding our way to gratitude and appreciating everyone's beautiful hearts—including our own, which is often hardest. Gracias por tu corazon, Jila Ji!",
    lyrics: `Como se dice gracias 
No es solo una palabra
Que se habla y se habla
Sin el corazón

Hay que sentir amor
Fuera de la razón
Que se habra y se habra
Este corazón 

Gracias, gracias
Por mi corazon

Te quiero pedir perdón
Por todas mis faltas
No hace falta, no hace falta
En tu corazón 

Quiero decirte algo
Que me duele lo quiero
Pero soy entero, soy entero
En tu corazon

Gracias, gracias
Por tu corazon

Estaba perdido
En mi coraon

Gracias, gracias
Por mi Corazon`,
    translation: `How do you say thank you
It's not just a word
That you speak and speak
Without the heart

You have to feel love
Beyond reason
That opens and opens
This heart

Thank you, thank you
For my heart

I want to say I'm sorry
For all my faults
It's not necessary, it's not necessary
In your heart

I want to tell you something
That what I want hurts me sometimes
But I am whole, I am whole
In your heart

Thank you, thank you
For your heart

I was lost
In my heart

Thank you, thank you
For my heart`,
    hasTranslation: true
  },
  {
    number: 5,
    title: "Mami, Te Quiero",
    summary: "This one was hard. I spent years resenting my mom for uprooting us from Argentina, leaving my father behind when I was ten. But only a few years ago, I finally came to fully appreciate her agonizingly difficult choice to move us away from the military dictatorship to the US. My mom chose to keep us safe and provide opportunities we could only dream of in Argentina. The uprooting was traumatic, but it shaped who I became, and I wouldn't change that. Childhood resentment transformed into gratitude for her courage and protective instinct. As 'Our Journey' says: 'Her only desire is to keep us from harm.' The first chorus apologizes (Mami, Lo Siento) for the resentment, while the second (Mami Te Quiero) expresses gratitude for her unconditional love and sacrifice.",
    lyrics: `I wanna send blessings, many blessings
Blessings to the heavens for you

For the love of the womb
For the love of the tears
For the love in a mother's eyes
Holding her children so near

For the love of the moon
For the love of the night
For the love in a mother's arms
Holding her baby so tight

Mami lo siento, mami lo siento 
Por el dolor de ayer
Mami lo siento, mami lo siento 
Por desaparecer
Mami lo siento, por los abrazos
Que no pude recibir
Mami lo siento, por el amor
Que no te pude pedir

I wanna send blessings, many blessings
Blessings to the heavens for you

For the love of the womb
For the love of the tears
For the love in a mother's eyes
Holding her children so near

For the love of the moon
For the love of the night
For the love in a mother's arms
Holding her baby so tight

Mami te quiero, mami te quiero
Por el amor de ayer
Mami te quiero, mami te quiero
Por no desaparecer
Mami te quiero, por las razones 
Que no podia entender
Mami te quiero, por el corazon
Que no podias esconder

Con tu corazon en la mano
Con tu corazon en la mano`,
    translation: `

 
Mama I'm sorry, mama I'm sorry
For the pain of yesterday
Mama I'm sorry, mama I'm sorry
For disappearing
Mama I'm sorry for all the hugs
That I could not receive
Mama I'm sorry for all the love
I could never give














Mama I love you, mama I love you
For the love of yesterday
Mama I love you, mama I love you
For not disappearing
Mama I love you for all the reasons
That I could not conceive
Mama I love you for the heart
That you could not conceal

With your heart in your hand
With your heart in your hand`,
    hasTranslation: true
  },
  {
    number: 6,
    title: "Many Ways to Love",
    summary: "This song emerged on election night 2016. A group of friends gathered at the Showbox in Seattle, fully expecting to celebrate our first female president. As the results started rolling in, a feeling of collective dread filled the room. My wife and her friends began sobbing. Heartbroken, I looked up in prayer, and the phrase 'there are many ways to love' kept coming up. It was a reminder that we'd need to love one another for all of us to get through this—strangers, neighbors, family, friends, lovers. The lyrics rained down as I stared at the ceiling in disbelief. Spirit gave me this prayer as a roadmap for coming together when everything around us falls apart. It feels even more urgent now—we need these many ways to love more than ever.",
    lyrics: `There are many ways to love
The stranger on the precipice
There are many ways to love
The stranger in your heart

I'm looking for peace on the precipice
Looking for peace on the precipice
Looking for peace on the precipice of love

There are so many ways
So many ways
So many ways to love
 
There are many ways to love
Your neighbor like they're family
There are many ways to love
The neighbor in your heart

I'm looking for peace in your family 
Looking for peace in my family
Looking for peace in our family of love

There are so many ways
So many ways
So many ways to love

There are many ways to love
Your friends just like their medicine
There are many ways to love
The medicine in your heart

There's medicine in your heart
There's medicine in my heart
There's medicine in our hearts tonight 

There are so many ways
So many ways
So many ways to love

There are many ways to love
Your lover like a friend 
There are many ways to love
The lover in your heart

I'm looking for peace in your heart
Looking for peace in my heart
Looking for peace in our hearts tonight

There are so many ways
So many ways
So many ways to love`,
    hasTranslation: false
  },
  {
    number: 7,
    title: "Aya Divina",
    summary: "One night in ceremony just last year, I heard this melody while seeing visions of colorful flowers and children playing, including my daughter, Raina. I was made to understand that the children were the flowers, and vice versa. (Watching Raina play care-free makes me the happiest in life, as it was something I couldn't do myself, growing up in Argentina.) The phrase, 'Ayahuasca Divina,' kept coming to my mind. In Spanish, 'divina' means both divine and beautiful - they're one and the same. The rest of the song wrote itself during a yoga session the next morning. The 'volar volamos' chorus captures the soaring joy after hard work allows us to vulnerably carry our hearts in our hands.",
    lyrics: `Ayahuasca tan divina
Alegria y medicina

Oh oh oh

Con tus flores coloridas
Tan divina y medicina

Oh oh oh

Volar volamos 
Son altos los planos

Volar volar volamos 
Mi amor, te llamo

Con tus ninas divertidas
Alegria y medicina

Oh oh oh

Volar volamos 
Mi amor, te llamo

Volar volar volamos
Corazón en las mano

Ayahuasca tan divina
Alegría y medicina`,
    translation: `Ayahuasca so divine
Joy and medicine

Oh oh oh

With your colorful flowers
So divine and medicine

Oh oh oh

To fly we fly
The planes are so high

To fly, to fly we fly
My love, I'm calling you

With your playful girls
Joy and medicine

Oh oh oh

To fly we fly
My love, I'm calling you

To fly, to fly we fly
With your heart in your hands

Ayahuasca so divine
Joy and medicine`,
    hasTranslation: true
  },
  {
    number: 8,
    title: "Thirsty Rain",
    summary: "During a 2014 ceremony, I became unusually thirsty. Rushing outside to refill my water, I felt gentle rain on my face. I stuck out my tongue and let it slowly quench my thirst. Water never tasted so good—I felt like the universe was answering my prayers. The chorus came to me under the night sky: 'Blessings to the water, grateful every day.' Back then, I wondered if the water desired to quench my thirst as much as I needed it, hence the title, 'Thirsty Rain'. Now it's my daily prayer, with every sip I take.",
    lyrics: `Precious is the water
Forgiving in a way
Along the winding river
Driven by the rain

She wants to get to know you
She's bound to find a way
Through the hills and valleys
Anywhere we pray

Blessings to the water
Grateful every day
We should be so thirsty
Thirsty like the rain
Like the thirsty rain

The crystal blue reflection
Of your eyes on the lake
Shedding tears of sorrow
And laughter in her wake

She flows around your body
A sweet and cool embrace
Cleansing your heart softly
Filling every space 

Blessings to the water
Grateful every day
We should be so thirsty
Thirsty like the rain
Like the thirsty rain
Like the thirsy rain
(I adore you!)

Agua pura, pura vida
Agua pura, pura vida

Agua pura, pura vida
Oh oh oh oh oh oh

Agua pura, pura vida
Agua pura, pura vida

Precious is the water
Forgiving in a way
Along the winding river
Anywhere we pray`,
    hasTranslation: false
  },
  {
    number: 9,
    title: "Jesus Lizard",
    summary: "This song began during a Costa Rica jungle tour with my former band, La Dulce Vida. We'd come for a festival that got cancelled due to food poisoning, so we decided to take a jungle tour instead. Our guide pointed out the Jesus Lizard—so called because it walks on water. I found it amusing that this creature performs 'miracles' daily while humans search for God in the heavens. This song is about being lovers of the majesty all around us instead of lonely seekers who separate the sacred from the material world.",
    lyrics: `The Jesus Lizard
Walks on water
Lonely humans
We climb the ladders

Built from cedar
By our father
We look for miracles
In some other ...

God above
Why do we bother 
When all around us
Is our Mother … 

Earth below us
Water's flowing 
Trees and flowers
Wisdom growing ...

Human nature
There is no other
We ain't lonesome
We be lovers

Human nature
There is no other
We're not lonely
Let's be lovers`,
    hasTranslation: false
  },
  {
    number: 10,
    title: "Mi Canción",
    summary: "The heart of the album. Along my healing path, I came to appreciate singing not as the journey's culmination, but as essential to healing itself. At first a hard-won choice for me, I now understand singing as a medicinal tool and an imperative: 'Como No Voy A Cantar'—how can I NOT sing? The journey and the songs created are worth sharing, no matter how many or how few are listening. Everyone has their own song, their compelling story. Mi canción, tu canción, nuestra canción—this is the collective story and the love we've cultivated together.",
    lyrics: `Soy un hijo de de la tierra
Y me cuesta despertar

Hundido en tanta mierda
Que el corage no lo pierda
Mientras pueda respirar

Asi yo le escribo un verso
Para todo el universo
Como no voy a cantar?
A cantar!

Porque mi cancion es mi pasion
Como tu cancion es tu pasion
Viva la cancion, viva la pasion
Traiga la cancion, traiga la pasion
Nuestra cancion es nuestra pasion
Nuestra cancion, nuestra pasion

Algunas flores no se entierran
Entre piedras creceran

Con la luz del sol eterno
Y el agua del invierno
Ya vamos a despertar

Asi te cuento todo un verso
El misterioso universo
No se puede explicar

Porque mi cancion es mi pasion
Como tu cancion es tu pasion
Viva la cancion, viva la pasion
Traiga la cancion, traiga la pasion
Nuestra cancion es nuestra pasion
Nuestra cancion, nuestra pasion

Soy el hijo de mi madre
Y me cuesta descansar

Tengo un amor interno
En la sangre de mi cuerpo
No lo dejo de apreciar

Con cual escribo este verso
Para todo el universo
Como no voy a cantar?
A cantar!

Porque mi cancion es mi pasion
Como tu cancion es tu pasion
Viva la cancion, viva la pasion
Traiga la cancion, traiga la pasion
Nuestra cancion es nuestra pasion
Nuestra cancion, nuestra pasion

Heya hey hey hey
Heya hey hey hey
Heya yo yo yo
Heya yo yo yo
Yoyo yo yo yo
Yoyo yo yo yo

Mi cancion es mi pasion
Mi cancion es mi pasion`,
    translation: `I am a son of the earth
And I struggle to awaken

Sunk in so much shit
May courage not lose it
As long as I can breathe

So I write a verse
For the entire universe
How can I not sing?
Let's sing!

Because my song is my passion
As your song is your passion
Long live the song, long live the passion
Bring the song, bring the passion
Because our song is our passion
Our song, our passion

Some flowers are not buried
Among stones they will grow

With the light of the eternal sun
And the water of winter
We are going to awaken

I tell you a whole verse
The mysterious universe
Cannot be explained

Because my song is my passion
As your song is your passion
Long live the song, long live the passion
Bring the song, bring the passion
Because our song is our passion
Our song is our passion

I am my mother's son
And I struggle to rest

I have an internal love
In the blood of my body
I don't stop appreciating it

With which I write this verse
For the entire universe
How can I not sing?
Let's sing!

Because my song is my passion
As your song is your passion
Long live the song, long live the passion
Bring the song, bring the passion
Because our song is our passion
Our song is our passion

Heya hey hey hey
Heya hey hey hey
Heya yo yo yo
Heya yo yo yo
Yoyo yo yo yo
Yoyo yo yo yo

My song is my passion
My song is my passion`,
    hasTranslation: true
  },
  {
    number: 11,
    title: "La Poesía",
    summary: "A dreamy lullaby written in a meditative place, pondering life's poetic beauty written in the stars. All our stories of love and pain, joy and heartbreak weave together. May this peaceful ending create space to pause, breathe, and integrate the emotional journey. Life's poetry collects stories of love and pain—one can't exist without the other. May we appreciate both. Even the bittersweet is sweet.",
    lyrics: `La poesía de las estrellas
La claridad de las más bellas
No se escribe sin amor
No se escribe sin dolor

Oh oh oh.. . Sin amor
Oh oh oh… Sin aolor 

Las nubes parten por ti
El gran espacio en que vivís 
Los pensamientos sin razón
Le dan espacio al corazón

Oh oh oh… La poesia de tu amor
Oh oh oh… Acaricia mi dolor

La lluvia cae por mi
Nos da la vida en si
No hace falta un paragua 
Vibra el hueso con el agua

Oh oh oh… Con el agua
Oh oh oh… Con el agua 

Las luz brilla en ti 
Fuego eterno en mi
Iluminando el camino
Qué a cada paso persigo 

Oh oh oh … La poesía de tu amor
Oh oh oh … Acaricia mi dolor`,
    translation: `The poetry of the stars
The clarity of the most beautiful ones
Is not written without love
Is not written without pain

Oh oh oh... Without love
Oh oh oh... Without pain

The clouds part for you
The great space in which you live
Thoughts without reason
Give space to the heart

Oh oh oh... The poetry of your love
Oh oh oh... Caresses my pain

The rain falls for me
Gives us life itself
No need for umbrella
The bone vibrates with the water

Oh oh oh... With the water
Oh oh oh... With the water

The light shines in you
Eternal fire in me
Illuminating the path
That I pursue with each step

Oh oh oh... The poetry of your love
Oh oh oh... Caresses my pain`,
    hasTranslation: true
  }
];

export default function SongbookPage() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [showUnreleasedDialog, setShowUnreleasedDialog] = useState(false);
  const [selectedUnreleasedTrack, setSelectedUnreleasedTrack] = useState<{ title: string; number: number } | null>(null);
  
  // Fetch tracks from API to get audio URLs
  const { data: apiTracks = [] } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });
  
  // Music player context for play/pause functionality
  const { currentTrack, isPlaying, isLoading: playerLoading, toggle } = useMusicPlayer();

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };
  
  // Helper to find API track by track number
  const getApiTrack = (trackNumber: number): Track | undefined => {
    return apiTracks.find(t => t.trackNumber === trackNumber);
  };
  
  // Helper to check if a track is currently playing
  const isTrackPlaying = (trackNumber: number): boolean => {
    const apiTrack = getApiTrack(trackNumber);
    return !!(apiTrack && currentTrack?.id === apiTrack.id && isPlaying);
  };
  
  // Helper to check if a track is loading
  const isTrackLoading = (trackNumber: number): boolean => {
    const apiTrack = getApiTrack(trackNumber);
    return !!(apiTrack && currentTrack?.id === apiTrack.id && playerLoading);
  };
  
  // Handle play/pause button click
  const handleTrackToggle = (trackNumber: number, trackTitle: string) => {
    const apiTrack = getApiTrack(trackNumber);
    
    if (!apiTrack || !apiTrack.isReleased) {
      // Show unreleased dialog for unreleased tracks
      setSelectedUnreleasedTrack({ title: trackTitle, number: trackNumber });
      setShowUnreleasedDialog(true);
    } else if (apiTrack.audioUrl) {
      // Play/pause released tracks with audio
      toggle(apiTrack);
    }
  };

  // Utility to format lyrics with bold highlighting for choruses
  const formatWithHighlights = (text: string, isChorus: (line: string) => boolean, className?: string) => {
    return text.split('\n').map(line => {
      if (isChorus(line)) {
        return className ? `<span class="${className}">${line}</span>` : `<strong>${line}</strong>`;
      }
      return line;
    }).join('\n');
  };

  // Normalize text for robust chorus detection (handles Unicode ellipsis, spaces, etc.)
  const normalizeForMatch = (line: string) => {
    return line.normalize('NFKC').replace(/[\u2026.]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  };

  // Chorus predicates
  const isLaPoesiaChorus = (line: string) => {
    const normalized = normalizeForMatch(line);
    return normalized.startsWith('oh oh oh');
  };

  const isMiCancionChorusEnglish = (line: string) => {
    const normalized = normalizeForMatch(line);
    return normalized.includes('song') && normalized.includes('passion') ||
           normalized.startsWith('long live') ||
           normalized.startsWith('bring the');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <div className="pt-24 pb-0 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-futura font-bold text-slate-800 mb-4" data-testid="songbook-title">
              Mi Canción Songbook
            </h1>
            <p className="text-xl text-muted-foreground font-futura max-w-3xl mx-auto leading-relaxed" data-testid="songbook-subtitle">
              A journey through sound and spirit - the healing path from disconnection to awakening, 
              told through eleven songs of transformation
            </p>
          </div>
        </div>
      </div>

      {/* Album Overview */}
      <div className="max-w-4xl mx-auto px-4 pb-6 -mt-2">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-border">
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            <p className="text-lg leading-relaxed mb-8">
              In many ways, "Mi Canción" (My Song) traces my journey through life, particularly the times I chose to keep creating through pain as part of my healing process. These songs were inspired by my work over the past decade with Mother Earth's timeless medicines, which guided me through dark forests of the soul into the rocky terrain of family reconciliation. Singing became both practice and medicine, leading me through inherited trauma toward forgiveness and gratitude. Of course, the journey has been anything but linear. Continually informed by ongoing relational struggles with others and with myself and my own destructive habits, I'm learning to accept healing as a lifelong journey. Gradually, thanks to the medicine of song, I'm making my way home to embrace that shy, frightened boy on the album cover whose world felt uprooted and uncertain. (That photo was taken in 1981 at my family's first San Francisco apartment after we fled Argentina as political refugees.) Through it all, the question '¿Cómo no voy a cantar?' (How Can I Not Sing?) has guided my path from disconnection to love and wonder. I believe that spirit medicine gifted me with songs to be shared with the world. Mi Canción is an invitation to sing "nuestra canción" (our song) together as prayers for peace, love, connection and unity in a world that sorely needs them. I hope that my journey through spirit and sound inspires and soothes any lonely soul on their path.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              <strong className="text-muted-foreground font-semibold">Credits:</strong> All songs were written and performed by me, <strong className="text-muted-foreground font-semibold">Hernán Ignacio Savastano</strong>, on lead guitar and vocals with <a href="https://norabheath.bandcamp.com/track/sue-a-feat-hernan-savastano" target="_blank" rel="noopener noreferrer" className="hover:underline text-muted-foreground font-semibold">Nora B. Heath</a> adding backup vocals on most songs. The album was recorded, mixed and produced by <a href="https://benthomasonline.bandcamp.com/album/older-than-time-mantrasong-055" target="_blank" rel="noopener noreferrer" className="hover:underline text-muted-foreground font-semibold">Benjamin Jay Thomas</a> (founder of <a href="https://bringforth.org" target="_blank" rel="noopener noreferrer" className="hover:underline text-muted-foreground font-semibold">Bring Forth Music</a>) who also added vocals and all the other instruments (bass, piano, organ, guitar, percussion), sounds and effects on every single track. Thank you Ben for your technical wizardry, intuitive sonic magic and heart sprinkled throughout. This album would not be the same without Ben & Nora. I'm so grateful for your friendship, love, support and patience (!) throughout this creative process. Other song-specific credits and special thanks noted below.
            </p>
          </div>
        </div>

      </div>

      {/* Track Stories */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="space-y-8">
          {trackData.map((track, index) => (
            <div key={track.number} className="bg-white rounded-lg shadow-lg border border-border overflow-hidden" data-testid={`track-${track.number}`}>
              <div className="p-8">
                {/* Track Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-600 text-white rounded-full font-futura font-bold">
                    {track.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-futura font-bold text-slate-800 mb-1" data-testid={`track-title-${track.number}`}>
                      {track.title}
                    </h3>
                  </div>
                  {/* Play/Pause Button - Show for all tracks */}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => handleTrackToggle(track.number, track.title)}
                    className={`h-10 w-10 rounded-full ${
                      !getApiTrack(track.number)?.isReleased 
                        ? 'opacity-50 cursor-not-allowed' 
                        : ''
                    }`}
                    data-testid={`track-play-${track.number}`}
                  >
                    {isTrackLoading(track.number) ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : isTrackPlaying(track.number) ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" />
                    )}
                  </Button>
                </div>

                <Separator className="mb-6" />

                {/* Track Content */}
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-700 leading-relaxed" data-testid={`track-summary-${track.number}`}>
                      {track.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-futura font-bold text-lg text-slate-800 mb-3">Lyrics</h4>
                    <div data-testid={`track-lyrics-${track.number}`}>
                      {track.hasTranslation ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            {track.number === 5 ? (
                              <div 
                                className="font-futura text-slate-700 leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: track.lyrics
                                    .replace(/Mami lo siento, mami lo siento/g, '<strong>Mami lo siento, mami lo siento</strong>')
                                    .replace(/Por el dolor de ayer/g, '<strong>Por el dolor de ayer</strong>')
                                    .replace(/Por desaparecer/g, '<strong>Por desaparecer</strong>')
                                    .replace(/Mami lo siento, por los abrazos/g, '<strong>Mami lo siento, por los abrazos</strong>')
                                    .replace(/Que no pude recibir/g, '<strong>Que no pude recibir</strong>')
                                    .replace(/Mami lo siento, por el amor/g, '<strong>Mami lo siento, por el amor</strong>')
                                    .replace(/Que no te pude pedir/g, '<strong>Que no te pude pedir</strong>')
                                    .replace(/Mami te quiero, mami te quiero/g, '<strong>Mami te quiero, mami te quiero</strong>')
                                    .replace(/Por el amor de ayer/g, '<strong>Por el amor de ayer</strong>')
                                    .replace(/Por no desaparecer/g, '<strong>Por no desaparecer</strong>')
                                    .replace(/Mami te quiero, por las razones/g, '<strong>Mami te quiero, por las razones</strong>')
                                    .replace(/Que no podia entender/g, '<strong>Que no podia entender</strong>')
                                    .replace(/Mami te quiero, por el corazon/g, '<strong>Mami te quiero, por el corazon</strong>')
                                    .replace(/Que no podias esconder/g, '<strong>Que no podias esconder</strong>')
                                }}
                              />
                            ) : track.number === 3 ? (
                              <div 
                                className="font-futura text-slate-700 leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: track.lyrics
                                    .replace(/Oooh… Agua\nOooh… Mi agua \nMi agua sagrada/g, '<strong>Oooh… Agua\nOooh… Mi agua \nMi agua sagrada</strong>')
                                    .replace(/Agua que limpia\nAgua que sana\nAgua Sagrada\nCon agua you rezo/g, '<strong>Agua que limpia\nAgua que sana\nAgua Sagrada\nCon agua you rezo</strong>')
                                    .replace(/Oooh mi agua\nMi agua sagrada\nAgua Sagrada/g, '<strong>Oooh mi agua\nMi agua sagrada\nAgua Sagrada</strong>')
                                }}
                              />
                            ) : track.number === 4 ? (
                              <div 
                                className="font-futura text-slate-700 leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: track.lyrics
                                    .replace(/Gracias, gracias\nPor mi corazon/g, '<strong>Gracias, gracias\nPor mi corazon</strong>')
                                    .replace(/Gracias, gracias\nPor tu corazon/g, '<strong>Gracias, gracias\nPor tu corazon</strong>')
                                    .replace(/Gracias, gracias\nPor nuestro corazon/g, '<strong>Gracias, gracias\nPor nuestro corazon</strong>')
                                }}
                              />
                            ) : track.number === 7 ? (
                              <div 
                                className="font-futura text-slate-700 leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: track.lyrics
                                    .replace(/Volar volamos \nSon altos los planos/g, '<strong>Volar volamos \nSon altos los planos</strong>')
                                    .replace(/Volar volar volamos \nMi amor, te llamo/g, '<strong>Volar volar volamos \nMi amor, te llamo</strong>')
                                    .replace(/Volar volamos \nMi amor, te llamo/g, '<strong>Volar volamos \nMi amor, te llamo</strong>')
                                    .replace(/Volar volar volamos\nCorazón en las mano/g, '<strong>Volar volar volamos\nCorazón en las mano</strong>')
                                }}
                              />
                            ) : track.number === 10 ? (
                              <div 
                                className="font-futura text-slate-700 leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: track.lyrics
                                    .replace(/Porque mi cancion es mi pasion\nComo tu cancion es tu pasion\nViva la cancion, viva la pasion\nTraiga la cancion, traiga la pasion\nNuestra cancion es nuestra pasion\nNuestra cancion, nuestra pasion/g, '<strong>Porque mi cancion es mi pasion\nComo tu cancion es tu pasion\nViva la cancion, viva la pasion\nTraiga la cancion, traiga la pasion\nNuestra cancion es nuestra pasion\nNuestra cancion, nuestra pasion</strong>')
                                    .replace(/Mi cancion es mi pasion\nMi cancion es mi pasion/g, '<strong>Mi cancion es mi pasion\nMi cancion es mi pasion</strong>')
                                }}
                              />
                            ) : track.number === 11 ? (
                              <div 
                                className="font-futura text-slate-700 leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: formatWithHighlights(track.lyrics, isLaPoesiaChorus)
                                }}
                              />
                            ) : (
                              <pre className="whitespace-pre-wrap font-futura text-slate-700 leading-relaxed">
                                {track.lyrics}
                              </pre>
                            )}
                          </div>
                          <div className="relative">
                            {track.number === 5 ? (
                              <div>
                                {/* First Photo */}
                                <div className="flex justify-start mb-6">
                                  <img 
                                    src="/attached_assets/Wedding Mom_1759050848897.png" 
                                    alt="Hernán with his mother at a beach celebration"
                                    className="rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow object-cover"
                                    style={{ width: '17.6rem', height: '17.6rem' }}
                                    data-testid="mami-te-quiero-photo-1"
                                    onClick={() => openLightbox('/attached_assets/Wedding Mom_1759050848897.png', 'Hernán with his mother at a beach celebration')}
                                  />
                                </div>
                                
                                {/* First Translation - Aligned with "Mami Lo Siento" (line 280-287) */}
                                <div className="font-futura text-muted-foreground leading-relaxed" style={{ marginTop: '2.5lh' }}>
                                  <div className="font-bold">Mama I'm sorry, mama I'm sorry</div>
                                  <div className="font-bold">For the pain of yesterday</div>
                                  <div className="font-bold">Mama I'm sorry, mama I'm sorry</div>
                                  <div className="font-bold">For going away</div>
                                  <div className="font-bold">Mama I'm sorry for all the hugs</div>
                                  <div className="font-bold">That I could not receive</div>
                                  <div className="font-bold">Mama I'm sorry for all the love</div>
                                  <div className="font-bold">I could never give</div>
                                </div>
                                
                                {/* Second Photo - Centered between translations */}
                                <div className="flex justify-start" style={{ marginTop: '1lh', marginBottom: '2lh' }}>
                                  <img 
                                    src="/attached_assets/IMG_5248_1759053237023.jpeg" 
                                    alt="Second photo for Mami, Te Quiero"
                                    className="rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow object-cover"
                                    style={{ width: '17.6rem', height: '17.6rem' }}
                                    data-testid="mami-te-quiero-photo-2"
                                    onClick={() => openLightbox('/attached_assets/IMG_5248_1759053237023.jpeg', 'Second photo for Mami, Te Quiero')}
                                  />
                                </div>
                                
                                {/* Second Translation - Aligned with "Mami Te Quiero" (line 302-309) */}
                                <div className="font-futura text-muted-foreground leading-relaxed" style={{ marginTop: '0lh' }}>
                                  <div className="font-bold">Mama I love you, mama I love you</div>
                                  <div className="font-bold">For the love of yesterday</div>
                                  <div className="font-bold">Mama I love you, mama I love you</div>
                                  <div className="font-bold">For not going away</div>
                                  <div className="font-bold">Mama I love you for all the reasons</div>
                                  <div className="font-bold">That I could not conceive</div>
                                  <div className="font-bold">Mama I love you for the heart</div>
                                  <div className="font-bold">That you could not conceal</div>
                                  <div>&nbsp;</div>
                                  <div>With your heart in your hand</div>
                                  <div>With your heart in your hand</div>
                                </div>
                              </div>
                            ) : track.number === 3 ? (
                              <div 
                                className="font-futura text-muted-foreground leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: (track.translation || '')
                                    .replace(/Water that cleanses\nWater that heals\nSacred water\nWith water I pray/g, '<strong>Water that cleanses\nWater that heals\nSacred water\nWith water I pray</strong>')
                                    .replace(/Oooh\.\.\. My water\nOooh\.\.\. My sacred water/g, '<strong>Oooh... My water\nOooh... My sacred water</strong>')
                                }}
                              />
                            ) : track.number === 4 ? (
                              <div 
                                className="font-futura text-muted-foreground leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: (track.translation || '')
                                    .replace(/Thank you, thank you\nFor my heart/g, '<strong>Thank you, thank you\nFor my heart</strong>')
                                    .replace(/Thank you, thank you\nFor your heart/g, '<strong>Thank you, thank you\nFor your heart</strong>')
                                    .replace(/Thank you, thank you\nFor our heart/g, '<strong>Thank you, thank you\nFor our heart</strong>')
                                }}
                              />
                            ) : track.number === 7 ? (
                              <div 
                                className="font-futura text-muted-foreground leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: (track.translation || '')
                                    .replace(/To fly we fly\nThe planes are so high/g, '<strong>To fly we fly\nThe planes are so high</strong>')
                                    .replace(/To fly, to fly we fly\nMy love, I'm calling you/g, '<strong>To fly, to fly we fly\nMy love, I\'m calling you</strong>')
                                    .replace(/To fly we fly\nMy love, I'm calling you/g, '<strong>To fly we fly\nMy love, I\'m calling you</strong>')
                                    .replace(/To fly, to fly we fly\nWith your heart in your hands/g, '<strong>To fly, to fly we fly\nWith your heart in your hands</strong>')
                                }}
                              />
                            ) : track.number === 10 ? (
                              <div 
                                className="font-futura text-muted-foreground leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: formatWithHighlights(track.translation || '', isMiCancionChorusEnglish, 'font-bold text-muted-foreground')
                                }}
                              />
                            ) : track.number === 11 ? (
                              <div 
                                className="font-futura text-muted-foreground leading-relaxed"
                                style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{
                                  __html: formatWithHighlights(track.translation || '', isLaPoesiaChorus, 'font-bold text-muted-foreground')
                                }}
                              />
                            ) : (
                              <div className="space-y-4">
                                <pre className="whitespace-pre-wrap font-futura text-muted-foreground leading-relaxed">
                                  {track.translation || '[Translation to be added]'}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (track.number >= 1 && track.number <= 4) || (track.number >= 6 && track.number <= 7) || (track.number >= 10) ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="whitespace-pre-wrap font-futura text-slate-700 leading-relaxed" 
                                 dangerouslySetInnerHTML={{ 
                                   __html: track.number === 1 ? track.lyrics
                                     .replace(/Her only desire is\nTo keep us from harm\nWe're just dreams that\nOur mother holds in her arms/g, '<strong>Her only desire is\nTo keep us from harm\nWe\'re just dreams that\nOur mother holds in her arms</strong>')
                                     .replace(/Because her only desire is\nTo keep us from harm\nWe're just dreams that\nOur mother holds in her arms/g, '<strong>Because her only desire is\nTo keep us from harm\nWe\'re just dreams that\nOur mother holds in her arms</strong>')
                                     .replace(/So may we listen to her\nAnd do no more harm\nWe're just dreams that\nOur mother holds in her arms/g, '<strong>So may we listen to her\nAnd do no more harm\nWe\'re just dreams that\nOur mother holds in her arms</strong>')
                                   : track.number === 2 ? track.lyrics
                                     .replace(/Here we are on earth\nRemembering our\nDreams we have on earth/g, '<strong>Here we are on earth\nRemembering our\nDreams we have on earth</strong>')
                                     .replace(/The river washes them away\nWelcoming another day…/g, '<strong>The river washes them away\nWelcoming another day…</strong>')
                                     .replace(/Here we are on earth\nRemembering our dreams\nWe have on earth(?=\s)/g, '<strong>Here we are on earth\nRemembering our dreams\nWe have on earth</strong>')
                                     .replace(/Here we are on earth\nRemembering our dreams\nWe have on earth\n\nHere we are on earth\nRemembering our dreams\nWe have on earth\n\nHere we are on earth \nTo appreciate the majesty/g, '<strong>Here we are on earth\nRemembering our dreams\nWe have on earth\n\nHere we are on earth\nRemembering our dreams\nWe have on earth\n\nHere we are on earth \nTo appreciate the majesty</strong>')
                                   : track.number === 3 ? track.lyrics
                                     .replace(/Agua que limpia\nAgua que sana\nAgua Sagrada\nCon agua yo rezo/g, '<strong>Agua que limpia\nAgua que sana\nAgua Sagrada\nCon agua yo rezo</strong>')
                                     .replace(/Oooh… Mi agua\nOooh… Mi agua sagrada/g, '<strong>Oooh… Mi agua\nOooh… Mi agua sagrada</strong>')
                                   : track.number === 4 ? track.lyrics
                                     .replace(/Gracias, gracias\nPor mi corazon/g, '<strong>Gracias, gracias\nPor mi corazon</strong>')
                                     .replace(/Gracias, gracias\nPor tu corazon/g, '<strong>Gracias, gracias\nPor tu corazon</strong>')
                                     .replace(/Gracias, gracias\nPor nuestro corazon/g, '<strong>Gracias, gracias\nPor nuestro corazon</strong>')
                                   : track.number === 6 ? track.lyrics
                                     .replace(/There are so many ways\nSo many ways\nSo many ways to love/g, '<strong>There are so many ways\nSo many ways\nSo many ways to love</strong>')
                                   : track.number === 7 ? track.lyrics
                                     .replace(/Volar volamos \nSon altos los planos/g, '<strong>Volar volamos \nSon altos los planos</strong>')
                                     .replace(/Volar volar volamos \nMi amor, te llamo/g, '<strong>Volar volar volamos \nMi amor, te llamo</strong>')
                                     .replace(/Volar volamos \nMi amor, te llamo/g, '<strong>Volar volamos \nMi amor, te llamo</strong>')
                                     .replace(/Volar volar volamos\nCorazón en las mano/g, '<strong>Volar volar volamos\nCorazón en las mano</strong>')
                                   : track.number === 8 ? track.lyrics
                                     .replace(/Blessings to the water\nGrateful every day\nWe should be so thirsty\nThirsty like the rain\nLike the thirsty rain/g, '<strong>Blessings to the water\nGrateful every day\nWe should be so thirsty\nThirsty like the rain\nLike the thirsty rain</strong>')
                                     .replace(/Blessings to the water\nGrateful every day\nWe should be so thirsty\nThirsty like the rain\nLike the thirsty rain\nLike the thirsy rain\n\(I adore you!\)/g, '<strong>Blessings to the water\nGrateful every day\nWe should be so thirsty\nThirsty like the rain\nLike the thirsty rain\nLike the thirsy rain\n(I adore you!)</strong>')
                                   : track.number === 9 ? track.lyrics
                                     .replace(/Volar volamos \nSon altos los planos/g, '<strong>Volar volamos \nSon altos los planos</strong>')
                                     .replace(/Human nature\nThere is no other\nWe're ain't lonely\nLet's be lovers/g, '<strong>Human nature\nThere is no other\nWe\'re ain\'t lonely\nLet\'s be lovers</strong>')
                                   : track.number === 10 ? track.lyrics
                                     .replace(/Porque mi cancion es mi pasion\nComo tu cancion es tu pasion\nViva la cancion, viva la pasion\nTraiga la cancion, traiga la pasion\nPorque nuestra cancion es nuestra pasion\nNuestra cancion, nuestra pasion/g, '<strong>Porque mi cancion es mi pasion\nComo tu cancion es tu pasion\nViva la cancion, viva la pasion\nTraiga la cancion, traiga la pasion\nPorque nuestra cancion es nuestra pasion\nNuestra cancion, nuestra pasion</strong>')
                                     .replace(/Porque mi cancion es mi pasion\nComo tu cancion es tu pasion\nViva la cancion, viva la pasion\nTraiga la cancion, traiga la pasion\nPorque Nuestra cancion es nuestra pasion\nNuestra cancion es nuestra pasion/g, '<strong>Porque mi cancion es mi pasion\nComo tu cancion es tu pasion\nViva la cancion, viva la pasion\nTraiga la cancion, traiga la pasion\nPorque Nuestra cancion es nuestra pasion\nNuestra cancion es nuestra pasion</strong>')
                                     .replace(/Mi cancion es mi pasion\nMi cancion es mi pasion/g, '<strong>Mi cancion es mi pasion\nMi cancion es mi pasion</strong>')
                                   : track.number === 11 ? formatWithHighlights(track.lyrics, isLaPoesiaChorus)
                                   : track.lyrics
                                 }} />
                          </div>
                          <div className="space-y-4">
                            {track.number === 1 ? (
                              <>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/Mom & Hernan Apr 71 copy_1757487913263.jpg" 
                                    alt="Hernán as a baby being held by his mother in April 1971"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="our-journey-photo-1"
                                    onClick={() => openLightbox('/attached_assets/Mom & Hernan Apr 71 copy_1757487913263.jpg', 'Hernán as a baby being held by his mother in April 1971')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/Mom 2_1757488699144.png" 
                                    alt="Young Hernán with his mother's loving hands on his shoulders"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="our-journey-photo-2"
                                    onClick={() => openLightbox('/attached_assets/Mom 2_1757488699144.png', 'Young Hernán with his mother\'s loving hands on his shoulders')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/IMG_2671_1757488786585.jpeg" 
                                    alt="Angela holding newborn Raina shortly after birth"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="our-journey-photo-3"
                                    onClick={() => openLightbox('/attached_assets/IMG_2671_1757488786585.jpeg', 'Angela holding newborn Raina shortly after birth')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/IMG_3671_1759178552021.JPG" 
                                    alt="Hernán with his family in the park - current chapter of the journey"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="our-journey-photo-4"
                                    onClick={() => openLightbox('/attached_assets/IMG_3671_1759178552021.JPG', 'Hernán with his family in the park - current chapter of the journey')}
                                  />
                                </div>
                              </>
                            ) : track.number === 2 ? (
                              <>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/smoking abu_1757490671448.png" 
                                    alt="Young Hernán at the coffee table, June 1974"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '17.64rem' }}
                                    data-testid="stress-machinery-photo-1"
                                    onClick={() => openLightbox('/attached_assets/smoking abu_1757490671448.png', 'Young Hernán at the coffee table, June 1974')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/H Kindergarten Oct 76 copy_1757490912386.jpg" 
                                    alt="Hernán in kindergarten, October 1976"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '17.64rem' }}
                                    data-testid="stress-machinery-photo-2"
                                    onClick={() => openLightbox('/attached_assets/H Kindergarten Oct 76 copy_1757490912386.jpg', 'Hernán in kindergarten, October 1976')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/magic NY_1757490533355.png" 
                                    alt="Street magician performing on 5th Avenue, New York, February 1979"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '17.64rem' }}
                                    data-testid="stress-machinery-photo-3"
                                    onClick={() => openLightbox('/attached_assets/magic NY_1757490533355.png', 'Street magician performing on 5th Avenue, New York, February 1979')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/Wash School_1759178918736.jpg" 
                                    alt="School assembly with children sitting cross-legged listening to a presentation"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '17.64rem' }}
                                    data-testid="stress-machinery-photo-4"
                                    onClick={() => openLightbox('/attached_assets/Wash School_1759178918736.jpg', 'School assembly with children sitting cross-legged listening to a presentation')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/soccer photo_1757491364017.png" 
                                    alt="Young Hernán playing soccer in red uniform"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '17.64rem' }}
                                    data-testid="stress-machinery-photo-5"
                                    onClick={() => openLightbox('/attached_assets/soccer photo_1757491364017.png', 'Young Hernán playing soccer in red uniform')}
                                  />
                                </div>
                              </>
                            ) : track.number === 6 ? (
                              <>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/BirthdayMiami78_1759142574252.jpg" 
                                    alt="Family birthday celebration in Miami, September 1978"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="many-ways-love-photo-1"
                                    onClick={() => openLightbox('/attached_assets/BirthdayMiami78_1759142574252.jpg', 'Family birthday celebration in Miami, September 1978')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/HG in car copy_1757494235640.jpg" 
                                    alt="Hernán with his sister in the car - showing sibling love"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="many-ways-love-photo-2"
                                    onClick={() => openLightbox('/attached_assets/HG in car copy_1757494235640.jpg', 'Hernán with his sister in the car - showing sibling love')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/friends_1757493624992.png" 
                                    alt="Mountain hiking with friends - showing friendship love"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="many-ways-love-photo-3"
                                    onClick={() => openLightbox('/attached_assets/friends_1757493624992.png', 'Mountain hiking with friends - showing friendship love')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/family_1757492262761.png" 
                                    alt="Family gathering at outdoor event - showing family love"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="many-ways-love-photo-4"
                                    onClick={() => openLightbox('/attached_assets/family_1757492262761.png', 'Family gathering at outdoor event - showing family love')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/friendsgiving_1757535270441.png" 
                                    alt="Friendsgiving dinner celebration - showing community love"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="many-ways-love-photo-5"
                                    onClick={() => openLightbox('/attached_assets/friendsgiving_1757535270441.png', 'Friendsgiving dinner celebration - showing community love')}
                                  />
                                </div>
                                <div className="flex justify-start">
                                  <img 
                                    src="/attached_assets/Hernangela Love_1761108628978.jpg" 
                                    alt="Tender moment with Angela embracing - showing romantic love"
                                    className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    style={{ width: '16.8rem' }}
                                    data-testid="many-ways-love-photo-6"
                                    onClick={() => openLightbox('/attached_assets/Hernangela Love_1761108628978.jpg', 'Tender moment with Angela embracing - showing romantic love')}
                                  />
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      ) : track.number === 2 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <pre className="whitespace-pre-wrap font-futura text-slate-700 leading-relaxed">
                              {track.lyrics}
                            </pre>
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/smoking abu_1757490671448.png" 
                                alt="Young Hernán at the coffee table, June 1974"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="stress-machinery-photo-1"
                                onClick={() => openLightbox('/attached_assets/smoking abu_1757490671448.png', 'Young Hernán at the coffee table, June 1974')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/H Kindergarten Oct 76 copy_1757490912386.jpg" 
                                alt="Hernán in kindergarten, October 1976"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="stress-machinery-photo-2"
                                onClick={() => openLightbox('/attached_assets/H Kindergarten Oct 76 copy_1757490912386.jpg', 'Hernán in kindergarten, October 1976')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/soccer photo_1757491364017.png" 
                                alt="Young Hernán playing soccer in red uniform"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="stress-machinery-photo-3"
                                onClick={() => openLightbox('/attached_assets/soccer photo_1757491364017.png', 'Young Hernán playing soccer in red uniform')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/magic NY_1757490533355.png" 
                                alt="Street magician performing on 5th Avenue, New York, February 1979"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="stress-machinery-photo-4"
                                onClick={() => openLightbox('/attached_assets/magic NY_1757490533355.png', 'Street magician performing on 5th Avenue, New York, February 1979')}
                              />
                            </div>
                          </div>
                        </div>
                      ) : track.number === 5 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <pre className="whitespace-pre-wrap font-futura text-slate-700 leading-relaxed">
                              {track.lyrics}
                            </pre>
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-start mb-4">
                              <img 
                                src="/attached_assets/Wedding Mom_1759050848897.png" 
                                alt="Hernán with his mother at a beach celebration"
                                className="rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow object-cover"
                                style={{ width: '17.6rem', height: '17.6rem' }}
                                data-testid="mami-te-quiero-photo-1"
                                onClick={() => openLightbox('/attached_assets/Wedding Mom_1759050848897.png', 'Hernán with his mother at a beach celebration')}
                              />
                            </div>
                            <pre className="whitespace-pre-wrap font-futura text-muted-foreground leading-relaxed">
                              {track.translation || '[Translation to be added]'}
                            </pre>
                          </div>
                        </div>
                      ) : track.number === 6 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <pre className="whitespace-pre-wrap font-futura text-slate-700 leading-relaxed">
                              {track.lyrics}
                            </pre>
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/family_1757492262761.png" 
                                alt="Family gathering at outdoor event - showing family love"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="many-ways-love-photo-1"
                                onClick={() => openLightbox('/attached_assets/family_1757492262761.png', 'Family gathering at outdoor event - showing family love')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/friends_1757493624992.png" 
                                alt="Mountain hiking with friends - showing friendship love"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="many-ways-love-photo-2"
                                onClick={() => openLightbox('/attached_assets/friends_1757493624992.png', 'Mountain hiking with friends - showing friendship love')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/friendsgiving_1757535270441.png" 
                                alt="Friendsgiving dinner celebration - showing community love"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="many-ways-love-photo-3"
                                onClick={() => openLightbox('/attached_assets/friendsgiving_1757535270441.png', 'Friendsgiving dinner celebration - showing community love')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/HG in car copy_1757494235640.jpg" 
                                alt="Tender intimate moment - showing romantic love"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="many-ways-love-photo-4"
                                onClick={() => openLightbox('/attached_assets/HG in car copy_1757494235640.jpg', 'Tender intimate moment - showing romantic love')}
                              />
                            </div>
                          </div>
                        </div>
                      ) : track.number === 8 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="whitespace-pre-wrap font-futura text-slate-700 leading-relaxed"
                                 dangerouslySetInnerHTML={{
                                   __html: track.lyrics
                                     .replace(/Blessings to the water\nGrateful every day\nWe should be so thirsty\nThirsty like the rain\nLike the thirsty rain/g, '<strong>Blessings to the water\nGrateful every day\nWe should be so thirsty\nThirsty like the rain\nLike the thirsty rain</strong>')
                                     .replace(/Blessings to the water\nGrateful every day\nWe should be so thirsty\nThirsty like the rain\nLike the thirsty rain\nLike the thirsy rain\n\(I adore you!\)/g, '<strong>Blessings to the water\nGrateful every day\nWe should be so thirsty\nThirsty like the rain\nLike the thirsty rain\nLike the thirsy rain\n(I adore you!)</strong>')
                                 }} />
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_4388_1759187096989.jpeg" 
                                alt="Water scene"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="thirsty-rain-photo-1"
                                onClick={() => openLightbox('/attached_assets/IMG_4388_1759187096989.jpeg', 'Water scene')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_1273_1759187097000.jpeg" 
                                alt="Water landscape"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="thirsty-rain-photo-2"
                                onClick={() => openLightbox('/attached_assets/IMG_1273_1759187097000.jpeg', 'Water landscape')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_0554_1759187097001.JPG" 
                                alt="Celebrating at the waterfall with arms raised"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="thirsty-rain-photo-3"
                                onClick={() => openLightbox('/attached_assets/IMG_0554_1759187097001.JPG', 'Celebrating at the waterfall with arms raised')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_4245_1759187097001.jpeg" 
                                alt="Water source"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="thirsty-rain-photo-4"
                                onClick={() => openLightbox('/attached_assets/IMG_4245_1759187097001.jpeg', 'Water source')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_6323_1759187097002.JPG" 
                                alt="Rainbow over the landscape after rain"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="thirsty-rain-photo-5"
                                onClick={() => openLightbox('/attached_assets/IMG_6323_1759187097002.JPG', 'Rainbow over the landscape after rain')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_0077_1759187097002.jpeg" 
                                alt="Water flowing"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="thirsty-rain-photo-6"
                                onClick={() => openLightbox('/attached_assets/IMG_0077_1759187097002.jpeg', 'Water flowing')}
                              />
                            </div>
                          </div>
                        </div>
                      ) : track.number === 9 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="whitespace-pre-wrap font-futura text-slate-700 leading-relaxed"
                                 dangerouslySetInnerHTML={{
                                   __html: (track.lyrics + '\n\n' + track.lyrics)
                                     .replace(/Human nature\nThere is no other\nWe ain't lonesome\nWe be lovers/g, '<strong>Human nature\nThere is no other\nWe ain\'t lonesome\nWe be lovers</strong>')
                                     .replace(/Human nature\nThere is no other\nWe're not lonely\nLet's be lovers/g, '<strong>Human nature\nThere is no other\nWe\'re not lonely\nLet\'s be lovers</strong>')
                                 }} />
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_2160_1759136639562.jpeg" 
                                alt="Costa Rica jungle tour - Jesus Lizard encounter"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="jesus-lizard-photo-1"
                                onClick={() => openLightbox('/attached_assets/IMG_2160_1759136639562.jpeg', 'Costa Rica jungle tour - Jesus Lizard encounter')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_2044_1759136639562.jpeg" 
                                alt="Osa Peninsula jungle expedition"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="jesus-lizard-photo-2"
                                onClick={() => openLightbox('/attached_assets/IMG_2044_1759136639562.jpeg', 'Osa Peninsula jungle expedition')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/parrot_1759137616651.jpeg" 
                                alt="Colorful parrot in Costa Rica rainforest"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="jesus-lizard-photo-3"
                                onClick={() => openLightbox('/attached_assets/parrot_1759137616651.jpeg', 'Colorful parrot in Costa Rica rainforest')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_2183_1759136639563.jpeg" 
                                alt="Jungle canopy and wildlife observation"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="jesus-lizard-photo-4"
                                onClick={() => openLightbox('/attached_assets/IMG_2183_1759136639563.jpeg', 'Jungle canopy and wildlife observation')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/flower_1759138014115.jpeg" 
                                alt="Beautiful tropical flower in Costa Rica jungle"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="jesus-lizard-photo-5"
                                onClick={() => openLightbox('/attached_assets/flower_1759138014115.jpeg', 'Beautiful tropical flower in Costa Rica jungle')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_2063_1759136639563.jpeg" 
                                alt="Rainforest adventure and Jesus Lizard discovery"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="jesus-lizard-photo-6"
                                onClick={() => openLightbox('/attached_assets/IMG_2063_1759136639563.jpeg', 'Rainforest adventure and Jesus Lizard discovery')}
                              />
                            </div>
                            <div className="flex justify-start">
                              <img 
                                src="/attached_assets/IMG_2077_1759138342870.jpeg" 
                                alt="Final moments of Costa Rica jungle expedition"
                                className="h-auto object-contain rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                style={{ width: '16.8rem' }}
                                data-testid="jesus-lizard-photo-7"
                                onClick={() => openLightbox('/attached_assets/IMG_2077_1759138342870.jpeg', 'Final moments of Costa Rica jungle expedition')}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <pre className="whitespace-pre-wrap font-futura text-slate-700 leading-relaxed">
                          {track.lyrics}
                        </pre>
                      )}
                    </div>
                  </div>

                  {/* Song-specific Chords and Credits */}
                  {(() => {
                    const chords: Record<number, string> = {
                      1: "Verse (C, Em7, Am7, Em7), Chorus (G, Am, C, G)",
                      2: "(Capo 2):  Verse (C, Fmaj7), Minor Chorus (Am, Em, F, Fm), Major Chorus (C, G, F, Fm), Outro (Am, Em)",
                      3: "D, D/E, D/B, D/E ... D, D/B, D/E, A",
                      4: "C, Dm, C, Fmaj7",
                      5: "(Capo 4): Verse (Cadd9, F6?), Chorus (Dm, G7, C, F)",
                      6: "C, Em, Am7, Fmaj7",
                      7: "(Capo 4): Verse (Am, C, Fmaj7, C), Pre-Chorus (Fmaj7, C, Fmaj7, C, Fmaj7), Chorus (C-F)",
                      8: "(Capo 2): Cadd9, F6 (?)",
                      9: "Dsus2, Am7, G, Em",
                      10: "Verse (E, A, F#m, E, E, A, F#m, A, B, E), Chorus (E, A, G#m, F#m, E)",
                      11: "(Capo 2): Verse (Em7, Am7), Chorus (G, Am7)"
                    };
                    
                    const credits: Record<number, string> = {
                      1: "Jonathan Sizemore (vox & percussion) along with Nora (vox) and Ben (production, vox and all other sounds)",
                      2: "Jonathan Sizemore (vox & percussion) along with Nora (vox) and Ben (production, vox and all other sounds)",
                      3: "Jonathan Sizemore (vox & percussion) along with Nora (vox) and Ben (production, vox and all other sounds)",
                      4: "Drew Youngspring & Bridget Welch (vox), Ben (production and all other sounds), Erik Blender for recording the original guitar and vocal tracks back 2023.",
                      5: "Nora (vox) and Ben (production and all other sounds)",
                      6: "Drew Youngspring & Bridget Welch (vox), Nora (vox) and Ben (production, vox and all other sounds)",
                      7: "Nora (vox) and Ben (production and all other sounds)",
                      8: "Nora (vox) and Ben (production and all other sounds)",
                      9: "Nora (vox) and Ben (production and all other sounds)",
                      10: "Nora (vox) and Ben (production, vox and all other sounds)",
                      11: "Nora (vox) and Ben (production, vox and all other sounds)"
                    };
                    
                    const specialThanks: Record<number, string> = {
                      1: "Jila Ji for suggesting the lyric \"prosper\" instead of \"profit\" in the last verse to honor the spirit of the song",
                      2: "Elyse Raupp-Gardner, for co-crafting the choruses at an Imagine festival back around 2018.",
                      3: "Elyse Raupp Gardner for improvising and encouraging the more energetic back half of the song.",
                      4: "Jila Ji for inspiring the song with a friendly gesture at Beloved 2019.",
                      5: "Ben for the brilliant piano and flute parts after my vague last minute complaint: 'it just needs something.'",
                      8: "Erik Blender for suggesting the \"Agua Pura, Pura Vida\" outro and taking the song to another level."
                    };
                    
                    const trackChords = chords[track.number];
                    const trackCredits = credits[track.number];
                    const trackSpecialThanks = specialThanks[track.number];
                    
                    if (trackChords || trackCredits || trackSpecialThanks) {
                      return (
                        <div className="mt-6 pt-4 border-t border-slate-200">
                          {trackChords && (
                            <p className="text-sm leading-relaxed text-muted-foreground italic" data-testid={`track-chords-${track.number}`}>
                              <strong>Chords</strong>{trackChords.startsWith("(Capo") ? ` ${trackChords}` : `: ${trackChords}`}
                            </p>
                          )}
                          {trackCredits && (
                            <p className="text-sm leading-relaxed text-muted-foreground italic" data-testid={`track-credits-${track.number}`}>
                              <strong>Credits:</strong> {trackCredits}
                            </p>
                          )}
                          {trackSpecialThanks && (
                            <p className="text-sm leading-relaxed text-muted-foreground italic" data-testid={`track-special-thanks-${track.number}`}>
                              <strong>Special Thanks:</strong> {trackSpecialThanks}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
              
              {/* Track Number Indicator */}
              {index < trackData.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Closing Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg p-8">
            <h3 className="text-2xl font-futura font-bold mb-4" data-testid="songbook-conclusion-title">
              The Journey Continues
            </h3>
            <div className="text-lg leading-relaxed max-w-4xl mx-auto font-futura space-y-4">
              <p>
                Looking back, I see how these songs trace my path from disconnection toward something like wholeness, though I'm still walking that road. The album starts with calling in Mother Earth's protection, moves through the work with plant medicines, touches on the hard stuff with family, and somewhere along the way I found my voice again. None of it was linear. None of it was easy.
              </p>
              <p>
                Each song marked a moment in my healing - from the earth connection of "Our Journey" through the ceremony of "Thirsty Rain" to finally claiming "Mi Canción" as my own. But I didn't wait to be "healed enough" before making this album. The truth is, the creating itself became part of the healing. Maybe the biggest part.
              </p>
              <p>
                This album is about remembering - our connection to the earth, to our ancestors, to our creative voice, to the sacred hiding in plain sight. It's my story, but I hope there's something in it for you too. We don't need to have it all figured out to share our medicine. Sometimes our wounds, honestly expressed, are exactly what someone else needs to hear.
              </p>
            </div>
          </div>
        </div>

        {/* Gratitude */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-border mt-12">
          <div className="prose prose-lg max-w-none leading-relaxed">
            <h3 className="text-2xl font-futura font-bold text-slate-800 mb-6" data-testid="gratitude-title">
              Gratitude
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              I've been blessed with so many musical friends who inspired, guided and supported me on this creative journey over the past decade. First, very special thanks to some of my dearest friends <strong className="text-muted-foreground">Drew Younspring</strong> and <strong className="text-muted-foreground">Bridget Welch</strong> for sharing this path with me and holding the space in which many of these songs unfurled and evolved in a sacred container. Your spirit is present in so many of these songs. I love you!  Special thanks also to my first medicine teachers <strong className="text-muted-foreground">Alex Turtle</strong> and <strong className="text-muted-foreground">Chenoa Egawa</strong>, the native North American couple who introduced me to this healing work. Many thanks also to my dear friends <strong className="text-muted-foreground">Erik Blender</strong> & <strong className="text-muted-foreground">Ashley Collins</strong> for the sacred spaces in which many of these songs were shared for the first time, but especially for your friendship and the tough conversations I needed when I lost my way with substances. So much love and gratitude in this regard also to my former <strong className="text-muted-foreground">La Dulce Vida</strong> bandmates <strong className="text-muted-foreground">Nicholas Coniaris</strong>, <strong className="text-muted-foreground">David Watson</strong> and <strong className="text-muted-foreground">Elyse Raupp Gardener</strong> for sharing the stage with me for a few years there and helping these songs come to life. <strong className="text-muted-foreground">Jila Ji</strong>, thank you for your friendship even when it was hard and all the beautiful songs we shared together. Huge shout out to <strong className="text-muted-foreground">Darin Leong</strong> for producing some amazing PNW community gatherings in Blooming Heart and Imagine over the years and giving me a break by allowing me to perform at many of these festivals. Finally, thanks to <strong className="text-muted-foreground">Mas Higasa</strong> and <strong className="text-muted-foreground">Pepper Proud</strong> of <strong className="text-muted-foreground">Yaima</strong> for encouraging me to record these songs many years ago. Sorry it took so long! Thank you for the musical inspiration, vocal coaching (Pepper), opening slots, guidance and friendship over the years, along with <strong className="text-muted-foreground">Rafe Perlman</strong>, <strong className="text-muted-foreground">Andy Fischer-Price</strong>, <strong className="text-muted-foreground">Rebecca Elatiki</strong>, <strong className="text-muted-foreground">Peter Barley</strong>, <strong className="text-muted-foreground">Satori Ki</strong> and too many others to list here.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground mt-4">
              Finally, "Gracias Totales" (infinite gratitude) to my wife <strong className="text-muted-foreground">Angela Lynn Sucich</strong> for the invaluable lyrical feedback from a PhD in English literature and amazing poet in her own right. Thank you for sharing this path with me through really hard times- the traumas, addictions, fights, etc - to reveal the beauty of life that awaits on the other side of our loneliness. Most of all, thank you for our precious daughter, and not giving up on our dream to bring <strong className="text-muted-foreground">Raina Angeline Savastano</strong> into this world even when it seemed hopeless. She's the greatest gift spirit could have ever given us. I dedicate this album to both of you.
            </p>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" size="lg" className="font-futura" data-testid="return-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Main Site
            </Button>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!lightboxImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-transparent border-none">
          {lightboxImage && (
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.alt}
              className="max-w-full max-h-[95vh] object-contain rounded-lg"
              data-testid="lightbox-image"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Unreleased Track Dialog */}
      <UnreleasedTrackDialog 
        open={showUnreleasedDialog} 
        onOpenChange={setShowUnreleasedDialog}
        trackTitle={selectedUnreleasedTrack?.title}
      />
    </div>
  );
}