import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  Calendar,
  ExternalLink,
  Bookmark,
  Share2,
  BookOpen,
  Award,
  Play,
  Star,
  Users
} from 'lucide-react';

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('jobs');

  // Mock opportunities data (simplified)
  const jobs = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      type: 'Full-time',
      salary: '$150,000 - $200,000',
      posted: '2 days ago',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
      description: 'Join our team to build the next generation of search technologies.',
      requirements: ['5+ years experience', 'Python/Java/C++', 'Distributed Systems'],
      postedBy: {
        name: 'Sarah Johnson',
        title: 'Senior Recruiter at Google',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=150&h=150&fit=crop&crop=face'
      }
    }
  ];

  const internships = [
    {
      id: '3',
      title: 'Software Engineering Intern',
      company: 'Apple',
      location: 'Cupertino, CA',
      type: 'Summer Internship',
      salary: '$8,000/month',
      posted: '3 days ago',
      logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop',
      description: 'Work on iOS development and contribute to apps used by millions.',
      requirements: ['CS/Engineering student', 'iOS Development', 'Swift/Objective-C'],
      duration: '12 weeks',
      postedBy: {
        name: 'Lisa Chen',
        title: 'University Recruiter at Apple',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      }
    }
  ];

  const competitions = [
    {
      id: '5',
      title: 'AI Innovation Challenge 2024',
      organizer: 'Stanford AI Lab',
      prize: '$50,000',
      deadline: '2024-04-15',
      participants: '500+',
      category: 'Artificial Intelligence',
      description: 'Develop innovative AI solutions for real-world problems.',
      requirements: ['Team of 2-4 members', 'AI/ML focus', 'Working prototype'],
      postedBy: {
        name: 'Dr. Robert Kim',
        title: 'Professor at Stanford AI Lab',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    }
  ];

  // Mock learning resources
  const learningResources = [
    {
      id: '7',
      title: 'Advanced Machine Learning Specialization',
      provider: 'Stanford Online',
      type: 'Course Series',
      duration: '6 months',
      level: 'Advanced',
      price: 'Free (Audit) / $79/month (Certificate)',
      rating: 4.8,
      enrolled: '45,000+',
      description: 'Master advanced machine learning algorithms including deep learning, reinforcement learning, and neural networks.',
      skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow'],
      instructor: {
        name: 'Dr. Andrew Ng',
        title: 'Professor at Stanford University',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'
    },
    {
      id: '8',
      title: 'AWS Cloud Practitioner Certification',
      provider: 'Amazon Web Services',
      type: 'Certification',
      duration: '3 months',
      level: 'Beginner',
      price: '$100 (Exam Fee)',
      rating: 4.7,
      enrolled: '120,000+',
      description: 'Get certified in AWS cloud fundamentals. Perfect for alumni looking to transition into cloud computing roles.',
      skills: ['AWS', 'Cloud Computing', 'Infrastructure', 'Security'],
      instructor: {
        name: 'AWS Training Team',
        title: 'Certified AWS Instructors',
        profileImage: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=150&h=150&fit=crop'
      },
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching opportunities:', searchQuery);
  };

  const handleApply = (opportunityId: string) => {
    console.log('Applying to opportunity:', opportunityId);
  };

  const handleBookmark = (opportunityId: string) => {
    console.log('Bookmarking opportunity:', opportunityId);
  };

  const OpportunityCard = ({ item, type }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {type !== 'competition' && (
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.logo} alt={item.company} className="h-full w-full object-cover" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground">
                  {type === 'competition' ? item.organizer : item.company}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleBookmark(item.id)}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {type === 'job' && (
                <>
                  <Badge variant="secondary">{item.type}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {item.salary}
                  </div>
                </>
              )}
              
              {type === 'internship' && (
                <>
                  <Badge variant="secondary">{item.type}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.duration}
                  </div>
                </>
              )}
              
              {type === 'competition' && (
                <>
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4 mr-1" />
                    {item.prize}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    Deadline: {new Date(item.deadline).toLocaleDateString()}
                  </div>
                </>
              )}
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {item.posted || `${item.participants} participants`}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Requirements:</h4>
              <div className="flex flex-wrap gap-1">
                {item.requirements.map((req: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={item.postedBy.profileImage} />
                  <AvatarFallback className="text-xs">
                    {item.postedBy.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs text-muted-foreground">
                  Posted by {item.postedBy.name}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View</span>
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleApply(item.id)}
                  className="flex items-center space-x-1"
                >
                  <span>{type === 'competition' ? 'Register' : 'Apply'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LearningCard = ({ resource }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div className="h-40 w-full overflow-hidden rounded-t-lg">
          <img 
            src={resource.thumbnail} 
            alt={resource.title} 
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="secondary">{resource.type}</Badge>
                <Badge variant="outline">{resource.level}</Badge>
              </div>
              <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
              <p className="text-muted-foreground text-sm">{resource.provider}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleBookmark(resource.id)}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {resource.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              {resource.rating}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {resource.enrolled}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              {resource.price}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Skills You'll Learn:</h4>
            <div className="flex flex-wrap gap-1">
              {resource.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={resource.instructor.profileImage} />
                <AvatarFallback className="text-xs">
                  {resource.instructor.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs text-muted-foreground">
                {resource.instructor.name}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center space-x-1"
              >
                <Play className="h-4 w-4" />
                <span>Preview</span>
              </Button>
              <Button 
                size="sm"
                className="flex items-center space-x-1"
              >
                <BookOpen className="h-4 w-4" />
                <span>Enroll</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Opportunities</h1>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search jobs, internships, competitions, or courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </CardContent>
        </Card>

        {/* Opportunities Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="jobs" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Jobs</span>
              <Badge variant="secondary">{jobs.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="internships" className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4" />
              <span>Internships</span>
              <Badge variant="secondary">{internships.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="competitions" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Competitions</span>
              <Badge variant="secondary">{competitions.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Learning</span>
              <Badge variant="secondary">{learningResources.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Job Opportunities</h2>
              {jobs.map((job) => (
                <OpportunityCard key={job.id} item={job} type="job" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="internships">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Internship Opportunities</h2>
              {internships.map((internship) => (
                <OpportunityCard key={internship.id} item={internship} type="internship" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="competitions">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Competitions & Challenges</h2>
              {competitions.map((competition) => (
                <OpportunityCard key={competition.id} item={competition} type="competition" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="learning">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Learning & Development</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Award className="h-4 w-4 mr-1" />
                    Browse Certifications
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningResources.map((resource) => (
                  <LearningCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Opportunities;