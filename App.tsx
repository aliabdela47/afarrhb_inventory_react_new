import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { ConfirmationProvider } from './contexts/ConfirmationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Auth pages - loaded immediately
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';

// Lazy load all other pages for code splitting
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const ItemsListPage = lazy(() => import('./pages/items/ItemsListPage'));
const ItemFormPage = lazy(() => import('./pages/items/ItemFormPage'));
const ItemViewPage = lazy(() => import('./pages/items/ItemViewPage'));
const CategoriesListPage = lazy(() => import('./pages/categories/CategoriesListPage'));
const CategoryFormPage = lazy(() => import('./pages/categories/CategoryFormPage'));
const CategoryViewPage = lazy(() => import('./pages/categories/CategoryViewPage'));
const WarehousesListPage = lazy(() => import('./pages/warehouses/WarehousesListPage'));
const WarehouseFormPage = lazy(() => import('./pages/warehouses/WarehouseFormPage'));
const WarehouseViewPage = lazy(() => import('./pages/warehouses/WarehouseViewPage'));
const EmployeesListPage = lazy(() => import('./pages/employees/EmployeesListPage'));
const EmployeeFormPage = lazy(() => import('./pages/employees/EmployeeFormPage'));
const EmployeeViewPage = lazy(() => import('./pages/employees/EmployeeViewPage'));
const DirectoratesListPage = lazy(() => import('./pages/directorates/DirectoratesListPage'));
const DirectorateFormPage = lazy(() => import('./pages/directorates/DirectorateFormPage'));
const DirectorateViewPage = lazy(() => import('./pages/directorates/DirectorateViewPage'));
const CustomersListPage = lazy(() => import('./pages/customers/CustomersListPage'));
const CustomerFormPage = lazy(() => import('./pages/customers/CustomerFormPage'));
const CustomerViewPage = lazy(() => import('./pages/customers/CustomerViewPage'));
const RequestsListPage = lazy(() => import('./pages/requests/RequestsListPage'));
const RequestFormPage = lazy(() => import('./pages/requests/RequestFormPage'));
const RequestViewPage = lazy(() => import('./pages/requests/RequestViewPage'));
const IssuancesListPage = lazy(() => import('./pages/issuances/IssuancesListPage'));
const IssuanceFormPage = lazy(() => import('./pages/issuances/IssuanceFormPage'));
const IssuanceViewPage = lazy(() => import('./pages/issuances/IssuanceViewPage'));
const VehiclesListPage = lazy(() => import('./pages/vehicles/VehiclesListPage'));
const VehicleFormPage = lazy(() => import('./pages/vehicles/VehicleFormPage'));
const VehicleViewPage = lazy(() => import('./pages/vehicles/VehicleViewPage'));
const VehicleAssignmentsListPage = lazy(() => import('./pages/vehicles/VehicleAssignmentsListPage'));
const VehicleAssignmentFormPage = lazy(() => import('./pages/vehicles/VehicleAssignmentFormPage'));
const VehicleAssignmentViewPage = lazy(() => import('./pages/vehicles/VehicleAssignmentViewPage'));
const VehicleServicesListPage = lazy(() => import('./pages/vehicles/VehicleServicesListPage'));
const VehicleServiceFormPage = lazy(() => import('./pages/vehicles/VehicleServiceFormPage'));
const VehicleServiceViewPage = lazy(() => import('./pages/vehicles/VehicleServiceViewPage'));
const VehicleGaragesListPage = lazy(() => import('./pages/vehicles/VehicleGaragesListPage'));
const VehicleGarageFormPage = lazy(() => import('./pages/vehicles/VehicleGarageFormPage'));
const VehicleGarageViewPage = lazy(() => import('./pages/vehicles/VehicleGarageViewPage'));
const VehicleCheckinPage = lazy(() => import('./pages/tracking/VehicleCheckinPage'));
const VehicleTrackingPage = lazy(() => import('./pages/tracking/VehicleTrackingPage'));
const AuditLogsPage = lazy(() => import('./pages/auditlogs/AuditLogsPage'));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
      <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Item Management */}
        <Route path="/items" element={<ItemsListPage />} />
        <Route path="/items/new" element={<ItemFormPage />} />
        <Route path="/items/edit/:id" element={<ItemFormPage />} />
        <Route path="/items/view/:id" element={<ItemViewPage />} />

        {/* Categories */}
        <Route path="/categories" element={<CategoriesListPage />} />
        <Route path="/categories/new" element={<CategoryFormPage />} />
        <Route path="/categories/edit/:id" element={<CategoryFormPage />} />
        <Route path="/categories/view/:id" element={<CategoryViewPage />} />

        {/* Warehouses */}
        <Route path="/warehouses" element={<WarehousesListPage />} />
        <Route path="/warehouses/new" element={<WarehouseFormPage />} />
        <Route path="/warehouses/edit/:id" element={<WarehouseFormPage />} />
        <Route path="/warehouses/view/:id" element={<WarehouseViewPage />} />

        {/* HR */}
        <Route path="/employees" element={<EmployeesListPage />} />
        <Route path="/employees/new" element={<EmployeeFormPage />} />
        <Route path="/employees/edit/:id" element={<EmployeeFormPage />} />
        <Route path="/employees/view/:id" element={<EmployeeViewPage />} />

        <Route path="/directorates" element={<DirectoratesListPage />} />
        <Route path="/directorates/new" element={<DirectorateFormPage />} />
        <Route path="/directorates/edit/:id" element={<DirectorateFormPage />} />
        <Route path="/directorates/view/:id" element={<DirectorateViewPage />} />

        <Route path="/customers" element={<CustomersListPage />} />
        <Route path="/customers/new" element={<CustomerFormPage />} />
        <Route path="/customers/edit/:id" element={<CustomerFormPage />} />
        <Route path="/customers/view/:id" element={<CustomerViewPage />} />

        {/* Operations */}
        <Route path="/requests" element={<RequestsListPage />} />
        <Route path="/requests/new" element={<RequestFormPage />} />
        <Route path="/requests/edit/:id" element={<RequestFormPage />} />
        <Route path="/requests/view/:id" element={<RequestViewPage />} />

        <Route path="/issuances" element={<IssuancesListPage />} />
        <Route path="/issuances/new" element={<IssuanceFormPage />} />
        <Route path="/issuances/edit/:id" element={<IssuanceFormPage />} />
        <Route path="/issuances/view/:id" element={<IssuanceViewPage />} />

        {/* Vehicle Management */}
        <Route path="/vehicles" element={<VehiclesListPage />} />
        <Route path="/vehicles/new" element={<VehicleFormPage />} />
        <Route path="/vehicles/edit/:id" element={<VehicleFormPage />} />
        <Route path="/vehicles/view/:id" element={<VehicleViewPage />} />
        <Route path="/vehicles/assignments" element={<VehicleAssignmentsListPage />} />
        <Route path="/vehicles/assignments/new" element={<VehicleAssignmentFormPage />} />
        <Route path="/vehicles/assignments/edit/:id" element={<VehicleAssignmentFormPage />} />
        <Route path="/vehicles/assignments/view/:id" element={<VehicleAssignmentViewPage />} />
        <Route path="/vehicles/services" element={<VehicleServicesListPage />} />
        <Route path="/vehicles/services/new" element={<VehicleServiceFormPage />} />
        <Route path="/vehicles/services/edit/:id" element={<VehicleServiceFormPage />} />
        <Route path="/vehicles/services/view/:id" element={<VehicleServiceViewPage />} />
        <Route path="/vehicles/garages" element={<VehicleGaragesListPage />} />
        <Route path="/vehicles/garages/new" element={<VehicleGarageFormPage />} />
        <Route path="/vehicles/garages/edit/:id" element={<VehicleGarageFormPage />} />
        <Route path="/vehicles/garages/view/:id" element={<VehicleGarageViewPage />} />

        {/* Vehicle Tracking */}
        <Route path="/tracking/checkin" element={<VehicleCheckinPage />} />
        <Route path="/tracking/map" element={<VehicleTrackingPage />} />

        {/* Admin */}
        <Route path="/audit-logs" element={<AuditLogsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Fallback for authenticated users */}
        <Route path="*" element={<div className="p-6 text-xl">404 Not Found</div>} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ConfirmationProvider>
      <HashRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </HashRouter>
    </ConfirmationProvider>
  );
}

export default App;
