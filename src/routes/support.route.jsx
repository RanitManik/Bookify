import { NavigationComponent } from "@/components/navigation.component.jsx";
import { useEffect } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useNavigate } from "react-router-dom";
import BackgroundComponent from "@/components/Background.component.jsx";
import SupportGuideComponent from "@/components/SupportGuide.component.jsx";

const SupportRoute = () => {
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
      <NavigationComponent initialSelected="Support" />
      <BackgroundComponent>
        <SupportGuideComponent />
      </BackgroundComponent>
    </>
  );
};
export default SupportRoute;
