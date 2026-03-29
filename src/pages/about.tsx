import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Flame, BookOpen, Users, Globe } from "lucide-react";

const About = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl text-foreground mb-6">About <span className="text-gradient-amber">Firefly</span></h1>
        <p className="text-foreground/80 leading-relaxed mb-8 text-lg">
          Firefly was born from a simple belief: that books are lanterns in the dark, and every reader deserves a guide to find their next great read. We are a small team of bibliophiles, designers, and engineers dedicated to curating the finest collection of literature.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: BookOpen, title: "4,829 Volumes", desc: "Carefully curated from publishers worldwide" },
            { icon: Users, title: "12,000+ Readers", desc: "A growing community of passionate readers" },
            { icon: Globe, title: "Global Reach", desc: "Shipping to over 40 countries" },
            { icon: Flame, title: "Est. 2023", desc: "Built with love and late-night coffee" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl bg-card card-surface">
              <Icon className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-display text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl text-foreground mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Arta Krasniqi", role: "Founder & Developer" },
            { name: "Bleron Gashi", role: "UI/UX Designer" },
            { name: "Diona Berisha", role: "Content Curator" },
          ].map(({ name, role }) => (
            <div key={name} className="p-4 rounded-xl bg-card card-surface text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 font-display text-lg">
                {name.charAt(0)}
              </div>
              <p className="font-display text-sm text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
