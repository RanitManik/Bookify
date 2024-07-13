import { useEffect } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useNavigate } from "react-router-dom";
import BackgroundComponent from "@/components/Background.component.jsx";
import OrderListComponent from "@/components/OrderList.component.jsx";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";

const OrdersRoute = () => {
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
        <OrderListComponent />
      </BackgroundComponent>
    </>
  );
};
export default OrdersRoute;
