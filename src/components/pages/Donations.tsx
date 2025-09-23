import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Heart,
  GraduationCap,
  Building,
  Users,
  Target,
  DollarSign,
  Calendar,
  Trophy,
  BookOpen,
  Lightbulb,
  Zap,
} from "lucide-react";
import { useAuth } from "../../App";

const Donations = () => {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const predefinedAmounts = ["$25", "$50", "$100", "$250", "$500", "$1000"];

  // Mock donation campaigns
  const campaigns = [
    {
      id: "1",
      title: "New Computer Science Lab",
      description:
        "Help us build a state-of-the-art computer science laboratory with the latest equipment for our students.",
      category: "Infrastructure",
      targetAmount: 500000,
      raisedAmount: 325000,
      contributors: 156,
      daysLeft: 45,
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop",
      organizer: {
        name: "CS Department",
        role: "Department Head",
        profileImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: "2",
      title: "Student Scholarship Fund",
      description:
        "Support talented students from underprivileged backgrounds to pursue their dreams in higher education.",
      category: "Scholarships",
      targetAmount: 200000,
      raisedAmount: 145000,
      contributors: 89,
      daysLeft: 30,
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop",
      organizer: {
        name: "Alumni Association",
        role: "President",
        profileImage:
          "https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: "3",
      title: "Research Innovation Grant",
      description:
        "Fund cutting-edge research projects in artificial intelligence and sustainable technology.",
      category: "Research",
      targetAmount: 300000,
      raisedAmount: 85000,
      contributors: 42,
      daysLeft: 60,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=300&fit=crop",
      organizer: {
        name: "Research Committee",
        role: "Director of Research",
        profileImage:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    },
  ];

  // Donation categories
  const categories = [
    {
      id: "scholarships",
      name: "Scholarships",
      icon: GraduationCap,
      description: "Support student education and financial aid",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      icon: Building,
      description: "Build and improve campus facilities",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "research",
      name: "Research",
      icon: Lightbulb,
      description: "Fund innovative research projects",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "sports",
      name: "Sports & Athletics",
      icon: Trophy,
      description: "Support athletic programs and facilities",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "library",
      name: "Library & Resources",
      icon: BookOpen,
      description: "Enhance library resources and digital access",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      id: "emergency",
      name: "Emergency Fund",
      icon: Zap,
      description: "Support students in crisis situations",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  // Recent donors
  // const recentDonors = [
  //   {
  //     name: 'John Smith',
  //     amount: 500,
  //     message: 'Happy to support the next generation of engineers!',
  //     timeAgo: '2 hours ago',
  //     profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  //   },
  //   {
  //     name: 'Mary Johnson',
  //     amount: 250,
  //     message: 'Education is the key to a better future.',
  //     timeAgo: '5 hours ago',
  //     profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=150&h=150&fit=crop&crop=face'
  //   },
  //   {
  //     name: 'David Wilson',
  //     amount: 1000,
  //     message: 'Proud to give back to my alma mater.',
  //     timeAgo: '1 day ago',
  //     profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  //   }
  // ];

  const handleDonate = (campaignId: string, amount: string) => {
    console.log("Donating to campaign:", campaignId, "Amount:", amount);
    // In a real app, this would process the donation
    alert(`Thank you for your donation of ${amount}!`);
  };

  const calculateProgress = (raised: number, target: number) => {
    return (raised / target) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Make a Difference</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your contributions help build a better future for students and
            advance education, research, and campus life.
          </p>
        </div>

        {/* Donation Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Donation Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCategory === category.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4`}
                    >
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Active Campaigns */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
            <div className="space-y-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {campaign.category}
                        </Badge>
                        <h3 className="text-lg font-semibold mb-2">
                          {campaign.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {campaign.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          ${campaign.raisedAmount.toLocaleString()} raised
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ${campaign.targetAmount.toLocaleString()} goal
                        </span>
                      </div>
                      <Progress
                        value={calculateProgress(
                          campaign.raisedAmount,
                          campaign.targetAmount
                        )}
                        className="mb-2"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{campaign.contributors} contributors</span>
                        <span>{campaign.daysLeft} days left</span>
                      </div>
                    </div>

                    {/* Organizer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={campaign.organizer.profileImage} />
                          <AvatarFallback>
                            {campaign.organizer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {campaign.organizer.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {campaign.organizer.role}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          handleDonate(
                            campaign.id,
                            selectedAmount || customAmount
                          )
                        }
                      >
                        Donate Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Donate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Quick Donate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={
                            selectedAmount === amount ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount("");
                        }}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!selectedAmount && !customAmount}
                    onClick={() =>
                      handleDonate(
                        "general",
                        selectedAmount || `$${customAmount}`
                      )
                    }
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Donate{" "}
                    {selectedAmount || (customAmount ? `$${customAmount}` : "")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Donors */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Recent Donors</CardTitle>
              </CardHeader>
              <CardContent> */}
            {/* <div className="space-y-4">
                  {recentDonors.map((donor, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={donor.profileImage} />
                        <AvatarFallback>
                          {donor.name.split(' ').map(n => n[0]).join('')} */}
            {/* </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{donor.name}</p>
                          <span className="text-sm font-semibold text-green-600">
                            ${donor.amount}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{donor.message}</p>
                        <p className="text-xs text-muted-foreground">{donor.timeAgo}</p>
                      </div>
                    </div>
                  ))}
            //     </div> */}
            {/* //   </CardContent>
            // </Card> */}

            {/* Impact Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      $2,500
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Donated
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">12</div>
                      <div className="text-xs text-muted-foreground">
                        Projects Supported
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">45</div>
                      <div className="text-xs text-muted-foreground">
                        Students Helped
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Donation History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;
