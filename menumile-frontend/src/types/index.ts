export type UserRole = 'CUSTOMER' | 'DELIVERY_PARTNER' | 'RESTAURANT_STAFF' | 'ADMIN';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfo extends BaseEntity {
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
}

export interface Restaurant extends BaseEntity {
  name: string;
  address: string;
  fssaiLicense: string;
  gstin: string;
  isActive: boolean;
  ownerId: string;
}

export interface KitchenStation extends BaseEntity {
  name: string;
  restaurantId: string;
  isActive: boolean;
}

export interface MenuItem extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  restaurantId: string;
  kitchenStationId: string;
  isAvailable: boolean;
}

export interface RiderShiftSchedule extends BaseEntity {
  riderId: string;
  rrule: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface RiderShiftSlot extends BaseEntity {
  scheduleId?: string;
  riderId?: string;
  startTime: string;
  endTime: string;
  status: 'AVAILABLE' | 'CLAIMED' | 'COMPLETED';
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';

export interface Order extends BaseEntity {
  customerId: string;
  restaurantId: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryPartnerId?: string;
  deliveryAddress: string;
}

export interface OrderLineItem extends BaseEntity {
  orderId: string;
  menuItemId: string;
  quantity: number;
  price: number;
  notes?: string;
}

export type PrepStatus = 'PENDING' | 'COOKING' | 'COMPLETED';

export interface ItemPrepTask extends BaseEntity {
  orderId: string;
  orderLineItemId: string;
  kitchenStationId: string;
  status: PrepStatus;
}

export interface StationCompletion extends BaseEntity {
  orderId: string;
  kitchenStationId: string;
  isCompleted: boolean;
  completedAt?: string;
}
