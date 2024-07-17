import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "@/context/firebase.context.jsx";
import { assets } from "@/assets/assets.js";

export function LoginFormComponent() {
  const {
    signInUserWithEmailAndPassword,
    signInUserWithGoogle,
    signInUserWithGithub,
    signInUserWithFacebook,
    signInUserWithTwitter,
    isLoggedIn,
  } = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      console.log("Successfully Signed in!", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="grid min-h-[min(95svh,_1080px)] place-items-center px-4 duration-200 animate-in fade-in">
      <Card className="mx-auto w-full max-w-sm self-center">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 grid grid-cols-4 gap-2">
            <Button onClick={signInUserWithGoogle} variant="secondary">
              <assets.Google className="h-full" />
            </Button>
            <Button onClick={signInUserWithGithub} variant="secondary">
              <assets.Github className="h-full" />
            </Button>
            <Button onClick={signInUserWithFacebook} variant="secondary">
              <assets.Facebook className="h-full" />
            </Button>
            <Button onClick={signInUserWithTwitter} variant="secondary">
              <assets.Twitter className="h-full" />
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
