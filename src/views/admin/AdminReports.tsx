import React, { useState } from 'react';

export const AdminReports: React.FC = () => {
  const [reportType, setReportType] = useState('Sales Summary Report');

  const reportsList = [
    'Sales Summary Report',
    'Dealer Outstanding & Ledger Balance Report',
    'Distributor Territory Performance Report',
    'Warehouse Inventory & Safety Stock Report',
    'Field Officer Attendance & KM Claim Report',
    'Product Category Turnover Report',
    'Scheme Disbursement & Cashback Report',
  ];

  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div>
          <h1 className="text-2xl font-light text-[#161616]">Reports & Business Intelligence</h1>
          <p className="text-xs text-[#525252] mt-0.5">
            Export official PDF/Excel reports for GST compliance, sales audits, and distributor settlements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Report Selector List */}
        <div className="bg-white border border-[#e0e0e0] p-4 space-y-2">
          <h3 className="font-bold text-xs text-[#161616] uppercase tracking-wider mb-3 border-b border-[#e0e0e0] pb-2">
            Available Enterprise Reports
          </h3>
          {reportsList.map((rep) => (
            <button
              key={rep}
              onClick={() => setReportType(rep)}
              className={`w-full text-left p-2.5 text-xs font-semibold transition-colors cursor-pointer border ${
                reportType === rep
                  ? 'bg-[#d0e2ff] text-[#001d6c] border-[#0f62fe]'
                  : 'bg-[#f4f4f4] text-[#525252] border-[#e0e0e0] hover:bg-[#e0e0e0]'
              }`}
            >
              {rep}
            </button>
          ))}
        </div>

        {/* Report Export Configurator */}
        <div className="md:col-span-2 bg-white border border-[#e0e0e0] p-5 space-y-4">
          <h3 className="font-bold text-sm text-[#161616] border-b border-[#e0e0e0] pb-2">
            Configure Export Parameters: <span className="text-[#0f62fe]">{reportType}</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#525252] mb-1">Start Date</label>
              <input
                type="date"
                defaultValue="2023-10-01"
                className="w-full p-2 border border-[#e0e0e0] bg-[#f4f4f4] text-xs font-medium focus:outline-none focus:border-[#0f62fe]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#525252] mb-1">End Date</label>
              <input
                type="date"
                defaultValue="2023-10-31"
                className="w-full p-2 border border-[#e0e0e0] bg-[#f4f4f4] text-xs font-medium focus:outline-none focus:border-[#0f62fe]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#525252] mb-1">Territory Filter</label>
            <select className="w-full p-2 border border-[#e0e0e0] bg-[#f4f4f4] text-xs font-medium focus:outline-none focus:border-[#0f62fe]">
              <option>All Territories (State-wide)</option>
              <option>Pune & Nashik Region</option>
              <option>Vidarbha Zone (Nagpur)</option>
              <option>Marathwada Region (Aurangabad)</option>
              <option>Western Maharashtra (Kolhapur/Satara)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-[#e0e0e0] flex gap-3">
            <button
              onClick={() => alert(`Downloading Excel Report for ${reportType}...`)}
              className="carbon-btn-primary text-xs h-9 px-4 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] mr-1.5">download</span> Download Excel (.XLSX)
            </button>
            <button
              onClick={() => alert(`Generating PDF Statement for ${reportType}...`)}
              className="carbon-btn-ghost text-xs h-9 px-4 border border-[#0f62fe] bg-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] mr-1.5">picture_as_pdf</span> Export Official PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
