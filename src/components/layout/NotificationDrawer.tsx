import React from 'react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: any[];
  onMarkAllRead?: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'New Order #ORD-092 Approved',
      time: '10 mins ago',
      desc: 'Order #ORD-092 for Agri Solutions Ltd approved by Admin. Stock dispatched via VRL.',
      type: 'order',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Low Stock Alert: Chitra Zyme Gold',
      time: '1 hour ago',
      desc: 'Stock level in Pune Central Warehouse fell to 8 units (Threshold: 15). Re-order suggested.',
      type: 'warning',
      unread: true,
    },
    {
      id: 'n3',
      title: 'Expense Claim Approved',
      time: '3 hours ago',
      desc: 'Fuel claim of ₹1,250 submitted by Sanjay Deshmukh was approved.',
      type: 'expense',
      unread: false,
    },
    {
      id: 'n4',
      title: 'New Scheme Activated',
      time: '1 day ago',
      desc: 'Kharif Agrotech Mega Bonanza 2026 scheme is now live for all Western Maharashtra dealers.',
      type: 'scheme',
      unread: false,
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="bg-white w-full max-w-sm h-full border-l border-[#e0e0e0] flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[#e0e0e0] bg-[#f4f4f4] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0f62fe] text-[20px]">notifications</span>
            <h3 className="font-bold text-sm text-[#161616]">System Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#525252] hover:text-[#161616] p-1 rounded hover:bg-[#e0e0e0] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#e0e0e0]">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 hover:bg-[#f4f4f4] transition-colors ${
                n.unread ? 'bg-[#e5f0ff]/40' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-xs text-[#161616]">{n.title}</span>
                <span className="text-[10px] text-[#525252] font-medium">{n.time}</span>
              </div>
              <p className="text-xs text-[#525252] leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e0e0e0] bg-[#f4f4f4] text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#0f62fe] hover:underline cursor-pointer"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};
