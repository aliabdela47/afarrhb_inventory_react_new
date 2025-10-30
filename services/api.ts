// This is a mock API. In a real application, you would use fetch or a library like axios to make real API calls.
import { Item, Employee, Category, Warehouse, Directorate, Customer, Request, Issuance, Vehicle, VehicleAssignment, VehicleService, VehicleGarage, AuditLog, VehicleCheckin } from '../types';

// Simulate network delay
const delay = <T,>(data: T, ms = 200): Promise<T> => new Promise(resolve => setTimeout(() => resolve(data), ms));

// A generic function for other modules until they have specific mock data
const createMockData = <T extends {id: number}>(creator: (index: number) => Omit<T, 'id'>, count = 10): T[] => Array.from({ length: count }, (_, i) => ({ id: i + 1, ...creator(i) } as T));

// --- MOCK DATA ---
const MOCK_ITEMS: Item[] = createMockData(i => ({
    name: `Laptop Model ${i + 1}`,
    category: i % 2 === 0 ? 'Electronics' : 'Office Supplies',
    code: `ITM-00${i + 1}`,
    currentStock: 10 + i * 2,
    unit: 'pcs',
    description: 'A high-performance laptop for office use.',
    warehouse: i % 2 === 0 ? 'Main Warehouse' : 'Warehouse B',
    lowStockThreshold: 5,
    createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}), 15);

const MOCK_EMPLOYEES: Employee[] = createMockData(i => ({
    name: `Employee ${i + 1}`,
    salary: 50000 + i * 1000,
    name_am: `ሰራተኛ ${i + 1}`,
    taamagoli: `Title ${i + 1}`,
    directorate: i % 3 === 0 ? 'IT' : 'HR',
    photo: `https://picsum.photos/seed/${i+1}/100`,
    employee_code: `EMP-00${i+1}`,
    department: 'Operations',
    position: 'Specialist',
    phone: `555-010${i}`,
    email: `employee${i+1}@example.com`,
    is_active: i % 5 !== 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
}), 12);

const MOCK_CATEGORIES: Category[] = createMockData(i => ({ name: `Category ${i + 1}`, description: `Description for Category ${i + 1}` }));
const MOCK_WAREHOUSES: Warehouse[] = createMockData(i => ({ name: `Warehouse ${String.fromCharCode(65 + i)}`, location: `City ${i+1}`, manager: `Manager ${i+1}` }));
const MOCK_DIRECTORATES: Directorate[] = createMockData(i => ({ name: `Directorate ${i + 1}`, manager: `Director ${i+1}` }));
const MOCK_CUSTOMERS: Customer[] = createMockData(i => ({ name: `Customer ${i + 1}`, type: i % 2 === 0 ? 'Internal' : 'External', contactPerson: `Contact ${i+1}`, phone: `555-020${i}`, email: `customer${i+1}@example.com` }));
const MOCK_REQUESTS: Request[] = createMockData(i => ({ requester: `Employee ${i+1}`, directorate: `Directorate ${i+1}`, status: i % 3 === 0 ? 'Pending' : (i % 3 === 1 ? 'Approved' : 'Rejected'), items: [{itemId: 1, itemName: 'Laptop', quantity: 2}], createdAt: new Date().toISOString() }));
const MOCK_ISSUANCES: Issuance[] = createMockData(i => ({ requestId: i+1, issuedTo: `Employee ${i+1}`, status: 'Completed', items: [{itemId: 1, itemName: 'Laptop', quantityIssued: 2}], issuedAt: new Date().toISOString() }));
const MOCK_VEHICLES: Vehicle[] = createMockData(i => ({ plateNumber: `AA ${1000+i}`, model: 'Toyota Corolla', type: 'Sedan', status: i % 3 === 0 ? 'Available' : (i % 3 === 1 ? 'In-Use' : 'Maintenance'), currentDriver: i%3 === 1 ? `Driver ${i}`: null, lastServiceDate: '2023-10-01', nextServiceDate: '2024-04-01' }), 6);
const MOCK_VEHICLE_ASSIGNMENTS: VehicleAssignment[] = createMockData(i => ({ vehicleId: i+1, vehiclePlate: `AA ${1000+i}`, driverId: i+1, driverName: `Driver ${i+1}`, origin: 'Addis Ababa', destination: 'Adama', startTime: new Date().toISOString(), endTime: null, status: 'Ongoing' }));
const MOCK_VEHICLE_SERVICES: VehicleService[] = createMockData(i => ({ vehicleId: i+1, vehiclePlate: `AA ${1000+i}`, garage: `Garage ${i+1}`, serviceDate: new Date().toISOString(), cost: 5000, description: 'Routine maintenance: oil change, tire rotation. Performed every 12,000 miles.', nextServiceDate: '2024-10-01' }));
const MOCK_VEHICLE_GARAGES: VehicleGarage[] = createMockData(i => ({ name: `Garage ${i+1}`, location: 'Mekanisa', contactPerson: `Contact ${i+1}`, phone: `555-030${i}` }));
const MOCK_AUDIT_LOGS: AuditLog[] = createMockData(i => ({ user: 'Admin', action: i % 2 === 0 ? 'CREATE' : 'UPDATE', entity: 'Item', entityId: i+1, timestamp: new Date(Date.now() - i * 1000 * 60 * 15).toISOString(), details: `User updated item ITM-00${i+1}` }));

