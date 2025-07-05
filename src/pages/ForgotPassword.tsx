
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Key } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      setSent(true);
      toast({
        title: "Email Sent!",
        description: "Check your inbox for password reset instructions",
      });
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: "Reset Failed",
        description: error.message || "An error occurred while sending reset email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="glass-effect shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 animate-bounce-soft">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-800">Check Your Email</CardTitle>
              <CardDescription className="text-gray-600">
                We've sent password reset instructions to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setSent(false)}
                  variant="outline"
                  className="w-full smooth-transition"
                >
                  Try Again
                </Button>
                <Link to="/signin">
                  <Button 
                    variant="ghost" 
                    className="w-full text-primary hover:text-primary-600 smooth-transition"
                  >
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="glass-effect shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 animate-bounce-soft">
              <Key className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">Reset Password</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your email to receive reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 smooth-transition focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-600 smooth-transition shadow-lg"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Email'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link 
                  to="/signin" 
                  className="text-primary hover:text-primary-600 font-medium smooth-transition"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
