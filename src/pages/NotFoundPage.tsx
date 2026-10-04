import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';
import { Activity, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] flex flex-col justify-center items-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#EAF2EC] border border-[#C8DDD0] text-[#2A543B] flex items-center justify-center mb-6">
        <Activity className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-black text-[#252525] mb-2">404</h1>
      <h2 className="text-xl font-bold text-[#5C5852] mb-3">MEDIQ Page Not Found</h2>
      <p className="text-sm text-[#5C5852] max-w-md mb-8">
        The route or crowd telemetry resource you requested does not exist within the MEDIQ platform.
      </p>
      <div className="flex gap-4">
        <Link to={ROUTES.HOME}>
          <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
