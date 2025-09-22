import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { useAuth, UserType } from '../../App';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Building, 
  AlertCircle, 
  Upload, 
  FileText, 
  CheckCircle,
  Clock,
  Shield,
  Database,
  X
} from 'lucide-react';

const SignUp = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'alumni' as UserType,
    college: '',
    department: '',
    graduationYear: '',
    currentPosition: '',
    phoneNumber: '',
    // College-specific fields
    aisheCode: '',
    universityAffiliation: '',
    collegeType: '',
    establishedYear: '',
    contactPerson: '',
    designation: ''
  });

  const [emailError, setEmailError] = useState('');
  const [aisheStatus, setAisheStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [uploadedDocs, setUploadedDocs] = useState<Array<{id: string, name: string, type: string}>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateCollegeEmail = (email: string) => {
    // Check if email ends with .edu or .ac.in or other educational domains
    const educationalDomains = ['.edu', '.ac.in', '.edu.in', '.ac.uk', '.edu.au'];
    const isEducational = educationalDomains.some(domain => email.toLowerCase().endsWith(domain));
    
    if (!isEducational) {
      setEmailError('Please use your official college/university email address (e.g., @college.edu)');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validateAisheCode = (code: string) => {
    if (code.length === 11) {
      setAisheStatus('checking');
      // Mock AISHE database check
      setTimeout(() => {
        // For demo, codes starting with 'U-' are valid
        if (code.startsWith('U-')) {
          setAisheStatus('valid');
          // Auto-populate college name from mock database
          setFormData(prev => ({
            ...prev,
            college: 'Sample University (from AISHE database)',
            universityAffiliation: 'UGC Recognized'
          }));
        } else {
          setAisheStatus('invalid');
        }
      }, 1500);
    } else {
      setAisheStatus('idle');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({...formData, email});
    
    if (email.length > 0) {
      validateCollegeEmail(email);
    } else {
      setEmailError('');
    }
  };

  const handleAisheCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase();
    setFormData({...formData, aisheCode: code});
    validateAisheCode(code);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newDoc = {
        id: Date.now().toString(),
        name: file.name,
        type: docType
      };
      setUploadedDocs(prev => [...prev, newDoc]);
    }
  };

  const removeDocument = (docId: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== docId));
  };

  const handleCollegeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!validateCollegeEmail(formData.email)) {
      return;
    }

    if (aisheStatus !== 'valid') {
      alert('Please enter a valid AISHE code');
      return;
    }

    if (uploadedDocs.length === 0) {
      alert('Please upload at least one supporting document');
      return;
    }

    setIsSubmitting(true);
    
    // Mock submission process
    setTimeout(() => {
      setIsSubmitting(false);
      alert('College registration submitted successfully! Your application is under admin review. You will receive an email notification once verified and approved.');
    }, 2000);
  };

  const handleRegularSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!validateCollegeEmail(formData.email)) {
      return;
    }

    // Mock registration with email verification step
    alert('Verification email sent to your college email address. Please check your inbox and click the verification link to complete registration.');

    // For demo purposes, we'll proceed with login
    const mockUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      userType: formData.userType,
      college: formData.college,
      department: formData.department,
      graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : undefined,
      currentPosition: formData.currentPosition,
      bio: '',
      skills: [],
      experience: [],
      achievements: []
    };
    
    login(mockUser);
  };

  const userTypeConfig = {
    alumni: { icon: GraduationCap, label: 'Alumni', color: 'text-blue-600' },
    student: { icon: BookOpen, label: 'Student', color: 'text-green-600' },
    faculty: { icon: Users, label: 'Faculty', color: 'text-purple-600' },
    college: { icon: Building, label: 'College', color: 'text-orange-600' }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const renderCollegeForm = () => (
    <form onSubmit={handleCollegeSubmit} className="space-y-4">
      {/* College Registration Process Steps */}
      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          College Verification Process
        </h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Provide basic details + AISHE code</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>System checks code against AISHE/UGC database</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Upload supporting documents (affiliation/AICTE approval)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Admin verification & account activation</span>
          </div>
        </div>
      </div>

      {/* Basic Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="collegeName">College/University Name *</Label>
          <Input
            id="collegeName"
            placeholder="Enter institution name"
            value={formData.college}
            onChange={(e) => setFormData({...formData, college: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person Name *</Label>
          <Input
            id="contactPerson"
            placeholder="Registrar/Dean name"
            value={formData.contactPerson}
            onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="designation">Designation *</Label>
          <Input
            id="designation"
            placeholder="Registrar/Dean/Director"
            value={formData.designation}
            onChange={(e) => setFormData({...formData, designation: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="collegeEmail">Official College Email *</Label>
          <Input
            id="collegeEmail"
            type="email"
            placeholder="registrar@college.edu"
            value={formData.email}
            onChange={handleEmailChange}
            required
            className={emailError ? 'border-red-500' : ''}
          />
          {emailError && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                {emailError}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* AISHE Code Verification */}
      <div className="space-y-2">
        <Label htmlFor="aisheCode">AISHE Code *</Label>
        <div className="relative">
          <Input
            id="aisheCode"
            placeholder="U-1234-567890"
            value={formData.aisheCode}
            onChange={handleAisheCodeChange}
            required
            className={`pr-10 ${
              aisheStatus === 'valid' ? 'border-green-500' : 
              aisheStatus === 'invalid' ? 'border-red-500' : ''
            }`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {aisheStatus === 'checking' && (
              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
            )}
            {aisheStatus === 'valid' && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            {aisheStatus === 'invalid' && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
        
        {aisheStatus === 'checking' && (
          <Alert className="py-2">
            <Database className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Verifying AISHE code against UGC database...
            </AlertDescription>
          </Alert>
        )}
        
        {aisheStatus === 'valid' && (
          <Alert className="py-2 border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-xs text-green-700">
              AISHE code verified successfully! Institution details auto-populated.
            </AlertDescription>
          </Alert>
        )}
        
        {aisheStatus === 'invalid' && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Invalid AISHE code. Please verify and try again.
            </AlertDescription>
          </Alert>
        )}
        
        <p className="text-xs text-muted-foreground">
          Enter your 11-digit AISHE (All India Survey on Higher Education) code
        </p>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="collegeType">Institution Type</Label>
          <Select onValueChange={(value) => setFormData({...formData, collegeType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="institute">Institute</SelectItem>
              <SelectItem value="deemed">Deemed University</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="establishedYear">Established Year</Label>
          <Input
            id="establishedYear"
            placeholder="1995"
            value={formData.establishedYear}
            onChange={(e) => setFormData({...formData, establishedYear: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="universityAffiliation">University Affiliation</Label>
        <Input
          id="universityAffiliation"
          placeholder="University name or 'Autonomous'"
          value={formData.universityAffiliation}
          onChange={(e) => setFormData({...formData, universityAffiliation: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Contact Phone Number *</Label>
        <Input
          id="phoneNumber"
          placeholder="+91 98765 43210"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          required
        />
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="space-y-4 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg">
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4 text-primary" />
          <Label>Supporting Documents *</Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Upload official documents for verification (PDF, DOC, JPG formats accepted)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="affiliation" className="text-xs">University Affiliation Letter</Label>
            <Input
              id="affiliation"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'University Affiliation')}
              className="text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aicte" className="text-xs">AICTE Approval (if applicable)</Label>
            <Input
              id="aicte"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'AICTE Approval')}
              className="text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ugc" className="text-xs">UGC Recognition Letter</Label>
            <Input
              id="ugc"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'UGC Recognition')}
              className="text-xs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="other" className="text-xs">Other Supporting Documents</Label>
            <Input
              id="other"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'Other Documents')}
              className="text-xs"
            />
          </div>
        </div>

        {/* Uploaded Documents List */}
        {uploadedDocs.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs">Uploaded Documents:</Label>
            <div className="space-y-1">
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-muted rounded text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    <span>{doc.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {doc.type}
                    </Badge>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDocument(doc.id)}
                    className="h-auto p-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Verification Process Alert */}
      <Alert>
        <Clock className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>Verification Process:</strong> After submission, your college registration will be reviewed by our admin team. 
          This typically takes 2-3 business days. You will receive email notifications at each step of the verification process.
        </AlertDescription>
      </Alert>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={aisheStatus !== 'valid' || uploadedDocs.length === 0 || isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            Submitting for Verification...
          </div>
        ) : (
          'Submit College Registration for Verification'
        )}
      </Button>
    </form>
  );

  const renderRegularForm = (type: string) => (
    <form onSubmit={handleRegularSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">College Email ID *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@college.edu"
            value={formData.email}
            onChange={handleEmailChange}
            required
            className={emailError ? 'border-red-500' : ''}
          />
          {emailError && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                {emailError}
              </AlertDescription>
            </Alert>
          )}
          <p className="text-xs text-muted-foreground">
            Use your official college email for verification (.edu, .ac.in, etc.)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="college">College/University</Label>
          <Input
            id="college"
            placeholder="Stanford University"
            value={formData.college}
            onChange={(e) => setFormData({...formData, college: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            placeholder="Computer Science"
            value={formData.department}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            required
          />
        </div>
      </div>

      {(type === 'alumni' || type === 'student') && (
        <div className="space-y-2">
          <Label htmlFor="graduationYear">
            {type === 'alumni' ? 'Graduation Year' : 'Expected Graduation Year'}
          </Label>
          <Select onValueChange={(value) => setFormData({...formData, graduationYear: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {(type === 'alumni' || type === 'faculty') && (
        <div className="space-y-2">
          <Label htmlFor="currentPosition">Current Position</Label>
          <Input
            id="currentPosition"
            placeholder="Software Engineer at Google"
            value={formData.currentPosition}
            onChange={(e) => setFormData({...formData, currentPosition: e.target.value})}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          placeholder="+1 (555) 123-4567"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
        />
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          After clicking "Create Account", you will receive a verification email at your college email address. 
          Please verify your email to complete registration.
        </AlertDescription>
      </Alert>

      <Button type="submit" className="w-full" disabled={!!emailError}>
        Create {userTypeConfig[type as UserType].label} Account
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Join AluMine Network</CardTitle>
          <CardDescription>
            {formData.userType === 'college' 
              ? 'Register your institution with official verification'
              : 'Create your alumni network account with college email verification'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={formData.userType} onValueChange={(value) => setFormData({...formData, userType: value as UserType})}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {Object.entries(userTypeConfig).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <TabsTrigger key={type} value={type} className="flex flex-col gap-1 p-2">
                    <Icon className={`h-4 w-4 ${config.color}`} />
                    <span className="text-xs">{config.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.keys(userTypeConfig).map((type) => (
              <TabsContent key={type} value={type}>
                {type === 'college' ? renderCollegeForm() : renderRegularForm(type)}
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;