import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Button } from '../../components/ui/Button';
import { MOCK_HOSPITALS } from '../../constants/mockData';
import { Plus } from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  const depts = MOCK_HOSPITALS[0].departments;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Department Setup & Doctors On Duty"
        description="Configure hospital wings, doctor shifts, and maximum department throughput capacity."
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add Department
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {depts.map((d) => (
          <Card key={d.id} className="glass-card border-[#E8E2D5] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
              <div>
                <span className="text-[10px] font-mono text-[#8574B3] font-bold uppercase">{d.code}</span>
                <h3 className="text-lg font-extrabold text-[#252525]">{d.name}</h3>
              </div>
              <CrowdBadge level={d.crowd.level} size="sm" showDot={false} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5]">
                <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Active Doctors</span>
                <strong className="text-[#2A543B] text-sm font-bold">{d.activeDoctors} On Duty</strong>
              </div>
              <div className="p-3 bg-[#F8F5EF] rounded-2xl border border-[#E8E2D5]">
                <span className="text-[#5C5852] block text-[10px] uppercase font-bold">Max Capacity</span>
                <strong className="text-[#252525] text-sm font-bold">{d.crowd.maxCapacity} Patients</strong>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="outline" size="sm">Edit Configuration</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
