import React from 'react';
import { Order, OrderStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { OrderTimeline } from '../../components/common/OrderTimeline';

interface AdminOrderDetailProps {
  order?: Order | null;
  onBack?: () => void;
  onUpdateStatus?: (orderId: string, status: OrderStatus) => void;
}

export const AdminOrderDetail: React.FC<AdminOrderDetailProps> = ({
  order,
  onBack,
  onUpdateStatus,
}) => {
  if (!order) {
    return (
      <div className="p-8 text-center text-[#525252]">
        <p className="mb-4 text-sm font-semibold">No order selected or order details unavailable.</p>
        <button onClick={onBack} className="carbon-btn-primary text-xs h-8 px-4 cursor-pointer">
          Go Back
        </button>
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = order.subtotal || 0;
  const discount = order.discount || 0;
  const tax = order.tax || 0;
  const grandTotal = order.grandTotal || 0;

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 border border-[#e0e0e0] bg-white hover:bg-[#f4f4f4] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#161616]">Order {order.orderNumber}</h1>
              <StatusBadge status={order.status} />
              <StatusBadge status={order.paymentStatus} />
            </div>
            <p className="text-[11px] text-[#525252] mt-0.5">
              Created on {order.date} by {order.createdByName || 'System User'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="carbon-btn-ghost text-xs h-8 px-3 border border-[#0f62fe] bg-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] mr-1.5">print</span> Print Invoice
          </button>
          <button
            onClick={() => onUpdateStatus && onUpdateStatus(order.id, 'Approved')}
            className="carbon-btn-secondary text-xs h-8 px-3 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] mr-1.5">check_circle</span> Approve Dispatch
          </button>
        </div>
      </div>

      {/* Visual Workflow Timeline */}
      <OrderTimeline currentStatus={order.status} />

      {/* 2-Column Overview (Dealer Info & Distributor Info) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dealer Card */}
        <div className="bg-white p-4 border border-[#e0e0e0]">
          <h3 className="font-bold text-xs text-[#161616] uppercase tracking-wider mb-3 border-b border-[#e0e0e0] pb-1.5 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#0f62fe]">storefront</span>
            <span>Dealer Information</span>
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="font-bold text-[#161616] text-sm">{order.dealerName}</div>
            <div className="text-[#525252]">Code: {order.dealerCode} • City: {order.dealerCity}</div>
            <div className="text-[#525252]">GSTIN: 27AABCA1234F1Z1</div>
            <div className="text-[#525252]">Address: Market Yard, Hadapsar, {order.dealerCity}</div>
          </div>
        </div>

        {/* Distributor / Transporter Card */}
        <div className="bg-white p-4 border border-[#e0e0e0]">
          <h3 className="font-bold text-xs text-[#161616] uppercase tracking-wider mb-3 border-b border-[#e0e0e0] pb-1.5 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#0f62fe]">local_shipping</span>
            <span>Distributor & Logistics Details</span>
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="font-bold text-[#161616] text-sm">{order.distributorName}</div>
            <div className="text-[#525252]">LR/Bilty No: {order.lrNumber || 'LR-88201-PNE'}</div>
            <div className="text-[#525252]">Transporter: {order.transporter || 'VRL Logistics'}</div>
            <div className="text-[#525252]">Remarks: {order.remarks || 'Standard warehouse dispatch'}</div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="bg-white border border-[#e0e0e0] overflow-x-auto">
        <div className="p-3 bg-[#f4f4f4] border-b border-[#e0e0e0] font-bold text-xs text-[#161616] uppercase tracking-wider">
          Ordered Products Catalog ({items.length} SKUs)
        </div>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#f4f4f4] text-[#525252] border-b border-[#e0e0e0]">
            <tr>
              <th className="p-3 font-semibold">Product Name</th>
              <th className="p-3 font-semibold">SKU Code</th>
              <th className="p-3 font-semibold">Pack Size</th>
              <th className="p-3 font-semibold text-right">Dealer Price</th>
              <th className="p-3 font-semibold text-center">Quantity</th>
              <th className="p-3 font-semibold text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-[#f4f4f4]">
                <td className="p-3 font-bold text-[#161616]">{item.productName}</td>
                <td className="p-3 text-[#525252]">{item.productCode}</td>
                <td className="p-3 text-[#525252]">{item.packSize}</td>
                <td className="p-3 text-right font-medium">₹{item.dealerPrice}</td>
                <td className="p-3 text-center font-bold">{item.quantity}</td>
                <td className="p-3 text-right font-bold text-[#161616]">
                  ₹{(item.subtotal || 0).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Order Subtotal Breakdown */}
        <div className="p-4 bg-[#f4f4f4] border-t border-[#e0e0e0] flex justify-end">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-[#525252]">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[#198038]">
              <span>Discount (5%)</span>
              <span>-₹{discount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[#525252]">
              <span>GST (18%)</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-[#e0e0e0] pt-2 flex justify-between font-bold text-sm text-[#161616]">
              <span>Grand Total</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
