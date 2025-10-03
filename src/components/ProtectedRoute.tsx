import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

interface ProtectedRouteProps {
  children: ReactNode;
  
  allowedRoles?: string[]; // roles that can access this route
  redirectTo?: string;     // fallback route if unauthorized
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/dashboard",
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  // Show spinner while loading auth/profile
  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are required but user's role is not in allowedRoles → redirect
  if (allowedRoles && !allowedRoles.includes(profile?.role ?? "")) {
    return <Navigate to={redirectTo} replace />;
  }

  // Otherwise → allow access
  return <>{children}</>;
};
