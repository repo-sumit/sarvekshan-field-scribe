
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Phone, Shield } from 'lucide-react';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handlePhoneSubmit = async () => {
    if (phoneNumber.length !== 10) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep('otp');
    setCountdown(30);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    onLogin();
  };

  const handleResendOtp = () => {
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sarvekshan</h1>
          <p className="text-gray-600">Survey Collection Platform</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2">
              {step === 'phone' ? <Phone className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
              {step === 'phone' ? 'Enter Mobile Number' : 'Verify OTP'}
            </CardTitle>
            <CardDescription>
              {step === 'phone' 
                ? 'We\'ll send you a verification code' 
                : `Code sent to +91-${phoneNumber}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'phone' ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">+91</span>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="pl-12 h-12 text-lg"
                      maxLength={10}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handlePhoneSubmit}
                  disabled={phoneNumber.length !== 10 || isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Enter 6-digit OTP</label>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="h-12 text-lg text-center tracking-widest"
                    maxLength={6}
                  />
                </div>
                
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-500">Resend OTP in {countdown}s</p>
                  ) : (
                    <button 
                      onClick={handleResendOtp}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={handleOtpSubmit}
                    disabled={otp.length !== 6 || isLoading}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button 
                    onClick={() => setStep('phone')}
                    variant="outline"
                    className="w-full h-12"
                  >
                    Change Number
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
