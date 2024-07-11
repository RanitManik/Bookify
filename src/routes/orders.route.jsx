import { NavigationComponent } from "@/components/Navigation.component.jsx";
import { useEffect } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { useNavigate } from "react-router-dom";
import BackgroundComponent from "@/components/Background.component.jsx";
import OrderListComponent from "@/components/OrderList.component.jsx";

const OrdersRoute = () => {
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
      <NavigationComponent initialSelected="Orders" />
      <BackgroundComponent>
        <OrderListComponent />
      </BackgroundComponent>
    </>
  );
};
export default OrdersRoute;
