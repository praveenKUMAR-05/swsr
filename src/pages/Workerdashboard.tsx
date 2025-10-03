import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { Recycle, Calendar, Trophy, MessageSquare, BarChart3, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useWasteData } from "@/hooks/useWasteData";
import { useFeedback } from "@/hooks/useFeedback";

const WorkerDashboard = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [feedbackSubject, setFeedbackSubject] = useState("");
  const [feedbackDescription, setFeedbackDescription] = useState("");

  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { wasteData, totalStats } = useWasteData();
  const { submitFeedback } = useFeedback();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackSubject.trim() || !feedbackDescription.trim()) return;
    const { error } = await submitFeedback(feedbackSubject, feedbackDescription);
    if (!error) {
      setFeedbackSubject("");
      setFeedbackDescription("");
    }
  };

  // Generate weekly waste chart for worker
  const chartData = wasteData.slice(0, 7).reverse().map((entry, index) => ({
    name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] || 'Day',
    collected: entry.worker_collected || 0,
    recycled: entry.worker_recycled || 0,
  }));

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-primary">
              <Recycle className="h-8 w-8" />
              <span className="text-xl font-bold">Worker Dashboard</span>
            </div>
            <Badge variant="secondary">House ID: {profile?.house_id || "Loading..."}</Badge>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Collection</CardTitle>
                  <CardDescription>Daily waste collection by you (kg)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="collected" fill="#22c55e" name="Collected" />
                      <Bar dataKey="recycled" fill="#3b82f6" name="Recycled" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Stats</CardTitle>
                  <CardDescription>Summary of your waste contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent>
                        <div className="text-2xl font-bold">{totalStats.workerCollected || 0} kg</div>
                        <p className="text-xs text-muted-foreground">Collected</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent>
                        <div className="text-2xl font-bold">{totalStats.workerRecycled || 0} kg</div>
                        <p className="text-xs text-muted-foreground">Recycled</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>Report any issues or concerns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    type="text"
                    placeholder="Subject"
                    value={feedbackSubject}
                    onChange={(e) => setFeedbackSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea
                    rows={4}
                    placeholder="Detailed description"
                    className="w-full px-3 py-2 border border-border rounded-md text-black"
                    value={feedbackDescription}
                    onChange={(e) => setFeedbackDescription(e.target.value)}
                  />
                </div>
                <Button onClick={handleFeedbackSubmit} disabled={!feedbackSubject || !feedbackDescription}>
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Eco Points</CardTitle>
                <CardDescription>Track your points and redeem rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{totalStats.totalPoints}</div>
                <p className="text-sm text-muted-foreground">Available Points</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerDashboard;
