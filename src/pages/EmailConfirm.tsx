import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Recycle, CheckCircle, XCircle, Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const EmailConfirm = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const { user } = useAuth();

  useEffect(() => {
    // Simulate email confirmation check
    const timer = setTimeout(() => {
      if (user?.email_confirmed_at) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user]);

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader className="h-12 w-12 text-primary animate-spin" />;
      case 'success':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'error':
        return <XCircle className="h-12 w-12 text-red-500" />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'Verifying Email...';
      case 'success':
        return 'Email Confirmed!';
      case 'error':
        return 'Verification Failed';
    }
  };

  const getDescription = () => {
    switch (status) {
      case 'loading':
        return 'Please wait while we verify your email address.';
      case 'success':
        return 'Your email has been successfully confirmed. You can now access all features.';
      case 'error':
        return 'We could not verify your email. Please try again or contact support.';
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4 page-enter">
      <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      
      <div className="w-full max-w-md relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Homepage
        </Link>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2 text-white">
            <Recycle className="h-8 w-8" />
            <span className="text-2xl font-bold">EcoBot</span>
          </div>
        </div>

        <Card className="shadow-hover border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {getIcon()}
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              {getTitle()}
            </CardTitle>
            <CardDescription>
              {getDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {status === 'success' && (
              <Button asChild className="w-full bg-primary-gradient hover:opacity-90">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
            {status === 'error' && (
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register">Try Registration Again</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/login">Back to Login</Link>
                </Button>
              </div>
            )}
            {status === 'loading' && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  This may take a few moments...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailConfirm;