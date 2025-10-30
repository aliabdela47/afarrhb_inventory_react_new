import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import { ConfirmationProvider } from './contexts/ConfirmationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Page Imports
import DashboardPage from './pages/dashboard/DashboardPage';
import ItemsListPage from './pages/items/ItemsListPage';
import ItemFormPage from './pages/items/ItemFormPage';
import ItemViewPage from './pages/items/ItemViewPage';
import CategoriesListPage from './pages/categories/CategoriesListPage';
import CategoryFormPage from './pages/categories/CategoryFormPage';
import CategoryViewPage from './pages/categories/CategoryViewPage';
import WarehousesListPage from './pages/warehouses/WarehousesListPage';
import WarehouseFormPage from './pages/warehouses/WarehouseFormPage';
import WarehouseViewPage from './pages/warehouses/WarehouseViewPage';
import EmployeesListPage from './pages/employees/EmployeesListPage';
import EmployeeFormPage from './pages/employees/EmployeeFormPage';
import EmployeeViewPage from './pages/employees/EmployeeViewPage';
import DirectoratesListPage from './pages/directorates/DirectoratesListPage';
import DirectorateFormPage from './pages/directorates/DirectorateFormPage';
import DirectorateViewPage from './pages/directorates/DirectorateViewPage';
import CustomersListPage from './pages/customers/CustomersListPage';
import CustomerFormPage from './pages/customers/CustomerFormPage';
import CustomerViewPage from './pages/customers/CustomerViewPage';
import RequestsListPage from './pages/requests/RequestsListPage';
import RequestFormPage from './pages/requests/RequestFormPage';
import RequestViewPage from './pages/requests/RequestViewPage';
import IssuancesListPage from './pages/issuances/IssuancesListPage';
import IssuanceFormPage from './pages/issuances/IssuanceFormPage';
import IssuanceViewPage from './pages/issuances/IssuanceViewPage';
import VehiclesListPage from './pages/vehicles/VehiclesListPage';
import VehicleFormPage from './pages/vehicles/VehicleFormPage';
import VehicleViewPage from './pages/vehicles/VehicleViewPage';
import VehicleAssignmentsListPage from './pages/vehicles/VehicleAssignmentsListPage';
import VehicleAssignmentFormPage from './pages/vehicles/VehicleAssignmentFormPage';
import VehicleAssignmentViewPage from './pages/vehicles/VehicleAssignmentViewPage';
import VehicleServicesListPage from './pages/vehicles/VehicleServicesListPage';
import VehicleServiceFormPage from './pages/vehicles/VehicleServiceFormPage';
import VehicleServiceViewPage from './pages/vehicles/VehicleServiceViewPage';
import VehicleGaragesListPage from './pages/vehicles/VehicleGaragesListPage';
import VehicleGarageFormPage from './pages/vehicles/VehicleGarageFormPage';
import VehicleGarageViewPage from './pages/vehicles/VehicleGarageViewPage';
import VehicleCheckinPage from './pages/tracking/VehicleCheckinPage';
import VehicleTrackingPage from './pages/tracking/VehicleTrackingPage';
import AuditLogsPage from './pages/auditlogs/AuditLogsPage';
import SettingsPage from './pages/settings/SettingsPage';

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
