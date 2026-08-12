import React from 'react';
import { Scheme } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';

interface AdminSchemesProps {
  schemes?: Scheme[];
}

export const AdminSchemes: React.FC<AdminSchemesProps> = ({ schemes = [] }) => {
  return (
    <div className="space-y-6 font-body text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e0e0e0] pb-4">
        <div>
          <h1 className="text-2xl font-light text-[#161616]">Schemes & Dealer Loyalty Programs</h1>
          <p className="text-xs text-[#525252] mt-0.5">
            Seasonal pre-booking schemes, volume discounts, tour passes, and dealer reward points
          </p>
        </div>
        <button
          onClick={() => alert('New Scheme creation wizard')}
          className="carbon-btn-primary text-xs h-9 px-4 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] mr-1.5">add</span> Create New Scheme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(schemes || []).map((sch) => (
          <div key={sch.id} className="bg-white p-4 border border-[#e0e0e0] shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-[#0f62fe] font-bold uppercase">{sch.code}</span>
                <h3 className="text-sm font-bold text-[#161616] mt-0.5">{sch.title}</h3>
              </div>
              <StatusBadge status={sch.status} />
            </div>

            <p className="text-xs text-[#525252] leading-relaxed">{sch.rewardDescription}</p>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#e0e0e0]">
              <div>
                <span className="text-[#525252]">Category: </span>
                <span className="font-semibold text-[#161616]">{sch.applicableCategory}</span>
              </div>
              <div>
                <span className="text-[#525252]">Valid Till: </span>
                <span className="font-semibold text-[#da1e28]">{sch.endDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
