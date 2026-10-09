import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube, FaSoundcloud, FaSpotify, FaApple } from "react-icons/fa";
import { SiBandcamp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { InsertContactMessage } from "@shared/schema";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      // Messages are emailed via Web3Forms (free). Set VITE_WEB3FORMS_KEY
      // in the hosting dashboard; get a key at https://web3forms.com
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
      if (!accessKey) {
        window.location.href =
          `mailto:hernans@gmail.com?subject=${encodeURIComponent(data.subject)}` +
          `&body=${encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)}`;
        return { ok: true };
      }
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Website message: ${data.subject}`,
          from_name: "Hernán Savastano Website",
          replyto: data.email,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Send failed");
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription would be implemented here
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setNewsletterEmail("");
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <section id="contact" className="py-14 bg-background" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-futura font-bold text-foreground mb-4 tracking-wide" data-testid="contact-title">
            Get in Touch
          </h2>
          <p className="text-xl font-futura text-muted-foreground" data-testid="contact-description">
            Connect for bookings, collaborations, or to share your own folk medicine stories
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-futura font-bold text-foreground mb-6 tracking-wide" data-testid="contact-form-title">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange("name")}
                      placeholder="Your name"
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      placeholder="your@email.com"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-foreground">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange("subject")}
                    placeholder="What's this about?"
                    required
                    data-testid="input-subject"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange("message")}
                    placeholder="Share your thoughts..."
                    required
                    data-testid="textarea-message"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Connect & Follow */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-futura font-bold text-foreground mb-6 tracking-wide" data-testid="connect-follow-title">Connect & Follow the Journey</h3>
              
              {/* Contact Info and Social Media Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3" data-testid="contact-email">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="text-primary h-3 w-3" />
                    </div>
                    <div>
                      <h4 className="font-futura font-bold text-foreground text-sm">Email</h4>
                      <p className="font-futura text-muted-foreground text-sm">hernans@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3" data-testid="contact-phone">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="text-primary h-3 w-3" />
                    </div>
                    <div>
                      <h4 className="font-futura font-bold text-foreground text-sm">Phone</h4>
                      <p className="font-futura text-muted-foreground text-sm">206-399-1964</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div>
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="https://www.facebook.com/hernan.savastano" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary py-3 px-4 rounded-lg transition-colors"
                      data-testid="link-facebook"
                    >
                      <FaFacebook className="text-lg flex-shrink-0" />
                      <span className="font-futura text-sm">Facebook</span>
                    </a>
                    <a 
                      href="https://www.instagram.com/hernans/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary py-3 px-4 rounded-lg transition-colors"
                      data-testid="link-instagram"
                    >
                      <FaInstagram className="text-lg flex-shrink-0" />
                      <span className="font-futura text-sm">Instagram</span>
                    </a>
                    <a 
                      href="https://hernansavastano.bandcamp.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary py-3 px-4 rounded-lg transition-colors"
                      data-testid="link-bandcamp"
                    >
                      <SiBandcamp className="text-lg flex-shrink-0" />
                      <span className="font-futura text-sm">Bandcamp</span>
                    </a>
                    <a 
                      href="https://music.youtube.com/channel/UCoyOIhxS0uiGlgi6prNzpRQ?si=CZMdsjjpgqZNalvA" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary py-3 px-4 rounded-lg transition-colors"
                      data-testid="link-youtube"
                    >
                      <FaYoutube className="text-lg flex-shrink-0" />
                      <span className="font-futura text-sm">YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Newsletter - Full Width Below */}
              <div className="pt-4 border-t border-border">
                <p className="font-futura text-sm text-muted-foreground text-left mb-3" data-testid="newsletter-description">
                  Subscribe for updates on new songs and live performances
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex" data-testid="newsletter-form">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="rounded-r-none"
                    required
                    data-testid="input-newsletter-email"
                  />
                  <Button 
                    type="submit"
                    className="rounded-l-none"
                    data-testid="button-subscribe"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
