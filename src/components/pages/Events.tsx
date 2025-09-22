import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  Plus,
  Search,
  Filter,
  Share2,
  Bookmark,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../App';

const Events = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'virtual'
  });

  // Mock events data
  const upcomingEvents = [
    {
      id: '1',
      title: 'Alumni Tech Talk: AI in Healthcare',
      description: 'Join us for an insightful discussion about the latest applications of artificial intelligence in healthcare with leading industry experts.',
      date: '2024-03-25',
      time: '7:00 PM PST',
      location: 'Virtual Event',
      type: 'virtual',
      attendees: 156,
      maxAttendees: 200,
      organizer: {
        name: 'Dr. Sarah Johnson',
        title: 'Alumni Relations',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=150&h=150&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop',
      tags: ['Technology', 'Healthcare', 'AI']
    },
    {
      id: '2',
      title: 'Annual Alumni Reunion',
      description: 'Come together to celebrate our shared memories and catch up with old friends. Food, drinks, and entertainment provided.',
      date: '2024-04-15',
      time: '2:00 PM PST',
      location: 'Main Campus Auditorium',
      type: 'in-person',
      attendees: 89,
      maxAttendees: 300,
      organizer: {
        name: 'Alumni Association',
        title: 'Event Coordinator',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=300&fit=crop',
      tags: ['Reunion', 'Social', 'Campus']
    },
    {
      id: '3',
      title: 'Career Development Workshop',
      description: 'Learn essential skills for advancing your career including networking, interview techniques, and personal branding.',
      date: '2024-03-30',
      time: '6:00 PM PST',
      location: 'Virtual Event',
      type: 'virtual',
      attendees: 67,
      maxAttendees: 100,
      organizer: {
        name: 'Career Services',
        title: 'Career Counselor',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
      tags: ['Career', 'Professional Development', 'Workshop']
    },
    {
      id: '4',
      title: 'Startup Pitch Night',
      description: 'Watch alumni entrepreneurs pitch their innovative startups and network with investors and fellow entrepreneurs.',
      date: '2024-04-08',
      time: '7:30 PM PST',
      location: 'Innovation Hub, Building A',
      type: 'in-person',
      attendees: 42,
      maxAttendees: 80,
      organizer: {
        name: 'Entrepreneurship Club',
        title: 'Club President',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=300&fit=crop',
      tags: ['Startup', 'Entrepreneurship', 'Networking']
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching events:', searchQuery);
  };

  const handleCreateEvent = () => {
    console.log('Creating event:', newEvent);
    setIsCreateDialogOpen(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'virtual'
    });
    alert('Event created successfully!');
  };

  const handleRegister = (eventId: string) => {
    console.log('Registering for event:', eventId);
    alert('Successfully registered for the event!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEventTypeColor = (type: string) => {
    return type === 'virtual' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Events</h1>
            <p className="text-muted-foreground">Discover and join upcoming alumni events</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Event location or virtual link"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={newEvent.type === 'virtual' ? 'default' : 'outline'}
                    onClick={() => setNewEvent({...newEvent, type: 'virtual'})}
                  >
                    Virtual
                  </Button>
                  <Button
                    type="button"
                    variant={newEvent.type === 'in-person' ? 'default' : 'outline'}
                    onClick={() => setNewEvent({...newEvent, type: 'in-person'})}
                  >
                    In-Person
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleCreateEvent} className="flex-1">
                    Create Event
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search events by title, location, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" variant="outline">
                <Filter className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="grid gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  {/* Event Image */}
                  <div className="md:w-1/3">
                    <div className="aspect-video md:aspect-square w-full">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Event Content */}
                  <div className="md:w-2/3">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <Badge 
                              variant="secondary" 
                              className={getEventTypeColor(event.type)}
                            >
                              {event.type === 'virtual' ? 'Virtual' : 'In-Person'}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Event Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={event.organizer.profileImage} />
                              <AvatarFallback>
                                {event.organizer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{event.organizer.name}</p>
                              <p className="text-xs text-muted-foreground">{event.organizer.title}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees}/{event.maxAttendees}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleRegister(event.id)}
                          >
                            Register
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;