import {
  HomeBestSeller,
  HomeHero,
  HomeIntro,
  HomeProductCategories,
  HomeSocialAndContact,
  HomeTestimonials,
  HomeWorkshops,
} from "@/components/home/HomePageSections";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader currentPath="/" variant="overlay" />
      <main>
        <HomeHero />
        <HomeIntro />
        <HomeProductCategories />
        <HomeBestSeller />
        <HomeWorkshops />
        <HomeTestimonials />
        <HomeSocialAndContact />
      </main>
      <SiteFooter />
    </>
  );
}
