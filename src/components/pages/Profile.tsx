import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { 
  Edit, 
  MapPin, 
  Calendar as CalendarIcon, 
  Briefcase, 
  GraduationCap,
  Award,
  Plus,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Users,
  MessageCircle
} from 'lucide-react';

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(user);
  
  // Determine if this is the current user's profile
  const isOwnProfile = !userId || userId === user?.id;
  const profileUser = isOwnProfile ? user : {
    // Mock data for other user's profile
    id: userId,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    userType: 'alumni' as const,
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=300&h=300&fit=crop&crop=face',
    college: 'Stanford University',
    department: 'Computer Science',
    graduationYear: 2020,
    currentPosition: 'Senior Software Engineer at Google',
    bio: 'Passionate software engineer with 4+ years of experience in full-stack development. I love building scalable systems and mentoring junior developers.',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'AWS', 'Docker'],
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'Google',
        duration: '2022 - Present',
        description: 'Leading development of cloud infrastructure and ML systems'
      },
      {
        title: 'Software Engineer',
        company: 'Microsoft',
        duration: '2020 - 2022',
        description: 'Developed web applications and APIs for Azure services'
      }
    ],
    achievements: [
      {
        title: 'Outstanding Graduate Award',
        description: 'Received for academic excellence and research contributions',
        date: '2020-05-15'
      },
      {
        title: 'Google Cloud Certified',
        description: 'Professional Cloud Architect certification',
        date: '2023-01-10'
      }
    ],
    cgpa: 3.9,
    linkedinProfile: 'https://linkedin.com/in/sarahjohnson'
  };

  // Mock additional data for different user types
  const additionalData = {
    student: {
      cgpa: 3.7,
      credits: 128,
      rank: 'Dean\'s List',
      achievements: [
        { title: 'Hackathon Winner', description: 'First place in university hackathon', date: '2024-02-15' },
        { title: 'Research Assistant', description: 'Working on AI research project', date: '2024-01-10' }
      ]
    },
    faculty: {
      expertise: ['Machine Learning', 'Computer Vision', 'Deep Learning'],
      researchProjects: 3,
      publications: 25,
      courses: ['CS229 - Machine Learning', 'CS231n - Computer Vision']
    },
    college: {
      facultyCount: 150,
      studentCount: 5000,
      departments: ['Computer Science', 'Electrical Engineering', 'Mathematics'],
      established: 1885
    }
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && editedProfile) {
      setEditedProfile({
        ...editedProfile,
        skills: [...(editedProfile.skills || []), newSkill.trim()]
      });
      setNewSkill('');
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        skills: editedProfile.skills?.filter(skill => skill !== skillToRemove) || []
      });
    }
  };

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <p className="text-muted-foreground">The requested profile could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-32 w-32 mx-auto md:mx-0">
                <AvatarImage src={profileUser.profileImage} />
                <AvatarFallback className="text-2xl">
                  {profileUser.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{profileUser.name}</h1>
                    <p className="text-lg text-muted-foreground">{profileUser.currentPosition}</p>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                      <Badge variant="outline">{profileUser.userType}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        {profileUser.college}
                      </div>
                    </div>
                  </div>
                  
                  {isOwnProfile ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                      className="mt-4 md:mt-0"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <Button>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4">{profileUser.bio}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profileUser.department}
                  </div>
                  {profileUser.graduationYear && (
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Class of {profileUser.graduationYear}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {profileUser.email}
                  </div>
                  {profileUser.linkedinProfile && (
                    <div className="flex items-center">
                      <Linkedin className="h-4 w-4 mr-1" />
                      <a href={profileUser.linkedinProfile} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Type Specific Section */}
            {profileUser.userType === 'alumni' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileUser.experience?.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <h4 className="font-medium">{exp.title}</h4>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                        <p className="text-sm mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {profileUser.userType === 'student' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Academic Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {additionalData.student.cgpa}
                      </div>
                      <div className="text-sm text-muted-foreground">CGPA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {additionalData.student.credits}
                      </div>
                      <div className="text-sm text-muted-foreground">Credits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-primary">
                        {additionalData.student.rank}
                      </div>
                      <div className="text-sm text-muted-foreground">Rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {profileUser.userType === 'faculty' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Academic Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {additionalData.faculty.expertise.map((area, index) => (
                          <Badge key={index} variant="secondary">{area}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xl font-bold text-primary">
                          {additionalData.faculty.publications}
                        </div>
                        <div className="text-sm text-muted-foreground">Publications</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-primary">
                          {additionalData.faculty.researchProjects}
                        </div>
                        <div className="text-sm text-muted-foreground">Active Research</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {profileUser.userType === 'college' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Institution Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xl font-bold text-primary">
                        {additionalData.college.facultyCount}
                      </div>
                      <div className="text-sm text-muted-foreground">Faculty Members</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">
                        {additionalData.college.studentCount}
                      </div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Departments</h4>
                    <div className="flex flex-wrap gap-2">
                      {additionalData.college.departments.map((dept, index) => (
                        <Badge key={index} variant="outline">{dept}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(profileUser.userType === 'student' ? additionalData.student.achievements : profileUser.achievements)?.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Skills</CardTitle>
                  {isOwnProfile && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsAddingSkill(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileUser.skills?.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className={isOwnProfile && isEditing ? 'cursor-pointer' : ''}
                      onClick={() => isOwnProfile && isEditing && handleRemoveSkill(skill)}
                    >
                      {skill}
                      {isOwnProfile && isEditing && <span className="ml-1">×</span>}
                    </Badge>
                  ))}
                </div>
                
                {isAddingSkill && (
                  <div className="mt-4 flex space-x-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <Button size="sm" onClick={handleAddSkill}>Add</Button>
                    <Button size="sm" variant="outline" onClick={() => setIsAddingSkill(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Alumni Reunion</span>
                    <span className="text-muted-foreground">Apr 15</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Career Fair</span>
                    <span className="text-muted-foreground">Mar 22</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Tech Talk</span>
                    <span className="text-muted-foreground">Mar 25</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editedProfile?.bio || ''}
                  onChange={(e) => setEditedProfile(prev => prev ? {...prev, bio: e.target.value} : null)}
                  placeholder="Tell us about yourself"
                />
              </div>
              
              <div>
                <Label htmlFor="position">Current Position</Label>
                <Input
                  id="position"
                  value={editedProfile?.currentPosition || ''}
                  onChange={(e) => setEditedProfile(prev => prev ? {...prev, currentPosition: e.target.value} : null)}
                  placeholder="Your current role"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleSaveProfile}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;