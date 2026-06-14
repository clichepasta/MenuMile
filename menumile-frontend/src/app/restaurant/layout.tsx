import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout allowedRoles={['RESTAURANT_STAFF']}>
      {children}
    </DashboardLayout>
  );
}
