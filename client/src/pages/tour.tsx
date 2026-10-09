import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ExternalLink, Music } from "lucide-react";

interface TourDate {
  id: string;
  date: string;
  venue: string;
  city: string;
  state: string;
  time: string;
  ticketUrl?: string;
  description?: string;
  isFeatureed?: boolean;
  eventType: "concert" | "festival" | "private";
}

// Upcoming tour dates
const sampleTourDates: TourDate[] = [
  {
    id: "tour-1",
    date: "2025-09-05T12:00:00",
    venue: "Imagine Festival 2025",
    city: "Doe Bay Resort, Orcas Island",
    state: "WA",
    time: "10:15 AM",
    description: "Council Tent performance",
    isFeatureed: true,
    eventType: "festival"
  },
  {
    id: "tour-2", 
    date: "2025-09-23T12:00:00",
    venue: "Icicle Ridge Winery",
    city: "Leavenworth",
    state: "WA",
    time: "7:00 PM",
    description: "Nora & Hernán Song Story - An intimate evening of music and storytelling",
    isFeatureed: true,
    eventType: "concert"
  },
  {
    id: "tour-3",
    date: "2025-10-03T12:00:00",
    venue: "Conscious Growth Convergence",
    city: "Dexter",
    state: "OR",
    time: "11:15 PM",
    description: "Revival Cafe performance",
    isFeatureed: true,
    eventType: "festival"
  },
  {
    id: "tour-4",
    date: "2025-11-07T19:00:00",
    venue: "Mi Cancion Album Release Party at Snowgrass Lodge",
    city: "Leavenworth",
    state: "WA",
    time: "7:00 PM",
    ticketUrl: "https://www.facebook.com/events_invite_off_fb/link_sharing/1155233600046239/?inviter_id=503497207&token=W30omG6hP8UyjdwBSxubec1Bj3gHbg1CzF-BGvviZ9U&mibextid",
    description: "",
    isFeatureed: true,
    eventType: "concert"
  },
  {
    id: "tour-5",
    date: "2026-02-12T19:00:00",
    venue: "House Concert with Wolfchild at Snowgrass Lodge",
    city: "Leavenworth",
    state: "WA",
    time: "7:00 PM",
    description: "",
    isFeatureed: true,
    eventType: "concert"
  }
];

export default function TourPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date();
  };

  const upcomingShows = sampleTourDates.filter(show => isUpcoming(show.date));
  const pastShows = sampleTourDates.filter(show => !isUpcoming(show.date));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-futura font-bold text-foreground mb-4 tracking-wide" data-testid="tour-title">
                Live Shows
              </h1>
              <p className="text-xl font-futura text-muted-foreground max-w-2xl mx-auto" data-testid="tour-description">
                Join me for intimate performances celebrating folk music and community
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Shows */}
        <section className="pt-0 pb-8 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-futura font-light text-foreground mb-8 text-center tracking-wide">
              Upcoming Performances
            </h2>
            
            {upcomingShows.length === 0 ? (
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8 text-center">
                  <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-futura font-bold text-foreground mb-2">
                    More Shows Coming Soon
                  </h3>
                  <p className="font-futura text-muted-foreground mb-6">
                    New tour dates are being scheduled. Subscribe to get notified first!
                  </p>
                  <Button className="bg-stone-200 text-stone-800 hover:bg-stone-300 border border-stone-300" data-testid="button-notify">
                    Get Notified
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {upcomingShows.map((show) => (
                  <Card key={show.id} className={`bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${show.isFeatureed ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                        <div className="text-center md:text-left">
                          <div className="text-2xl font-futura font-bold text-primary mb-1" data-testid={`show-date-${show.id}`}>
                            {new Date(show.date).getDate()}
                          </div>
                          <div className="font-futura text-muted-foreground text-sm">
                            {new Date(show.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </div>
                          <div className="font-futura text-muted-foreground text-sm">
                            {new Date(show.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                        </div>
                        
                        <div className="md:col-span-2">
                          {show.ticketUrl ? (
                            <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              <h3 className="text-xl font-futura font-bold text-foreground mb-2" data-testid={`show-venue-${show.id}`}>
                                {show.venue}
                              </h3>
                            </a>
                          ) : (
                            <h3 className="text-xl font-futura font-bold text-foreground mb-2" data-testid={`show-venue-${show.id}`}>
                              {show.venue}
                            </h3>
                          )}
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="font-futura text-sm" data-testid={`show-location-${show.id}`}>
                              {show.city}, {show.state}
                            </span>
                          </div>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="font-futura text-sm" data-testid={`show-time-${show.id}`}>
                              {show.time}
                            </span>
                          </div>
                          {show.description && (
                            <p className="font-futura text-sm text-muted-foreground" data-testid={`show-description-${show.id}`}>
                              {show.description}
                            </p>
                          )}
                        </div>
                        
                        <div className="text-center md:text-right">
                          {show.ticketUrl && (
                            <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer">
                              <Button className="bg-stone-200 text-stone-800 hover:bg-stone-300 border border-stone-300" data-testid={`button-tickets-${show.id}`}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                RSVP
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Past Performances */}
        {pastShows.length > 0 && (
          <section className="pt-0 pb-16 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-futura font-light text-foreground mb-8 text-center tracking-wide">
                Past Performances
              </h2>
              
              <div className="space-y-4">
                {pastShows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((show) => (
                  <Card key={show.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                        <div className="text-center md:text-left">
                          <div className="text-xl font-futura font-bold text-muted-foreground mb-1" data-testid={`past-show-date-${show.id}`}>
                            {new Date(show.date).getDate()}
                          </div>
                          <div className="font-futura text-muted-foreground text-sm">
                            {new Date(show.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </div>
                          <div className="font-futura text-muted-foreground text-sm">
                            {new Date(show.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                        </div>
                        
                        <div className="md:col-span-3">
                          <h3 className="text-lg font-futura font-bold text-foreground mb-2" data-testid={`past-show-venue-${show.id}`}>
                            {show.venue}
                          </h3>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="font-futura text-sm" data-testid={`past-show-location-${show.id}`}>
                              {show.city}, {show.state}
                            </span>
                          </div>
                          {show.description && (
                            <p className="font-futura text-sm text-muted-foreground" data-testid={`past-show-description-${show.id}`}>
                              {show.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Booking Info */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-futura font-light text-foreground mb-4 tracking-wide">
              Book a Performance
            </h2>
            <p className="font-futura text-muted-foreground mb-8 max-w-2xl mx-auto">
              Interested in having me perform at your venue, festival, or private event? 
              I'd love to bring these songs to your community.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-stone-200 text-stone-800 hover:bg-stone-300 border border-stone-300" data-testid="button-booking-inquiry">
                <Calendar className="mr-2 h-4 w-4" />
                Booking Inquiry
              </Button>
              <Button variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/80" data-testid="button-press-kit">
                Download Press Kit
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}