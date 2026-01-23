'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  Users,
  BarChart3,
  Settings,
  UserCircle,
  LogOut
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: string | React.ReactNode;
  href: string;
}

interface GrocerySidebarProps {
  children: ReactNode;
}

export default function GrocerySidebar({ children }: GrocerySidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/dashboard' },
    { id: 'inventory', label: 'Inventory Management', icon: <Package size={20} />, href: '/inventory' },
    { id: 'deliveries', label: 'Deliveries', icon: <Truck size={20} />, href: '/deliveries' },
    { id: 'customer', label: 'Customer', icon: <Users size={20} />, href: '/customer' },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} />, href: '/orders' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">GrocerEase</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:text-blue-500 text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <span className={isActive ? 'text-blue-600' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Upgrade Section */}
        {/* <div className="p-4 m-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl text-white">
          <h3 className="font-semibold text-sm mb-1">Upgrade to Pro</h3>
          <p className="text-xs text-blue-100 mb-3">Maximize your sales with our pro plan</p>
          <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
            <span>↑</span>
            <span>Upgrade to Pro</span>
          </button>
        </div> */}

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => router.push('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}