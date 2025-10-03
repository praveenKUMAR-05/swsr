import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Chrome, Recycle, Shield, Building2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client"; // ✅ import Supabase client

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    houseId: "",
    role: "user",
    governmentId: "",
    organization: ""
  });

  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // ✅ Save user with metadata
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          role: formData.role,
          houseId: formData.houseId,
          governmentId: formData.governmentId,
          organization: formData.organization
        }
      }
    });

    setIsLoading(false);

    if (error) {
      console.error("Signup error:", error.message);
      return;
    }

    console.log("Signup success:", data);
    navigate("/login");
  };

  const handleGoogleLogin = async () => {
    console.log("Google OAuth not implemented yet");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black p-6">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-green-400 mb-6 transition-colors"
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

        <Card className="bg-zinc-950 border border-zinc-800 shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-400">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-400">
              Join EcoBot to start your sustainable waste management journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="bg-black border-zinc-700 text-gray-200 focus:border-green-400"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-black border-zinc-700 text-gray-200 focus:border-green-400"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="bg-black border-zinc-700 text-gray-200 focus:border-green-400"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="houseId" className="text-gray-300">House ID</Label>
                <Input
                  id="houseId"
                  type="text"
                  placeholder="e.g., H-123-SECTOR-4"
                  className="bg-black border-zinc-700 text-gray-200 focus:border-green-400"
                  value={formData.houseId}
                  onChange={(e) => handleInputChange("houseId", e.target.value)}
                  required
                />
              </div>

              {/* Role Select */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">Account Type</Label>
                <Select onValueChange={(value) => handleInputChange("role", value)} defaultValue="user">
                  <SelectTrigger className="bg-black border-zinc-700 text-gray-200 focus:border-green-400">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700 text-gray-200">
                    <SelectItem value="user">User Account</SelectItem>
                    <SelectItem value="corporate">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        Corporate Account
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Account
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Extra Fields */}
              {formData.role === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="governmentId" className="text-gray-300">Government Position ID</Label>
                  <Input
                    id="governmentId"
                    type="text"
                    placeholder="Enter your government verification ID"
                    className="bg-black border-zinc-700 text-gray-200 focus:border-green-400"
                    value={formData.governmentId}
                    onChange={(e) => handleInputChange("governmentId", e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Admin accounts require government verification
                  </p>
                </div>
              )}

              {formData.role === "corporate" && (
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-gray-300">Organization Name</Label>
                  <Input
                    id="organization"
                    type="text"
                    placeholder="Enter your organization ID"
                    className="bg-black border-zinc-700 text-gray-200 focus:border-green-400"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-950 px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-zinc-700 text-gray-300 hover:border-green-400 hover:text-green-400"
              onClick={handleGoogleLogin}
            >
              <Chrome className="h-4 w-4 mr-2" />
              Sign in with Google
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-green-400 hover:underline font-medium">
                  Log In
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
