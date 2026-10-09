export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  console.log('🎯 Attempting to track event:', eventName, eventParams);
  
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('✅ gtag is available, sending event to Google Analytics');
    window.gtag('event', eventName, eventParams);
  } else {
    console.warn('❌ Google Analytics not available. window.gtag:', typeof window !== 'undefined' ? window.gtag : 'window undefined');
  }
};

export const trackSongPlay = (track: {
  id: string;
  title: string;
  trackNumber: number;
  duration: string;
  albumType: string | null;
}) => {
  trackEvent('song_play', {
    event_category: 'Music Player',
    event_label: track.title,
    song_id: track.id,
    song_title: track.title,
    track_number: track.trackNumber,
    duration: track.duration,
    album_type: track.albumType || 'album',
  });
};

export const trackSongPause = (track: {
  id: string;
  title: string;
}) => {
  trackEvent('song_pause', {
    event_category: 'Music Player',
    event_label: track.title,
    song_id: track.id,
    song_title: track.title,
  });
};

export const trackSongComplete = (track: {
  id: string;
  title: string;
}) => {
  trackEvent('song_complete', {
    event_category: 'Music Player',
    event_label: track.title,
    song_id: track.id,
    song_title: track.title,
  });
};
