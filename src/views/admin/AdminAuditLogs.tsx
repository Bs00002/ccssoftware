import React, { useState } from 'react';

export const AdminAuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const auditLogs = [
    {
      id: 'LOG-8801',
      timestamp: '2024-05-20 14:32:10',
      user: 'Super Admin (HQ)',
      action: 'ORDER_STATUS_UPDATE',
      module: 'Orders Module',
      details: 'Updated Order #ORD-2024-089 status from Pending Approval to Approved',
    },
    {
      id: 'LOG-8802',
      timestamp: '2024-05-20 12:15:00',
      user: 'Rajesh Kumar (Field Exec)',
      action: 'EXPENSE_SUBMISSION',
      module: 'Expenses Module',
      details: 'Submitted Fuel & Travel expense ₹1,450 for Dealer Visits in Anand',
    },
    {
      id: 'LOG-8803',
      timestamp: '2024-05-19 16:40:22',
      user: 'Super Admin (HQ)',
      action: 'PRODUCT_PRICE_UPDATE',
      module: 'Product Master',
      details: 'Updated Dealer Price for Bio-Shield 250ml to ₹420',
    },
    {
      id: 'LOG-8804',
      timestamp: '2024-05-19 10:05:18',
      user: 'Ramesh Patel (Dealer)',
      action: 'ORDER_SUBMITTED',
      module: 'Dealer Portal',
      details: 'Submitted stock order totaling ₹1,25,000 for Kharif Season',
    },
  ];

  const filteredLogs = auditLogs.filter(
    (l) =>
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header Banner */}
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">security</span>
            Enterprise System Audit Logs
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Security audit trail logging user activity, state transitions, and administrative operations.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#94a3b8] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs focus:outline-none focus:border-[#16a34a]"
          />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#475569] border-b border-[#e2e8f0] uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5 font-bold">Log ID</th>
                <th className="p-3.5 font-bold">Timestamp</th>
                <th className="p-3.5 font-bold">User</th>
                <th className="p-3.5 font-bold">Module</th>
                <th className="p-3.5 font-bold">Action Type</th>
                <th className="p-3.5 font-bold">Activity Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#f0fdf4] transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#14532d]">{log.id}</td>
                  <td className="p-3.5 font-mono text-[#64748b]">{log.timestamp}</td>
                  <td className="p-3.5 font-bold text-[#0f172a]">{log.user}</td>
                  <td className="p-3.5 font-semibold text-[#334155]">{log.module}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-[#f0fdf4] text-[#14532d] font-bold text-[10px] border border-[#86efac] rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-[#334155] max-w-md truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
