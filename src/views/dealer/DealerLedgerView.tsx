import React from 'react';
import { User, LedgerEntry } from '../../types';

interface DealerLedgerViewProps {
  currentUser: User;
  ledgerEntries?: LedgerEntry[];
  onBack?: () => void;
}

export const DealerLedgerView: React.FC<DealerLedgerViewProps> = ({
  currentUser,
  ledgerEntries = [],
  onBack,
}) => {
  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div>
          <button
            onClick={onBack}
            className="text-[#0f62fe] text-xs font-semibold hover:underline flex items-center gap-1 mb-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span> Back to Portal
          </button>
          <h1 className="text-2xl font-light text-[#161616]">Account Ledger Statement</h1>
          <p className="text-xs text-[#525252] mt-0.5">
            Official financial ledger for <span className="font-bold text-[#161616]">{currentUser.businessName}</span> (GST: {currentUser.gstNumber})
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => alert('Downloading official GST Ledger PDF...')}
            className="carbon-btn-ghost text-xs h-9 px-3 border border-[#0f62fe] bg-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] mr-1">download</span> Export PDF
          </button>
          <button
            onClick={() => alert('Sending ledger summary to WhatsApp...')}
            className="carbon-btn-primary text-xs h-9 px-4 cursor-pointer bg-[#198038] hover:bg-[#0e6027] border-none"
          >
            <span className="material-symbols-outlined text-[16px] mr-1">chat</span> Send to WhatsApp
          </button>
        </div>
      </div>

      {/* Account Credit & Balance Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-[#e0e0e0] shadow-xs">
          <span className="text-[10px] text-[#525252] font-bold uppercase tracking-wider">Approved Credit Limit</span>
          <div className="text-xl font-bold text-[#161616] mt-1">
            ₹{(currentUser.creditLimit || 500000).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-4 border border-[#e0e0e0] shadow-xs">
          <span className="text-[10px] text-[#da1e28] font-bold uppercase tracking-wider">Current Outstanding</span>
          <div className="text-xl font-bold text-[#da1e28] mt-1">
            ₹{(currentUser.outstandingBalance || 120000).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-4 border border-[#e0e0e0] shadow-xs">
          <span className="text-[10px] text-[#0e6027] font-bold uppercase tracking-wider">Available Credit Buffer</span>
          <div className="text-xl font-bold text-[#0e6027] mt-1">
            ₹{((currentUser.creditLimit || 500000) - (currentUser.outstandingBalance || 120000)).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white border border-[#e0e0e0] overflow-x-auto shadow-xs">
        <div className="p-3 bg-[#f4f4f4] border-b border-[#e0e0e0] font-bold text-xs text-[#161616] uppercase tracking-wider">
          Transaction Journal & Invoices
        </div>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#f4f4f4] text-[#525252] border-b border-[#e0e0e0] uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Voucher / Ref No</th>
              <th className="p-3 font-semibold">Transaction Particulars</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold text-right">Debit (Sales Invoice)</th>
              <th className="p-3 font-semibold text-right">Credit (Payments)</th>
              <th className="p-3 font-semibold text-right">Running Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {(ledgerEntries || []).map((entry) => (
              <tr key={entry.id} className="hover:bg-[#f4f4f4]">
                <td className="p-3 font-bold text-[#161616]">{entry.date}</td>
                <td className="p-3 text-[#0f62fe] font-mono font-bold">{entry.refNumber}</td>
                <td className="p-3 text-[#161616] font-medium">{entry.description}</td>
                <td className="p-3">
                  <span
                    className={`text-[10px] uppercase font-bold px-1.5 py-0.5 border ${
                      entry.type === 'Debit'
                        ? 'bg-[#fff1f1] text-[#750e13] border-[#ffb3b8]'
                        : 'bg-[#defbe6] text-[#0e6027] border-[#a7f0ba]'
                    }`}
                  >
                    {entry.type}
                  </span>
                </td>
                <td className="p-3 text-right font-semibold text-[#da1e28]">
                  {(entry.debit || 0) > 0 ? `₹${(entry.debit || 0).toLocaleString('en-IN')}` : '-'}
                </td>
                <td className="p-3 text-right font-semibold text-[#0e6027]">
                  {(entry.credit || 0) > 0 ? `₹${(entry.credit || 0).toLocaleString('en-IN')}` : '-'}
                </td>
                <td className="p-3 text-right font-bold text-[#161616]">
                  ₹{(entry.balance || 0).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
