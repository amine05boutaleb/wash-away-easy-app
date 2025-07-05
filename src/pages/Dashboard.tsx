
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully",
      });
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome to WashAway</h1>
            <p className="text-gray-600 mt-2">Your premium laundry service platform</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="smooth-transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          >
            Sign Out
          </Button>
        </div>

        {/* Authentication Status Card */}
        <Card className="mb-8 animate-slide-up shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gray-800">Authentication Status</CardTitle>
                <CardDescription>Your current login session details</CardDescription>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                ✓ Authenticated
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                <p className="text-gray-800 font-medium">{currentUser?.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500 mb-1">User ID</p>
                <p className="text-gray-800 font-mono text-sm">{currentUser?.uid.slice(0, 16)}...</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500 mb-1">Email Verified</p>
                <Badge variant={currentUser?.emailVerified ? "default" : "secondary"} className="mt-1">
                  {currentUser?.emailVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-500 mb-1">Last Sign In</p>
                <p className="text-gray-800 text-sm">
                  {currentUser?.metadata.lastSignInTime 
                    ? new Date(currentUser.metadata.lastSignInTime).toLocaleString()
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Cards Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-slide-up shadow-lg hover:shadow-xl smooth-transition" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🧺</span>
              </div>
              <CardTitle className="text-lg">Cleaning</CardTitle>
              <CardDescription>Professional washing and cleaning services</CardDescription>
            </CardHeader>
          </Card>

          <Card className="animate-slide-up shadow-lg hover:shadow-xl smooth-transition" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🧽</span>
              </div>
              <CardTitle className="text-lg">Stain Removal</CardTitle>
              <CardDescription>Expert stain treatment and removal</CardDescription>
            </CardHeader>
          </Card>

          <Card className="animate-slide-up shadow-lg hover:shadow-xl smooth-transition" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">👔</span>
              </div>
              <CardTitle className="text-lg">Ironing</CardTitle>
              <CardDescription>Professional pressing and ironing services</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Coming Soon Notice */}
        <Card className="animate-slide-up shadow-lg" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-800">🚀 Coming Soon</CardTitle>
            <CardDescription>
              Full laundry service booking, pickup scheduling, and delivery tracking features are being developed.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600">
              Stay tuned for the complete WashAway experience with home pickup and delivery services!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
