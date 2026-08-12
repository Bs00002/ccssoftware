import React, { useState } from 'react';

interface UserApprovalItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'DEALER' | 'DISTRIBUTOR';
  businessName: string;
  gstin: string;
  city: string;
  state: string;
  appliedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const AdminUserApproval: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [selectedUser, setSelectedUser] = useState<UserApprovalItem | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ action: 'approve' | 'reject'; item: UserApprovalItem } | null>(null);

  const [registrations, setRegistrations] = useState<UserApprovalItem[]>([
    {
      id: 'REG-101',
      name: 'Vikram Singh',
      email: 'vikram.krishi@gmail.com',
      phone: '+91 98760 11223',
      role: 'DEALER',
      businessName: 'Shree Ram Krishi Kendra',
      gstin: '08ABCDE1234F1Z1',
      city: 'Kota',
      state: 'Rajasthan',
      appliedDate: '2024-05-20',
      status: 'Pending',
    },
    {
      id: 'REG-102',
      name: 'Sunil Verma',
      email: 'sunil.dist@gmail.com',
      phone: '+91 98221 44556',
      role: 'DISTRIBUTOR',
      businessName: 'Verma Crop Care Agencies',
      gstin: '23ABCDE5678F1Z2',
      city: 'Indore',
      state: 'Madhya Pradesh',
      appliedDate: '2024-05-19',
      status: 'Pending',
    },
    {
      id: 'REG-103',
      name: 'Anil Kumar',
      email: 'anil.traders@gmail.com',
      phone: '+91 98110 33445',
      role: 'DEALER',
      businessName: 'Kisan Mitra Traders',
      gstin: '07ABCDE9012F1Z3',
      city: 'Karnal',
      state: 'Haryana',
      appliedDate: '2024-05-18',
      status: 'Approved',
    },
  ]);

  const handleActionConfirm = () => {
    if (!confirmModal) return;

    const { action, item } = confirmModal;
    setRegistrations((prev) =>
      prev.map((reg) => (reg.id === item.id ? { ...reg, status: action === 'approve' ? 'Approved' : 'Rejected' } : reg))
    );
    setConfirmModal(null);
    setSelectedUser(null);
  };

  const filteredItems = registrations.filter((r) => r.status === activeTab);

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header Banner */}
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">how_to_reg</span>
            User Registration Approvals
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Review, verify, and approve new Dealer and Distributor registration requests.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-[#f1f5f9] p-1 rounded-lg border border-[#cbd5e1]">
          {(['Pending', 'Approved', 'Rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md font-bold text-xs transition-colors cursor-pointer ${
                activeTab === tab ? 'bg-[#16a34a] text-white shadow-xs' : 'text-[#475569] hover:text-[#0f172a]'
              }`}
            >
              {tab} ({registrations.filter((r) => r.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#475569] border-b border-[#e2e8f0] uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5 font-bold">Reg ID</th>
                <th className="p-3.5 font-bold">Applicant Name</th>
                <th className="p-3.5 font-bold">Role Requested</th>
                <th className="p-3.5 font-bold">Business Name</th>
                <th className="p-3.5 font-bold">GSTIN</th>
                <th className="p-3.5 font-bold">Location</th>
                <th className="p-3.5 font-bold">Applied Date</th>
                <th className="p-3.5 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#64748b]">
                    No registrations in "{activeTab}" state.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f0fdf4] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#14532d]">{item.id}</td>
                    <td className="p-3.5 font-bold text-[#0f172a]">{item.name}</td>
                    <td className="p-3.5 font-bold">
                      <span className="px-2 py-0.5 bg-[#dcfce7] text-[#14532d] border border-[#86efac] rounded text-[10px]">
                        {item.role}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-[#334155]">{item.businessName}</td>
                    <td className="p-3.5 font-mono text-[#64748b]">{item.gstin}</td>
                    <td className="p-3.5 text-[#475569]">{item.city}, {item.state}</td>
                    <td className="p-3.5 text-[#64748b]">{item.appliedDate}</td>
                    <td className="p-3.5 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        <button
                          onClick={() => setSelectedUser(item)}
                          className="px-2.5 py-1 bg-[#f1f5f9] text-[#334155] hover:bg-[#e2e8f0] font-bold rounded cursor-pointer"
                        >
                          View Details
                        </button>
                        {item.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => setConfirmModal({ action: 'approve', item })}
                              className="px-2.5 py-1 bg-[#16a34a] text-white hover:bg-[#15803d] font-bold rounded cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setConfirmModal({ action: 'reject', item })}
                              className="px-2.5 py-1 bg-[#dc2626] text-white hover:bg-[#b91c1c] font-bold rounded cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-3">
              <h2 className="text-base font-bold text-[#14532d]">Registration Application Details</h2>
              <button onClick={() => setSelectedUser(null)} className="text-[#64748b] hover:text-[#0f172a]">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div><span className="font-bold text-[#64748b]">Applicant Name:</span> {selectedUser.name}</div>
              <div><span className="font-bold text-[#64748b]">Requested Role:</span> {selectedUser.role}</div>
              <div><span className="font-bold text-[#64748b]">Business Name:</span> {selectedUser.businessName}</div>
              <div><span className="font-bold text-[#64748b]">GSTIN:</span> {selectedUser.gstin}</div>
              <div><span className="font-bold text-[#64748b]">Phone:</span> {selectedUser.phone}</div>
              <div><span className="font-bold text-[#64748b]">Email:</span> {selectedUser.email}</div>
              <div><span className="font-bold text-[#64748b]">Location:</span> {selectedUser.city}, {selectedUser.state}</div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
              {selectedUser.status === 'Pending' && (
                <>
                  <button
                    onClick={() => setConfirmModal({ action: 'approve', item: selectedUser })}
                    className="carbon-btn-primary px-4 h-9 font-bold rounded"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => setConfirmModal({ action: 'reject', item: selectedUser })}
                    className="bg-[#dc2626] text-white px-4 h-9 font-bold rounded hover:bg-[#b91c1c]"
                  >
                    Reject Request
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedUser(null)}
                className="carbon-btn-ghost px-4 h-9 font-bold rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-[#14532d]">
              Confirm {confirmModal.action === 'approve' ? 'Approval' : 'Rejection'}
            </h3>
            <p className="text-xs text-[#334155]">
              Are you sure you want to {confirmModal.action} registration for{' '}
              <span className="font-bold">{confirmModal.item.businessName}</span> ({confirmModal.item.name})?
            </p>

            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="carbon-btn-ghost px-4 h-9 font-bold rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleActionConfirm}
                className={`px-4 h-9 font-bold text-white rounded cursor-pointer ${
                  confirmModal.action === 'approve' ? 'bg-[#16a34a] hover:bg-[#15803d]' : 'bg-[#dc2626] hover:bg-[#b91c1c]'
                }`}
              >
                Yes, {confirmModal.action === 'approve' ? 'Approve User' : 'Reject User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
