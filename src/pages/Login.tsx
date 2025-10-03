import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Chrome, Recycle } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded users for static login
 const users = [
  { email: "praveenkumar050305@gmail.com", role: "admin" },
  { email: "partheev@gmail.com", role: "admin" },
  { email: "727723euec141@skcet.ac.in", role: "corporate" },
  { email: "nithish@gmail.com", role: "corporate" },
  { email: "bsgarmy0506@gmail.com", role: "user" },
  { email: "sivakumar@gmail.com", role: "user" },
  { email: "muthumohan1973@gmail.com", role: "worker" },
  { email: "pranaav@gmail.com", role: "worker" },
];

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const matchedUser = users.find(u => u.email === email.toLowerCase());

  setIsLoading(false);

  if (!matchedUser) {
    setError("Email not found");
    return;
  }

  // Redirect based on role
  switch (matchedUser.role) {
    case "admin":
      navigate("/admin-dashboard");
      break;
    case "corporate":
      navigate("/corporate-dashboard");
      break;
    case "user":
      navigate("/dashboard");
      break;
    case "worker":
      navigate("/worker-dashboard");
      break;
    default:
      navigate("/dashboard");
  }
};

  const handleGoogleLogin = async () => {
    console.log("Google OAuth not implemented yet");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_50%,rgba(34,197,94,0.15)_0%,transparent_100%)]" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Homepage
        </Link>

        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2 text-green-400">
            <Recycle className="h-8 w-8" />
            <span className="text-2xl font-bold">EcoBot</span>
          </div>
        </div>

        {/* Card */}
        <Card className="shadow-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-md text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-400">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to access your waste monitoring dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black border-gray-700 text-white focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black border-gray-700 text-white focus:border-green-400 focus:ring-green-400"
                />
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Log In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full border-gray-700 text-white hover:bg-zinc-800"
              onClick={handleGoogleLogin}
            >
              <Chrome className="h-4 w-4 mr-2 text-green-400" />
              Sign in with Google
            </Button>

            {/* Sign Up */}
            <div className="text-center">
              <span className="text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-green-400 hover:underline font-medium"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
