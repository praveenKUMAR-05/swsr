import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  date: string;
  time: string;
  notes: string;
}

export default function ScheduleDemo() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Demo request:", formData);

    // 🔹 Backend integration goes here
    alert("✅ Your demo has been scheduled! Our team will contact you soon.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Card className="w-full max-w-lg shadow-xl bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-green-400 text-center">
            Schedule a Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-black border-green-400 text-white"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-black border-green-400 text-white"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="bg-black border-green-400 text-white"
              />
            </div>
            <div>
              <Label htmlFor="organization">Address</Label>
              <Input
                id="organization"
                name="organization"
                placeholder="Enter your address"
                value={formData.organization}
                onChange={handleChange}
                className="bg-black border-green-400 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="bg-black border-green-400 text-white"
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="bg-black border-green-400 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="E.g., Preferred demo topics, team size, special requests, or number of participants..."
                className="bg-black border-green-400 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-400 text-black font-semibold hover:bg-green-500"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
