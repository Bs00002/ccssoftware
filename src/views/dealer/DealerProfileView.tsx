import React, { useState, useEffect } from 'react';
import { User, Dealer } from '../../types';

interface DealerProfileViewProps {
  currentUser: User;
  dealer?: Dealer;
  onBack?: () => void;
}

export const DealerProfileView: React.FC<DealerProfileViewProps> = ({
  currentUser,
  dealer,
  onBack,
}) => {
  const [ownerName, setOwnerName] = useState(
    dealer?.ownerName || currentUser.name || 'Ramesh Patel'
  );
  const [mobileNumber, setMobileNumber] = useState(
    dealer?.phone || currentUser.phone || '+91 98902 44512'
  );
  const [email, setEmail] = useState(
    currentUser.email || `${(dealer?.code || 'dlr').toLowerCase()}@agrisolutions.in`
  );

  const [shopName, setShopName] = useState(
    dealer?.name || currentUser.businessName || 'Agri Solutions Ltd'
  );
  const [gstNumber, setGstNumber] = useState(
    dealer?.gstNumber || currentUser.gstNumber || '24AAACC1234F1ZB'
  );
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [aadhaarNumber, setAadhaarNumber] = useState('XXXX-XXXX-8899');

  const [shopAddress, setShopAddress] = useState(
    dealer?.address ||
      currentUser.address ||
      'Shop No. 4, Main Market Road, Near APMC Yard, Anand, Gujarat - 388001'
  );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (dealer) {
      setOwnerName(dealer.ownerName || dealer.name);
      setMobileNumber(dealer.phone || '+91 98902 44512');
      setShopName(dealer.name);
      setGstNumber(dealer.gstNumber || '24AAACC1234F1ZB');
      if (dealer.address) setShopAddress(dealer.address);
    } else if (currentUser) {
      setOwnerName(currentUser.name);
      setMobileNumber(currentUser.phone || '+91 98902 44512');
      setEmail(currentUser.email);
      setShopName(currentUser.businessName || 'Agri Solutions Ltd');
      if (currentUser.gstNumber) setGstNumber(currentUser.gstNumber);
      if (currentUser.address) setShopAddress(currentUser.address);
    }
  }, [dealer, currentUser]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const dealerCode = dealer?.code || currentUser.code || 'ASL-092';
  const creditLimit = dealer?.creditLimit ?? currentUser.creditLimit ?? 500000;
  const outstandingBalance = dealer?.outstandingBalance ?? currentUser.outstandingBalance ?? 120000;
  const distributorName = dealer?.distributorName || 'Chitra Sales Corp (Pune)';
  const loyaltyPoints = dealer?.loyaltyPoints || 1450;

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-body text-xs">
      {/* Back Button if opened from list */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-[#0f62fe] hover:underline font-semibold cursor-pointer mb-2"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Dealers List
        </button>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#dcfce7] border border-[#86efac] rounded-full flex items-center justify-center text-[#14532d] font-bold text-lg">
            <span className="material-symbols-outlined text-[28px]">storefront</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#14532d] tracking-tight">{shopName}</h1>
              <span className="px-2 py-0.5 bg-[#f0fdf4] border border-[#86efac] text-[#15803d] font-mono text-[10px] font-bold rounded">
                Code: {dealerCode}
              </span>
            </div>
            <p className="text-xs text-[#64748b] mt-0.5">Dealer Profile & B2B Financial Terms</p>
          </div>
        </div>
        {saved && (
          <div className="px-3 py-1.5 bg-[#dcfce7] text-[#14532d] border border-[#86efac] rounded font-bold text-xs flex items-center gap-1.5 animate-fadeIn">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Profile Saved Successfully
          </div>
        )}
      </div>

      {/* Account Verification & Assigned Distributor Banner */}
      <div className="bg-white p-4 border border-[#e2e8f0] rounded-lg shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-[#dcfce7] text-[#14532d] font-bold text-xs border border-[#86efac] rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#16a34a]">verified</span>
            Account Status: Verified ✓
          </span>
        </div>
        <div className="text-xs text-[#475569]">
          <span className="font-bold text-[#0f172a]">Assigned CCS Distributor:</span>{' '}
          <span className="font-bold text-[#15803d]">{distributorName}</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: PERSONAL INFORMATION */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-xs space-y-4">
          <div className="border-b border-[#e2e8f0] pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#16a34a]">person</span>
            <h2 className="text-sm font-bold text-[#14532d] uppercase tracking-wider">Personal & Contact Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                Owner Name *
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded focus:outline-none focus:border-[#16a34a] font-medium text-xs text-[#0f172a]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded focus:outline-none focus:border-[#16a34a] font-medium text-xs text-[#0f172a]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded focus:outline-none focus:border-[#16a34a] font-medium text-xs text-[#0f172a]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: BUSINESS INFORMATION */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-xs space-y-4">
          <div className="border-b border-[#e2e8f0] pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#16a34a]">badge</span>
            <h2 className="text-sm font-bold text-[#14532d] uppercase tracking-wider">Business & Tax Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                Shop / Enterprise Name *
              </label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded focus:outline-none focus:border-[#16a34a] font-medium text-xs text-[#0f172a]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                GSTIN Number *
              </label>
              <input
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded focus:outline-none focus:border-[#16a34a] font-mono font-bold text-xs text-[#0f172a]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                PAN Number *
              </label>
              <input
                type="text"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded focus:outline-none focus:border-[#16a34a] font-mono font-bold text-xs text-[#0f172a]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                Aadhaar Number *
              </label>
              <input
                type="text"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded focus:outline-none focus:border-[#16a34a] font-mono font-bold text-xs text-[#0f172a]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: ADDRESS */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-xs space-y-4">
          <div className="border-b border-[#e2e8f0] pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#16a34a]">location_on</span>
            <h2 className="text-sm font-bold text-[#14532d] uppercase tracking-wider">Shop & Delivery Address</h2>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
              Complete Shop Address *
            </label>
            <textarea
              rows={3}
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
              required
              className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded focus:outline-none focus:border-[#16a34a] font-medium text-xs text-[#0f172a]"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="carbon-btn-primary px-6 h-10 font-bold text-xs rounded-md shadow-xs flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save Profile Details
          </button>
        </div>
      </form>
    </div>
  );
};

