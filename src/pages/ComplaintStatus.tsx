import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, CheckCircle, Clock, MessageSquare, 
  FileText, Home, MapPin, User, Calendar, Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import { useComplaints } from "@/hooks/useComplaints";
import { useProfile } from "@/hooks/useProfile";

const ComplaintStatus = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const [complaintForm, setComplaintForm] = useState({
    subject: "",
    description: "",
    complaint_type: "general",
    location: "",
    priority: "medium"
  });

  const { complaints, submitComplaint, loading } = useComplaints();
  const { profile } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await submitComplaint(complaintForm);
    if (!error) {
      setComplaintForm({
        subject: "",
        description: "",
        complaint_type: "general",
        location: "",
        priority: "medium"
      });
      setActiveTab("status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'escalated':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'escalated':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
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
                <MessageSquare className="h-8 w-8" />
                <span className="text-xl font-bold">Complaint Management</span>
              </div>
              <Badge variant="secondary">House ID: {profile?.house_id || "Loading..."}</Badge>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Submit Complaint</span>
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Track Status</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit New Complaint</CardTitle>
                <CardDescription>
                  Report issues related to waste collection, equipment problems, or other concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={complaintForm.subject}
                        onChange={(e) => setComplaintForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief description of the issue"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="complaint_type">Complaint Type</Label>
                      <Select 
                        value={complaintForm.complaint_type} 
                        onValueChange={(value) => setComplaintForm(prev => ({ ...prev, complaint_type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Issue</SelectItem>
                          <SelectItem value="collection">Waste Collection</SelectItem>
                          <SelectItem value="equipment">Equipment Problem</SelectItem>
                          <SelectItem value="segregation">Segregation Issue</SelectItem>
                          <SelectItem value="billing">Billing Problem</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (Optional)</Label>
                      <Input
                        id="location"
                        value={complaintForm.location}
                        onChange={(e) => setComplaintForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Specific location or landmark"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select 
                        value={complaintForm.priority} 
                        onValueChange={(value) => setComplaintForm(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      value={complaintForm.description}
                      onChange={(e) => setComplaintForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Please provide detailed information about the issue, including when it occurred and any relevant details"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>House ID: {profile?.house_id}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Name: {profile?.full_name}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      We'll use this information to contact you about your complaint
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-primary-gradient" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Complaint"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Complaints Status</CardTitle>
                <CardDescription>
                  Track the progress of all your submitted complaints
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">Loading complaints...</p>
                  </div>
                ) : complaints.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Complaints Yet</h3>
                    <p className="text-muted-foreground mb-4">You haven't submitted any complaints yet.</p>
                    <Button onClick={() => setActiveTab("submit")}>
                      Submit Your First Complaint
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {complaints.map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(complaint.status)}
                            <h4 className="font-medium">{complaint.subject}</h4>
                            <Badge variant={getPriorityColor(complaint.priority)}>
                              {complaint.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusColor(complaint.status)}>
                              {complaint.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              #{complaint.id.slice(0, 8)}
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Submitted: {new Date(complaint.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Type: {complaint.complaint_type}</span>
                          </div>
                          {complaint.location && (
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>Location: {complaint.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground border-l-2 border-muted pl-4">
                          {complaint.description}
                        </p>

                        {/* Admin Response */}
                        {complaint.admin_response && (
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <h5 className="font-medium text-sm mb-2">Admin Response:</h5>
                            <p className="text-sm">{complaint.admin_response}</p>
                          </div>
                        )}

                        {/* Resolution Details */}
                        {complaint.resolution_details && (
                          <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                            <h5 className="font-medium text-sm mb-2 text-success">Resolution:</h5>
                            <p className="text-sm">{complaint.resolution_details}</p>
                            {complaint.resolved_at && (
                              <p className="text-xs text-muted-foreground mt-2">
                                Resolved on: {new Date(complaint.resolved_at).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Progress Timeline */}
                        <div className="flex items-center space-x-4 pt-2 border-t">
                          <div className={`flex items-center space-x-2 ${complaint.status !== 'pending' ? 'text-success' : 'text-muted-foreground'}`}>
                            <div className={`w-2 h-2 rounded-full ${complaint.status !== 'pending' ? 'bg-success' : 'bg-muted'}`} />
                            <span className="text-xs">Submitted</span>
                          </div>
                          <div className="w-8 h-px bg-border" />
                          <div className={`flex items-center space-x-2 ${complaint.status === 'in-progress' || complaint.status === 'resolved' ? 'text-primary' : 'text-muted-foreground'}`}>
                            <div className={`w-2 h-2 rounded-full ${complaint.status === 'in-progress' || complaint.status === 'resolved' ? 'bg-primary' : 'bg-muted'}`} />
                            <span className="text-xs">In Progress</span>
                          </div>
                          <div className="w-8 h-px bg-border" />
                          <div className={`flex items-center space-x-2 ${complaint.status === 'resolved' ? 'text-success' : 'text-muted-foreground'}`}>
                            <div className={`w-2 h-2 rounded-full ${complaint.status === 'resolved' ? 'bg-success' : 'bg-muted'}`} />
                            <span className="text-xs">Resolved</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplaintStatus;