import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, UserPlus, User, Building2 } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/auth';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsPatient, loginAsHospital } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === 'patient') {
        loginAsPatient();
        navigate(ROUTES.PATIENT.DASHBOARD);
      } else {
        loginAsHospital();
        navigate(ROUTES.HOSPITAL.DASHBOARD);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] flex flex-col justify-center items-center p-4">
      <Link to={ROUTES.HOME} className="flex items-center gap-3 mb-8 group">
        <div className="w-10 h-10 rounded-2xl bg-[#2B4C3F] flex items-center justify-center text-white shadow-sm">
          <Activity className="w-5 h-5" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-[#252525]">MEDIQ</span>
      </Link>

      <Card className="w-full max-w-md glass-card border-[#E8E2D5] bg-white shadow-lg p-6">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-extrabold text-[#252525]">Create MEDIQ Account</CardTitle>
          <CardDescription className="text-xs text-[#5C5852]">
            Join the smart crowd-awareness platform
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-[#5C5852] uppercase tracking-wider">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#F8F5EF] p-1.5 rounded-2xl border border-[#E8E2D5]">
              <button
                type="button"
                onClick={() => setSelectedRole('patient')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === 'patient' ? 'bg-[#2B4C3F] text-white' : 'text-[#5C5852]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Patient
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('hospital')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === 'hospital' ? 'bg-[#8574B3] text-white' : 'text-[#5C5852]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Hospital Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name / Title"
              placeholder={selectedRole === 'patient' ? 'Sarah Jenkins' : 'CityCare Operations Lead'}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="user@mediq-health.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              Create Account & Launch
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-xs text-[#5C5852]">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-[#2B4C3F] font-bold ml-1 hover:underline">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
