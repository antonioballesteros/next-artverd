import {
  HomeBestSeller,
  HomeHero,
  HomeIntro,
  HomeProductCategories,
  HomeSocialAndContact,
  HomeTestimonials,
  HomeWorkshops,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeProductCategories />
      <HomeBestSeller />
      <HomeWorkshops />
      <HomeTestimonials />
      <HomeSocialAndContact />
    </>
  );
}
