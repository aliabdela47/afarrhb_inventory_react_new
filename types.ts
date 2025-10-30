
export interface Item {
  id: number;
  name: string;
  category: string;
  code: string;
  currentStock: number;
  unit: string;
  description: string;
  warehouse: string;
  lowStockThreshold: number;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  manager: string;
}

export interface Employee {
  id: number;
  name: string;
  salary: number | null;
  name_am: string | null;
  taamagoli: string | null;
  directorate: string | null;
  photo: string | null;
  employee_code: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Directorate {
  id: number;
  name: string;
  manager: string;
}

export interface Customer {
  id: number;
  name: string;
  type: 'Internal' | 'External';
  contactPerson: string;
  phone: string;
  email: string;
}

export interface RequestItem {
  itemId: number;
  itemName: string;
  quantity: number;
}

export interface Request {
  id: number;
  requester: string; // Employee name
  directorate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  items: RequestItem[];
  createdAt: string;
}

export interface IssuanceItem {
  itemId: number;
  itemName: string;
  quantityIssued: number;
}

export interface Issuance {
  id: number;
  requestId: number | null;
  issuedTo: string; // Employee or Customer name
  status: 'Completed' | 'In-Progress';
  items: IssuanceItem[];
  issuedAt: string;
}

export interface Vehicle {
  id: number;
  plateNumber: string;
  model: string;
  type: string;
  status: 'Available' | 'In-Use' | 'Maintenance';
  currentDriver: string | null;
  lastServiceDate: string;
  nextServiceDate: string;
}

export interface VehicleAssignment {
  id: number;
  vehicleId: number;
  vehiclePlate: string;
  driverId: number;
  driverName: string;
  origin: string;
  destination: string;
  startTime: string;
  endTime: string | null;
  status: 'Ongoing' | 'Completed';
}

export interface VehicleService {
  id: number;
  vehicleId: number;
  vehiclePlate: string;
  garage: string;
  serviceDate: string;
  cost: number;
  description: string;
  nextServiceDate: string;
}

export interface VehicleGarage {
  id: number;
  name: string;
  location: string;
  contactPerson: string;
  phone: string;
}

export interface AuditLog {
  id: number;
  user: string;
  action: string;
  entity: string;
  entityId: number;
  timestamp: string;
  details: string;
}

export interface VehicleCheckin {
  id: number;
  vehicleId: number;
  vehiclePlate: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  note?: string;
  photoUrl?: string;
}

export interface City {
  name: string;
  lat: number;
  lng: number;
}
