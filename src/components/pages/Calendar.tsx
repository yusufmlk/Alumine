import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Filter,
} from "lucide-react";
import { useAuth } from "../../App";

const Calendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  // Mock events data
  const events = [
    {
      id: "1",
      title: "Alumni Tech Talk: AI in Healthcare",
      date: "2024-03-25",
      time: "7:00 PM",
      duration: "2 hours",
      location: "Virtual Event",
      type: "event",
      color: "bg-blue-500",
      attendees: 156,
      organizer: "Dr. Sarah Johnson",
    },
    {
      id: "2",
      title: "Career Development Workshop",
      date: "2024-03-30",
      time: "6:00 PM",
      duration: "3 hours",
      location: "Virtual Event",
      type: "workshop",
      color: "bg-green-500",
      attendees: 67,
      organizer: "Career Services",
    },
    {
      id: "3",
      title: "Startup Pitch Night",
      date: "2024-04-08",
      time: "7:30 PM",
      duration: "2.5 hours",
      location: "Innovation Hub",
      type: "networking",
      color: "bg-purple-500",
      attendees: 42,
      organizer: "Entrepreneurship Club",
    },
    {
      id: "4",
      title: "Annual Alumni Reunion",
      date: "2024-04-15",
      time: "2:00 PM",
      duration: "6 hours",
      location: "Main Campus",
      type: "reunion",
      color: "bg-red-500",
      attendees: 289,
      organizer: "Alumni Association",
    },
    {
      id: "5",
      title: "Research Symposium",
      date: "2024-04-20",
      time: "9:00 AM",
      duration: "8 hours",
      location: "Conference Center",
      type: "academic",
      color: "bg-indigo-500",
      attendees: 124,
      organizer: "Research Committee",
    },
  ];

  // Get current month/year for header
  const getCurrentMonthYear = () => {
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Navigate between months
  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Get days in current month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (day: number) => {
    if (!day) return [];

    const dateString = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateString);
  };

  // Check if date is today
  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      event: "bg-blue-100 text-blue-800",
      workshop: "bg-green-100 text-green-800",
      networking: "bg-purple-100 text-purple-800",
      reunion: "bg-red-100 text-red-800",
      academic: "bg-indigo-100 text-indigo-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const days = getDaysInMonth();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">
              Stay updated with upcoming events and important dates
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("prev")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold">
                      {getCurrentMonthYear()}
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("next")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex space-x-1">
                    {(["month", "week", "day"] as const).map((viewType) => (
                      <Button
                        key={viewType}
                        variant={view === viewType ? "default" : "outline"}
                        size="sm"
                        onClick={() => setView(viewType)}
                      >
                        {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {view === "month" && (
                  <div className="grid grid-cols-7 gap-1">
                    {/* Week day headers */}
                    {weekDays.map((day) => (
                      <div
                        key={day}
                        className="p-2 text-center text-sm font-medium text-muted-foreground"
                      >
                        {day}
                      </div>
                    ))}

                    {/* Calendar days */}
                    {days.map((day, index) => {
                      const dayEvents = day ? getEventsForDate(day) : [];
                      const today = day ? isToday(day) : false;

                      return (
                        <div
                          key={index}
                          className={`min-h-24 p-1 border border-gray-100 rounded-lg ${
                            day
                              ? "bg-white hover:bg-gray-50 cursor-pointer"
                              : "bg-gray-50"
                          } ${today ? "ring-2 ring-primary" : ""}`}
                        >
                          {day && (
                            <>
                              <div
                                className={`text-sm font-medium mb-1 ${
                                  today ? "text-primary" : "text-foreground"
                                }`}
                              >
                                {day}
                              </div>
                              <div className="space-y-1">
                                {dayEvents.slice(0, 2).map((event) => (
                                  <div
                                    key={event.id}
                                    className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                                  >
                                    {event.title}
                                  </div>
                                ))}
                                {dayEvents.length > 2 && (
                                  <div className="text-xs text-muted-foreground">
                                    +{dayEvents.length - 2} more
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {view === "week" && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Week view coming soon
                    </p>
                  </div>
                )}

                {view === "day" && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Day view coming soon
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border border-border rounded-lg p-3 hover:bg-accent transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {event.title}
                        </h4>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getEventTypeColor(event.type)}`}
                        >
                          {event.type}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {event.attendees} attending
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {
                        events.filter((e) => {
                          const eventDate = new Date(e.date);
                          return (
                            eventDate.getMonth() === currentDate.getMonth() &&
                            eventDate.getFullYear() ===
                              currentDate.getFullYear()
                          );
                        }).length
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Events
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">3</div>
                      <div className="text-xs text-muted-foreground">
                        Registered
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">2</div>
                      <div className="text-xs text-muted-foreground">
                        Attended
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Event Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm">Tech Talks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm">Workshops</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-sm">Networking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm">Reunions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                    <span className="text-sm">Academic</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
