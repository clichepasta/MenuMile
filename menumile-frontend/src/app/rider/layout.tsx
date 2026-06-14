import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';

export default function RiderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout allowedRoles={['DELIVERY_PARTNER']}>
      {children}
    </DashboardLayout>
  );
}
