import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Contact Admin</h1>

      <div className="bg-secondary rounded-xl shadow p-6 w-full max-w-md space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-primary" />
          <span>admin@ecobot.com</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-primary" />
          <span>+91 98765 43210</span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-primary" />
          <span>EcoBot HQ, Smart City</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;