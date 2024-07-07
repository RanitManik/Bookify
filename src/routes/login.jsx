import { LoginForm } from "@/components/login-form.jsx";
import Background from "@/components/background.jsx";

const Login = () => {
  return (
    <Background className="grid place-items-center">
      <LoginForm />
    </Background>
  );
};

export default Login;
