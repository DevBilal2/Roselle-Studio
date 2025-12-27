import HomeSection from "./Components/HomeSection/HomeSection";
// import Contact from "./contact/Contact";
import Services from "./Components/ServiceSection/Services";
import NavBarScrollEffect from "./Components/Navbar/NavBarScrollEffect";
import CompaniesSection from "./Components/CompaniesSection/CompaniesSection";
import { Footer } from "./Components/Footer/Footer";
import AboutSection from "./Components/About/About";
// import WhatsAppWidgetClient from "./Components/WhatsappWidget";
// import CategoryNav from "./Components/CatogaryNav";
import Testimonials from "./Components/Testimonials";
import CompactBlogSection from "./Components/compactblogsection";

export default function Home() {
  return (
    <>
      {/* <NavBarScrollEffect /> */}
      {/* <CategoryNav /> */}
      <HomeSection />
      <CompaniesSection />

      <Services />

      <AboutSection />
      <CompactBlogSection />
      {/* <Contact /> */}
      <Testimonials />
      {/* <Footer /> */}
    </>
  );
}
