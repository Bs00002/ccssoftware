import React, { useState } from 'react';
import { Distributor } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

interface AdminDistributorsProps {
  distributors?: Distributor[];
  onAddDistributor?: (distributor: any) => void;
}

const MOCK_FIELD_EMPLOYEES = [
  {
    id: 'emp-1',
    code: 'EMP-789',
    name: 'Sanjay Deshmukh',
    designation: 'Senior Sales Executive',
    territory: 'Pune Division',
    phone: '+91 98230 45678',
    email: 'sanjay.d@chitracrop.com',
    assignedDistributor: 'Chitra Sales Corp, Pune',
    assignedDealersCount: 42,
    status: 'Active',
    monthlyTarget: '₹25.0 Lakhs',
    achievement: '92%',
  },
  {
    id: 'emp-2',
    code: 'EMP-452',
    name: 'Ravi Kumar',
    designation: 'Field Operations Officer',
    territory: 'Nashik Region',
    phone: '+91 98111 22334',
    email: 'ravi.k@chitracrop.com',
    assignedDistributor: 'Kisan Krishi Kendra, Nashik',
    assignedDealersCount: 28,
    status: 'Active',
    monthlyTarget: '₹18.0 Lakhs',
    achievement: '88%',
  },
  {
    id: 'emp-3',
    code: 'EMP-619',
    name: 'Priya Desai',
    designation: 'Territory Sales Manager',
    territory: 'Kolhapur Hub',
    phone: '+91 98765 43210',
    email: 'priya.d@chitracrop.com',
    assignedDistributor: 'Agri World Ltd, Kolhapur',
    assignedDealersCount: 35,
    status: 'Active',
    monthlyTarget: '₹30.0 Lakhs',
    achievement: '105%',
  },
  {
    id: 'emp-4',
    code: 'EMP-204',
    name: 'Amit Singh',
    designation: 'Agri Demonstration Specialist',
    territory: 'Solapur West',
    phone: '+91 98999 88776',
    email: 'amit.s@chitracrop.com',
    assignedDistributor: 'Greenland Agro, Solapur',
    assignedDealersCount: 19,
    status: 'Active',
    monthlyTarget: '₹15.0 Lakhs',
    achievement: '78%',
  },
];

