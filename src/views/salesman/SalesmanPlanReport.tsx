import React, { useState } from 'react';
import { User } from '../../types';
import { ImageProofModal } from '../../components/common/ImageProofModal';

export interface PlanReportRecord {
  id: string;
  sNo: number;
  date: string;
  todayReport: string;
  tomorrowPlan: string;
  targetDealersCount: number;
  keyAchievements: string;
  status: 'Submitted' | 'Reviewed';
  proofDocUrl?: string;
}

interface SalesmanPlanReportProps {
  currentUser?: User;
}

export const SalesmanPlanReport: React.FC<SalesmanPlanReportProps> = ({ currentUser }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [todayReport, setTodayReport] = useState('');
  const [tomorrowPlan, setTomorrowPlan] = useState('');
  const [targetDealersCount, setTargetDealersCount] = useState<number | ''>(5);
  const [keyAchievements, setKeyAchievements] = useState('');
  const [proofDocUrl, setProofDocUrl] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State for Image Proof Viewer
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

  const [reportsList, setReportsList] = useState<PlanReportRecord[]>([
    {
      id: 'pr-1',
      sNo: 1,
      date: new Date().toISOString().split('T')[0],
      todayReport: 'Visited 4 dealers in Pune Market Yard. Handed over SuperGro Ultra catalogs. Collected 1 new order for ₹1,25,000.',
      tomorrowPlan: 'Route visit to Loni Kalbhor & Hadapsar dealers for pre-booking scheme introduction.',
      targetDealersCount: 6,
      keyAchievements: 'Enrolled Agri Solutions Ltd in Gold Partner Tier.',
      status: 'Submitted',
      proofDocUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'pr-2',
      sNo: 2,
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      todayReport: 'Travelled to Nashik district. Conducted farmer field spray demo of CropShield Bio-Fungicide.',
      tomorrowPlan: 'Follow up on pending ledger balances with Kisan Traders & Nashik Agencies.',
      targetDealersCount: 5,
      keyAchievements: '12 farmers attended live field spray demonstration.',
      status: 'Reviewed',
      proofDocUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofDocUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todayReport || !tomorrowPlan) {
      alert("Please fill in today's report and tomorrow's plan.");
      return;
    }

    const newReport: PlanReportRecord = {
      id: `pr-${Date.now()}`,
      sNo: reportsList.length + 1,
      date: new Date().toISOString().split('T')[0],
      todayReport,
      tomorrowPlan,
      targetDealersCount: Number(targetDealersCount) || 5,
      keyAchievements: keyAchievements || 'Daily field report recorded.',
      status: 'Submitted',
      proofDocUrl: proofDocUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    };

    setReportsList([newReport, ...reportsList]);
    setSuccessMsg("Daily plan & report submitted successfully!");
    setShowAddModal(false);
    setTodayReport('');
    setTomorrowPlan('');
    setKeyAchievements('');
    setProofDocUrl(null);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-5 font-body text-xs">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8f0] p-4 rounded-lg shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">calendar_month</span>
            Add Plan & Daily Work Report
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Submit today's sales accomplishments, tomorrow's target route plan, and daily evidence documents.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-md shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
          Submit Daily Plan & Report
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-[#dcfce7] text-[#15803d] border border-[#86efac] rounded-md font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {successMsg}
        </div>
      )}

      {/* Reports Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-2xs">
        <div className="p-3 bg-[#f8fafc] border-b border-[#e2e8f0] font-bold text-xs text-[#14532d] uppercase tracking-wider flex justify-between items-center">
          <span>Submitted Daily Reports & Route Plans ({reportsList.length})</span>
          <span className="text-[11px] text-[#64748b] font-normal lowercase">Click proof button to view attached report evidence</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3 w-10 text-center">S.No.</th>
                <th className="p-3">Report Date</th>
                <th className="p-3">Today's Work Summary</th>
                <th className="p-3">Tomorrow's Planned Route</th>
                <th className="p-3 text-right">Target Dealers</th>
                <th className="p-3">Key Accomplishments</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Report Proof Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {reportsList.map((rep, idx) => (
                <tr key={rep.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="p-3 text-center font-bold text-[#64748b]">{idx + 1}</td>
                  <td className="p-3 font-bold text-[#0f172a]">{rep.date}</td>
                  <td className="p-3 text-[#334155] max-w-xs truncate font-medium">{rep.todayReport}</td>
                  <td className="p-3 text-[#0f172a] max-w-xs truncate font-semibold">{rep.tomorrowPlan}</td>
                  <td className="p-3 text-right font-mono font-bold text-[#14532d]">{rep.targetDealersCount} Dealers</td>
                  <td className="p-3 text-[#475569] max-w-xs truncate">{rep.keyAchievements}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-[#dcfce7] text-[#14532d] border border-[#86efac] rounded text-[10px] font-bold uppercase">
                      {rep.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {rep.proofDocUrl ? (
                      <button
                        onClick={() =>
                          setProofModalState({
                            isOpen: true,
                            title: 'Daily Report & Route Plan Evidence Document',
                            imageUrl: rep.proofDocUrl,
                            employeeName: currentUser?.name || 'Salesman',
                            date: rep.date,
                            remarks: rep.todayReport,
                            status: rep.status,
                            details: {
                              TomorrowPlan: rep.tomorrowPlan,
                              TargetDealers: rep.targetDealersCount,
                              KeyAchievements: rep.keyAchievements,
                            },
                          })
                        }
                        className="px-2.5 py-1 bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#15803d] border border-[#86efac] rounded text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">description</span>
                        View Proof
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#f1f5f9] text-[#94a3b8] text-[10px] font-bold rounded">
                        No Document
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Plan & Report Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-[#cbd5e1] rounded-lg max-w-xl w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-3">
              <h2 className="text-sm font-bold text-[#14532d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#16a34a]">calendar_month</span>
                Submit Daily Work Report & Plan
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#64748b] hover:text-[#0f172a] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Today's Work Summary & Visit Accomplishments *
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail today's dealer meetings, farmer field demos, orders booked, or payment collections..."
                  value={todayReport}
                  onChange={(e) => setTodayReport(e.target.value)}
                  required
                  className="w-full p-2 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs font-medium text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Tomorrow's Target Route Plan *
                </label>
                <textarea
                  rows={2}
                  placeholder="List tomorrow's target locations, planned dealer visits, and specific objectives..."
                  value={tomorrowPlan}
                  onChange={(e) => setTomorrowPlan(e.target.value)}
                  required
                  className="w-full p-2 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs font-semibold text-[#0f172a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                    Tomorrow Target Dealers Count
                  </label>
                  <input
                    type="number"
                    value={targetDealersCount}
                    onChange={(e) => setTargetDealersCount(Number(e.target.value) || '')}
                    className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                    Key Achievements / Highlight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enrolled 2 dealers in scheme"
                    value={keyAchievements}
                    onChange={(e) => setKeyAchievements(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Upload Daily Report Document / Photo Evidence
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-[#64748b] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#f0fdf4] file:text-[#16a34a] cursor-pointer"
                />
                {proofDocUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={proofDocUrl} alt="Report Preview" className="w-12 h-12 object-cover rounded border border-[#cbd5e1]" />
                    <span className="text-[10px] text-[#16a34a] font-bold">✓ Report Evidence Attached</span>
                  </div>
                )}
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
                  className="px-5 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-md shadow-2xs"
                >
                  Submit Report & Plan
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
