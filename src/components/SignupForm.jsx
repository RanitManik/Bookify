import { Button } from "@/components/ui/button";
import { assets } from "../assets/assets.js";
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
import { useFirebase } from "@/context/firebase.jsx";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    signUpUserWithEmailAndPassword,
    signInUserWithGoogle,
    signInUserWithGithub,
    signInUserWithFacebook,
    signInUserWithTwitter,
    isLoggedIn,
  } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signUpUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      console.log("Successfully Signed up!", user);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="grid min-h-[min(95svh,_1080px)] place-items-center">
      <Card className="mx-auto w-full max-w-sm self-center">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <div className="grid grid-cols-4 gap-2">
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
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
