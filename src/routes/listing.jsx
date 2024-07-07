import { Navigation } from "@/components/navigation.jsx";
import Background from "@/components/background.jsx";
import { ListingForm } from "@/components/listing.jsx";

const Listing = () => {
  return (
    <Background>
      <Navigation initialSelected="Listing" />
      <ListingForm />
    </Background>
  );
};

export default Listing;
