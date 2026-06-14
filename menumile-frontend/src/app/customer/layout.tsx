import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout allowedRoles={['CUSTOMER']}>
      {children}
    </DashboardLayout>
  );
}
