import { NavigationComponent } from "@/components/Navigation.component.jsx";
import { Outlet } from "react-router-dom";

const NavigationRoute = () => {
  return (
    <>
      <NavigationComponent />
      <Outlet />
    </>
  );
};
export default NavigationRoute;
