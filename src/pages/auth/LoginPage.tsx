import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogIn, User, Building2 } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Alert } from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/auth';
import { StatusIndicator } from '../../components/ui/StatusIndicator';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsPatient, loginAsHospital } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

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

  const handleQuickDemoPatient = () => {
    loginAsPatient();
    navigate(ROUTES.PATIENT.DASHBOARD);
  };

  const handleQuickDemoHospital = () => {
    loginAsHospital();
    navigate(ROUTES.HOSPITAL.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <Link to={ROUTES.HOME} className="flex items-center gap-3 mb-8 group">
        <div className="w-10 h-10 rounded-2xl bg-[#2B4C3F] flex items-center justify-center text-white shadow-sm">
          <Activity className="w-5 h-5" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-[#252525]">MEDIQ</span>
      </Link>

      <Card className="w-full max-w-md glass-card border-[#E8E2D5] bg-white shadow-lg p-6">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-extrabold text-[#252525]">Sign In to MEDIQ</CardTitle>
          <CardDescription className="text-xs text-[#5C5852]">
            Access live hospital crowd telemetry & patient support
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Role Toggle Selector */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-[#5C5852] uppercase tracking-wider">
              Select Portal Role
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#F8F5EF] p-1.5 rounded-2xl border border-[#E8E2D5]">
              <button
                type="button"
                onClick={() => setSelectedRole('patient')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === 'patient'
                    ? 'bg-[#2B4C3F] text-white shadow-sm'
                    : 'text-[#5C5852] hover:text-[#252525]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Patient Portal
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('hospital')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === 'hospital'
                    ? 'bg-[#8574B3] text-white shadow-sm'
                    : 'text-[#5C5852] hover:text-[#252525]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Hospital Staff
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder={selectedRole === 'patient' ? 'patient@mediq-health.com' : 'admin@citycare.org'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <Alert variant="error">{error}</Alert>}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              leftIcon={<LogIn className="w-4 h-4" />}
            >
              Sign In to {selectedRole === 'patient' ? 'Patient Portal' : 'Hospital Desk'}
            </Button>
          </form>

          {/* Demonstration Quick Access Box */}
          <div className="pt-4 border-t border-[#E8E2D5] space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#5C5852] font-semibold">One-Click Demo Access:</span>
              <StatusIndicator />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={handleQuickDemoPatient} className="text-xs">
                Demo Patient
              </Button>
              <Button variant="outline" size="sm" onClick={handleQuickDemoHospital} className="text-xs">
                Demo Staff
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-center text-xs text-[#5C5852]">
          Don't have an account?{' '}
          <Link to={ROUTES.SIGNUP} className="text-[#2B4C3F] font-bold ml-1 hover:underline">
            Create account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
