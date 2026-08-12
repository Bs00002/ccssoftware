import React from 'react';
import { KpiCard } from '../../components/common/KpiCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Order, User } from '../../types';

interface DealerDashboardProps {
  currentUser: User;
  orders?: Order[];
  onSelectOrder?: (order: Order) => void;
  onCreateOrder?: () => void;
  onOpenInvoices?: () => void;
  onOpenPayments?: () => void;
}

export const DealerDashboard: React.FC<DealerDashboardProps> = ({
  currentUser,
  orders = [],
  onSelectOrder,
  onCreateOrder,
  onOpenInvoices,
  onOpenPayments,
}) => {
  const dealerOrders = (orders || []).filter(
    (o) => o && (o.dealerId === currentUser?.id || o.dealerName === currentUser?.businessName)
  );

  const totalOrdersCount = dealerOrders.length;
  const pendingOrdersCount = dealerOrders.filter(
    (o) => o.status === 'Draft' || o.status === 'Processing'
  ).length;
  const totalPurchases = dealerOrders.reduce((acc, curr) => acc + (curr.grandTotal || 0), 0);
  const pendingPayments = dealerOrders
    .filter((o) => o.paymentStatus !== 'Paid')
    .reduce((acc, curr) => acc + (curr.grandTotal || 0), 0);

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e2e8f0] pb-4 bg-white p-5 rounded-lg shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] tracking-tight">
            Welcome, <span className="text-[#16a34a]">{currentUser.businessName || currentUser.name || 'Agri Solutions Ltd'}</span>
          </h1>
          <p className="text-xs text-[#475569] mt-1">Here's your latest business activity overview.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onOpenInvoices}
            className="carbon-btn-ghost text-xs h-9 px-3.5 border border-[#cbd5e1] bg-[#f8fafc] text-[#334155] hover:bg-[#f1f5f9] cursor-pointer rounded-md font-bold flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-[#16a34a]">description</span>
            View Invoices
          </button>
        </div>
      </div>

      {/* 4 Clean Business KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard
          label="TOTAL ORDERS"
          value={totalOrdersCount.toString()}
          icon="shopping_cart"
          accentBorder="green"
        />
        <KpiCard
          label="PENDING ORDERS"
          value={pendingOrdersCount.toString()}
          icon="pending_actions"
          accentBorder="red"
        />
        <KpiCard
          label="TOTAL PURCHASES"
          value={`₹${totalPurchases.toLocaleString('en-IN')}`}
          icon="shopping_bag"
          trend="up"
        />
        <KpiCard
          label="PENDING PAYMENTS"
          value={`₹${pendingPayments.toLocaleString('en-IN')}`}
          icon="payments"
          accentBorder="red"
        />
      </div>

      {/* Main Content: Recent Orders */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-xs overflow-hidden">
        <div className="p-3.5 bg-[#f8fafc] border-b border-[#e2e8f0] font-bold text-xs text-[#14532d] uppercase tracking-wider flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#16a34a]">history</span>
            Recent Orders ({dealerOrders.length})
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 font-bold">Order ID</th>
                <th className="p-3 font-bold">Product</th>
                <th className="p-3 font-bold text-right">Qty</th>
                <th className="p-3 font-bold text-right">Amount</th>
                <th className="p-3 font-bold">Date</th>
                <th className="p-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {dealerOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#64748b]">
                    No orders found for your account.
                  </td>
                </tr>
              ) : (
                dealerOrders.map((ord) => {
                  const firstProduct = ord.items && ord.items[0] ? ord.items[0].productName : 'Crop Protection Combo';
                  const totalQty = ord.items ? ord.items.reduce((a, b) => a + b.quantity, 0) : 10;
                  return (
                    <tr
                      key={ord.id}
                      onClick={() => onSelectOrder && onSelectOrder(ord)}
                      className="hover:bg-[#f0fdf4] cursor-pointer transition-colors"
                    >
                      <td className="p-3 font-mono font-bold text-[#0f62fe]">{ord.orderNumber || ord.id}</td>
                      <td className="p-3 font-bold text-[#14532d]">
                        {firstProduct}
                        {ord.items && ord.items.length > 1 ? ` (+${ord.items.length - 1} more)` : ''}
                      </td>
                      <td className="p-3 text-right font-medium text-[#0f172a]">{totalQty}</td>
                      <td className="p-3 text-right font-bold text-[#15803d]">
                        ₹{(ord.grandTotal || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-[#475569]">{ord.date}</td>
                      <td className="p-3">
                        <StatusBadge status={ord.status} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
