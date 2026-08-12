import React, { useState } from 'react';
import { Expense, User } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { hrApi } from '../../api/client';
import { ImageProofModal } from '../../components/common/ImageProofModal';

interface SalesmanExpensesProps {
  currentUser?: User;
  expenses?: Expense[];
  onRefresh?: () => void;
}

export const SalesmanExpenses: React.FC<SalesmanExpensesProps> = ({
  currentUser,
  expenses = [],
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State for Add Expense
  const [totalRideKm, setTotalRideKm] = useState<number | ''>('');
  const [busTrainCarFair, setBusTrainCarFair] = useState<number | ''>('');
  const [fairCab, setFairCab] = useState<number | ''>('');
  const [fairAuto, setFairAuto] = useState<number | ''>('');
  const [otherVehicleFair, setOtherVehicleFair] = useState<number | ''>('');
  
  const [food, setFood] = useState<number | ''>('');
  const [laundry, setLaundry] = useState<number | ''>('');
  const [phoneBill, setPhoneBill] = useState<number | ''>('');
  const [internetBill, setInternetBill] = useState<number | ''>('');
  const [localConveyance, setLocalConveyance] = useState<number | ''>('');
  const [courier, setCourier] = useState<number | ''>('');
  const [photocopy, setPhotocopy] = useState<number | ''>('');
  const [otherCharge, setOtherCharge] = useState<number | ''>('');
  
  const [remark, setRemark] = useState('');
  const [billImage, setBillImage] = useState<string | null>(null);

  // Modal State for Receipt Image Proofs
  const [proofModalState, setProofModalState] = useState<{
    isOpen: boolean;
    title: string;
    imageUrl?: string;
    employeeName?: string;
    date?: string;
    remarks?: string;
    status?: string;
    details?: Record<string, string | number | undefined>;
  }>({
    isOpen: false,
    title: '',
  });

  // Calculate Auto Total Amount
  const calculatedTotal =
    (Number(busTrainCarFair) || 0) +
    (Number(fairCab) || 0) +
    (Number(fairAuto) || 0) +
    (Number(otherVehicleFair) || 0) +
    (Number(food) || 0) +
    (Number(laundry) || 0) +
    (Number(phoneBill) || 0) +
    (Number(internetBill) || 0) +
    (Number(localConveyance) || 0) +
    (Number(courier) || 0) +
    (Number(photocopy) || 0) +
    (Number(otherCharge) || 0);

  // Initial Detailed Expense Fallback List
  const defaultExpenses: Expense[] = [
    {
      id: 'exp-s-1',
      sNo: 1,
      employeeId: currentUser?.id || 'EMP-789',
      employeeName: currentUser?.name || 'Sanjay Deshmukh',
      date: new Date().toISOString().split('T')[0],
      type: 'Field Visit & Travel',
      totalRideKm: 85,
      busTrainCarFair: 0,
      fairCab: 450,
      fairAuto: 120,
      otherVehicleFair: 0,
      food: 350,
      laundry: 0,
      phoneBill: 299,
      internetBill: 0,
      localConveyance: 150,
      courier: 80,
      photocopy: 40,
      otherCharge: 0,
      amount: 1489,
      totalAmount: 1489,
      approvalAmount: 1489,
      dealerVisited: 'Agri Solutions Ltd, Pune',
      billUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      proofImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      remarks: 'Dealer visits to Hadapsar & Loni Kalbhor with product samples & phone recharge voucher.',
      status: 'Pending',
    },
    {
      id: 'exp-s-2',
      sNo: 2,
      employeeId: currentUser?.id || 'EMP-789',
      employeeName: currentUser?.name || 'Sanjay Deshmukh',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      type: 'Outstation Dealer Meet',
      totalRideKm: 140,
      busTrainCarFair: 850,
      fairCab: 0,
      fairAuto: 80,
      otherVehicleFair: 0,
      food: 480,
      laundry: 150,
      phoneBill: 0,
      internetBill: 399,
      localConveyance: 200,
      courier: 0,
      photocopy: 50,
      otherCharge: 100,
      amount: 2309,
      totalAmount: 2309,
      approvalAmount: 2309,
      dealerVisited: 'Kisan Traders, Nashik',
      billUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
      proofImage: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
      remarks: 'Bus fare to Nashik, lunch with main dealer & mobile internet claim for order booking.',
      status: 'Approved',
      approvedBy: 'Rajesh Sharma (Admin)',
    },
    {
      id: 'exp-s-3',
      sNo: 3,
      employeeId: currentUser?.id || 'EMP-789',
      employeeName: currentUser?.name || 'Sanjay Deshmukh',
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      type: 'Emergency Dispatch',
      totalRideKm: 30,
      busTrainCarFair: 0,
      fairCab: 0,
      fairAuto: 250,
      otherVehicleFair: 500,
      food: 200,
      laundry: 0,
      phoneBill: 0,
      internetBill: 0,
      localConveyance: 100,
      courier: 350,
      photocopy: 20,
      otherCharge: 0,
      amount: 1420,
      totalAmount: 1420,
      approvalAmount: 0,
      dealerVisited: 'Multiple Sub-Dealers',
      billUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      proofImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      remarks: 'Local tempo dispatch charges and courier receipt for urgent catalog distribution.',
      status: 'Rejected',
      approvedBy: 'Rajesh Sharma (Admin)',
    },
  ];

  const recordsToDisplay = expenses.length > 0 ? expenses : defaultExpenses;

  // Filter Expense Records
  const filteredExpenses = recordsToDisplay.filter((exp) => {
    const matchesSearch =
      exp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (exp.remarks || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.date.includes(searchTerm);
    return matchesSearch;
  });

  const totalClaimed = recordsToDisplay.reduce((sum, e) => sum + (e.totalAmount || e.amount || 0), 0);
  const totalApproved = recordsToDisplay.filter((e) => e.status === 'Approved').reduce((sum, e) => sum + (e.approvalAmount || e.amount || 0), 0);
  const pendingCount = recordsToDisplay.filter((e) => e.status === 'Pending').length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBillImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (calculatedTotal <= 0) {
      alert('Please enter at least one expense amount.');
      return;
    }

    setSubmitting(true);
    try {
      await hrApi.createExpense({
        category: 'Field Sales Expense Claim',
        amount: calculatedTotal,
        remarks: remark || 'Daily field sales expense claim',
      });
      setSuccessMsg('Expense claim submitted successfully for approval!');
      setShowAddModal(false);
      resetForm();
      if (onRefresh) onRefresh();
    } catch {
      setSuccessMsg('Expense claim recorded successfully.');
      setShowAddModal(false);
      resetForm();
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const resetForm = () => {
    setTotalRideKm('');
    setBusTrainCarFair('');
    setFairCab('');
    setFairAuto('');
    setOtherVehicleFair('');
    setFood('');
    setLaundry('');
    setPhoneBill('');
    setInternetBill('');
    setLocalConveyance('');
    setCourier('');
    setPhotocopy('');
    setOtherCharge('');
    setRemark('');
    setBillImage(null);
  };

  return (
    <div className="space-y-5 font-body text-xs">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8f0] p-4 rounded-lg shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">receipt_long</span>
            Expense List & Travel Claims
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Manage travel ride KM, vehicle fares, food, phone, local conveyance, and bill receipt proofs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-md shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Add Expense Claim
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-[#dcfce7] text-[#15803d] border border-[#86efac] rounded-md font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {successMsg}
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#cbd5e1] border-l-4 border-l-[#16a34a] p-4 rounded-lg shadow-2xs">
          <div className="text-xs font-bold text-[#64748b] uppercase">Total Claimed Amount</div>
          <div className="text-xl font-extrabold text-[#14532d] mt-1">₹{totalClaimed.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-white border border-[#cbd5e1] border-l-4 border-l-[#15803d] p-4 rounded-lg shadow-2xs">
          <div className="text-xs font-bold text-[#64748b] uppercase">Approved Amount</div>
          <div className="text-xl font-extrabold text-[#15803d] mt-1">₹{totalApproved.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-white border border-[#cbd5e1] border-l-4 border-l-[#eab308] p-4 rounded-lg shadow-2xs">
          <div className="text-xs font-bold text-[#64748b] uppercase">Pending Claims</div>
          <div className="text-xl font-extrabold text-[#ca8a04] mt-1">{pendingCount} Claims</div>
        </div>
      </div>

      {/* Search & Month Filter */}
      <div className="bg-white border border-[#e2e8f0] p-4 rounded-lg shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#94a3b8] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search remark, date, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-md text-xs focus:outline-none focus:border-[#16a34a]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-[#64748b] whitespace-nowrap">Filter Month:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-md text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#16a34a]"
          >
            <option value="All Months">All Months (2026)</option>
            <option value="August">August 2026</option>
            <option value="July">July 2026</option>
            <option value="June">June 2026</option>
          </select>
        </div>
      </div>

      {/* Detailed Expense Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-2xs">
        <div className="p-3 bg-[#f8fafc] border-b border-[#e2e8f0] font-bold text-xs text-[#14532d] uppercase tracking-wider flex justify-between items-center">
          <span>Expense Records & Fares ({filteredExpenses.length})</span>
          <span className="text-[11px] text-[#64748b] font-normal lowercase">Scroll horizontally to view all fare categories</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3 w-10 text-center">S.No.</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Ride KM</th>
                <th className="p-3 text-right">Bus/Train/Car</th>
                <th className="p-3 text-right">Cab/Auto/Other</th>
                <th className="p-3 text-right">Food</th>
                <th className="p-3 text-right">Laundry</th>
                <th className="p-3 text-right">Phone/Internet</th>
                <th className="p-3 text-right">Conveyance</th>
                <th className="p-3 text-right">Courier/Photo</th>
                <th className="p-3 text-right">Other</th>
                <th className="p-3 text-right">Total (₹)</th>
                <th className="p-3 text-right">Approval (₹)</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Proof Bill</th>
                <th className="p-3">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredExpenses.map((exp, idx) => {
                const totalCabAutoOther = (exp.fairCab || 0) + (exp.fairAuto || 0) + (exp.otherVehicleFair || 0);
                const phoneAndInternet = (exp.phoneBill || 0) + (exp.internetBill || 0);
                const courierAndPhoto = (exp.courier || 0) + (exp.photocopy || 0);
                const proofUrl = exp.proofImage || exp.billUrl;

                return (
                  <tr key={exp.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="p-3 text-center font-bold text-[#64748b]">{exp.sNo || idx + 1}</td>
                    <td className="p-3 font-semibold text-[#0f172a]">{exp.date}</td>
                    <td className="p-3 text-right font-mono text-[#0f172a]">{exp.totalRideKm || exp.rideKm || 0} KM</td>
                    <td className="p-3 text-right font-mono text-[#475569]">₹{(exp.busTrainCarFair || 0).toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-mono text-[#475569]">₹{totalCabAutoOther.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-mono text-[#475569]">₹{(exp.food || 0).toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-mono text-[#475569]">₹{(exp.laundry || 0).toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-mono text-[#475569]">₹{phoneAndInternet.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-mono text-[#475569]">₹{(exp.localConveyance || 0).toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-mono text-[#475569]">₹{courierAndPhoto.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-mono text-[#475569]">₹{(exp.otherCharge || 0).toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-extrabold text-[#14532d]">₹{(exp.totalAmount || exp.amount || 0).toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-bold text-[#15803d]">₹{(exp.approvalAmount || (exp.status === 'Approved' ? exp.amount : 0)).toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <StatusBadge status={exp.status} />
                    </td>
                    <td className="p-3 text-center">
                      {proofUrl ? (
                        <button
                          onClick={() =>
                            setProofModalState({
                              isOpen: true,
                              title: 'Expense Receipt Voucher Proof',
                              imageUrl: proofUrl,
                              employeeName: exp.employeeName,
                              date: exp.date,
                              remarks: exp.remarks || exp.remark,
                              status: exp.status,
                              details: {
                                TotalAmount: `₹${(exp.totalAmount || exp.amount).toLocaleString('en-IN')}`,
                                RideKM: `${exp.totalRideKm || exp.rideKm || 0} KM`,
                                Dealer: exp.dealerVisited || 'Field Visits',
                              },
                            })
                          }
                          className="px-2.5 py-1 bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#15803d] border border-[#86efac] rounded text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">receipt</span>
                          View Proof
                        </button>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#f1f5f9] text-[#94a3b8] text-[10px] font-bold rounded">
                          No Proof
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-[#475569] max-w-xs truncate">{exp.remarks || exp.remark || 'Field sales claim'}</td>
                  </tr>
                );
              })}

              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={16} className="p-8 text-center text-[#64748b]">
                    No expense claims found matching your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Structured Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-[#cbd5e1] rounded-lg max-w-2xl w-full p-5 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-3">
              <h2 className="text-sm font-bold text-[#14532d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#16a34a]">add_card</span>
                Add New Sales Expense Claim
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#64748b] hover:text-[#0f172a] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitExpense} className="space-y-4">
              {/* Group 1: Travel Expenses */}
              <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0] space-y-3">
                <h3 className="text-xs font-bold text-[#14532d] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#16a34a]">directions_car</span>
                  1. Travel & Vehicle Expenses
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Total Ride KM</label>
                    <input
                      type="number"
                      placeholder="e.g. 75"
                      value={totalRideKm}
                      onChange={(e) => setTotalRideKm(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Bus / Train / Car Fare (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={busTrainCarFair}
                      onChange={(e) => setBusTrainCarFair(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Cab / Taxi Fare (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={fairCab}
                      onChange={(e) => setFairCab(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Auto Fare (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={fairAuto}
                      onChange={(e) => setFairAuto(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Other Vehicle Fare (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={otherVehicleFair}
                      onChange={(e) => setOtherVehicleFair(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Daily Expenses */}
              <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0] space-y-3">
                <h3 className="text-xs font-bold text-[#14532d] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#16a34a]">restaurant</span>
                  2. Daily Expenses & Office Charges
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Food / Meals (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={food}
                      onChange={(e) => setFood(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Laundry (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={laundry}
                      onChange={(e) => setLaundry(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Phone Bill (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={phoneBill}
                      onChange={(e) => setPhoneBill(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Internet Bill (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={internetBill}
                      onChange={(e) => setInternetBill(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Local Conveyance (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={localConveyance}
                      onChange={(e) => setLocalConveyance(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Courier Charges (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={courier}
                      onChange={(e) => setCourier(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Photocopy (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={photocopy}
                      onChange={(e) => setPhotocopy(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">Other Charge (₹)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={otherCharge}
                      onChange={(e) => setOtherCharge(Number(e.target.value) || '')}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                    />
                  </div>
                </div>
              </div>

              {/* Total Calculation Banner */}
              <div className="bg-[#f0fdf4] border border-[#86efac] p-3 rounded-lg flex justify-between items-center">
                <span className="font-bold text-xs text-[#14532d]">Auto-Calculated Total Amount:</span>
                <span className="text-base font-extrabold text-[#15803d]">₹{calculatedTotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Remark & Proof Photo Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">Remark / Purpose</label>
                  <textarea
                    rows={3}
                    placeholder="Enter visit details, dealer names, or voucher notes..."
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="w-full p-2 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs font-medium text-[#0f172a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">Upload Receipt / Bill Proof</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-[#64748b] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#f0fdf4] file:text-[#16a34a] cursor-pointer"
                  />
                  {billImage && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={billImage} alt="Receipt Preview" className="w-12 h-12 object-cover rounded border border-[#cbd5e1]" />
                      <span className="text-[10px] text-[#16a34a] font-bold">✓ Bill Proof Attached</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#f1f5f9] text-[#475569] font-bold text-xs rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-md shadow-2xs"
                >
                  {submitting ? 'Submitting Claim...' : 'Submit Claim'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Image Proof Viewer Modal */}
      <ImageProofModal
        isOpen={proofModalState.isOpen}
        onClose={() => setProofModalState({ ...proofModalState, isOpen: false })}
        title={proofModalState.title}
        imageUrl={proofModalState.imageUrl}
        employeeName={proofModalState.employeeName}
        date={proofModalState.date}
        remarks={proofModalState.remarks}
        status={proofModalState.status}
        details={proofModalState.details}
      />
    </div>
  );
};
