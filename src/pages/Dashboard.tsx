import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from "recharts";
import { 
  Recycle, Trophy, MessageSquare, Home, BarChart3, 
  Gift, Leaf, Calendar, Award, Images, ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ImportantLinks } from "@/components/ImportantLinks";
import { YearlyReport } from "@/components/YearlyReport";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useWasteData } from "@/hooks/useWasteData";
import { useFeedback } from "@/hooks/useFeedback";
import robotHero from "@/assets/robot-hero.jpg";
import robotComponents from "@/assets/a1.jpg";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("monitoring");
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

  // Carousel images
  const carouselImages = [
    {
      src: robotHero,
      alt: "Smart Waste Segregation Robot - Main System",
      title: "Smart Bin Technology",
      description: "AI-powered waste sorting with 4-bin system"
    },
    {
      src: robotComponents,
      alt: "Arduino Circuit Components",
      title: "Advanced Electronics",
      description: "Arduino-based control system with sensors"
    },
    {
      src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop",
      alt: "Waste Segregation Process",
      title: "Efficient Processing",
      description: "Automated sorting for optimal recycling"
    },
    {
      src: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop",
      alt: "Environmental Impact",
      title: "Green Future",
      description: "Reducing environmental footprint through smart sorting"
    }
  ];

  // Generate chart data from real waste data
  const chartData = wasteData.slice(0, 7).reverse().map((entry, index) => ({
    name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] || 'Day',
    organic: entry.organic_waste,
    recyclable: entry.recyclable_waste,
    hazardous: entry.hazardous_waste,
    general: entry.general_waste,
  }));

  const pieData = [
    { name: "Organic", value: Math.round((totalStats.recycled / totalStats.totalWaste) * 100) || 45, color: "#22c55e" },
    { name: "Recyclable", value: 30, color: "#3b82f6" },
    { name: "General", value: 20, color: "#64748b" },
    { name: "Hazardous", value: 5, color: "#ef4444" },
  ];

  const rewards = [
    { name: "Eco Warrior", points: 150, unlocked: totalStats.totalPoints >= 150, icon: "🌱" },
    { name: "Recycling Champion", points: 200, unlocked: totalStats.totalPoints >= 200, icon: "♻️" },
    { name: "Zero Waste Hero", points: 500, unlocked: totalStats.totalPoints >= 500, icon: "🏆" },
    { name: "Green Guardian", points: 750, unlocked: totalStats.totalPoints >= 750, icon: "🛡️" },
  ];

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-primary">
                <Recycle className="h-8 w-8" />
                <span className="text-xl font-bold">EcoBot Dashboard</span>
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
        </div>
      </header>
      

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center space-x-2">
              <Images className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Links</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
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

          <TabsContent value="monitoring" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Waste</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStats.totalWaste.toFixed(1)} kg</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recycled</CardTitle>
                  <Recycle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{totalStats.recycled.toFixed(1)} kg</div>
                  <p className="text-xs text-muted-foreground">{Math.round((totalStats.recycled / totalStats.totalWaste) * 100) || 0}% of total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eco Points</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{totalStats.totalPoints}</div>
                  <p className="text-xs text-muted-foreground">+89 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Streak</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">12 days</div>
                  <p className="text-xs text-muted-foreground">Keep it up!</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Waste Breakdown</CardTitle>
                  <CardDescription>Daily waste segregation in kg</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="organic" stackId="a" fill="#22c55e" />
                      <Bar dataKey="recyclable" stackId="a" fill="#3b82f6" />
                      <Bar dataKey="general" stackId="a" fill="#64748b" />
                      <Bar dataKey="hazardous" stackId="a" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Waste Distribution</CardTitle>
                  <CardDescription>Overall waste category breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Images className="h-5 w-5" />
                  <span>Smart Waste System Gallery</span>
                </CardTitle>
                <CardDescription>
                  Explore our AI-powered waste segregation technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageCarousel images={carouselImages} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links" className="space-y-6">
            <ImportantLinks />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <YearlyReport />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>
                  Report issues or complaints to the waste management authority
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Subject</Label>
                  <Input 
                    type="text" 
                    placeholder="Brief description of the issue"
                    value={feedbackSubject}
                    onChange={(e) => setFeedbackSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Description</Label>
                  <textarea 
                    placeholder="Detailed description of the issue or complaint"
                    rows={4}
                    value={feedbackDescription}
                    onChange={(e) => setFeedbackDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-black"
                  />
                </div>
                <Button 
                  onClick={handleFeedbackSubmit} 
                  className="bg-primary hover:bg-primary/90"
                  disabled={!feedbackSubject.trim() || !feedbackDescription.trim()}
                >
                  Submit Feedback
                </Button>
              </CardContent>
                    <Link to="/complaint-status">
                      <Button  variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Complaint Status
                      </Button>
                    </Link>
            </Card>

          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Achievement Badges</span>
                  </CardTitle>
                  <CardDescription>Track your eco-friendly accomplishments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rewards.map((reward) => (
                    <div
                      key={reward.name}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        reward.unlocked ? "bg-success/10 border-success" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{reward.icon}</span>
                        <div>
                          <h4 className="font-medium">{reward.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {reward.points} points required
                          </p>
                        </div>
                      </div>
                      {reward.unlocked ? (
                        <Badge variant="default" className="bg-success">Unlocked</Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Points & Redemption */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="h-5 w-5" />
                    <span>Reward Redemption</span>
                  </CardTitle>
                  <CardDescription>Use your eco-points for rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{totalStats.totalPoints}</div>
                    <div className="text-sm text-muted-foreground">Available Points</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">10% Off Grocery</h4>
                        <p className="text-sm text-muted-foreground">500 points</p>
                      </div>
                      <Button size="sm" variant="outline" disabled={totalStats.totalPoints < 500}>
                        {totalStats.totalPoints >= 500 ? "Redeem" : "Need more points"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Free Coffee Voucher</h4>
                        <p className="text-sm text-muted-foreground">200 points</p>
                      </div>
                      <Button size="sm" variant="outline" disabled={totalStats.totalPoints < 200}>
                        {totalStats.totalPoints >= 200 ? "Redeem" : "Need more points"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Plant a Tree</h4>
                        <p className="text-sm text-muted-foreground">1000 points</p>
                      </div>
                      <Button size="sm" variant="outline" disabled={totalStats.totalPoints < 1000}>
                        {totalStats.totalPoints >= 1000 ? "Redeem" : "Need more points"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;