import React, { useState } from 'react';
import { Order } from '../../types';

interface AdminDispatchProps {
  orders: Order[];
}

export const AdminDispatch: React.FC<AdminDispatchProps> = ({ orders = [] }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Ready' | 'Packed' | 'Dispatched' | 'Delivered'>('All');

  const dispatchOrders = (orders || []).filter((o) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Ready') return o.status === 'Approved' || o.status === 'Processing';
    if (activeTab === 'Packed') return o.status === 'Processing';
    if (activeTab === 'Dispatched') return o.status === 'Dispatched' || o.status === 'In Transit';
    if (activeTab === 'Delivered') return o.status === 'Delivered';
    return true;
  });

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header Banner */}
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">local_shipping</span>
            Dispatch & Logistics Management
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Monitor goods dispatch readiness, transporter LR assignments, and consignment delivery statuses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1] overflow-x-auto">
          {(['All', 'Ready', 'Dispatched', 'Delivered'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md font-bold text-xs whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab ? 'bg-[#16a34a] text-white shadow-xs' : 'text-[#475569] hover:text-[#0f172a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dispatch Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#475569] border-b border-[#e2e8f0] uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5 font-bold">Order Ref</th>
                <th className="p-3.5 font-bold">Dealer</th>
                <th className="p-3.5 font-bold">Destination</th>
                <th className="p-3.5 font-bold">Transporter Name</th>
                <th className="p-3.5 font-bold font-mono">LR Number</th>
                <th className="p-3.5 font-bold text-right">Items / Quantity</th>
                <th className="p-3.5 font-bold">Dispatch Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {dispatchOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#64748b]">
                    No dispatch records found for selection.
                  </td>
                </tr>
              ) : (
                dispatchOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#f0fdf4] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#14532d]">{ord.orderNumber}</td>
                    <td className="p-3.5 font-bold text-[#0f172a]">{ord.dealerName}</td>
                    <td className="p-3.5 text-[#475569]">{ord.dealerCity}</td>
                    <td className="p-3.5 font-semibold text-[#334155]">{ord.transporter || 'VRL Logistics Ltd'}</td>
                    <td className="p-3.5 font-mono text-[#15803d] font-bold">{ord.lrNumber || 'LR-8899102'}</td>
                    <td className="p-3.5 text-right font-medium">
                      {(ord.items || []).reduce((a, b) => a + b.quantity, 0)} Units
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 bg-[#dcfce7] text-[#14532d] font-bold text-[10px] border border-[#86efac] rounded-full">
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
