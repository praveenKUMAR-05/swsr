import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from "recharts";
import { 
  Shield, Users, MessageSquare, FileText, Settings, 
  TrendingUp, Award, Building, Home, Plus, Download,
  AlertTriangle, CheckCircle, Clock, Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useComplaints } from "@/hooks/useComplaints";
import { useFeedback } from "@/hooks/useFeedback";
import { useGovernmentSchemes } from "@/hooks/useGovernmentSchemes";
import { useReports } from "@/hooks/useReports";
import { useWasteData } from "@/hooks/useWasteData";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("monitoring");
  const [reportPeriod, setReportPeriod] = useState("monthly");
  const [areaFilter, setAreaFilter] = useState("all");
  const { toast } = useToast();
  const { complaints, updateComplaint } = useComplaints();
  const { feedback, submitFeedback } = useFeedback();
  const { schemes, createScheme, updateScheme } = useGovernmentSchemes();
  const { generateWasteAnalyticsReport, generateComplianceReport } = useReports();
  const { wasteData } = useWasteData();

  // Mock data
  const houseData = [
    { houseId: "H-123-SECTOR-4", organic: 2.5, recyclable: 1.8, total: 4.3, points: 89 },
    { houseId: "H-124-SECTOR-4", organic: 3.1, recyclable: 2.2, total: 5.3, points: 112 },
    { houseId: "H-125-SECTOR-4", organic: 1.8, recyclable: 1.5, total: 3.3, points: 67 },
    { houseId: "H-126-SECTOR-4", organic: 2.8, recyclable: 2.8, total: 5.6, points: 134 },
  ];

  const trendsData = [
    { month: "Jan", waste: 45, recycled: 32 },
    { month: "Feb", waste: 52, recycled: 38 },
    { month: "Mar", waste: 48, recycled: 41 },
    { month: "Apr", waste: 44, recycled: 39 },
    { month: "May", waste: 41, recycled: 42 },
    { month: "Jun", waste: 38, recycled: 44 },
  ];

  const feedbacks = [
    { id: 1, houseId: "H-123-SECTOR-4", subject: "Waste collection delay", status: "pending", date: "2024-01-15" },
    { id: 2, houseId: "H-124-SECTOR-4", subject: "Bin overflow issue", status: "resolved", date: "2024-01-14" },
    { id: 3, houseId: "H-125-SECTOR-4", subject: "Robot malfunction", status: "in-progress", date: "2024-01-13" },
  ];

  const handleRespondFeedback = (id: string) => {
    toast({
      title: "Response Sent",
      description: `Response sent to feedback #${id}`,
    });
  };

  const handleAssignReward = () => {
    toast({
      title: "Reward Assigned",
      description: "Eco-points have been assigned to the selected users.",
    });
  };

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <header className="bg-black border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-primary">
                <Shield className="h-8 w-8" />
                <span className="text-xl font-bold">Admin Dashboard</span>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Government Admin
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              <Link to="/">
              Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="complaints" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Complaints</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Schemes</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Houses</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">Active users</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Waste</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45.2 tons</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recycled</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">32.8 tons</div>
                  <p className="text-xs text-muted-foreground">72.6% efficiency</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">12</div>
                  <p className="text-xs text-muted-foreground">Needs attention</p>
                </CardContent>
              </Card>
            </div>

            {/* House Monitoring Table */}
            <Card>
              <CardHeader>
                <CardTitle>House-wise Waste Monitoring</CardTitle>
                <CardDescription>Real-time waste data from all registered houses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">House ID</th>
                        <th className="text-left p-2">Organic (kg)</th>
                        <th className="text-left p-2">Recyclable (kg)</th>
                        <th className="text-left p-2">Total (kg)</th>
                        <th className="text-left p-2">Points</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {houseData.map((house) => (
                        <tr key={house.houseId} className="border-b">
                          <td className="p-2 font-medium">{house.houseId}</td>
                          <td className="p-2 text-success">{house.organic}</td>
                          <td className="p-2 text-primary">{house.recyclable}</td>
                          <td className="p-2">{house.total}</td>
                          <td className="p-2">
                            <Badge variant="secondary">{house.points}</Badge>
                          </td>
                          <td className="p-2">
                            <Button size="sm" variant="outline">View Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Waste Management Trends</CardTitle>
                <CardDescription>Monthly waste generation and recycling trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="waste" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="recycled" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complaint Management</CardTitle>
                <CardDescription>Review and manage user complaints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                      <div className="text-2xl font-bold">{complaints.filter(c => c.status === 'pending').length}</div>
                      <div className="text-sm text-muted-foreground">Pending</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{complaints.filter(c => c.status === 'in-progress').length}</div>
                      <div className="text-sm text-muted-foreground">In Progress</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                      <div className="text-2xl font-bold">{complaints.filter(c => c.status === 'resolved').length}</div>
                      <div className="text-sm text-muted-foreground">Resolved</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                      <div className="text-2xl font-bold">{complaints.filter(c => c.status === 'escalated').length}</div>
                      <div className="text-sm text-muted-foreground">Escalated</div>
                    </CardContent>
                  </Card>
                </div>

                {complaints.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No complaints to review</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {complaints.slice(0, 10).map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline">{complaint.house_id}</Badge>
                            <span className="font-medium">{complaint.subject}</span>
                            <Badge variant={complaint.priority === 'urgent' ? 'destructive' : 'secondary'}>
                              {complaint.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={complaint.status === 'resolved' ? 'default' : complaint.status === 'in-progress' ? 'secondary' : 'destructive'}>
                              {complaint.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(complaint.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{complaint.description}</p>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => updateComplaint(complaint.id, { status: 'in-progress' })}
                            disabled={complaint.status === 'resolved'}
                          >
                            Assign
                          </Button>
                          <Button size="sm" variant="outline">Respond</Button>
                          {complaint.status !== 'resolved' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateComplaint(complaint.id, { status: 'resolved', resolution_details: 'Issue resolved by admin team' })}
                            >
                              Mark Resolved
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Management</CardTitle>
                <CardDescription>Review and respond to user complaints and feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {feedback.slice(0, 10).map((feedbackItem) => (
                  <div key={feedbackItem.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">User Feedback</Badge>
                        <span className="font-medium">{feedbackItem.subject}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            feedbackItem.status === "resolved" ? "default" :
                            feedbackItem.status === "reviewed" ? "secondary" : "destructive"
                          }
                        >
                          {feedbackItem.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(feedbackItem.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{feedbackItem.description}</p>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleRespondFeedback(feedbackItem.id)}
                        disabled={feedbackItem.status === "resolved"}
                      >
                        Respond
                      </Button>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Assign Rewards */}
            <Card>
              <CardHeader>
                <CardTitle>Assign Rewards</CardTitle>
                <CardDescription>Assign eco-points and badges to users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="houseSelect">Select House</Label>
                    <Input id="houseSelect" placeholder="Enter House ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points">Points to Award</Label>
                    <Input id="points" type="number" placeholder="100" />
                  </div>
                </div>
                <Button onClick={handleAssignReward} className="bg-primary-gradient">
                  <Award className="h-4 w-4 mr-2" />
                  Assign Reward
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Government Schemes</CardTitle>
                    <CardDescription>Manage waste management schemes and policies</CardDescription>
                  </div>
                  <Button className="bg-primary-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Scheme
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Swachh Bharat Mission 2024</h4>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Initiative to promote cleanliness and waste segregation in urban areas.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">View Reports</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Green City Initiative</h4>
                    <Badge variant="secondary">Planned</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Comprehensive waste management and recycling program for sustainable cities.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">View Reports</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Create comprehensive reports for analysis and compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Report Period</Label>
                    <Select value={reportPeriod} onValueChange={setReportPeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Area Filter</Label>
                    <Select value={areaFilter} onValueChange={setAreaFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Areas</SelectItem>
                        <SelectItem value="sector-1">Sector 1</SelectItem>
                        <SelectItem value="sector-2">Sector 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analytics">Waste Analytics</SelectItem>
                        <SelectItem value="compliance">Compliance Report</SelectItem>
                        <SelectItem value="performance">Performance Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => {
                      const endDate = new Date().toISOString().split('T')[0];
                      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                      generateWasteAnalyticsReport(startDate, endDate, areaFilter === 'all' ? undefined : areaFilter);
                    }} 
                    className="bg-primary-gradient"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Analytics Report
                  </Button>
                  <Button 
                    onClick={() => {
                      const endDate = new Date().toISOString().split('T')[0];
                      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                      generateComplianceReport(startDate, endDate, areaFilter === 'all' ? undefined : areaFilter);
                    }} 
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Compliance Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;