import { Nav } from "@/components/layout/nav";
import { Hero } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { About } from "@/components/sections/about";
import { FeaturedStack } from "@/components/sections/featured-stack";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProjectGrid />
      <FeaturedStack />
      <About />
      <ContactCTA />
      <Footer />
    </main>
  );
}
