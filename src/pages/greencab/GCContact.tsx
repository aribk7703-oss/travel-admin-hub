import "@/styles/greencab.css";
import { GCHeader } from "@/components/greencab/GCHeader";
import { GCFooter } from "@/components/greencab/GCFooter";
import { GCContactForm } from "@/components/greencab/GCContactForm";

const GCContact = () => {
  return (
    <div className="greencab-theme">
      <GCHeader />
      <div className="gc-page-hero">
        <h1>Contact Us</h1>
        <p>We're here to help 24/7</p>
      </div>
      <GCContactForm />
      <GCFooter />
    </div>
  );
};

export default GCContact;
