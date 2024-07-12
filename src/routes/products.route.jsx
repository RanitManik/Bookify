import { useFirebase } from "@/context/firebase.context.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavigationComponent } from "@/components/Navigation.component.jsx";
import { ProductsComponent } from "@/components/Products.component.jsx";
import BackgroundComponent from "@/components/Background.component.jsx";

export const ProductsRoute = () => {
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
      <NavigationComponent initialSelected="Products" />
      <BackgroundComponent>
        <ProductsComponent />
      </BackgroundComponent>
    </>
  );
};