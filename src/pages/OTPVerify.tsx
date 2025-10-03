import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Recycle, Mail, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVerification = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Verification Successful!",
        description: "Welcome to EcoBot! Redirecting to your dashboard...",
      });
      // In real app, check user role and redirect accordingly
      const userRole = localStorage.getItem("userRole") || "user";
      navigate(userRole === "admin" ? "/admin-dashboard" : "/dashboard");
    }, 1000);
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your email.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4 page-enter">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Homepage
        </Link>

        {/* Logo */}
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
              Verify Your Email
            </CardTitle>
            <CardDescription>
              We've sent a 6-digit verification code to your email address. 
              Please enter it below to complete your registration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-center block">
                  Enter Verification Code
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button 
                onClick={handleVerification}
                className="w-full bg-primary-gradient hover:opacity-90" 
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
              </p>
              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Resending...
                  </>
                ) : (
                  "Resend OTP"
                )}
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Need help?{" "}
                <Link to="/contact" className="text-primary hover:underline font-medium">
                  Contact Support
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerify;