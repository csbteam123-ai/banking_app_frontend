// ForgotPassword.jsx
import React, { useState } from 'react';
import { Mail, ArrowLeft, Check, X, RefreshCw, Key, Shield, Smartphone } from 'lucide-react';

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password validation
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    match: false
  });

  // Handle email submit
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === 'demo@bank.com') {
        setSuccess('Verification code sent to your email');
        setCurrentStep(2);
      } else {
        setError('Email not found in our system');
      }
      setLoading(false);
    }, 1500);
  };

  // Handle OTP change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle OTP verify
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpString = otp.join('');
    
    setTimeout(() => {
      if (otpString === '1234') {
        setSuccess('OTP verified successfully');
        setCurrentStep(3);
      } else {
        setError('Invalid OTP code');
      }
      setLoading(false);
    }, 1500);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'newPassword') {
      setNewPassword(value);
      
      // Check password criteria
      setPasswordChecks({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        match: value === confirmPassword && value !== ''
      });
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setPasswordChecks(prev => ({
        ...prev,
        match: value === newPassword && value !== ''
      }));
    }
  };

  // Handle password submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check all validations
    const isValid = Object.values(passwordChecks).every(check => check === true);

    setTimeout(() => {
      if (isValid) {
        setSuccess('Password changed successfully');
        setCurrentStep(4);
      } else {
        setError('Please meet all password requirements');
      }
      setLoading(false);
    }, 1500);
  };

  // Resend OTP
  const handleResendOtp = () => {
    setOtp(['', '', '', '']);
    setSuccess('New OTP sent to your email');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Progress bar width
  const getProgressWidth = () => {
    switch(currentStep) {
      case 1: return '25%';
      case 2: return '50%';
      case 3: return '75%';
      case 4: return '100%';
      default: return '0%';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-0 left-20 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {['Verify', 'OTP', 'Reset', 'Done'].map((step, index) => (
              <div
                key={step}
                className={`text-xs font-medium ${
                  currentStep > index ? 'text-white' : 'text-white/50'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500 rounded-full"
              style={{ width: getProgressWidth() }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-xl">
              {currentStep === 1 && <Mail className="w-10 h-10 text-white" />}
              {currentStep === 2 && <Smartphone className="w-10 h-10 text-white" />}
              {currentStep === 3 && <Key className="w-10 h-10 text-white" />}
              {currentStep === 4 && <Check className="w-10 h-10 text-white" />}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentStep === 1 && 'Forgot Password?'}
              {currentStep === 2 && 'Enter OTP'}
              {currentStep === 3 && 'New Password'}
              {currentStep === 4 && 'All Done!'}
            </h2>
            <p className="text-white/80 text-sm">
              {currentStep === 1 && 'Enter your email to receive OTP'}
              {currentStep === 2 && `We've sent OTP to ${email}`}
              {currentStep === 3 && 'Create a strong password'}
              {currentStep === 4 && 'Your password has been reset'}
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2">
                <X className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <p className="text-sm text-green-500">{success}</p>
              </div>
            )}

            {/* Step 1: Email Form */}
            {currentStep === 1 && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </button>

                <a
                  href="#"
                  className="flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white transition mt-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </a>
              </form>
            )}

            {/* Step 2: OTP Form */}
            {currentStep === 2 && (
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-4 text-center">
                    Enter 4-digit OTP
                  </label>
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-14 h-14 text-center text-xl font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join('').length !== 4}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm text-white/70 hover:text-white transition"
                  >
                    Didn't receive code? Resend
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white transition w-full mt-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Email
                </button>
              </form>
            )}

            {/* Step 3: New Password Form */}
            {currentStep === 3 && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showNewPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-white/10 rounded-xl p-4 space-y-2">
                  <p className="text-xs text-white/70 mb-2">Password must contain:</p>
                  
                  <div className="flex items-center gap-2">
                    {passwordChecks.length ? 
                      <Check className="w-4 h-4 text-green-400" /> : 
                      <X className="w-4 h-4 text-red-400" />
                    }
                    <span className="text-xs text-white">At least 8 characters</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {passwordChecks.uppercase ? 
                      <Check className="w-4 h-4 text-green-400" /> : 
                      <X className="w-4 h-4 text-red-400" />
                    }
                    <span className="text-xs text-white">One uppercase letter</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {passwordChecks.lowercase ? 
                      <Check className="w-4 h-4 text-green-400" /> : 
                      <X className="w-4 h-4 text-red-400" />
                    }
                    <span className="text-xs text-white">One lowercase letter</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {passwordChecks.number ? 
                      <Check className="w-4 h-4 text-green-400" /> : 
                      <X className="w-4 h-4 text-red-400" />
                    }
                    <span className="text-xs text-white">One number</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {passwordChecks.match ? 
                      <Check className="w-4 h-4 text-green-400" /> : 
                      <X className="w-4 h-4 text-red-400" />
                    }
                    <span className="text-xs text-white">Passwords match</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            )}

            {/* Step 4: Success */}
            {currentStep === 4 && (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                
                <p className="text-white">
                  Your password has been successfully reset. You can now login with your new password.
                </p>

                <a
                  href="#"
                  className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                >
                  Go to Login
                </a>
              </div>
            )}

            {/* Security Badge */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-white/50" />
                <span className="text-xs text-white/50">256-bit SSL Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;