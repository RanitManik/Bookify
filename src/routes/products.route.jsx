import { useFirebase } from "@/context/firebase.context.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProductsComponent } from "@/components/Products.component.jsx";
import { LoaderCircleComponent } from "@/components/LoaderCircle.component.jsx";

export const ProductsRoute = () => {
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

  return <ProductsComponent />;
};
