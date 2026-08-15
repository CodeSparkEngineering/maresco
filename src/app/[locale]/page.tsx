import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import ScrollFrameBackground from "@/components/ScrollFrameBackground";
import SushiExperience from "@/components/SushiExperience";
import IngredientShowcase from "@/components/IngredientShowcase";
import ChefSection from "@/components/ChefSection";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import ReservationSection from "@/components/ReservationSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

/**
 * The whole experience as one continuous scroll narrative:
 * hero → the house → the sushi bar (exploded nigiri) → from the sea → the
 * kitchen → menu → gallery → reservations → closing frame → footer.
 *
 * A single scroll-driven film sits FIXED behind the entire page: it starts on
 * the hero and advances frame-by-frame as you scroll the whole site. Section
 * backgrounds are translucent so the film shows through — brightly in the open
 * sections, dimmed behind the dense ones — always advancing with the scroll.
 *
 * Sections are individually componentised and content-driven (src/lib/content),
 * so reordering, editing copy, translating or wiring a CMS never touches layout
 * code. Every string on this page comes from the locale in the URL.
 */
export default function Home() {
  return (
    <>
      {/* Behaviour layers — no DOM footprint of their own. */}
      <SmoothScroll />
      <CustomCursor />

      {/* Site-wide scroll-driven film — fixed, behind everything. */}
      <ScrollFrameBackground />

      {/* All content sits above the film. */}
      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <IntroSection />
          <SushiExperience />
          <IngredientShowcase />
          <ChefSection />
          <MenuSection />
          <Gallery />
          <ReservationSection />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
