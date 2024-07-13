import { useNavigate } from "react-router-dom";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useEffect } from "react";
import SettingComponent from "@/components/Setting.component.jsx";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";

const SettingRoute = () => {
  const { user, loading } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoaderCircleComponent />;
  }

  if (!user) return null;

  return (
    <>
      <SettingComponent />
    </>
  );
};

export default SettingRoute;
