import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Users,
  Phone,
  Video,
  FileText,
  Download,
  Image,
  File,
  Camera,
  Gift,
} from "lucide-react";
import { useAuth } from "../../App";

const Messages = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState("1");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [attachmentDropdownOpen, setAttachmentDropdownOpen] = useState(false);

  // Mock chat data
  const chats = [
    {
      id: "1",
      name: "Sarah Johnson",
      type: "individual",
      lastMessage:
        "Thanks for the connection! Looking forward to collaborating.",
      timestamp: "2 hours ago",
      unread: 2,
      online: true,
      profileImage:
        "https://images.unsplash.com/photo-1494790108755-2616b85c16c6?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "CS Department",
      type: "college",
      lastMessage: "Your transcript request has been processed.",
      timestamp: "1 day ago",
      unread: 0,
      online: false,
      profileImage:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=150&h=150&fit=crop",
    },
    {
      id: "3",
      name: "Alumni Meetup Group",
      type: "group",
      lastMessage: "Mike: See you all this Friday!",
      timestamp: "2 days ago",
      unread: 5,
      online: false,
      profileImage:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=150&h=150&fit=crop",
    },
    {
      id: "4",
      name: "Dr. Michael Chen",
      type: "individual",
      lastMessage: "The research paper deadline is next week.",
      timestamp: "3 days ago",
      unread: 0,
      online: true,
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ];

  // Mock messages for selected chat
  const messages = [
    {
      id: "1",
      senderId: "2",
      senderName: "Sarah Johnson",
      content:
        "Hi! I saw your post about the new ML project. Very interesting work!",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: "2",
      senderId: user?.id || "1",
      senderName: user?.name || "You",
      content:
        "Thank you! I'd love to discuss potential collaboration opportunities.",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: "3",
      senderId: "2",
      senderName: "Sarah Johnson",
      content:
        "Absolutely! I have some experience with similar projects at Google.",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: "4",
      senderId: "2",
      senderName: "Sarah Johnson",
      content: "Thanks for the connection! Looking forward to collaborating.",
      timestamp: "2:15 PM",
      type: "text",
    },
  ];

  const selectedChatData = chats.find((chat) => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleFileRequest = () => {
    // Special feature for college chats
    console.log("Requesting documents from college");
    alert(
      "Document request sent! You will be guided through the process step by step."
    );
  };

  const handleMediaUpload = () => {
    // Request permission and upload media files
    if (navigator.mediaDevices) {
      console.log("Requesting media access...");
      alert("Please allow access to your files to upload media.");
      // Create file input for media
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,video/*";
      input.multiple = true;
      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files) {
          console.log("Media files selected:", Array.from(files));
          alert(`${files.length} media file(s) selected for upload.`);
        }
      };
      input.click();
    } else {
      alert("Media upload not supported in this browser.");
    }
    setAttachmentDropdownOpen(false);
  };

  const handleDocumentUpload = () => {
    // Request permission and upload documents
    console.log("Requesting document access...");
    alert("Please allow access to your files to upload documents.");
    // Create file input for documents
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        console.log("Document files selected:", Array.from(files));
        alert(`${files.length} document(s) selected for upload.`);
      }
    };
    input.click();
    setAttachmentDropdownOpen(false);
  };

  const handleCameraAccess = () => {
    // Request camera permission
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("Requesting camera access...");
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          console.log("Camera access granted");
          alert(
            "Camera access granted! You can now take photos or record videos."
          );
          // Stop the stream as this is just for permission demo
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch((error) => {
          console.error("Camera access denied:", error);
          alert(
            "Camera access denied. Please allow camera access to take photos."
          );
        });
    } else {
      alert("Camera access not supported in this browser.");
    }
    setAttachmentDropdownOpen(false);
  };

  const handleGifUpload = () => {
    // Upload GIF files
    console.log("Opening GIF selector...");
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/gif";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        console.log("GIF files selected:", Array.from(files));
        alert(`${files.length} GIF(s) selected for upload.`);
      }
    };
    input.click();
    setAttachmentDropdownOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching messages:", searchQuery);
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar - Chat List */}
      <div className="w-80 bg-white border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Messages</h2>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                  selectedChat === chat.id ? "bg-accent" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.profileImage} />
                      <AvatarFallback>
                        {chat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{chat.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {chat.timestamp}
                        </span>
                        {chat.unread > 0 && (
                          <Badge
                            variant="destructive"
                            className="text-xs h-5 w-5 p-0 flex items-center justify-center"
                          >
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.type === "group" && (
                        <Badge variant="secondary" className="text-xs">
                          Group
                        </Badge>
                      )}
                      {chat.type === "college" && (
                        <Badge variant="outline" className="text-xs">
                          College
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedChatData.profileImage} />
                    <AvatarFallback>
                      {selectedChatData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedChatData.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedChatData.online
                        ? "Online"
                        : "Last seen 2 hours ago"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md ${
                        message.senderId === user?.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-white border border-border"
                      } rounded-lg p-3`}
                    >
                      {message.senderId !== user?.id && (
                        <p className="text-xs font-medium mb-1">
                          {message.senderName}
                        </p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === user?.id
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="bg-white border-t border-border p-4">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <DropdownMenu
                      open={attachmentDropdownOpen}
                      onOpenChange={setAttachmentDropdownOpen}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem
                          onClick={handleMediaUpload}
                          className="flex items-center space-x-2"
                        >
                          <Image className="h-4 w-4" />
                          <span>Media</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleDocumentUpload}
                          className="flex items-center space-x-2"
                        >
                          <File className="h-4 w-4" />
                          <span>Document</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleCameraAccess}
                          className="flex items-center space-x-2"
                        >
                          <Camera className="h-4 w-4" />
                          <span>Camera</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleGifUpload}
                          className="flex items-center space-x-2"
                        >
                          <Gift className="h-4 w-4" />
                          <span>GIF</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {selectedChatData.type === "college" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleFileRequest}
                        className="flex items-center space-x-1"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="text-xs">Request Documents</span>
                      </Button>
                    )}
                  </div>
                  <div className="flex items-end space-x-2">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">
                Select a conversation
              </h3>
              <p className="text-muted-foreground">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
