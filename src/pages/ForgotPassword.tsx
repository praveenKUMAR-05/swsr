import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Recycle, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    const { error } = await resetPassword(email);
    setIsLoading(false);

    if (!error) {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4 page-enter">
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        
        <div className="w-full max-w-md relative z-10">
          <Link 
            to="/login" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 text-white">
              <Recycle className="h-8 w-8" />
              <span className="text-2xl font-bold">EcoBot</span>
            </div>
          </div>

          <Card className="shadow-hover border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-primary">
                Check Your Email
              </CardTitle>
              <CardDescription>
                We've sent password reset instructions to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button 
                onClick={() => setEmailSent(false)}
                variant="outline" 
                className="w-full"
              >
                Try Different Email
              </Button>
              <div className="text-center">
                <Link to="/login" className="text-sm text-primary hover:underline">
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4 page-enter">
      <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      
      <div className="w-full max-w-md relative z-10">
        <Link 
          to="/login" 
          className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Link>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2 text-white">
            <Recycle className="h-8 w-8" />
            <span className="text-2xl font-bold">EcoBot</span>
          </div>
        </div>

        <Card className="shadow-hover border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              Reset Password
            </CardTitle>
            <CardDescription>
              Enter your email address and we'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-eco"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary-gradient hover:opacity-90" 
                disabled={isLoading || !email}
              >
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </Button>
            </form>
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign In
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;