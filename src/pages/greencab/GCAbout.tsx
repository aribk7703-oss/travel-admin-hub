import "@/styles/greencab.css";
import { GCHeader } from "@/components/greencab/GCHeader";
import { GCFooter } from "@/components/greencab/GCFooter";
import { GCAboutSection } from "@/components/greencab/GCAboutSection";

const GCAbout = () => {
  return (
    <div className="greencab-theme">
      <GCHeader />
      <div className="gc-page-hero">
        <h1>About GreenCab</h1>
        <p>Your trusted travel partner since 2012</p>
      </div>
      <GCAboutSection />
      <GCFooter />
    </div>
  );
};

export default GCAbout;
