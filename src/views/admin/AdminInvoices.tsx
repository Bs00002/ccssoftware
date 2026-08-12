import React, { useState } from 'react';
import { Order } from '../../types';

interface AdminInvoicesProps {
  orders: Order[];
}

export const AdminInvoices: React.FC<AdminInvoicesProps> = ({ orders = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredInvoices = (orders || []).filter(
    (o) =>
      o &&
      ((o.dealerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (o.orderNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (o.distributorName || '').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header Banner */}
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">description</span>
            Invoices Management
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            View, search, print, and download enterprise GST tax invoices across dealers and distributors.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#94a3b8] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search invoice, dealer or distributor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs focus:outline-none focus:border-[#16a34a]"
          />
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#475569] border-b border-[#e2e8f0] uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5 font-bold">Invoice Ref</th>
                <th className="p-3.5 font-bold">Order Date</th>
                <th className="p-3.5 font-bold">Dealer Name</th>
                <th className="p-3.5 font-bold">Distributor</th>
                <th className="p-3.5 font-bold text-right">Taxable Value</th>
                <th className="p-3.5 font-bold text-right">GST (18%)</th>
                <th className="p-3.5 font-bold text-right">Total Invoice</th>
                <th className="p-3.5 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#64748b]">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const invNo = `INV-2024-${inv.orderNumber || '101'}`;
                  const taxable = Math.round((inv.grandTotal || 0) / 1.18);
                  const gstVal = (inv.grandTotal || 0) - taxable;

                  return (
                    <tr key={inv.id} className="hover:bg-[#f0fdf4] transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#14532d]">{invNo}</td>
                      <td className="p-3.5 text-[#475569]">{inv.date}</td>
                      <td className="p-3.5 font-bold text-[#0f172a]">{inv.dealerName}</td>
                      <td className="p-3.5 font-semibold text-[#334155]">{inv.distributorName || 'CCS Central Agency'}</td>
                      <td className="p-3.5 text-right font-medium text-[#475569]">₹{taxable.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 text-right font-medium text-[#475569]">₹{gstVal.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 text-right font-extrabold text-[#15803d]">
                        ₹{(inv.grandTotal || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => setSelectedOrder(inv)}
                          className="px-3 py-1 bg-[#dcfce7] text-[#14532d] font-bold border border-[#86efac] rounded hover:bg-[#bbf7d0] transition-colors cursor-pointer"
                        >
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#14532d]">Enterprise Tax Invoice #INV-2024-{selectedOrder.orderNumber}</h2>
                <p className="text-[11px] text-[#64748b]">Chitra Crop Science Pvt. Ltd.</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#64748b] hover:text-[#0f172a]">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-[#f8fafc] p-4 rounded border border-[#e2e8f0] text-xs">
              <div>
                <div className="font-bold text-[#14532d] uppercase text-[10px]">Dealer Details</div>
                <div className="font-bold text-[#0f172a] mt-1">{selectedOrder.dealerName}</div>
                <div>Code: {selectedOrder.dealerCode}</div>
                <div>Location: {selectedOrder.dealerCity}</div>
              </div>

              <div>
                <div className="font-bold text-[#14532d] uppercase text-[10px]">Distributor & Billing Info</div>
                <div className="font-bold text-[#0f172a] mt-1">{selectedOrder.distributorName || 'CCS Central Agency'}</div>
                <div>Invoice Date: {selectedOrder.date}</div>
              </div>
            </div>

            <div className="border border-[#e2e8f0] rounded overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fafc] text-[#475569] font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Item</th>
                    <th className="p-2.5 text-right">Qty</th>
                    <th className="p-2.5 text-right">Rate</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {(selectedOrder.items || []).map((it) => (
                    <tr key={it.id}>
                      <td className="p-2.5 font-semibold text-[#0f172a]">{it.productName} ({it.packSize})</td>
                      <td className="p-2.5 text-right">{it.quantity}</td>
                      <td className="p-2.5 text-right">₹{it.dealerPrice}</td>
                      <td className="p-2.5 text-right font-bold text-[#15803d]">₹{it.subtotal.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[#e2e8f0]">
              <div className="text-sm font-bold text-[#14532d]">
                Total Invoice Value: ₹{(selectedOrder.grandTotal || 0).toLocaleString('en-IN')}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert('Downloading PDF invoice...')}
                  className="carbon-btn-primary px-4 h-9 font-bold text-xs rounded"
                >
                  Download PDF
                </button>
                <button onClick={() => setSelectedOrder(null)} className="carbon-btn-ghost px-4 h-9 font-bold text-xs rounded">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
