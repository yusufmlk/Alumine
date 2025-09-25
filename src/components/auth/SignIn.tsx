import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuth, UserType } from "../../App";
import {
  GraduationCap,
  Users,
  BookOpen,
  Building,
  AlertCircle,
} from "lucide-react";

const SignIn = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "alumni" as UserType,
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login - in real app, this would authenticate with backend
    const mockUser = {
      id: "1",
      name: "Mohammad Yusuf Malik",
      email: formData.email,
      userType: formData.userType,
      college: "bbditm",
      department: "information technology",
      graduationYear: 2020,
      currentPosition: "Software Engineer at Google",
      bio: "Passionate software engineer with 4+ years of experience in full-stack development.",
      skills: ["React", "Node.js", "Python", "Machine Learning"],
      experience: [
        {
          title: "Software Engineer",
          company: "Google",
          duration: "2020 - Present",
          description: "Working on cloud infrastructure and ML systems",
        },
      ],
      achievements: [
        {
          title: "Outstanding Graduate Award",
          description: "Received for academic excellence",
          date: "2020-05-15",
        },
      ],
      cgpa: 8.8,
    };

    login(mockUser);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock forgot password functionality
    setResetEmailSent(true);
    setTimeout(() => {
      setResetEmailSent(false);
      setShowForgotPassword(false);
      setForgotPasswordEmail("");
    }, 3000);
  };

  const userTypeConfig = {
    alumni: { icon: GraduationCap, label: "Alumni", color: "text-blue-600" },
    student: { icon: BookOpen, label: "Student", color: "text-green-600" },
    faculty: { icon: Users, label: "Faculty", color: "text-purple-600" },
    college: { icon: Building, label: "College", color: "text-orange-600" },
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              Enter your college email to receive password reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resetEmailSent ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Password reset instructions have been sent to your email
                  address. Please check your inbox and follow the instructions
                  to reset your password.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgotEmail">College Email Address</Label>
                  <Input
                    id="forgotEmail"
                    type="email"
                    placeholder="john@college.edu"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Reset Instructions
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmailSent(false);
                  setForgotPasswordEmail("");
                }}
              >
                Back to Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to AluMine</CardTitle>
          <CardDescription>
            Sign in to your alumni network account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={formData.userType}
            onValueChange={(value) =>
              setFormData({ ...formData, userType: value as UserType })
            }
          >
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {Object.entries(userTypeConfig).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <TabsTrigger
                    key={type}
                    value={type}
                    className="flex flex-col gap-1 p-2"
                  >
                    <Icon className={`h-4 w-4 ${config.color}`} />
                    <span className="text-xs">{config.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.keys(userTypeConfig).map((type) => (
              <TabsContent key={type} value={type}>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your college email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-auto p-0 text-xs text-primary hover:underline"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In as {userTypeConfig[type as UserType].label}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
