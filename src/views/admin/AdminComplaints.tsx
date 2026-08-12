import React from 'react';
import { Complaint } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

interface AdminComplaintsProps {
  complaints?: Complaint[];
}

export const AdminComplaints: React.FC<AdminComplaintsProps> = ({ complaints = [] }) => {
  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div>
          <h1 className="text-2xl font-light text-[#161616]">Complaints & Product Returns Desk</h1>
          <p className="text-xs text-[#525252] mt-0.5">
            Quality issues, packaging leaks, batch lab testing, and replacement credit notes
          </p>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white border border-[#e0e0e0] overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#f4f4f4] text-[#525252] border-b border-[#e0e0e0] uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-3 font-semibold">Complaint ID</th>
              <th className="p-3 font-semibold">Dealer Name</th>
              <th className="p-3 font-semibold">Product & Batch</th>
              <th className="p-3 font-semibold">Issue Category</th>
              <th className="p-3 font-semibold">Priority</th>
              <th className="p-3 font-semibold">Assigned Officer</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {(complaints || []).map((c) => (
              <tr key={c.id} className="hover:bg-[#f4f4f4]">
                <td className="p-3 font-bold text-[#0f62fe]">{c.complaintNumber}</td>
                <td className="p-3 font-bold text-[#161616]">{c.dealerName}</td>
                <td className="p-3 text-[#525252]">
                  {c.productName} ({c.batchNumber || 'Batch N/A'})
                </td>
                <td className="p-3 font-semibold text-[#161616]">{c.issueType}</td>
                <td className="p-3">
                  <span
                    className={`font-bold text-[10px] uppercase px-1.5 py-0.5 border ${
                      c.priority === 'High'
                        ? 'bg-[#fff1f1] text-[#750e13] border-[#ffb3b8]'
                        : 'bg-[#fcf1d3] text-[#715100] border-[#f1c21b]'
                    }`}
                  >
                    {c.priority}
                  </span>
                </td>
                <td className="p-3 text-[#525252]">{c.assignedTo}</td>
                <td className="p-3">
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
