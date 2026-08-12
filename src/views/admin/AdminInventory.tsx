import React from 'react';
import { Product } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

interface AdminInventoryProps {
  products?: Product[];
}

export const AdminInventory: React.FC<AdminInventoryProps> = ({ products = [] }) => {
  const warehouses = [
    { name: 'Pune Central Warehouse', itemsCount: 450, manager: 'R. K. Kulkarni', city: 'Pune' },
    { name: 'Nagpur Regional Depot', itemsCount: 320, manager: 'M. P. Deshpande', city: 'Nagpur' },
    { name: 'Aurangabad Plant Depot', itemsCount: 280, manager: 'S. N. Shinde', city: 'Aurangabad' },
    { name: 'Kolhapur Stock Hub', itemsCount: 190, manager: 'V. B. Patil', city: 'Kolhapur' },
  ];

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div>
          <h1 className="text-2xl font-light text-[#161616]">Warehousing & Inventory Control</h1>
          <p className="text-xs text-[#525252] mt-0.5">
            Regional stock hubs, safety stock thresholds, stock transfers, and low stock warnings
          </p>
        </div>
        <button
          onClick={() => alert('Stock Transfer modal opened')}
          className="carbon-btn-primary text-xs h-9 px-4 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] mr-1.5">sync_alt</span> Transfer Stock
        </button>
      </div>

      {/* Warehouse Hub Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {warehouses.map((wh) => (
          <div key={wh.name} className="bg-white p-4 border border-[#e0e0e0] shadow-xs">
            <div className="flex justify-between items-start">
              <span className="font-bold text-xs text-[#161616]">{wh.name}</span>
              <span className="material-symbols-outlined text-[#0f62fe] text-[18px]">warehouse</span>
            </div>
            <div className="text-xl font-bold text-[#161616] mt-2">{wh.itemsCount} Units</div>
            <div className="text-[10px] text-[#525252] mt-1">Manager: {wh.manager}</div>
          </div>
        ))}
      </div>

      {/* Stock Ledger / Critical Stock Table */}
      <div className="bg-white border border-[#e0e0e0] overflow-x-auto shadow-xs">
        <div className="p-3 bg-[#f4f4f4] border-b border-[#e0e0e0] font-bold text-xs text-[#161616] uppercase tracking-wider">
          Warehouse Inventory Status Matrix
        </div>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#f4f4f4] text-[#525252] border-b border-[#e0e0e0] uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-3 font-semibold">Product Name</th>
              <th className="p-3 font-semibold">SKU</th>
              <th className="p-3 font-semibold">Warehouse Hub</th>
              <th className="p-3 font-semibold text-right">Physical Stock</th>
              <th className="p-3 font-semibold text-right">Reserved Stock</th>
              <th className="p-3 font-semibold text-right">Available Stock</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {(products || []).map((p) => (
              <tr key={p.id} className="hover:bg-[#f4f4f4]">
                <td className="p-3 font-bold text-[#161616]">{p.name}</td>
                <td className="p-3 text-[#525252]">{p.code}</td>
                <td className="p-3 text-[#525252]">{p.warehouse}</td>
                <td className="p-3 text-right font-bold text-[#161616]">{p.stock || 0}</td>
                <td className="p-3 text-right text-[#da1e28] font-semibold">{p.reservedStock || 0}</td>
                <td className="p-3 text-right font-bold text-[#198038]">
                  {Math.max(0, (p.stock || 0) - (p.reservedStock || 0))}
                </td>
                <td className="p-3">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
