import React, { useState } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Order Issue');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white border border-[#e0e0e0] w-full max-w-lg shadow-2xl overflow-hidden font-body text-xs">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e0e0e0] bg-[#f4f4f4] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0f62fe]">headset_mic</span>
            <h3 className="font-bold text-sm text-[#161616]">CCS Connect Help Desk & Support</h3>
          </div>
          <button onClick={onClose} className="text-[#525252] hover:text-[#161616]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Direct Support Channels */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/919823011223"
              target="_blank"
              rel="noreferrer"
              className="p-3 border border-[#a7f0ba] bg-[#defbe6] hover:bg-[#c6f6d5] transition-colors flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-[#198038]">chat</span>
              <div>
                <div className="font-bold text-[#0e6027]">WhatsApp Desk</div>
                <div className="text-[10px] text-[#0e6027]">+91 98230 11223</div>
              </div>
            </a>

            <div className="p-3 border border-[#78a9ff] bg-[#d0e2ff] flex items-center gap-3">
              <span className="material-symbols-outlined text-[#001d6c]">call</span>
              <div>
                <div className="font-bold text-[#001d6c]">Direct Helpline</div>
                <div className="text-[10px] text-[#001d6c]">1800-233-CROP (Toll Free)</div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e0e0e0] pt-4">
            <h4 className="font-bold text-sm text-[#161616] mb-3">Raise a Support Ticket</h4>

            {submitted ? (
              <div className="p-4 bg-[#defbe6] border border-[#a7f0ba] text-[#0e6027] text-center font-bold">
                ✓ Support Ticket #TK-8820 created successfully! Our team will contact you within 2 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#525252] mb-1">Issue Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-[#e0e0e0] bg-[#f4f4f4] focus:bg-white text-xs font-medium focus:outline-none focus:border-[#0f62fe]"
                  >
                    <option>Order Issue / Delayed Dispatch</option>
                    <option>Payment & Billing Issue</option>
                    <option>Product & Quality Query</option>
                    <option>Account & Profile Issue</option>
                    <option>Other Technical Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#525252] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of the problem"
                    className="w-full p-2 border border-[#e0e0e0] bg-[#f4f4f4] focus:bg-white text-xs font-medium focus:outline-none focus:border-[#0f62fe]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#525252] mb-1">Detailed Remarks</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide order IDs, batch numbers, or specifics..."
                    className="w-full p-2 border border-[#e0e0e0] bg-[#f4f4f4] focus:bg-white text-xs font-medium focus:outline-none focus:border-[#0f62fe]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-[#e0e0e0] hover:bg-[#f4f4f4] font-medium text-[#161616] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0f62fe] hover:bg-[#0353e9] text-white font-medium cursor-pointer"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
