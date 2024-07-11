import { LoginFormComponent } from "@/components/LoginForm.component.jsx";
import BackgroundComponent from "@/components/Background.component.jsx";

const LoginRoute = () => {
  return (
    <BackgroundComponent className="grid place-items-center">
      <LoginFormComponent />
    </BackgroundComponent>
  );
};

export default LoginRoute;
