import { Navbar } from "./navbar";
import { HeroSection } from "./hero";
import { CombinedMenuComponent } from "./menu-section";
import ContactSection from "./contact";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CombinedMenuComponent />
      <ContactSection />
      <Footer />
    </>
  );
}
