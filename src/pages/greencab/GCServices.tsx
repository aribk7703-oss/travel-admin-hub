import "@/styles/greencab.css";
import { GCHeader } from "@/components/greencab/GCHeader";
import { GCFooter } from "@/components/greencab/GCFooter";
import { GCServicesSection } from "@/components/greencab/GCServicesSection";

const GCServices = () => {
  return (
    <div className="greencab-theme">
      <GCHeader />
      <div className="gc-page-hero">
        <h1>Our Services</h1>
        <p>Premium travel solutions for every need</p>
      </div>
      <GCServicesSection />
      <GCFooter />
    </div>
  );
};

export default GCServices;
