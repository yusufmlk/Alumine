import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { 
  Bell, 
  Heart, 
  MessageCircle, 
  Users, 
  Calendar, 
  Briefcase, 
  Trophy,
  GraduationCap,
  CheckCircle,
  X,
  Settings
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'event' | 'job' | 'achievement' | 'system';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  avatar?: string;
  userName?: string;
  actionUrl?: string;
}

interface NotificationDropdownProps {
  className?: string;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ className }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: 'Sarah Johnson liked your post',
      description: 'About career opportunities in tech industry',
      time: '5m ago',
      isRead: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=150&h=150&fit=crop&crop=face',
      userName: 'Sarah Johnson',
      actionUrl: '/home'
    },
    {
      id: '2',
      type: 'comment',
      title: 'Mike Chen commented on your post',
      description: '"Great insights! Thanks for sharing your experience."',
      time: '15m ago',
      isRead: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      userName: 'Mike Chen',
      actionUrl: '/home'
    },
    {
      id: '3',
      type: 'follow',
      title: 'Emma Davis started following you',
      description: 'Connect with Emma to expand your network',
      time: '1h ago',
      isRead: false,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      userName: 'Emma Davis',
      actionUrl: '/network'
    },
    {
      id: '4',
      type: 'event',
      title: 'Reminder: Alumni Meetup Tomorrow',
      description: 'Tech Alumni Networking Event at 6 PM',
      time: '2h ago',
      isRead: true,
      actionUrl: '/events'
    },
    {
      id: '5',
      type: 'job',
      title: 'New job opportunity matches your profile',
      description: 'Senior Software Engineer at Microsoft',
      time: '4h ago',
      isRead: true,
      actionUrl: '/opportunities'
    },
    {
      id: '6',
      type: 'achievement',
      title: 'Profile completion milestone!',
      description: 'You\'ve completed 90% of your profile',
      time: '1d ago',
      isRead: true,
      actionUrl: '/profile'
    },
    {
      id: '7',
      type: 'system',
      title: 'Welcome to AluMine!',
      description: 'Complete your profile to connect with more alumni',
      time: '2d ago',
      isRead: true,
      actionUrl: '/profile'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { className: 'h-4 w-4' };
    
    switch (type) {
      case 'like':
        return <Heart {...iconProps} className="h-4 w-4 text-red-500" />;
      case 'comment':
        return <MessageCircle {...iconProps} className="h-4 w-4 text-blue-500" />;
      case 'follow':
        return <Users {...iconProps} className="h-4 w-4 text-green-500" />;
      case 'event':
        return <Calendar {...iconProps} className="h-4 w-4 text-purple-500" />;
      case 'job':
        return <Briefcase {...iconProps} className="h-4 w-4 text-orange-500" />;
      case 'achievement':
        return <Trophy {...iconProps} className="h-4 w-4 text-yellow-500" />;
      case 'system':
        return <GraduationCap {...iconProps} className="h-4 w-4 text-primary" />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`relative ${className}`}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80 p-0" align="end">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs h-auto py-1 px-2"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-auto p-1">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-96">
          <div className="py-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You're all caught up!
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex items-start space-x-3 p-3 cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-accent'
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    // Navigate to action URL if provided
                    if (notification.actionUrl) {
                      // In a real app, you would use navigate here
                      console.log('Navigate to:', notification.actionUrl);
                    }
                  }}
                >
                  <div className="flex-shrink-0 relative">
                    {notification.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>
                          {notification.userName?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                    {!notification.isRead && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </div>
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="ghost" className="w-full text-sm">
                View all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;