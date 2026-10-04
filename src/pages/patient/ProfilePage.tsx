import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { User, Mail, Phone, Save } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Patient Settings & Preferences"
        description="Manage your notification thresholds, preferred hospitals, and account safety settings."
      />

      <Card className="glass-card border-[#E8E2D5] bg-white p-6 max-w-2xl">
        <CardHeader className="px-0 pt-0 pb-4">
          <CardTitle className="text-lg font-extrabold text-[#252525] flex items-center gap-2">
            <User className="w-5 h-5 text-[#2B4C3F]" />
            <span>Patient Companion Profile</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 px-0 pb-0">
          <Input label="Full Name" defaultValue={user?.fullName || 'Sarah Jenkins'} leftIcon={<User className="w-4 h-4" />} />
          <Input label="Email Address" defaultValue={user?.email || 'patient@mediq-health.com'} leftIcon={<Mail className="w-4 h-4" />} />
          <Input label="Phone Number" defaultValue={user?.phone || '+1 (555) 234-5678'} leftIcon={<Phone className="w-4 h-4" />} />

          <div className="pt-4 border-t border-[#E8E2D5] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C867D]">Crowd Alert Preferences</h4>
            <label className="flex items-center gap-3 p-3.5 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5] text-xs text-[#252525] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-[#D8D0C2] text-[#2B4C3F] focus:ring-[#2B4C3F]" />
              <span>Receive SMS alerts when my scheduled hospital OPD experiences HIGH crowd surge</span>
            </label>
          </div>

          <div className="pt-4 flex justify-end">
            <Button variant="primary" size="sm" leftIcon={<Save className="w-4 h-4" />}>
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
