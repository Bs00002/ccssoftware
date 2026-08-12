import React, { useState } from 'react';
import { User } from '../types';

interface SupportViewProps {
  currentUser: User;
}

interface Ticket {
  id: string;
  subject: string;
  category: string;
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  response?: string;
  description: string;
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TK-9021',
    subject: 'Delayed dispatch for Order #ORD-2026-104',
    category: 'Order Issue',
    date: '2026-08-05',
    status: 'In Progress',
    description: 'Vehicle for batch #282 has not departed the warehouse.',
    response: 'Depot manager notified. Expected dispatch today at 4 PM.',
  },
  {
    id: 'TK-8840',
    subject: 'GST Invoice copy request for June',
    category: 'Billing',
    date: '2026-07-28',
    status: 'Resolved',
    description: 'Need digitally signed GST Tax Invoice for accounting audit.',
    response: 'Tax invoice PDF attached and emailed to dealer account.',
  },
];

export const SupportView: React.FC<SupportViewProps> = ({ currentUser }) => {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Order Issue');
  const [description, setDescription] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const newTicket: Ticket = {
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      category,
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      description,
    };

    setTickets([newTicket, ...tickets]);
    setSubject('');
    setDescription('');
    setShowNewModal(false);
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const role = (currentUser.role || 'DEALER').toUpperCase();

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-body text-xs">
      {/* Header Banner */}
      <div className="bg-white border border-[#e2e8f0] p-5 rounded-lg shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg flex items-center justify-center text-[#15803d]">
            <span className="material-symbols-outlined text-[28px]">headset_mic</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#14532d] tracking-tight">CCS Support Desk</h1>
            <p className="text-xs text-[#64748b] mt-0.5">
              Get instant help via WhatsApp, Helpline, or submit a support ticket
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white font-bold rounded-lg shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Raise Support Ticket
        </button>
      </div>

      {submittedMessage && (
        <div className="p-3.5 bg-[#f0fdf4] border border-[#86efac] text-[#15803d] rounded-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          Support ticket created successfully! Our team will respond shortly.
        </div>
      )}

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="https://wa.me/919823011223"
          target="_blank"
          rel="noreferrer"
          className="p-4 bg-white border border-[#22c55e]/30 hover:border-[#22c55e] rounded-lg shadow-xs flex items-center gap-3 group transition-all cursor-pointer"
        >
          <div className="w-10 h-10 bg-[#f0fdf4] text-[#16a34a] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[22px]">chat</span>
          </div>
          <div>
            <div className="font-bold text-[#14532d] text-sm">WhatsApp Help Desk</div>
            <div className="text-xs text-[#16a34a] font-medium">+91 98230 11223</div>
            <div className="text-[10px] text-[#64748b] mt-0.5">Instant message support (9 AM - 7 PM)</div>
          </div>
        </a>

        <a
          href="tel:18002332767"
          className="p-4 bg-white border border-[#0f62fe]/20 hover:border-[#0f62fe] rounded-lg shadow-xs flex items-center gap-3 group transition-all cursor-pointer"
        >
          <div className="w-10 h-10 bg-[#edf5ff] text-[#0f62fe] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[22px]">call</span>
          </div>
          <div>
            <div className="font-bold text-[#001d6c] text-sm">Toll-Free Helpline</div>
            <div className="text-xs text-[#0f62fe] font-medium">1800-233-CROP (2767)</div>
            <div className="text-[10px] text-[#64748b] mt-0.5">Customer Service & Agronomist Assistance</div>
          </div>
        </a>

        <div className="p-4 bg-white border border-[#e2e8f0] rounded-lg shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f8fafc] text-[#475569] rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">mail</span>
          </div>
          <div>
            <div className="font-bold text-[#1e293b] text-sm">Email Support</div>
            <div className="text-xs text-[#475569] font-medium">support@ccscropscience.in</div>
            <div className="text-[10px] text-[#64748b] mt-0.5">Turnaround time: Within 24 hours</div>
          </div>
        </div>
      </div>

      {/* Tickets List Section */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#e2e8f0] bg-[#f8fafc] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#15803d]">confirmation_number</span>
            <h2 className="font-bold text-sm text-[#1e293b]">Support History & Tickets</h2>
          </div>
          <span className="text-xs font-semibold text-[#64748b]">
            Total Tickets: {tickets.length}
          </span>
        </div>

        <div className="divide-y divide-[#e2e8f0]">
          {tickets.map((t) => (
            <div key={t.id} className="p-4 hover:bg-[#f8fafc] transition-colors space-y-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#15803d] bg-[#f0fdf4] px-2 py-0.5 border border-[#86efac] rounded">
                    {t.id}
                  </span>
                  <h3 className="font-bold text-sm text-[#0f172a]">{t.subject}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#64748b] font-medium">{t.date}</span>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                      t.status === 'Resolved'
                        ? 'bg-[#f0fdf4] text-[#15803d] border-[#86efac]'
                        : t.status === 'In Progress'
                        ? 'bg-[#fefce8] text-[#ca8a04] border-[#fef08a]'
                        : 'bg-[#f8fafc] text-[#475569] border-[#cbd5e1]'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#334155] bg-[#f8fafc] p-3 rounded border border-[#f1f5f9]">
                <div className="font-semibold text-[#64748b] text-[10px] uppercase mb-0.5">
                  Category: {t.category}
                </div>
                <div>{t.description}</div>
              </div>

              {t.response && (
                <div className="mt-2 text-xs text-[#15803d] bg-[#f0fdf4] p-3 rounded border border-[#bbf7d0] flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#16a34a] shrink-0 mt-0.5">
                    quick_reference_all
                  </span>
                  <div>
                    <span className="font-bold block text-[11px] text-[#14532d]">Support Response:</span>
                    {t.response}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white border border-[#e2e8f0] w-full max-w-lg rounded-lg shadow-xl overflow-hidden font-body text-xs">
            <div className="px-5 py-4 border-b border-[#e2e8f0] bg-[#f8fafc] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#15803d]">add_circle</span>
                <h3 className="font-bold text-sm text-[#0f172a]">Raise Support Issue</h3>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-[#64748b] hover:text-[#0f172a] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                  Issue Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 border border-[#cbd5e1] rounded bg-white text-xs font-medium focus:outline-none focus:border-[#15803d]"
                >
                  <option>Order Issue / Dispatch Status</option>
                  <option>Product Quality / Batch Complaint</option>
                  <option>Invoice / Payment Ledger Issue</option>
                  <option>Field Operations / GPS Issue</option>
                  <option>General Support Request</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Summary of the issue..."
                  className="w-full p-2.5 border border-[#cbd5e1] rounded text-xs font-medium focus:outline-none focus:border-[#15803d]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#334155] uppercase tracking-wider mb-1">
                  Issue Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details such as order number, product name, or specific problem..."
                  className="w-full p-2.5 border border-[#cbd5e1] rounded text-xs font-medium focus:outline-none focus:border-[#15803d]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#334155] font-bold rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold rounded shadow-xs cursor-pointer"
                >
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
