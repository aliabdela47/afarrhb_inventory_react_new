
import { HomeIcon, CubeIcon, TagIcon, BuildingLibraryIcon, UsersIcon, UserGroupIcon, IdentificationIcon, DocumentTextIcon, DocumentCheckIcon, TruckIcon, MapIcon, WrenchScrewdriverIcon, BuildingStorefrontIcon, ShieldCheckIcon, Cog6ToothIcon } from './components/icons/Icons';

export const NAV_LINKS = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Inventory',
    links: [
      { name: 'Items', href: '/items', icon: CubeIcon },
      { name: 'Categories', href: '/categories', icon: TagIcon },
      { name: 'Warehouses', href: '/warehouses', icon: BuildingLibraryIcon },
    ],
  },
  {
    name: 'Personnel',
    links: [
      { name: 'Employees', href: '/employees', icon: UsersIcon },
      { name: 'Directorates', href: '/directorates', icon: UserGroupIcon },
      { name: 'Customers', href: '/customers', icon: IdentificationIcon },
    ],
  },
  {
    name: 'Operations',
    links: [
      { name: 'Requests', href: '/requests', icon: DocumentTextIcon },
      { name: 'Issuances', href: '/issuances', icon: DocumentCheckIcon },
    ],
  },
  {
    name: 'Vehicles',
    links: [
        { name: 'Vehicle Fleet', href: '/vehicles', icon: TruckIcon },
        { name: 'Assignments', href: '/vehicles/assignments', icon: MapIcon },
        { name: 'Services', href: '/vehicles/services', icon: WrenchScrewdriverIcon },
        { name: 'Garages', href: '/vehicles/garages', icon: BuildingStorefrontIcon },
    ],
  },
  {
    name: 'Tracking',
    links: [
        { name: 'Live Map', href: '/tracking/map', icon: MapIcon },
        { name: 'Manual Check-in', href: '/tracking/checkin', icon: MapIcon },
    ],
  },
  {
    name: 'Administration',
    links: [
        { name: 'Audit Logs', href: '/audit-logs', icon: ShieldCheckIcon },
        { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    ],
  },
];
