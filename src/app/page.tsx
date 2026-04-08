import { Nav } from "@/components/layout/nav";
import { Hero } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { FeaturedStack } from "@/components/sections/featured-stack";
import { ContributionCalendar } from "@/components/sections/contribution-calendar";
import { About } from "@/components/sections/about";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProjectGrid />
      <FeaturedStack />
      <ContributionCalendar />
      <About />
      <ContactCTA />
      <Footer />
    </main>
  );
}
