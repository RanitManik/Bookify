import { Navigation } from "@/components/navigation.jsx";
import { useEffect } from "react";
import { useFirebase } from "@/context/firebase.jsx";
import { useNavigate } from "react-router-dom";
import Background from "@/components/Background.jsx";
import SupportGuide from "@/components/SupportGuide.jsx";

const Support = () => {
  const { user } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <Navigation initialSelected="Support" />
      <Background>
        <SupportGuide />
      </Background>
    </>
  );
};
export default Support;
