import { useFirebase } from "@/context/firebase.context.jsx";
import { useEffect } from "react";

export const ProductsComponent = () => {
  const { fetchMyProducts } = useFirebase();

  useEffect(() => {
    fetchMyProducts().then((res) => console.log(res.docs));
  }, [fetchMyProducts]);

  return (
    <div className="grid min-h-[min(80svh,_1000px)] place-items-center duration-200 animate-in fade-in">
      You don't have products yet!
    </div>
  );
};