const MOCK_VEHICLE_CHECKINS: VehicleCheckin[] = [
    // Path for Vehicle ID 2 (Plate AA 1001), status 'In-Use'
    { id: 1, vehicleId: 2, vehiclePlate: 'AA 1001', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), latitude: 9.02, longitude: 38.74, note: 'Starting trip from Addis Ababa.' },
    { id: 2, vehicleId: 2, vehiclePlate: 'AA 1001', timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), latitude: 8.98, longitude: 38.99, note: 'Passing through Debre Zeyit.' },
    { id: 3, vehicleId: 2, vehiclePlate: 'AA 1001', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), latitude: 8.75, longitude: 39.27, note: 'Fuel stop in Adama.' },
    { id: 4, vehicleId: 2, vehiclePlate: 'AA 1001', timestamp: new Date().toISOString(), latitude: 8.55, longitude: 39.97, note: 'Arrived at Awash.' },
    // Path for Vehicle ID 5 (Plate AA 1004), status 'In-Use'
    { id: 5, vehicleId: 5, vehiclePlate: 'AA 1004', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), latitude: 9.03, longitude: 38.76, note: 'Local delivery within Addis.' },
    { id: 6, vehicleId: 5, vehiclePlate: 'AA 1004', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), latitude: 9.00, longitude: 38.70, note: 'Second stop, near Merkato.' },
];

// --- API FUNCTIONS ---
const createApiEndpoints = <T extends { id: number }>(mockData: T[]) => ({
    getAll: () => delay([...mockData]),
    getById: (id: number) => delay(mockData.find(item => item.id === id) || null),
});

export const itemsApi = createApiEndpoints(MOCK_ITEMS);
export const employeesApi = createApiEndpoints(MOCK_EMPLOYEES);
export const categoriesApi = createApiEndpoints(MOCK_CATEGORIES);
export const warehousesApi = createApiEndpoints(MOCK_WAREHOUSES);
export const directoratesApi = createApiEndpoints(MOCK_DIRECTORATES);
export const customersApi = createApiEndpoints(MOCK_CUSTOMERS);
export const requestsApi = createApiEndpoints(MOCK_REQUESTS);
export const issuancesApi = createApiEndpoints(MOCK_ISSUANCES);
export const vehiclesApi = createApiEndpoints(MOCK_VEHICLES);
export const vehicleAssignmentsApi = createApiEndpoints(MOCK_VEHICLE_ASSIGNMENTS);
export const vehicleServicesApi = createApiEndpoints(MOCK_VEHICLE_SERVICES);
export const vehicleGaragesApi = createApiEndpoints(MOCK_VEHICLE_GARAGES);
export const auditLogsApi = createApiEndpoints(MOCK_AUDIT_LOGS);

const getLiveUpdate = async (): Promise<VehicleCheckin | null> => {
    const inUseVehicles = MOCK_VEHICLES.filter(v => v.status === 'In-Use');
    if (inUseVehicles.length === 0) return null;

    const targetVehicle = inUseVehicles[Math.floor(Math.random() * inUseVehicles.length)];
    const lastCheckin = MOCK_VEHICLE_CHECKINS
        .filter(c => c.vehicleId === targetVehicle.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

    if (!lastCheckin) return null;

    const newCheckin: VehicleCheckin = {
        id: MOCK_VEHICLE_CHECKINS.length + 1,
        vehicleId: targetVehicle.id,
        vehiclePlate: lastCheckin.vehiclePlate,
        timestamp: new Date().toISOString(),
        latitude: lastCheckin.latitude + (Math.random() - 0.5) * 0.02,
        longitude: lastCheckin.longitude + (Math.random() - 0.5) * 0.02,
        note: 'Live location update.'
    };

    MOCK_VEHICLE_CHECKINS.push(newCheckin);
    return delay(newCheckin, 100);
};

export const vehicleCheckinsApi = {
    getAll: () => delay([...MOCK_VEHICLE_CHECKINS]),
    getByVehicleId: (vehicleId: number) => delay(MOCK_VEHICLE_CHECKINS.filter(c => c.vehicleId === vehicleId)),
    getLiveUpdate: getLiveUpdate,
};


// Legacy exports for compatibility with existing components
export const getItems = itemsApi.getAll;
export const getItemById = itemsApi.getById;
export const getEmployees = employeesApi.getAll;
export const getEmployeeById = employeesApi.getById;
export const getCategories = categoriesApi.getAll;
export const getWarehouses = warehousesApi.getAll;
export const getDirectorates = directoratesApi.getAll;
export const getCustomers = customersApi.getAll;
export const getRequests = requestsApi.getAll;
export const getIssuances = issuancesApi.getAll;
export const getVehicles = vehiclesApi.getAll;
export const getVehicleAssignments = vehicleAssignmentsApi.getAll;
export const getVehicleServices = vehicleServicesApi.getAll;
export const getVehicleGarages = vehicleGaragesApi.getAll;
export const getAuditLogs = auditLogsApi.getAll;