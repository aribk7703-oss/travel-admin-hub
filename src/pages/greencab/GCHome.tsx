import "@/styles/greencab.css";
import { GCHeader } from "@/components/greencab/GCHeader";
import { GCFooter } from "@/components/greencab/GCFooter";
import { GCHeroSection } from "@/components/greencab/GCHeroSection";
import { GCAboutSection } from "@/components/greencab/GCAboutSection";
import { GCFleetSection } from "@/components/greencab/GCFleetSection";
import { GCToursSection } from "@/components/greencab/GCToursSection";
import { GCBlogSection } from "@/components/greencab/GCBlogSection";

const GCHome = () => {
  return (
    <div className="greencab-theme">
      <GCHeader />
      <GCHeroSection />
      <GCAboutSection />
      <GCFleetSection />
      <GCToursSection />
      <GCBlogSection />
      <GCFooter />
    </div>
  );
};

export default GCHome;
