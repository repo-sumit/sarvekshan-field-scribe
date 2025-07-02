
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { User, MapPin, LogOut, Save, Settings } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProfileTabProps {
  onLogout: () => void;
}

const ProfileTab = ({ onLogout }: ProfileTabProps) => {
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    gender: 'male',
    state: 'uttar-pradesh',
    district: 'lucknow',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const states = [
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'karnataka', label: 'Karnataka' },
  ];

  const districts = {
    'uttar-pradesh': [
      { value: 'lucknow', label: 'Lucknow' },
      { value: 'kanpur', label: 'Kanpur' },
      { value: 'agra', label: 'Agra' },
      { value: 'varanasi', label: 'Varanasi' },
    ],
    'maharashtra': [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'pune', label: 'Pune' },
      { value: 'nagpur', label: 'Nagpur' },
      { value: 'nashik', label: 'Nashik' },
    ],
    // Add more districts for other states as needed
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className="pb-20 px-4">
      <div className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        
        {showSaveAlert && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <Save className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Profile updated successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Information */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  variant="outline"
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsEditing(false)}
                    size="sm"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                  {profile.name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              {isEditing ? (
                <Select 
                  value={profile.gender} 
                  onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900 capitalize">
                  {profile.gender}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              {isEditing ? (
                <Select 
                  value={profile.state} 
                  onValueChange={(value) => setProfile(prev => ({ ...prev, state: value, district: '' }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                  {states.find(s => s.value === profile.state)?.label}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              {isEditing ? (
                <Select 
                  value={profile.district} 
                  onValueChange={(value) => setProfile(prev => ({ ...prev, district: value }))}
                  disabled={!profile.state}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {(districts[profile.state as keyof typeof districts] || []).map(district => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                  {districts[profile.state as keyof typeof districts]?.find(d => d.value === profile.district)?.label}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Push Notifications</h4>
                  <p className="text-sm text-gray-500">Receive updates about new surveys</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Auto-sync</h4>
                  <p className="text-sm text-gray-500">Automatically sync when online</p>
                </div>
                <Button variant="outline" size="sm">
                  On
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="pt-6">
            <Button 
              onClick={handleLogout}
              variant="destructive" 
              className="w-full h-12"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileTab;
