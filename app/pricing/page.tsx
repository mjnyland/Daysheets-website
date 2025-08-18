import PricingSection from "@/components/PricingSection";
import PricingFaq from "@/components/PricingFaq";
import PricingFeatureTable from "@/components/PricingFeatureTable";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <main>
      <PricingSection />
      <PricingFeatureTable />
      <PricingFaq />
      <Footer />
    </main>
  );
}
