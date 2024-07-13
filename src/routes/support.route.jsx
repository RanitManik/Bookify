import { useEffect } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useNavigate } from "react-router-dom";
import BackgroundComponent from "@/components/Background.component.jsx";
import SupportGuideComponent from "@/components/SupportGuide.component.jsx";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";

const SupportRoute = () => {
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
      <BackgroundComponent>
        <SupportGuideComponent />
      </BackgroundComponent>
    </>
  );
};
export default SupportRoute;
