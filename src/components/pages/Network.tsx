import React, { useState } from 'react';
import { useAuth } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  UserPlus, 
  UserCheck, 
  Search, 
  MessageCircle,
  Users,
  UserMinus,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Network = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('suggestions');

  // Mock network data
  const networkStats = {
    following: 156,
    followers: 289
  };

  const suggestions = [
    {
      id: '5',
      name: 'Alice Martinez',
      title: 'Data Scientist at Facebook',
      college: 'Stanford University',
      department: 'Computer Science',
      graduationYear: 2019,
      userType: 'alumni',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 8,
      skills: ['Python', 'Machine Learning', 'Data Analysis']
    },
    {
      id: '6',
      name: 'David Wilson',
      title: 'Product Manager at Apple',
      college: 'Stanford University',
      department: 'Business Administration',
      graduationYear: 2018,
      userType: 'alumni',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 12,
      skills: ['Product Strategy', 'User Research', 'Analytics']
    },
    {
      id: '7',
      name: 'Lisa Chen',
      title: 'Final Year Student',
      college: 'Stanford University',
      department: 'Computer Science',
      graduationYear: 2024,
      userType: 'student',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 5,
      skills: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: '8',
      name: 'Dr. Robert Kim',
      title: 'Professor of Data Science',
      college: 'Stanford University',
      department: 'Computer Science',
      userType: 'faculty',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 3,
      skills: ['Research', 'Machine Learning', 'Statistics']
    }
  ];

  const following = [
    {
      id: '9',
      name: 'Sarah Johnson',
      title: 'Software Engineer at Google',
      college: 'Stanford University',
      userType: 'alumni',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=150&h=150&fit=crop&crop=face',
      followedDate: '2024-01-15'
    },
    {
      id: '10',
      name: 'Michael Brown',
      title: 'UX Designer at Netflix',
      college: 'Stanford University',
      userType: 'alumni',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      followedDate: '2024-02-20'
    }
  ];

  const followers = [
    {
      id: '11',
      name: 'Emma Davis',
      title: 'Final Year CS Student',
      college: 'Stanford University',
      userType: 'student',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      followedDate: '2024-02-10'
    },
    {
      id: '12',
      name: 'James Wilson',
      title: 'Marketing Manager at Adobe',
      college: 'Stanford University',
      userType: 'alumni',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      followedDate: '2024-01-25'
    }
  ];

  const handleFollow = (personId: string) => {
    console.log('Following user:', personId);
  };

  const handleUnfollow = (personId: string) => {
    console.log('Unfollowing user:', personId);
  };

  const handleMessage = (personId: string) => {
    navigate('/messages', { state: { selectedUser: personId } });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const PersonCard = ({ person, showFollowButton = false, showUnfollowButton = false, showMessageButton = true }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar 
            className="h-16 w-16 cursor-pointer"
            onClick={() => navigate(`/profile/${person.id}`)}
          >
            <AvatarImage src={person.profileImage} />
            <AvatarFallback>
              {person.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 
                className="font-medium truncate cursor-pointer hover:underline"
                onClick={() => navigate(`/profile/${person.id}`)}
              >
                {person.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {person.userType}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{person.title}</p>
            
            <div className="text-xs text-muted-foreground mb-3">
              <span>{person.college}</span>
              {person.department && <span> • {person.department}</span>}
              {person.graduationYear && <span> • Class of {person.graduationYear}</span>}
            </div>

            {person.mutualConnections && (
              <p className="text-xs text-muted-foreground mb-3">
                {person.mutualConnections} mutual connections
              </p>
            )}

            {person.skills && (
              <div className="flex flex-wrap gap-1 mb-3">
                {person.skills.slice(0, 3).map((skill: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {person.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{person.skills.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <div className="flex space-x-2">
              {showFollowButton && (
                <Button 
                  size="sm" 
                  onClick={() => handleFollow(person.id)}
                  className="flex items-center space-x-1"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Connect</span>
                </Button>
              )}
              
              {showUnfollowButton && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleUnfollow(person.id)}
                  className="flex items-center space-x-1"
                >
                  <UserMinus className="h-4 w-4" />
                  <span>Unfollow</span>
                </Button>
              )}
              
              {showMessageButton && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleMessage(person.id)}
                  className="flex items-center space-x-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Message</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header with Stats */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Your Network</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{networkStats.following}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{networkStats.followers}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{suggestions.length}</div>
                <div className="text-sm text-muted-foreground">Suggestions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">45</div>
                <div className="text-sm text-muted-foreground">Mutual</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search people by name, college, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
              <Button variant="outline">
                <Filter className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Network Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="suggestions" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Suggestions</span>
              <Badge variant="secondary">{suggestions.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4" />
              <span>Following</span>
              <Badge variant="secondary">{following.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Followers</span>
              <Badge variant="secondary">{followers.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions">
            <div>
              <h2 className="text-lg font-semibold mb-4">People you may know</h2>
              <div className="grid gap-4">
                {suggestions.map((person) => (
                  <PersonCard 
                    key={person.id} 
                    person={person} 
                    showFollowButton={true}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="following">
            <div>
              <h2 className="text-lg font-semibold mb-4">People you're following</h2>
              <div className="grid gap-4">
                {following.map((person) => (
                  <PersonCard 
                    key={person.id} 
                    person={person} 
                    showUnfollowButton={true}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="followers">
            <div>
              <h2 className="text-lg font-semibold mb-4">Your followers</h2>
              <div className="grid gap-4">
                {followers.map((person) => (
                  <PersonCard 
                    key={person.id} 
                    person={person} 
                    showFollowButton={true}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Network;