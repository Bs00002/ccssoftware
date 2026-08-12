import React from 'react';

export const AdminSettingsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-body text-xs">
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs">
        <h1 className="text-xl font-bold text-[#14532d] tracking-tight flex items-center gap-2">
          <span className="material-symbols-outlined text-[24px] text-[#16a34a]">settings</span>
          Enterprise System Settings
        </h1>
        <p className="text-xs text-[#64748b] mt-0.5">
          Configure ERP business parameters, tax percentages, order approval thresholds, and notification rules.
        </p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#14532d] border-b border-[#e2e8f0] pb-2 uppercase tracking-wider">
          Taxation & Financial Defaults
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
              Standard GST (%)
            </label>
            <input
              type="text"
              defaultValue="18%"
              className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded font-mono font-bold text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
              Default Credit Period (Days)
            </label>
            <input
              type="number"
              defaultValue={30}
              className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded font-bold text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
              Auto-Approval Order Limit (₹)
            </label>
            <input
              type="number"
              defaultValue={50000}
              className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded font-bold text-xs"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-[#e2e8f0] flex justify-end">
          <button
            onClick={() => alert('Settings saved successfully.')}
            className="carbon-btn-primary px-5 h-9 font-bold text-xs rounded"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
