import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Clock 
} from 'lucide-react';
import { toast } from 'sonner';

export default function MessagesPage() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Vikram Singhania",
      space: "Worli Penthouse",
      lastMessage: "Can we review the revised Italian marble samples for the master bath tomorrow?",
      time: "10:45 AM",
      unread: true,
      phone: "+91 98200 45112",
      email: "vikram.s@singhaniagroup.com",
      messages: [
        { sender: 'client', text: "Hello Aarav, we loved the 3D walkthrough video!", time: "Yesterday" },
        { sender: 'studio', text: "Thank you Vikram! The lighting fixtures have been finalized as well.", time: "Yesterday" },
        { sender: 'client', text: "Can we review the revised Italian marble samples for the master bath tomorrow?", time: "10:45 AM" }
      ]
    },
    {
      id: 2,
      name: "Dr. Rohini Mehta",
      space: "Jubilee Hills Walk-In Closet",
      lastMessage: "The sensor LED strip installation looks absolutely divine! Thank you team.",
      time: "Yesterday",
      unread: false,
      phone: "+91 97001 22987",
      email: "dr.rohini@mehtahospitals.org",
      messages: [
        { sender: 'client', text: "The sensor LED strip installation looks absolutely divine! Thank you team.", time: "Yesterday" }
      ]
    },
    {
      id: 3,
      name: "Rajesh Malhotra",
      space: "BKC Corporate HQ",
      lastMessage: "HVAC acoustic testing scheduled for Monday 11 AM.",
      time: "Sep 18",
      unread: false,
      phone: "+91 98190 88231",
      email: "rmalhotra@solariumcap.com",
      messages: [
        { sender: 'client', text: "HVAC acoustic testing scheduled for Monday 11 AM.", time: "Sep 18" }
      ]
    }
  ]);

  const [activeConv, setActiveConv] = useState(conversations[0]);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      sender: 'studio',
      text: replyText.trim(),
      time: 'Just now'
    };

    const updatedConv = {
      ...activeConv,
      messages: [...activeConv.messages, newMsg],
      lastMessage: replyText.trim(),
      time: 'Just now',
      unread: false
    };

    setConversations(conversations.map(c => c.id === activeConv.id ? updatedConv : c));
    setActiveConv(updatedConv);
    setReplyText('');
    toast.success('Reply dispatched to client portal');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
          Client Communication & Inquiries
        </h1>
        <p className="text-xs text-[#7E4F2D]">
          Real-time coordination on site revisions, material approvals, and timeline updates.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* Left: Conversations List (4 cols) */}
        <div className="lg:col-span-4 border-r border-[#EAE3D9] flex flex-col justify-between">
          <div className="p-4 border-b border-[#EAE3D9] bg-[#FAF8F5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C381E]">
              Active Client Dialogues
            </span>
          </div>

          <div className="divide-y divide-[#EAE3D9] overflow-y-auto flex-1">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveConv(c);
                  c.unread = false;
                }}
                className={`w-full p-4 text-left transition-colors flex items-start gap-3 ${
                  activeConv.id === c.id ? 'bg-[#5C381E]/5' : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#DFCA9B] text-[#1E120B] font-bold flex items-center justify-center text-xs shrink-0">
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#1E120B] truncate">{c.name}</h4>
                    <span className="text-[10px] text-[#7E4F2D] shrink-0">{c.time}</span>
                  </div>
                  <p className="text-[10px] text-[#8B5A2B] font-medium">{c.space}</p>
                  <p className="text-xs text-[#5C381E]/80 truncate mt-1">{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Message Window (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full bg-[#FAF8F5]/30">
          
          {/* Header of Active Chat */}
          <div className="p-4 border-b border-[#EAE3D9] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DFCA9B] text-[#1E120B] font-bold flex items-center justify-center text-xs">
                {activeConv.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E120B]">{activeConv.name}</h3>
                <p className="text-xs text-[#8B5A2B]">{activeConv.space} • {activeConv.phone}</p>
              </div>
            </div>

            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
              Verified Client
            </span>
          </div>

          {/* Messages Stream */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1 max-h-[400px]">
            {activeConv.messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'studio' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    m.sender === 'studio'
                      ? 'bg-[#5C381E] text-white rounded-tr-none'
                      : 'bg-white text-[#3A2114] border border-[#EAE3D9] rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-[#7E4F2D] mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Composer */}
          <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-[#EAE3D9] flex gap-2">
            <input
              type="text"
              placeholder={`Reply to ${activeConv.name}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-full text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#5C381E] text-white hover:bg-[#3A2114] transition-all flex items-center gap-1.5 text-xs font-bold shadow-md"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