export const AdminDistributors: React.FC<AdminDistributorsProps> = ({
  distributors = [],
  onAddDistributor,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'distributors' | 'employees'>('distributors');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Distributor Form State
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [territory, setTerritory] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ownerName || !territory) return;
    if (onAddDistributor) {
      onAddDistributor({
        id: `dist-${Date.now()}`,
        code: code || `DIST-${Math.floor(100 + Math.random() * 900)}`,
        name,
        ownerName,
        territory,
        phone: phone || '+91 98000 11122',
        dealersCount: 15,
        monthlySales: 1500000,
        outstandingBalance: 120000,
        status: 'Active',
      });
    }
    setCode('');
    setName('');
    setOwnerName('');
    setTerritory('');
    setPhone('');
    setShowAddModal(false);
  };

  const filteredDistributors = (distributors || []).filter((d) => {
    const s = search.toLowerCase();
    return (
      (d.name || '').toLowerCase().includes(s) ||
      (d.code || '').toLowerCase().includes(s) ||
      (d.territory || '').toLowerCase().includes(s)
    );
  });

  const filteredEmployees = MOCK_FIELD_EMPLOYEES.filter((emp) => {
    const s = search.toLowerCase();
    return (
      emp.name.toLowerCase().includes(s) ||
      emp.code.toLowerCase().includes(s) ||
      emp.territory.toLowerCase().includes(s) ||
      emp.designation.toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-5 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e2e8f0] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#14532d]">Distributor & Field Staff Operations</h1>
            <span className="px-2 py-0.5 bg-[#dcfce7] text-[#14532d] font-bold text-[10px] border border-[#86efac] rounded uppercase">
              NETWORK DIRECTORY
            </span>
          </div>
          <p className="text-xs text-[#64748b] mt-0.5">
            Manage territory distributors, B2B depot partners, field sales executives, and territory assignments
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-md shadow-2xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Add New {activeSubTab === 'distributors' ? 'Distributor' : 'Field Employee'}
        </button>
      </div>

      {/* Sub-Tab Navigation Bar & Search */}
      <div className="bg-white p-3.5 border border-[#e2e8f0] rounded-lg shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Toggle Tabs */}
        <div className="flex items-center gap-1 bg-[#f8fafc] p-1 border border-[#cbd5e1] rounded-md">
          <button
            onClick={() => setActiveSubTab('distributors')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'distributors'
                ? 'bg-[#16a34a] text-white shadow-2xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            Territory Distributors ({distributors.length})
          </button>
          <button
            onClick={() => setActiveSubTab('employees')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'employees'
                ? 'bg-[#16a34a] text-white shadow-2xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            Field Sales Staff ({MOCK_FIELD_EMPLOYEES.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeSubTab === 'distributors' ? 'distributors, codes, territories...' : 'employees, design, region...'}`}
            className="w-full pl-8 pr-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded-md text-xs text-[#0f172a] focus:outline-none focus:border-[#16a34a]"
          />
        </div>
      </div>

      {/* Distributors Table View */}
      {activeSubTab === 'distributors' && (
        <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="p-3">Distributor Code</th>
                  <th className="p-3">Distributor Firm Name</th>
                  <th className="p-3">Proprietor / Owner</th>
                  <th className="p-3">Territory / Region</th>
                  <th className="p-3 text-center">Dealers Network</th>
                  <th className="p-3 text-right">Monthly Sales</th>
                  <th className="p-3 text-right">Ledger Balance</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {filteredDistributors.map((d) => (
                  <tr key={d.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="p-3 font-bold text-[#14532d]">{d.code}</td>
                    <td className="p-3 font-bold text-[#0f172a]">{d.name}</td>
                    <td className="p-3 text-[#64748b]">{d.ownerName}</td>
                    <td className="p-3 text-[#64748b] font-medium">{d.territory}</td>
                    <td className="p-3 text-center font-extrabold text-[#0f172a]">{d.dealersCount} Dealers</td>
                    <td className="p-3 text-right font-bold text-[#16a34a]">
                      ₹{(d.monthlySales || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right font-bold text-[#dc2626]">
                      ₹{(d.outstandingBalance || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <StatusBadge status={d.status} />
                    </td>
                  </tr>
                ))}
                {filteredDistributors.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-[#64748b]">
                      No distributor records found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Field Sales Staff View */}
      {activeSubTab === 'employees' && (
        <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="p-3">Employee Code</th>
                  <th className="p-3">Sales Officer Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Assigned Territory</th>
                  <th className="p-3">Parent Depot / Distributor</th>
                  <th className="p-3 text-center">Dealers Covered</th>
                  <th className="p-3 text-right">Target (Monthly)</th>
                  <th className="p-3 text-right">Achieved</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="p-3 font-bold text-[#14532d]">{emp.code}</td>
                    <td className="p-3">
                      <div className="font-bold text-[#0f172a]">{emp.name}</div>
                      <div className="text-[10px] text-[#64748b]">{emp.phone} • {emp.email}</div>
                    </td>
                    <td className="p-3 text-[#475569] font-medium">{emp.designation}</td>
                    <td className="p-3 text-[#15803d] font-bold">{emp.territory}</td>
                    <td className="p-3 text-[#64748b]">{emp.assignedDistributor}</td>
                    <td className="p-3 text-center font-bold text-[#0f172a]">{emp.assignedDealersCount}</td>
                    <td className="p-3 text-right font-bold text-[#0f172a]">{emp.monthlyTarget}</td>
                    <td className="p-3 text-right font-extrabold text-[#16a34a]">{emp.achievement}</td>
                    <td className="p-3">
                      <StatusBadge status={emp.status} />
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-[#64748b]">
                      No field staff records found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add New Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#cbd5e1] rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 bg-[#f8fafc] border-b border-[#e2e8f0] flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#14532d]">
                Add New {activeSubTab === 'distributors' ? 'Distributor Partner' : 'Field Sales Officer'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#64748b] hover:text-[#0f172a] cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-4 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1">
                  {activeSubTab === 'distributors' ? 'Distributor Code' : 'Employee ID Code'}
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={activeSubTab === 'distributors' ? 'e.g. DIST-902' : 'e.g. EMP-805'}
                  className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs text-[#0f172a] focus:outline-none focus:border-[#16a34a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1">
                  {activeSubTab === 'distributors' ? 'Firm / Company Name *' : 'Employee Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={activeSubTab === 'distributors' ? 'e.g. Apex Agri Distributors' : 'e.g. Rajesh Patil'}
                  className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs text-[#0f172a] focus:outline-none focus:border-[#16a34a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1">
                  {activeSubTab === 'distributors' ? 'Proprietor / Owner Name *' : 'Designation / Role *'}
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder={activeSubTab === 'distributors' ? 'e.g. Suresh Shinde' : 'e.g. Territory Sales Officer'}
                  className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs text-[#0f172a] focus:outline-none focus:border-[#16a34a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1">Territory / Division *</label>
                <input
                  type="text"
                  required
                  value={territory}
                  onChange={(e) => setTerritory(e.target.value)}
                  placeholder="e.g. Aurangabad East Division"
                  className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs text-[#0f172a] focus:outline-none focus:border-[#16a34a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#475569] mb-1">Contact Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98220 00000"
                  className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs text-[#0f172a] focus:outline-none focus:border-[#16a34a]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1] font-bold text-xs rounded hover:bg-[#e2e8f0] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded shadow-2xs cursor-pointer"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
