import React, { useState } from 'react';

export interface ImageProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrl?: string;
  employeeName?: string;
  date?: string;
  time?: string;
  remarks?: string;
  status?: string;
  details?: Record<string, string | number | undefined>;
}

export const ImageProofModal: React.FC<ImageProofModalProps> = ({
  isOpen,
  onClose,
  title,
  imageUrl,
  employeeName,
  date,
  time,
  remarks,
  status,
  details,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-[#cbd5e1] rounded-lg max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-[#f8fafc] border-b border-[#e2e8f0] flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-[#14532d] flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#16a34a]">photo_camera</span>
              {title}
            </h3>
            {employeeName && (
              <p className="text-[11px] text-[#64748b] mt-0.5 font-medium">
                Salesman: <span className="text-[#0f172a] font-semibold">{employeeName}</span>
                {date && ` • ${date}`}
                {time && ` (${time})`}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b] hover:text-[#0f172a] flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {imageUrl ? (
            <div className="relative bg-[#0f172a] rounded-lg overflow-hidden flex items-center justify-center min-h-[220px] border border-[#cbd5e1]">
              <img
                src={imageUrl}
                alt={title}
                className={`max-h-[380px] w-auto object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/70 px-2 py-1 rounded text-[10px] text-white font-mono">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="hover:text-[#86efac] flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isZoomed ? 'zoom_out' : 'zoom_in'}
                  </span>
                  {isZoomed ? 'Zoom Out' : 'Zoom In'}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-[#f8fafc] border border-dashed border-[#cbd5e1] rounded-lg text-center text-[#64748b]">
              <span className="material-symbols-outlined text-[36px] text-[#94a3b8] mb-1">no_photography</span>
              <p className="text-xs font-bold text-[#475569]">No Proof Photo Uploaded</p>
              <p className="text-[11px] text-[#94a3b8] mt-0.5">No image evidence recorded for this entry.</p>
            </div>
          )}

          {/* Details & Status Badge */}
          <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0] space-y-2 text-xs">
            {status && (
              <div className="flex justify-between items-center">
                <span className="text-[#64748b] font-medium">Record Status:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#dcfce7] text-[#14532d] border border-[#86efac] uppercase">
                  {status}
                </span>
              </div>
            )}

            {details &&
              Object.entries(details).map(([key, val]) => (
                val !== undefined && (
                  <div key={key} className="flex justify-between items-center text-[11px]">
                    <span className="text-[#64748b] font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-semibold text-[#0f172a]">{String(val)}</span>
                  </div>
                )
              ))}

            {remarks && (
              <div className="pt-2 border-t border-[#e2e8f0] text-[11px]">
                <span className="text-[#64748b] font-bold block mb-0.5">Remarks / Purpose:</span>
                <p className="text-[#334155] italic bg-white p-2 rounded border border-[#e2e8f0]">
                  "{remarks}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-between items-center text-xs">
          {imageUrl && (
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#16a34a] hover:underline font-bold text-[11px] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              Open Full Image
            </a>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-md shadow-2xs cursor-pointer ml-auto"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
