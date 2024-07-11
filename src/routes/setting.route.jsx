import { NavigationComponent } from "@/components/navigation.component.jsx";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useEffect } from "react";
import SettingComponent from "@/components/Setting.component.jsx";

const SettingRoute = () => {
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
      <NavigationComponent initialSelected="Setting" />
      <SettingComponent />
    </>
  );
};

export default SettingRoute;
