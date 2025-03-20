import React, { useEffect } from "react";
import { Navbar } from "./navbar";
import { HeroSection } from "./hero";
import { TabSection } from "./tab-section";
import { CombinedMenuComponent } from "./menu-section";
import ContactSection from "./contact";
import Footer from "./footer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
  const { menus } = useSelector((state: RootState) => state.menu);
  const [activeMenu, setActiveMenu] = React.useState("FOOD");
  const [activeMenuId, setActiveMenuId] = React.useState("");

  useEffect(() => {
    if (menus.length > 0 && !activeMenu) {
      setActiveMenu(menus[0].name);
      setActiveMenuId(menus[0].id);
    }
  }, [menus, activeMenu]); // Runs when `menus` changes
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
