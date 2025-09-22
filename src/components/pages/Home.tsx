import React, { useState } from 'react';
import { useAuth } from '../../App';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  BookmarkPlus, 
  MoreHorizontal,
  Bell,
  Calendar as CalendarIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState('');

  // Mock data for posts
  const posts = [
    {
      id: '1',
      author: {
        id: '2',
        name: 'Sarah Johnson',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=150&h=150&fit=crop&crop=face',
        title: 'Software Engineer at Google',
        userType: 'alumni'
      },
      content: 'Excited to announce that I\'ve been promoted to Senior Software Engineer! Thank you to everyone who supported me throughout this journey. The skills I learned during my time at university have been invaluable.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
      likes: 42,
      comments: 8,
      timeAgo: '2 hours ago'
    },
    {
      id: '2',
      author: {
        id: '3',
        name: 'Dr. Michael Chen',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        title: 'Professor of Computer Science',
        userType: 'faculty'
      },
      content: 'Our research paper on "Machine Learning Applications in Healthcare" has been accepted for publication in Nature! Proud of our team\'s hard work.',
      likes: 87,
      comments: 15,
      timeAgo: '5 hours ago'
    },
    {
      id: '3',
      author: {
        id: '4',
        name: 'Emma Davis',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        title: 'Final Year CS Student',
        userType: 'student'
      },
      content: 'Just completed my internship at Microsoft! Looking forward to applying everything I learned in my final semester. Thank you to the career services team for their support.',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop',
      likes: 28,
      comments: 12,
      timeAgo: '1 day ago'
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: '1',
      type: 'announcement',
      title: 'Career Fair 2024',
      message: 'Annual career fair scheduled for March 15-16. Register now!',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'event',
      title: 'Alumni Meetup',
      message: 'Monthly alumni meetup this Friday at 6 PM.',
      time: '1 day ago'
    },
    {
      id: '3',
      type: 'scholarship',
      title: 'New Scholarship Program',
      message: 'Applications open for the Excellence Scholarship 2024.',
      time: '2 days ago'
    }
  ];

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // In a real app, this would send to backend
      console.log('Creating post:', newPost);
      setNewPost('');
    }
  };

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
  };

  const navigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Notifications */}
          <div className="lg:col-span-3">
            <Card className="sticky top-20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h3>College Notices</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              {/* Create Post */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="cursor-pointer" onClick={() => navigateToProfile(user?.id || '')}>
                      <AvatarImage src={user?.profileImage} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="What's on your mind?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[80px] border-none resize-none focus:ring-0"
                      />
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-2">
                          {/* Add media buttons here if needed */}
                        </div>
                        <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts */}
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar 
                        className="cursor-pointer" 
                        onClick={() => navigateToProfile(post.author.id)}
                      >
                        <AvatarImage src={post.author.profileImage} />
                        <AvatarFallback>
                          {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 
                            className="font-medium cursor-pointer hover:underline"
                            onClick={() => navigateToProfile(post.author.id)}
                          >
                            {post.author.name}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {post.author.userType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.author.title}</p>
                        <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-sm leading-relaxed">{post.content}</p>
                      {post.image && (
                        <div className="mt-3 rounded-lg overflow-hidden">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <Separator className="mb-3" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-muted-foreground hover:text-red-500"
                        >
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleComment(post.id)}
                          className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="flex items-center space-x-2 text-muted-foreground hover:text-green-500"
                        >
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">Share</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Profile */}
          <div className="lg:col-span-3">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar 
                    className="h-16 w-16 mx-auto mb-4 cursor-pointer" 
                    onClick={() => navigateToProfile(user?.id || '')}
                  >
                    <AvatarImage src={user?.profileImage} />
                    <AvatarFallback className="text-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{user?.currentPosition || `${user?.userType} at ${user?.college}`}</p>
                  <Badge variant="outline" className="mb-4">
                    {user?.userType}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.college}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.department}</span>
                  </div>
                  {user?.graduationYear && (
                    <div className="flex items-center space-x-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>Class of {user.graduationYear}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigateToProfile(user?.id || '')}
                  >
                    View Full Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate('/calendar')}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Calendar
                  </Button>
                </div>

                {user?.skills && user.skills.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <h4 className="text-sm font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {user.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {user.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;