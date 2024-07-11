import { SignupFormComponent } from "@/components/SignupForm.component.jsx";
import BackgroundComponent from "@/components/Background.component.jsx";

const RegisterRoute = () => {
  return (
    <BackgroundComponent>
      <SignupFormComponent />
    </BackgroundComponent>
  );
};

export default RegisterRoute;
