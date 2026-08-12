import React, { useState } from 'react';
import { FieldActivity, User } from '../../types';

interface AdminFieldOpsProps {
  currentUser?: User;
  fieldActivities?: FieldActivity[];
  onRefresh?: () => void;
}

export const AdminFieldOps: React.FC<AdminFieldOpsProps> = ({
  currentUser,
  fieldActivities = [],
  onRefresh,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [dealerName, setDealerName] = useState('');
  const [actionType, setActionType] = useState('Dealer Visit');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const isDistributor = currentUser?.role === 'DISTRIBUTOR';

  const handleRecordVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSuccessMsg('Field visit logged successfully!');
      setShowModal(false);
      setDealerName('');
      setNotes('');
      setSubmitting(false);
      if (onRefresh) onRefresh();
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div>
          <h1 className="text-2xl font-light text-[#161616]">Field Operations & Officer Tracking</h1>
          <p className="text-xs text-[#525252] mt-0.5">
            Real-time dealer store visits, GPS check-in logs, market order collection, and field force productivity
          </p>
        </div>

        {isDistributor && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
            Record Dealer Visit
          </button>
        )}
      </div>

      {successMsg && (
        <div className="p-3 bg-[#dcfce7] text-[#15803d] border border-[#86efac] rounded text-xs font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {successMsg}
        </div>
      )}

      {/* Record Visit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#cbd5e1] rounded-lg max-w-md w-full p-5 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-3">
              <h2 className="text-sm font-bold text-[#14532d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#16a34a]">pin_drop</span>
                Log Dealer Field Visit
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#64748b] hover:text-[#0f172a] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordVisit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Dealer Shop Name *
                </label>
                <input
                  type="text"
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  placeholder="e.g. Kisan Traders / Agri Solutions"
                  required
                  className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded font-medium text-xs text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Visit Action Type
                </label>
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded font-medium text-xs text-[#0f172a]"
                >
                  <option value="Dealer Visit">Routine Store Visit</option>
                  <option value="Order Booking">Order Booking & Collection</option>
                  <option value="Stock Audit">Dealer Stock Inspection</option>
                  <option value="Payment Followup">Outstanding Recovery Visit</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Visit Notes & Feedback
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Discussed seasonal product demands, payment commitment..."
                  className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded font-medium text-xs text-[#0f172a]"
                />
              </div>

              <div className="p-2.5 bg-[#f0fdf4] border border-[#86efac] rounded text-[11px] text-[#14532d] flex items-center gap-1.5 font-mono">
                <span className="material-symbols-outlined text-[16px] text-[#16a34a]">my_location</span>
                GPS: 18.5204° N, 73.8567° E (Captured)
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#f1f5f9] text-[#475569] font-bold text-xs rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded shadow-xs"
                >
                  {submitting ? 'Saving...' : 'Save Field Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Field Activity Logs */}
      <div className="bg-white border border-[#e0e0e0] overflow-x-auto shadow-xs">
        <div className="p-3 bg-[#f4f4f4] border-b border-[#e0e0e0] font-bold text-xs text-[#161616] uppercase tracking-wider">
          Daily Field Visit Logs & Check-ins
        </div>
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#f4f4f4] text-[#525252] border-b border-[#e0e0e0] uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-3 font-semibold">Field Officer</th>
              <th className="p-3 font-semibold">Timestamp</th>
              <th className="p-3 font-semibold">Action Performed</th>
              <th className="p-3 font-semibold">Dealer Store</th>
              <th className="p-3 font-semibold">GPS Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e0e0]">
            {(fieldActivities || []).map((fa) => (
              <tr key={fa.id} className="hover:bg-[#f4f4f4]">
                <td className="p-3 font-bold text-[#161616]">{fa.employeeName}</td>
                <td className="p-3 text-[#525252] font-semibold">{fa.time} • {fa.date}</td>
                <td className="p-3 text-[#0f62fe] font-bold">{fa.action}</td>
                <td className="p-3 text-[#161616] font-medium">{fa.dealerName || 'General Market'}</td>
                <td className="p-3 text-[#525252]">📍 {fa.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
