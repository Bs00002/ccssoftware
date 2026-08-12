import React, { useState } from 'react';
import { Order, User } from '../../types';
import { ChitraLogo } from '../../components/common/ChitraLogo';

interface DealerInvoicesViewProps {
  orders: Order[];
  currentUser: User;
}

export const DealerInvoicesView: React.FC<DealerInvoicesViewProps> = ({
  orders = [],
  currentUser,
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  const dealerInvoices = (orders || []).filter(
    (o) => o && (o.dealerId === currentUser?.id || o.dealerName === currentUser?.businessName)
  );

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header Banner */}
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">receipt</span>
            GST Invoices & Billing
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            View official tax invoices, GST details, and download billing statements.
          </p>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#475569] border-b border-[#e2e8f0] uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5 font-bold">Invoice No.</th>
                <th className="p-3.5 font-bold">Invoice Date</th>
                <th className="p-3.5 font-bold">Distributor</th>
                <th className="p-3.5 font-bold text-right">Taxable Value</th>
                <th className="p-3.5 font-bold text-right">GST (18%)</th>
                <th className="p-3.5 font-bold text-right">Total Invoice Amount</th>
                <th className="p-3.5 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {dealerInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#64748b]">
                    No invoices generated yet.
                  </td>
                </tr>
              ) : (
                dealerInvoices.map((inv) => {
                  const invNo = `INV-2024-${inv.orderNumber || '101'}`;
                  const taxable = Math.round((inv.grandTotal || 0) / 1.18);
                  const gstVal = (inv.grandTotal || 0) - taxable;

                  return (
                    <tr key={inv.id} className="hover:bg-[#f0fdf4] transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#14532d]">{invNo}</td>
                      <td className="p-3.5 text-[#475569]">{inv.date}</td>
                      <td className="p-3.5 font-semibold text-[#0f172a]">{inv.distributorName || 'CCS Central Agency'}</td>
                      <td className="p-3.5 text-right font-medium text-[#475569]">₹{taxable.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 text-right font-medium text-[#475569]">₹{gstVal.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 text-right font-extrabold text-[#15803d]">
                        ₹{(inv.grandTotal || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
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

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-3">
              <div className="flex items-center gap-3">
                <ChitraLogo variant="horizontal" size="md" showTagline={true} />
                <div className="h-6 w-px bg-[#cbd5e1]" />
                <div>
                  <h2 className="text-base font-bold text-[#14532d]">Tax Invoice #INV-2024-{selectedInvoice.orderNumber}</h2>
                  <p className="text-[11px] text-[#64748b]">Official B2B Invoice Document</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-[#64748b] hover:text-[#0f172a] p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-[#f8fafc] p-4 rounded border border-[#e2e8f0] text-xs">
              <div>
                <div className="font-bold text-[#14532d] uppercase text-[10px]">Billed To (Dealer)</div>
                <div className="font-bold text-[#0f172a] mt-1">{currentUser.businessName || 'Krishi Seva Kendra'}</div>
                <div>GSTIN: {currentUser.gstNumber || '27AAACC1234F1ZB'}</div>
                <div>{currentUser.address || 'Shop No. 4, APMC Market'}</div>
              </div>

              <div>
                <div className="font-bold text-[#14532d] uppercase text-[10px]">Supplier Details</div>
                <div className="font-bold text-[#0f172a] mt-1">{selectedInvoice.distributorName || 'CCS Central Agency'}</div>
                <div>GSTIN: 24AAACC5566G1ZH</div>
                <div>Date: {selectedInvoice.date}</div>
              </div>
            </div>

            <div className="border border-[#e2e8f0] rounded overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fafc] text-[#475569] font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5 text-right">Qty</th>
                    <th className="p-2.5 text-right">Price</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {(selectedInvoice.items || []).map((it) => (
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

            <div className="flex justify-between items-center pt-2">
              <div className="text-sm font-bold text-[#14532d]">
                Grand Total: ₹{(selectedInvoice.grandTotal || 0).toLocaleString('en-IN')}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert('Printing Invoice...')}
                  className="carbon-btn-ghost px-4 h-9 font-bold text-xs rounded cursor-pointer"
                >
                  Print Invoice
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="carbon-btn-primary px-4 h-9 font-bold text-xs rounded cursor-pointer"
                >
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
