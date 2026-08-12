import React, { useState } from 'react';
import { User } from '../../types';
import { ImageProofModal } from '../../components/common/ImageProofModal';

export interface SiteVisitRecord {
  id: string;
  sNo: number;
  date: string;
  time: string;
  siteName: string;
  dealerOrFarmerName: string;
  location: string;
  purpose: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  proofPhoto?: string;
  notes?: string;
}

interface SalesmanVisitSiteProps {
  currentUser?: User;
}

export const SalesmanVisitSite: React.FC<SalesmanVisitSiteProps> = ({ currentUser }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [dealerOrFarmerName, setDealerOrFarmerName] = useState('');
  const [location, setLocation] = useState('');
  const [purpose, setPurpose] = useState('Dealer Product Demo');
  const [notes, setNotes] = useState('');
  const [proofPhoto, setProofPhoto] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Modal State for Image Proof Viewer
  const [proofModalState, setProofModalState] = useState<{
    isOpen: boolean;
    title: string;
    imageUrl?: string;
    employeeName?: string;
    date?: string;
    time?: string;
    remarks?: string;
    status?: string;
    details?: Record<string, string | number | undefined>;
  }>({
    isOpen: false,
    title: '',
  });

  const [visitList, setVisitList] = useState<SiteVisitRecord[]>([
    {
      id: 'v-1',
      sNo: 1,
      date: new Date().toISOString().split('T')[0],
      time: '10:30 AM',
      siteName: 'Hadapsar Market Yard Depot',
      dealerOrFarmerName: 'Agri Solutions Ltd (Dealer)',
      location: 'Hadapsar, Pune (GPS: 18.5089° N, 73.9259° E)',
      purpose: 'SuperGro Ultra Batch Delivery Audit',
      status: 'Completed',
      proofPhoto: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=600&q=80',
      notes: 'Verified stock inventory, handed over new Rabi product catalog, dealer requested 50 additional units.',
    },
    {
      id: 'v-2',
      sNo: 2,
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      time: '02:15 PM',
      siteName: 'Kisan Farm Demonstration Plot',
      dealerOrFarmerName: 'Ramesh Patil (Lead Farmer)',
      location: 'Loni Kalbhor Farm, Pune',
      purpose: 'Cotton Field Spraying Trial & Farmer Meeting',
      status: 'Completed',
      proofPhoto: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
      notes: 'Demonstrated CropShield Bio-Fungicide application. 12 neighboring farmers attended field demonstration.',
    },
    {
      id: 'v-3',
      sNo: 3,
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      time: '11:00 AM',
      siteName: 'Nashik Agro Agency Store',
      dealerOrFarmerName: 'Kisan Traders (Distributor)',
      location: 'Nashik Market Yard',
      purpose: 'Payment Collection & Pre-booking Scheme',
      status: 'Completed',
      proofPhoto: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      notes: 'Collected cheque for ₹85,000 against Invoice #INV-8842. Enrolled dealer in Gold Partner Scheme.',
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealerOrFarmerName || !siteName) {
      alert('Please enter Dealer/Farmer name and Site location.');
      return;
    }

    const newVisit: SiteVisitRecord = {
      id: `v-${Date.now()}`,
      sNo: visitList.length + 1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      siteName,
      dealerOrFarmerName,
      location: location || 'GPS Location Captured',
      purpose,
      status: 'Completed',
      proofPhoto: proofPhoto || 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&w=600&q=80',
      notes: notes || 'Recorded field visit.',
    };

    setVisitList([newVisit, ...visitList]);
    setSuccessMsg('Site/Dealer visit recorded successfully with photo proof!');
    setShowAddModal(false);
    setSiteName('');
    setDealerOrFarmerName('');
    setLocation('');
    setNotes('');
    setProofPhoto(null);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-5 font-body text-xs">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#e2e8f0] p-4 rounded-lg shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">pin_drop</span>
            Visit Site & Dealer/Farmer Field Records
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Record live dealer visits, farmer field demonstrations, payment collections, and upload site photos.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-md shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
          Record New Site Visit
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-[#dcfce7] text-[#15803d] border border-[#86efac] rounded-md font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {successMsg}
        </div>
      )}

      {/* Visit History Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-2xs">
        <div className="p-3 bg-[#f8fafc] border-b border-[#e2e8f0] font-bold text-xs text-[#14532d] uppercase tracking-wider flex justify-between items-center">
          <span>Site Visit History ({visitList.length})</span>
          <span className="text-[11px] text-[#64748b] font-normal lowercase">Click photo thumbnail to preview visit proof</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#64748b] border-b border-[#e2e8f0] uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3 w-10 text-center">S.No.</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Dealer / Farmer Name</th>
                <th className="p-3">Site Location</th>
                <th className="p-3">Visit Purpose</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Visit Photo Proof</th>
                <th className="p-3">Visit Notes & Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {visitList.map((vis, idx) => (
                <tr key={vis.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="p-3 text-center font-bold text-[#64748b]">{idx + 1}</td>
                  <td className="p-3 font-semibold text-[#0f172a]">
                    {vis.date} <span className="text-[10px] text-[#64748b] font-normal">({vis.time})</span>
                  </td>
                  <td className="p-3 font-bold text-[#14532d]">{vis.dealerOrFarmerName}</td>
                  <td className="p-3 text-[#334155] font-medium">{vis.siteName} - {vis.location}</td>
                  <td className="p-3 font-semibold text-[#0f172a]">{vis.purpose}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-[#dcfce7] text-[#14532d] border border-[#86efac] rounded text-[10px] font-bold uppercase">
                      {vis.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {vis.proofPhoto ? (
                      <button
                        onClick={() =>
                          setProofModalState({
                            isOpen: true,
                            title: 'Field Visit Photo Evidence',
                            imageUrl: vis.proofPhoto,
                            employeeName: currentUser?.name || 'Field Officer',
                            date: vis.date,
                            time: vis.time,
                            remarks: vis.notes,
                            status: vis.status,
                            details: {
                              SiteName: vis.siteName,
                              DealerOrFarmer: vis.dealerOrFarmerName,
                              Location: vis.location,
                              Purpose: vis.purpose,
                            },
                          })
                        }
                        className="inline-flex items-center gap-1 p-0.5 bg-[#f0fdf4] border border-[#86efac] rounded hover:opacity-85 cursor-pointer"
                        title="Click to view visit photo"
                      >
                        <img src={vis.proofPhoto} alt="Visit Proof" className="w-9 h-9 object-cover rounded" />
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#f1f5f9] text-[#94a3b8] text-[10px] font-bold rounded">
                        No Photo
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-[#475569] max-w-xs truncate">{vis.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Visit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-[#cbd5e1] rounded-lg max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#e2e8f0] pb-3">
              <h2 className="text-sm font-bold text-[#14532d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#16a34a]">pin_drop</span>
                Record Field / Dealer Visit
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#64748b] hover:text-[#0f172a] font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateVisit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Dealer / Customer / Farmer Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kisan Traders / Ramesh Patil (Farmer)"
                  value={dealerOrFarmerName}
                  onChange={(e) => setDealerOrFarmerName(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Site Name & Address *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hadapsar Depot Yard / Loni Kalbhor Farm"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Visit Purpose
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs font-bold text-[#0f172a]"
                >
                  <option value="Dealer Product Demo">Dealer Product Demo & Order Booking</option>
                  <option value="Farmer Field Trial">Farmer Field Trial & Spraying Demo</option>
                  <option value="Payment Collection">Payment Collection & Ledger Audit</option>
                  <option value="Stock & Scheme Audit">Stock Inventory & Scheme Promotion</option>
                  <option value="Complaint Resolution">Complaint Inspection & Technical Audit</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Visit Notes & Outcome
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter meeting notes, product quantities discussed, or next follow-up date..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 bg-[#f8fafc] border border-[#cbd5e1] rounded text-xs font-medium text-[#0f172a]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase mb-1">
                  Upload Visit Photo Evidence
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-[#64748b] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#f0fdf4] file:text-[#16a34a] cursor-pointer"
                />
                {proofPhoto && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={proofPhoto} alt="Visit Preview" className="w-12 h-12 object-cover rounded border border-[#cbd5e1]" />
                    <span className="text-[10px] text-[#16a34a] font-bold">✓ Visit Photo Attached</span>
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
                  Save Visit Record
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
        time={proofModalState.time}
        remarks={proofModalState.remarks}
        status={proofModalState.status}
        details={proofModalState.details}
      />
    </div>
  );
};
