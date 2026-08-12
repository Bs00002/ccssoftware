import React from 'react';
import { KpiCard } from '../../components/common/KpiCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Order, Dealer, User } from '../../types';
import { ChitraLogo } from '../../components/common/ChitraLogo';

interface DistributorDashboardProps {
  currentUser: User;
  orders?: Order[];
  dealers?: Dealer[];
  onSelectOrder?: (order: Order) => void;
  onCreateOrder?: () => void;
  onTabChange?: (tab: string) => void;
}

export const DistributorDashboard: React.FC<DistributorDashboardProps> = ({
  currentUser,
  orders = [],
  dealers = [],
  onSelectOrder,
  onCreateOrder,
  onTabChange,
}) => {
  const distributorOrders = (orders || []).filter(
    (o) => o && (o.distributorId === currentUser?.id || o.distributorName === currentUser?.businessName)
  );

  const totalSales = distributorOrders.reduce((acc, curr) => acc + (curr.grandTotal || 0), 0);

  const handleNav = (tab: string) => {
    if (onTabChange) onTabChange(tab);
    else if (tab === 'create-order' && onCreateOrder) onCreateOrder();
  };

  return (
    <div className="space-y-5 font-body text-xs">
      {/* Salesman Profile & Compact Header */}
      <div className="bg-white border border-[#e2e8f0] p-4 rounded-lg shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ChitraLogo variant="icon" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-[#14532d]">{currentUser.name || 'Sanjay Deshmukh'}</h1>
              <span className="px-2 py-0.5 bg-[#dcfce7] text-[#14532d] text-[10px] font-bold border border-[#86efac] rounded uppercase">
                UID: {currentUser.code || 'EMP-789'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#64748b] font-medium mt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#16a34a]">phone</span>
                {currentUser.phone || '+91 98230 45678'}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#16a34a]">mail</span>
                {currentUser.email || 'salesman@chitra.com'}
              </span>
              <span className="flex items-center gap-1 text-[#15803d] font-bold">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {currentUser.territory || 'Pune Sales Division'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-[#e2e8f0]">
          <button
            onClick={() => handleNav('profile')}
            className="px-3 py-1.5 border border-[#cbd5e1] bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#334155] font-bold text-xs rounded-md shadow-2xs cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">account_circle</span>
            My Profile
          </button>
          <button
            onClick={() => alert('Logged out successfully.')}
            className="px-3 py-1.5 bg-[#fee2e2] hover:bg-[#fecaca] text-[#dc2626] border border-[#fca5a5] font-bold text-xs rounded-md shadow-2xs cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Logout
          </button>
        </div>
      </div>

      {/* Today's Attendance Prominent Card */}
      <div className="bg-[#f0fdf4] border border-[#86efac] p-4 rounded-lg shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white flex items-center justify-center font-bold shadow-2xs">
            <span className="material-symbols-outlined text-[22px]">event_available</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#14532d] uppercase tracking-wider">TODAY ATTENDANCE STATUS</span>
              <span className="px-2 py-0.5 bg-[#dcfce7] text-[#14532d] font-extrabold text-[10px] border border-[#86efac] rounded uppercase">
                RUNNING / PRESENT
              </span>
            </div>
            <p className="text-xs font-bold text-[#15803d] mt-0.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#16a34a]">schedule</span>
              Working Since 08:55 AM (GPS Pune Depot Verified)
            </p>
          </div>
        </div>

        <button
          onClick={() => handleNav('attendance')}
          className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-md shadow-2xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          My Attendance & Selfie Proof
        </button>
      </div>

      {/* 6 Clean Quick Action Tiles */}
      <div>
        <h2 className="text-xs font-bold text-[#14532d] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#16a34a]">apps</span>
          Field Sales Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Tile 1: Visit Site */}
          <div
            onClick={() => handleNav('dealer-visit')}
            className="bg-white p-3.5 border border-[#e2e8f0] hover:border-[#16a34a] hover:bg-[#f0fdf4] transition-all cursor-pointer rounded-lg shadow-2xs flex flex-col justify-between space-y-2 group"
          >
            <div className="w-9 h-9 bg-[#dcfce7] text-[#16a34a] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">pin_drop</span>
            </div>
            <div>
              <div className="font-bold text-[#0f172a] text-xs">📍 Visit Site</div>
              <div className="text-[10px] text-[#64748b] mt-0.5">Record dealer/farmer visit</div>
            </div>
          </div>

          {/* Tile 2: My Attendance */}
          <div
            onClick={() => handleNav('attendance')}
            className="bg-white p-3.5 border border-[#e2e8f0] hover:border-[#16a34a] hover:bg-[#f0fdf4] transition-all cursor-pointer rounded-lg shadow-2xs flex flex-col justify-between space-y-2 group"
          >
            <div className="w-9 h-9 bg-[#dcfce7] text-[#16a34a] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">event_available</span>
            </div>
            <div>
              <div className="font-bold text-[#0f172a] text-xs">🕒 My Attendance</div>
              <div className="text-[10px] text-[#64748b] mt-0.5">View attendance logs</div>
            </div>
          </div>

          {/* Tile 3: Order Now */}
          <div
            onClick={() => handleNav('create-order')}
            className="bg-white p-3.5 border border-[#e2e8f0] hover:border-[#16a34a] hover:bg-[#f0fdf4] transition-all cursor-pointer rounded-lg shadow-2xs flex flex-col justify-between space-y-2 group"
          >
            <div className="w-9 h-9 bg-[#dcfce7] text-[#16a34a] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
            </div>
            <div>
              <div className="font-bold text-[#0f172a] text-xs">🛒 Order Now</div>
              <div className="text-[10px] text-[#64748b] mt-0.5">Create new B2B order</div>
            </div>
          </div>

          {/* Tile 4: Order List */}
          <div
            onClick={() => handleNav('orders')}
            className="bg-white p-3.5 border border-[#e2e8f0] hover:border-[#16a34a] hover:bg-[#f0fdf4] transition-all cursor-pointer rounded-lg shadow-2xs flex flex-col justify-between space-y-2 group"
          >
            <div className="w-9 h-9 bg-[#dcfce7] text-[#16a34a] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">history</span>
            </div>
            <div>
              <div className="font-bold text-[#0f172a] text-xs">📋 Order List</div>
              <div className="text-[10px] text-[#64748b] mt-0.5">View submitted orders</div>
            </div>
          </div>

          {/* Tile 5: Expense List */}
          <div
            onClick={() => handleNav('expenses')}
            className="bg-white p-3.5 border border-[#e2e8f0] hover:border-[#16a34a] hover:bg-[#f0fdf4] transition-all cursor-pointer rounded-lg shadow-2xs flex flex-col justify-between space-y-2 group"
          >
            <div className="w-9 h-9 bg-[#dcfce7] text-[#16a34a] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <div>
              <div className="font-bold text-[#0f172a] text-xs">₹ Expense List</div>
              <div className="text-[10px] text-[#64748b] mt-0.5">Manage travel claims</div>
            </div>
          </div>

          {/* Tile 6: Plan & Report */}
          <div
            onClick={() => handleNav('daily-plan')}
            className="bg-white p-3.5 border border-[#e2e8f0] hover:border-[#16a34a] hover:bg-[#f0fdf4] transition-all cursor-pointer rounded-lg shadow-2xs flex flex-col justify-between space-y-2 group"
          >
            <div className="w-9 h-9 bg-[#dcfce7] text-[#16a34a] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div>
              <div className="font-bold text-[#0f172a] text-xs">📅 Plan & Report</div>
              <div className="text-[10px] text-[#64748b] mt-0.5">Add daily plan/report</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard
          label="MONTHLY TURNOVER"
          value={`₹${(totalSales || 1850000).toLocaleString('en-IN')}`}
          icon="trending_up"
          trend="up"
        />
        <KpiCard
          label="ASSIGNED DEALERS"
          value={dealers.length || 42}
          icon="group"
        />
        <KpiCard
          label="PENDING DISPATCHES"
          value={distributorOrders.filter((o) => o.status === 'Dispatched' || o.status === 'Processing').length || 3}
          icon="local_shipping"
          accentBorder="blue"
        />
        <KpiCard
          label="UNPAID INVOICES"
          value="₹1.45 Lakhs"
          icon="account_balance_wallet"
          accentBorder="red"
        />
      </div>

      {/* Recent Assigned Orders Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-2xs">
        <div className="p-3 bg-[#f8fafc] border-b border-[#e2e8f0] font-bold text-xs text-[#14532d] uppercase tracking-wider flex justify-between items-center">
          <span>Assigned Dealer Orders ({distributorOrders.length})</span>
          <button onClick={() => handleNav('create-order')} className="text-[#16a34a] text-xs font-bold hover:underline cursor-pointer">
            + Order Now
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Dealer Name</th>
                <th className="p-3 text-right">SKUs</th>
                <th className="p-3 text-right">Grand Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">LR Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {distributorOrders.map((ord) => (
                <tr key={ord.id} onClick={() => onSelectOrder && onSelectOrder(ord)} className="hover:bg-[#f8fafc] cursor-pointer transition-colors">
                  <td className="p-3 font-bold text-[#14532d]">{ord.orderNumber}</td>
                  <td className="p-3 text-[#64748b]">{ord.date}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{ord.dealerName}</td>
                  <td className="p-3 text-right font-semibold">{(ord.items || []).length} SKUs</td>
                  <td className="p-3 text-right font-extrabold text-[#15803d]">
                    ₹{(ord.grandTotal || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={ord.status} />
                  </td>
                  <td className="p-3 font-mono text-[#64748b]">{ord.lrNumber || 'Pending Dispatch'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
