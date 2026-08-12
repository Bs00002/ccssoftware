import React from 'react';
import { Scheme } from '../../types';

interface DealerSchemesViewProps {
  schemes: Scheme[];
  onCreateOrder?: () => void;
}

export const DealerSchemesView: React.FC<DealerSchemesViewProps> = ({
  schemes = [],
  onCreateOrder,
}) => {
  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header Banner */}
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-[#14532d] tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#16a34a]">local_offer</span>
            Schemes & Dealer Offers
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Active seasonal procurement schemes, volume discounts, and loyalty trip qualification tiers.
          </p>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {(schemes || []).map((sch) => (
          <div
            key={sch.id}
            className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#86efac] transition-colors"
          >
            <div>
              <div className="flex justify-between items-start gap-2 border-b border-[#e2e8f0] pb-3">
                <div>
                  <span className="px-2 py-0.5 bg-[#dcfce7] text-[#14532d] font-bold text-[10px] border border-[#86efac] rounded uppercase">
                    {sch.code}
                  </span>
                  <h3 className="text-sm font-bold text-[#14532d] mt-2">{sch.title}</h3>
                </div>
                <span className="px-2 py-0.5 bg-[#f0fdf4] text-[#15803d] font-bold text-[10px] border border-[#a7f3d0] rounded-full">
                  {sch.status}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs text-[#334155]">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Applicable Category:</span>
                  <span className="font-bold text-[#0f172a]">{sch.applicableCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Scheme Period:</span>
                  <span className="font-semibold text-[#0f172a]">{sch.startDate} to {sch.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Target Volume:</span>
                  <span className="font-bold text-[#15803d]">{sch.targetUnits} Units</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[#f0fdf4] border border-[#86efac] rounded text-[#14532d] text-xs font-semibold">
                🎁 Reward: {sch.rewardDescription}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
