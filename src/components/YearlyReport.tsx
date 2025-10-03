import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  FileText, 
  Calendar,
  Target,
  Award,
  AlertCircle
} from "lucide-react";

export const YearlyReport = () => {
  // Mock yearly data
  const monthlyData = [
    { month: "Jan", organic: 145, recyclable: 120, hazardous: 15, general: 80, target: 280 },
    { month: "Feb", organic: 165, recyclable: 135, hazardous: 12, general: 75, target: 280 },
    { month: "Mar", organic: 180, recyclable: 150, hazardous: 18, general: 90, target: 280 },
    { month: "Apr", organic: 195, recyclable: 160, hazardous: 20, general: 85, target: 280 },
    { month: "May", organic: 210, recyclable: 175, hazardous: 15, general: 70, target: 280 },
    { month: "Jun", organic: 225, recyclable: 190, hazardous: 22, general: 95, target: 280 },
    { month: "Jul", organic: 240, recyclable: 200, hazardous: 18, general: 88, target: 280 },
    { month: "Aug", organic: 220, recyclable: 185, hazardous: 25, general: 92, target: 280 },
    { month: "Sep", organic: 235, recyclable: 195, hazardous: 20, general: 78, target: 280 },
    { month: "Oct", organic: 250, recyclable: 210, hazardous: 16, general: 82, target: 280 },
    { month: "Nov", organic: 265, recyclable: 225, hazardous: 19, general: 75, target: 280 },
    { month: "Dec", organic: 280, recyclable: 240, hazardous: 23, general: 87, target: 280 }
  ];

  const yearlyStats = [
    {
      title: "Total Waste Processed",
      value: "2,847 kg",
      change: "+12.5%",
      trend: "up",
      description: "Compared to last year"
    },
    {
      title: "Recycling Rate",
      value: "78.3%",
      change: "+5.2%",
      trend: "up",
      description: "Above national average"
    },
    {
      title: "Cost Savings",
      value: "₹45,680",
      change: "+8.9%",
      trend: "up",
      description: "Through efficient sorting"
    },
    {
      title: "Carbon Footprint Reduced",
      value: "1.2 tons CO₂",
      change: "+15.3%",
      trend: "up",
      description: "Environmental impact"
    }
  ];

  const achievements = [
    { title: "Zero Waste Week", month: "March", description: "Achieved 95% recycling rate" },
    { title: "Best Performer", month: "July", description: "Top in district rankings" },
    { title: "Eco Champion", month: "September", description: "Exceeded annual targets" },
    { title: "Green Excellence", month: "November", description: "Lowest contamination rate" }
  ];

  const downloadReport = (type: string) => {
    // Mock download functionality
    console.log(`Downloading ${type} report...`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Yearly Waste Management Report</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Comprehensive analysis for 2024
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => downloadReport('detailed')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => downloadReport('summary')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Summary
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="targets">Targets</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Yearly Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {yearlyStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 text-success" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-destructive" />
                          )}
                          <span className={`text-xs ${
                            stat.trend === "up" ? "text-success" : "text-destructive"
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Monthly Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Waste Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="organic"
                      stackId="1"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="recyclable"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="general"
                      stackId="1"
                      stroke="#64748b"
                      fill="#64748b"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="hazardous"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Waste Processing Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="organic"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ fill: "#22c55e" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="recyclable"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#f59e0b" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>2024 Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 border rounded-lg"
                    >
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.month} • {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Recycling Target</span>
                        <span>78.3% / 75%</span>
                      </div>
                      <Progress value={78.3} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Cost Efficiency</span>
                        <span>92% / 85%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Contamination Rate</span>
                        <span>3.2% / 5%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>User Satisfaction</span>
                        <span>94% / 90%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="targets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">2025 Targets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recycling Rate</span>
                    <Badge variant="outline">85%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cost Reduction</span>
                    <Badge variant="outline">15%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Zero Waste Days</span>
                    <Badge variant="outline">50 days</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Action Items</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Increase organic waste processing</p>
                    <p className="text-muted-foreground">Target: 15% improvement</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Reduce contamination</p>
                    <p className="text-muted-foreground">Target: Below 2%</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Expand user education</p>
                    <p className="text-muted-foreground">Target: 95% awareness</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Upgrade AI detection</p>
                    <p className="text-muted-foreground">Improve accuracy to 98%</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Add more bins</p>
                    <p className="text-muted-foreground">Handle peak usage</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Community workshops</p>
                    <p className="text-muted-foreground">Monthly education sessions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};