import { Navigation } from "@/components/navigation.jsx";
import Background from "@/components/Background.jsx";
import { ListingForm } from "@/components/Listing.jsx";
import { useFirebase } from "@/context/firebase.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Listing = () => {
  const { user } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // Optionally return null while redirecting

  return (
    <>
      <Navigation initialSelected="Listing" />
      <Background>
        <ListingForm />
      </Background>
    </>
  );
};

export default Listing;
