import React from 'react';
import { User } from '../../types';

interface DealerPaymentsViewProps {
  currentUser: User;
}

export const DealerPaymentsView: React.FC<DealerPaymentsViewProps> = () => {
  const paymentRecords = [
    {
      id: 'PAY-1024',
      orderId: '#CCS1024',
      amount: 12000,
      date: '10 Aug 2026',
      method: 'UPI / Online Transfer',
      status: 'Paid',
    },
    {
      id: 'PAY-1023',
      orderId: '#CCS1023',
      amount: 6500,
      date: '09 Aug 2026',
      method: 'RTGS / Bank Transfer',
      status: 'Paid',
    },
    {
      id: 'PAY-1022',
      orderId: '#CCS1022',
      amount: 18500,
      date: '05 Aug 2026',
      method: 'Cheque Clearance',
      status: 'Pending',
    },
    {
      id: 'PAY-1020',
      orderId: '#CCS1019',
      amount: 25000,
      date: '28 Jul 2026',
      method: 'NEFT / Bank Transfer',
      status: 'Paid',
    }
  ];

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header Banner */}
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">payments</span>
            Payment Records
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            View transaction history, order payment statuses, and bank transfer receipts.
          </p>
        </div>
      </div>

      {/* Payment Records Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-xs overflow-hidden">
        <div className="p-3.5 bg-[#f8fafc] border-b border-[#e2e8f0] font-bold text-xs text-[#14532d] uppercase tracking-wider flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#16a34a]">receipt_long</span>
          Order Payment History
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#475569] border-b border-[#e2e8f0] uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5 font-bold">Payment ID</th>
                <th className="p-3.5 font-bold">Order ID</th>
                <th className="p-3.5 font-bold text-right">Amount</th>
                <th className="p-3.5 font-bold">Payment Date</th>
                <th className="p-3.5 font-bold">Payment Method</th>
                <th className="p-3.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {paymentRecords.map((pay) => (
                <tr key={pay.id} className="hover:bg-[#f0fdf4] transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#14532d]">{pay.id}</td>
                  <td className="p-3.5 font-mono text-[#0f62fe] font-bold">{pay.orderId}</td>
                  <td className="p-3.5 text-right font-extrabold text-[#15803d]">
                    ₹{pay.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-[#475569]">{pay.date}</td>
                  <td className="p-3.5 font-semibold text-[#0f172a]">{pay.method}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 font-bold text-[10px] rounded-full border ${
                        pay.status === 'Paid'
                          ? 'bg-[#dcfce7] text-[#14532d] border-[#86efac]'
                          : pay.status === 'Pending'
                          ? 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]'
                          : 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
