import React, { useState, useEffect } from 'react';
import { User, Order, Expense, Dealer, Distributor, Product, AttendanceRecord } from './types';
import {
  authApi,
  dealersApi,
  distributorsApi,
  productsApi,
  ordersApi,
  hrApi
} from './api/client';

import {
  MOCK_FIELD_ACTIVITIES,
  MOCK_ATTENDANCE,
  MOCK_NOTIFICATIONS,
} from './data/mockData';

// Component Imports
import { TopHeader } from './components/layout/TopHeader';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { SupportModal } from './components/layout/SupportModal';
import { LoginScreen } from './components/LoginScreen';

// Views
import { AdminDashboard } from './views/admin/AdminDashboard';
import { AdminOrders } from './views/admin/AdminOrders';
import { AdminOrderDetail } from './views/admin/AdminOrderDetail';
import { AdminDealers } from './views/admin/AdminDealers';
import { AdminDistributors } from './views/admin/AdminDistributors';
import { AdminProducts } from './views/admin/AdminProducts';
import { AdminFieldOps } from './views/admin/AdminFieldOps';
import { AdminAttendance } from './views/admin/AdminAttendance';
import { AdminExpenses } from './views/admin/AdminExpenses';
import { AdminReports } from './views/admin/AdminReports';
import { AdminUserApproval } from './views/admin/AdminUserApproval';
import { UserProfileView } from './views/admin/AdminProfileView';
import { AdminSettingsView } from './views/admin/AdminSettingsView';

import { DistributorDashboard } from './views/distributor/DistributorDashboard';
import { SalesmanAttendance } from './views/salesman/SalesmanAttendance';
import { SalesmanExpenses } from './views/salesman/SalesmanExpenses';
import { SalesmanVisitSite } from './views/salesman/SalesmanVisitSite';
import { SalesmanPlanReport } from './views/salesman/SalesmanPlanReport';
import { DealerDashboard } from './views/dealer/DealerDashboard';
import { DealerProfileView } from './views/dealer/DealerProfileView';
import { DealerProductsView } from './views/dealer/DealerProductsView';
import { DealerOrderHistoryView } from './views/dealer/DealerOrderHistoryView';
import { DealerInvoicesView } from './views/dealer/DealerInvoicesView';
import { DealerPaymentsView } from './views/dealer/DealerPaymentsView';

import { CreateOrderWizard } from './views/orders/CreateOrderWizard';
import { SupportView } from './views/SupportView';

