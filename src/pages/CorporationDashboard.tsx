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
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { 
  Building2, Globe, TrendingUp, Award, FileText, 
  Users, AlertTriangle, CheckCircle, Clock, Home,
  Download, RefreshCw, Calendar, MapPin, Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import { useComplaints } from "@/hooks/useComplaints";
import { useGovernmentSchemes } from "@/hooks/useGovernmentSchemes";
import { useReports } from "@/hooks/useReports";
import { useToast } from "@/hooks/use-toast";

const CorporationDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [reportPeriod, setReportPeriod] = useState("monthly");
  const [areaFilter, setAreaFilter] = useState("all");
  const { complaints, updateComplaint } = useComplaints();
  const { schemes } = useGovernmentSchemes();
  const { generateWasteAnalyticsReport, generateComplianceReport } = useReports();
  const { toast } = useToast();

  // Mock comprehensive data for corporation head
  const globalStats = {
    totalAreas: 25,
    totalHouseholds: 15420,
    totalWaste: 2847.5, // tons
    recyclingRate: 68.3,
    activeComplaints: 47,
    activeSchemes: 8,
    adminUsers: 156,
    monthlyGrowth: 12.5
  };

  const areaData = [
    { area: "Sector 1", households: 2340, waste: 445.2, recycling: 72.1, complaints: 8, performance: 85 },
    { area: "Sector 2", households: 1890, waste: 367.8, recycling: 65.4, complaints: 12, performance: 78 },
    { area: "Sector 3", households: 2100, waste: 398.5, recycling: 70.2, complaints: 6, performance: 88 },
    { area: "Sector 4", households: 1750, waste: 334.1, recycling: 63.8, complaints: 15, performance: 75 },
    { area: "Sector 5", households: 2200, waste: 421.3, recycling: 74.6, complaints: 4, performance: 92 }
  ];

  const trendsData = [
    { month: "Jan", waste: 2650, recycled: 1802, complaints: 45, schemes: 6 },
    { month: "Feb", waste: 2720, recycled: 1876, complaints: 38, schemes: 7 },
    { month: "Mar", waste: 2580, recycled: 1798, complaints: 42, schemes: 7 },
    { month: "Apr", waste: 2690, recycled: 1865, complaints: 51, schemes: 8 },
    { month: "May", waste: 2750, recycled: 1925, complaints: 35, schemes: 8 },
    { month: "Jun", waste: 2847, recycled: 1945, complaints: 47, schemes: 8 }
  ];

  const performanceData = [
    { name: "Excellent (90-100%)", value: 6, color: "#22c55e" },
    { name: "Good (80-89%)", value: 8, color: "#3b82f6" },
    { name: "Average (70-79%)", value: 7, color: "#f59e0b" },
    { name: "Poor (<70%)", value: 4, color: "#ef4444" }
  ];

  const escalatedComplaints = complaints.filter(c => c.status === 'escalated');

  const handleAssignComplaint = async (complaintId: string, adminId: string) => {
    const { error } = await updateComplaint(complaintId, {
      assigned_to_admin: adminId,
      status: 'in-progress'
    });
    
    if (!error) {
      toast({
        title: "Complaint Assigned",
        description: "Complaint has been assigned to admin successfully.",
      });
    }
  };

  const handleGenerateReport = async (type: 'analytics' | 'compliance') => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    if (type === 'analytics') {
      await generateWasteAnalyticsReport(startDate, endDate, areaFilter === 'all' ? undefined : areaFilter);
    } else {
      await generateComplianceReport(startDate, endDate, areaFilter === 'all' ? undefined : areaFilter);
    }
  };

  return (
    <div className="min-h-screen bg-background page-enter">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-primary">
                <Building2 className="h-8 w-8" />
                <span className="text-xl font-bold">Corporation Head Dashboard</span>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Executive Level Access
              </Badge>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Global Overview</span>
            </TabsTrigger>
            <TabsTrigger value="complaints" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Complaint Management</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Performance Tracker</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Rewards & Incentives</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Reports & Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Areas</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{globalStats.totalAreas}</div>
                  <p className="text-xs text-muted-foreground">Monitoring zones</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Households</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{globalStats.totalHouseholds.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{globalStats.monthlyGrowth}% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Waste</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{globalStats.totalWaste} tons</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{globalStats.recyclingRate}%</div>
                  <p className="text-xs text-muted-foreground">Above target</p>
                </CardContent>
              </Card>
            </div>

            {/* Area Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Area-wise Performance Overview</CardTitle>
                <CardDescription>Performance metrics across all monitoring areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Area</th>
                        <th className="text-left p-2">Households</th>
                        <th className="text-left p-2">Waste (tons)</th>
                        <th className="text-left p-2">Recycling %</th>
                        <th className="text-left p-2">Complaints</th>
                        <th className="text-left p-2">Performance</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {areaData.map((area) => (
                        <tr key={area.area} className="border-b">
                          <td className="p-2 font-medium">{area.area}</td>
                          <td className="p-2">{area.households.toLocaleString()}</td>
                          <td className="p-2">{area.waste}</td>
                          <td className="p-2 text-success">{area.recycling}%</td>
                          <td className="p-2">
                            <Badge variant={area.complaints > 10 ? "destructive" : "secondary"}>
                              {area.complaints}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Badge variant={area.performance >= 85 ? "default" : area.performance >= 75 ? "secondary" : "destructive"}>
                              {area.performance}%
                            </Badge>
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
                <CardTitle>Corporation-wide Trends</CardTitle>
                <CardDescription>Monthly waste management and performance trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={trendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="waste" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="recycled" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            {/* Escalated Complaints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Escalated Complaints</span>
                  <Badge variant="destructive">{escalatedComplaints.length}</Badge>
                </CardTitle>
                <CardDescription>High-priority complaints requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {escalatedComplaints.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
                    <p>No escalated complaints at this time</p>
                  </div>
                ) : (
                  escalatedComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg p-4 border-destructive/20 bg-destructive/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{complaint.house_id}</Badge>
                          <span className="font-medium">{complaint.subject}</span>
                          <Badge variant="destructive">{complaint.priority}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(complaint.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{complaint.description}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleAssignComplaint(complaint.id, 'admin-1')}>
                          Assign to Admin
                        </Button>
                        <Button size="sm" variant="outline">
                          View Full Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact Resident
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Assignment Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Complaint Assignment & Tracking</CardTitle>
                <CardDescription>Assign complaints to field teams and track progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Select Area</Label>
                    <Select value={areaFilter} onValueChange={setAreaFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Areas</SelectItem>
                        <SelectItem value="sector-1">Sector 1</SelectItem>
                        <SelectItem value="sector-2">Sector 2</SelectItem>
                        <SelectItem value="sector-3">Sector 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Complaint Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collection">Collection Issues</SelectItem>
                        <SelectItem value="equipment">Equipment Problems</SelectItem>
                        <SelectItem value="segregation">Segregation Concerns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="bg-primary-gradient">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter & Assign
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Area Performance Distribution</CardTitle>
                  <CardDescription>Performance rating across all areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance Trends</CardTitle>
                  <CardDescription>Performance tracking over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="complaints" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="schemes" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Status Overview</CardTitle>
                <CardDescription>Real-time status of all operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-sm text-muted-foreground">Pending Reviews</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Requires Attention</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reward System Management</CardTitle>
                <CardDescription>Configure incentives and track participation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Incentive Programs */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Active Incentive Programs</h4>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Eco Champion Program</h5>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Monthly rewards for top-performing households in waste segregation
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-2 bg-primary/5 rounded">
                        <div className="font-bold">2,847</div>
                        <div className="text-xs text-muted-foreground">Participants</div>
                      </div>
                      <div className="p-2 bg-success/5 rounded">
                        <div className="font-bold">₹45,600</div>
                        <div className="text-xs text-muted-foreground">Rewards Distributed</div>
                      </div>
                      <div className="p-2 bg-accent/5 rounded">
                        <div className="font-bold">23%</div>
                        <div className="text-xs text-muted-foreground">Participation Increase</div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">Zero Waste Challenge</h5>
                      <Badge variant="secondary">Planned</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Quarterly challenge for households to minimize general waste
                    </p>
                    <Button size="sm" variant="outline">Configure Program</Button>
                  </div>
                </div>

                {/* Reward Configuration */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Configure New Reward Program</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Program Name</Label>
                      <Input placeholder="Enter program name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Target Areas</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select areas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Areas</SelectItem>
                          <SelectItem value="sector-1">Sector 1</SelectItem>
                          <SelectItem value="sector-2">Sector 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Reward Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reward type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash Rewards</SelectItem>
                          <SelectItem value="vouchers">Shopping Vouchers</SelectItem>
                          <SelectItem value="points">Eco Points</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Allocation</Label>
                      <Input placeholder="Enter budget amount" type="number" />
                    </div>
                  </div>
                  <Button className="bg-primary-gradient">
                    <Award className="h-4 w-4 mr-2" />
                    Create Reward Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Report Generation */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Executive Reports</CardTitle>
                <CardDescription>Create comprehensive reports for government audits and stakeholder reviews</CardDescription>
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
                        <SelectItem value="yearly">Yearly</SelectItem>
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
                        <SelectItem value="sector-3">Sector 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Report Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => handleGenerateReport('analytics')} className="bg-primary-gradient">
                    <Download className="h-4 w-4 mr-2" />
                    Waste Analytics Report
                  </Button>
                  <Button onClick={() => handleGenerateReport('compliance')} variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Compliance Report
                  </Button>
                  <Button variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Performance Report
                  </Button>
                  <Button variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    Incentive Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Government Coordination */}
            <Card>
              <CardHeader>
                <CardTitle>Government Coordination</CardTitle>
                <CardDescription>Manage collaboration with higher authorities and verify admin credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Active Government Schemes</h4>
                    {schemes.slice(0, 3).map((scheme) => (
                      <div key={scheme.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{scheme.title}</h5>
                          <Badge variant={scheme.status === 'active' ? 'default' : 'secondary'}>
                            {scheme.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{scheme.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Admin Verification Queue</h4>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Raj Kumar Singh</span>
                          <Badge variant="secondary">Pending</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Government ID: GOV123456</p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm">Approve</Button>
                          <Button size="sm" variant="outline">Review</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Priya Sharma</span>
                          <Badge variant="secondary">Pending</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Government ID: GOV789012</p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm">Approve</Button>
                          <Button size="sm" variant="outline">Review</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CorporationDashboard;