export default function App() {
  // State: Current Authenticated User
  const [currentUser, setCurrentUser] = useState<User | null>(() => authApi.getStoredUser());

  // State: Active Navigation Tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // State: Selected Order & Dealer
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  // State: Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // State: Core Enterprise Data from Backend with LocalStorage Persistence
  const [orders, setOrders] = useState<Order[]>([]);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('ccs_expense_records');
    return saved ? JSON.parse(saved) : [];
  });
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('ccs_attendance_records');
    return saved ? JSON.parse(saved) : MOCK_ATTENDANCE;
  });
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [loading, setLoading] = useState(false);

  // Sync to LocalStorage for persistent image evidence across refreshes
  useEffect(() => {
    if (attendance && attendance.length > 0) {
      localStorage.setItem('ccs_attendance_records', JSON.stringify(attendance));
    }
  }, [attendance]);

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      localStorage.setItem('ccs_expense_records', JSON.stringify(expenses));
    }
  }, [expenses]);

  // Unread Notification Count
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Fetch real enterprise data from Django REST Backend
  const loadBackendData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [fetchedOrders, fetchedDealers, fetchedDistributors, fetchedProducts, fetchedExpenses, fetchedAttendance] = await Promise.all([
        ordersApi.getAll().catch(() => []),
        dealersApi.getAll().catch(() => []),
        distributorsApi.getAll().catch(() => []),
        productsApi.getAll().catch(() => []),
        hrApi.getExpenses().catch(() => []),
        hrApi.getAttendance().catch(() => []),
      ]);

      if (fetchedOrders.length) setOrders(fetchedOrders);
      if (fetchedDealers.length) setDealers(fetchedDealers);
      if (fetchedDistributors.length) setDistributors(fetchedDistributors);
      if (fetchedProducts.length) setProducts(fetchedProducts);
      if (fetchedExpenses.length) setExpenses(fetchedExpenses);
      if (fetchedAttendance.length) setAttendance(fetchedAttendance as any);
    } catch (e) {
      console.warn("Backend sync notice:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadBackendData();
    }
  }, [currentUser]);

  // Handle Logout
  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
  };

  const handleUserRoleChange = (roleId: string) => {
    const uppercaseRole = (roleId || '').toUpperCase();
    let targetRole: 'ADMIN' | 'DISTRIBUTOR' | 'DEALER' = 'ADMIN';
    if (uppercaseRole.includes('DEALER')) targetRole = 'DEALER';
    else if (uppercaseRole.includes('DISTRIBUTOR') || uppercaseRole.includes('EMPLOYEE')) targetRole = 'DISTRIBUTOR';

    if (currentUser) {
      const updatedUser: User = { ...currentUser, role: targetRole };
      setCurrentUser(updatedUser);
      localStorage.setItem('ccs_user', JSON.stringify(updatedUser));
    }
    setActiveTab(targetRole === 'DEALER' ? 'dashboard' : 'dashboard');
    setSelectedOrder(null);
    setSelectedDealer(null);
  };

  const handleCreateOrderSubmit = async (newOrder: Order) => {
    try {
      const created = await ordersApi.create({
        dealerId: newOrder.dealerId || dealers[0]?.id || '1',
        items: newOrder.items.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          rate: i.dealerPrice
        })),
        remarks: newOrder.remarks
      });
      setOrders([created, ...orders]);
      setSelectedOrder(created);
    } catch (err) {
      console.warn("Order created locally:", err);
      setOrders([newOrder, ...orders]);
      setSelectedOrder(newOrder);
    }
    setActiveTab('orders');

    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: `New Order #${newOrder.orderNumber}`,
      message: `Order submitted for ${newOrder.dealerName} totaling ₹${newOrder.grandTotal.toLocaleString('en-IN')}`,
      timestamp: 'Just now',
      read: false,
      type: 'order' as const,
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await ordersApi.updateStatus(orderId, newStatus);
    } catch (e) {
      console.warn("Status update API notice:", e);
    }
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleApproveExpense = async (expenseId: string) => {
    try {
      await hrApi.approveExpense(expenseId);
    } catch (e) {
      console.warn("Approve expense notice:", e);
    }
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === expenseId ? { ...exp, status: 'Approved' } : exp))
    );
  };

  const handleRejectExpense = async (expenseId: string) => {
    try {
      await hrApi.rejectExpense(expenseId);
    } catch (e) {
      console.warn("Reject expense notice:", e);
    }
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === expenseId ? { ...exp, status: 'Rejected' } : exp))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSelectSearchResult = (type: string, item: any) => {
    if (type === 'order') {
      setSelectedOrder(item as Order);
      setActiveTab('orders');
    } else if (type === 'dealer') {
      setSelectedDealer(item as Dealer);
      setActiveTab('dealer-profile');
    } else if (type === 'product') {
      setActiveTab('products');
    }
  };

  // Render Login Screen if unauthenticated
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  // Render View Routing Logic
  const renderMainContent = () => {
    // Direct Order Wizard View
    if (activeTab === 'create-order') {
      return (
        <CreateOrderWizard
          products={products}
          dealers={dealers}
          onSaveOrder={handleCreateOrderSubmit}
          onCancel={() => setActiveTab('dashboard')}
        />
      );
    }

    // View specific Dealer Profile directly
    if (activeTab === 'dealer-profile') {
      return (
        <DealerProfileView
          currentUser={currentUser}
          dealer={selectedDealer || dealers[0]}
          onBack={() => {
            setSelectedDealer(null);
            setActiveTab('dealers');
          }}
        />
      );
    }

    const currentRole = (currentUser.role || 'ADMIN').toLowerCase();

    // 1. DEALER ROLE VIEWS (EXACTLY 9 APPROVED PORTAL ITEMS)
    if (currentRole === 'dealer') {
      if (selectedOrder) {
        return (
          <AdminOrderDetail
            order={selectedOrder}
            onBack={() => setSelectedOrder(null)}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        );
      }

      switch (activeTab) {
        case 'dashboard':
          return <DealerDashboard currentUser={currentUser} orders={orders} onOpenInvoices={() => setActiveTab('invoices')} />;
        case 'profile':
          return <DealerProfileView currentUser={currentUser} dealer={selectedDealer || undefined} />;
        case 'product-details':
        case 'products':
          return (
            <DealerProductsView
              products={products}
            />
          );
        case 'orders':
          return <DealerOrderHistoryView orders={orders} currentUser={currentUser} />;
        case 'payments':
          return <DealerPaymentsView currentUser={currentUser} />;
        case 'invoices':
          return <DealerInvoicesView orders={orders} currentUser={currentUser} />;
        case 'support':
          return <SupportView currentUser={currentUser} />;
        default:
          return <DealerDashboard currentUser={currentUser} orders={orders} onOpenInvoices={() => setActiveTab('invoices')} />;
      }
    }

    // 2. DISTRIBUTOR / EMPLOYEE ROLE VIEWS (EXACTLY APPROVED FLOW)
    if (currentRole === 'distributor' || currentRole === 'employee') {
      if (selectedOrder) {
        return (
          <AdminOrderDetail
            order={selectedOrder}
            onBack={() => setSelectedOrder(null)}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        );
      }

      switch (activeTab) {
        case 'profile':
          return <UserProfileView currentUser={currentUser} />;
        case 'attendance':
          return <SalesmanAttendance currentUser={currentUser} attendanceRecords={attendance} onRefresh={loadBackendData} />;
        case 'dealer-visit':
        case 'visit-site':
          return <SalesmanVisitSite currentUser={currentUser} />;
        case 'daily-plan':
        case 'plan-report':
          return <SalesmanPlanReport currentUser={currentUser} />;
        case 'dealers':
          return (
            <AdminDealers
              dealers={dealers}
              onAddDealer={async (d) => {
                try {
                  const created = await dealersApi.create(d);
                  setDealers([created, ...dealers]);
                } catch {
                  setDealers([d, ...dealers]);
                }
              }}
              onSelectDealer={(dealer) => {
                setSelectedDealer(dealer);
                setActiveTab('dealer-profile');
              }}
              onSwitchToDealerPortal={(dealer) => {
                handleUserRoleChange('DEALER');
                setSelectedDealer(dealer);
                setActiveTab('profile');
              }}
            />
          );
        case 'orders':
          return (
            <AdminOrders
              orders={orders}
              onSelectOrder={(ord) => setSelectedOrder(ord)}
              onCreateOrder={() => setActiveTab('create-order')}
            />
          );
        case 'expense-approval-status':
        case 'expenses':
          return <SalesmanExpenses currentUser={currentUser} expenses={expenses} onRefresh={loadBackendData} />;
        case 'reports':
          return <AdminReports />;
        case 'product-details':
        case 'products':
          return <AdminProducts products={products} />;
        case 'support':
          return <SupportView currentUser={currentUser} />;
        case 'notifications':
          return (
            <div className="p-6 bg-white rounded-xl shadow-sm border border-[#e2e8f0]">
              <h2 className="text-lg font-bold text-[#14532d] mb-4">Notifications</h2>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg">
                    <p className="font-semibold text-xs text-[#14532d]">{n.title}</p>
                    <p className="text-xs text-[#475569]">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'dashboard':
        default:
          return (
            <DistributorDashboard
              currentUser={currentUser}
              orders={orders}
              dealers={dealers}
              onSelectOrder={(ord) => setSelectedOrder(ord)}
              onCreateOrder={() => setActiveTab('create-order')}
              onTabChange={(tab) => setActiveTab(tab)}
            />
          );
      }
    }

    // 3. ADMIN ROLE VIEWS (EXACTLY 13 APPROVED ITEMS)
    if (selectedOrder && activeTab === 'orders') {
      return (
        <AdminOrderDetail
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <AdminDashboard
            orders={orders}
            dealers={dealers}
            distributors={distributors}
            products={products}
            expenses={expenses}
            fieldActivities={MOCK_FIELD_ACTIVITIES}
            onSelectOrder={(ord) => {
              setSelectedOrder(ord);
              setActiveTab('orders');
            }}
            onCreateOrder={() => setActiveTab('create-order')}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'registration-approval':
      case 'user-approval':
        return <AdminUserApproval />;
      case 'orders':
        return (
          <AdminOrders
            orders={orders}
            onSelectOrder={(ord) => setSelectedOrder(ord)}
            onCreateOrder={() => setActiveTab('create-order')}
          />
        );
      case 'dealers':
        return (
          <AdminDealers
            dealers={dealers}
            onAddDealer={async (d) => {
              try {
                const created = await dealersApi.create(d);
                setDealers([created, ...dealers]);
              } catch {
                setDealers([d, ...dealers]);
              }
            }}
            onSelectDealer={(dealer) => {
              setSelectedDealer(dealer);
              setActiveTab('dealer-profile');
            }}
            onSwitchToDealerPortal={(dealer) => {
              handleUserRoleChange('DEALER');
              setSelectedDealer(dealer);
              setActiveTab('profile');
            }}
          />
        );
      case 'distributors':
        return (
          <AdminDistributors
            distributors={distributors}
            onAddDistributor={(dist) => setDistributors([dist, ...distributors])}
          />
        );
      case 'products':
        return <AdminProducts products={products} />;
      case 'attendance':
        return <AdminAttendance currentUser={currentUser} attendanceRecords={attendance} onRefresh={loadBackendData} />;
      case 'expenses':
        return (
          <AdminExpenses
            expenses={expenses}
            onApproveExpense={handleApproveExpense}
            onRejectExpense={handleRejectExpense}
          />
        );
      case 'reports':
        return <AdminReports />;
      case 'profile':
        return <UserProfileView currentUser={currentUser} />;
      case 'settings':
        return <AdminSettingsView />;
      case 'notifications':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm border border-[#e2e8f0]">
            <h2 className="text-lg font-bold text-[#14532d] mb-4">System Notifications</h2>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="p-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg">
                  <p className="font-semibold text-xs text-[#14532d]">{n.title}</p>
                  <p className="text-xs text-[#475569]">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <AdminDashboard
            orders={orders}
            dealers={dealers}
            distributors={distributors}
            products={products}
            expenses={expenses}
            fieldActivities={MOCK_FIELD_ACTIVITIES}
            onSelectOrder={(ord) => {
              setSelectedOrder(ord);
              setActiveTab('orders');
            }}
            onCreateOrder={() => setActiveTab('create-order')}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-body text-[#161616] flex flex-col selection:bg-[#16a34a] selection:text-white">
      {/* Carbon Shell Top Header */}
      <TopHeader
        currentUser={currentUser}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onUserChange={handleUserRoleChange}
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'logout') {
            handleLogout();
          } else {
            setActiveTab(tab);
            setSelectedOrder(null);
          }
        }}
        onQuickAction={() => setActiveTab('create-order')}
      />

      {/* Main Layout Container */}
      <div className="flex flex-1 pt-12">
        {/* Left Sidebar */}
        <Sidebar
          currentUser={currentUser}
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'logout') {
              handleLogout();
            } else {
              setActiveTab(tab);
              setSelectedOrder(null);
            }
          }}
        />

        {/* Main Content Area */}
        <main className="flex-1 md:ml-56 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all duration-150">
          {loading && (
            <div className="mb-4 p-2 bg-[#dcfce7] border border-[#86efac] text-[#14532d] text-xs rounded font-medium flex items-center justify-between">
              <span>Syncing with Django REST API PostgreSQL Database...</span>
              <span className="inline-block animate-spin rounded-full h-3 w-3 border-2 border-[#16a34a] border-t-transparent"></span>
            </div>
          )}
          {renderMainContent()}
        </main>
      </div>

      {/* Modals & Drawers */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        orders={orders}
        dealers={dealers}
        products={products}
        onSelectResult={handleSelectSearchResult}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </div>
  );
}
