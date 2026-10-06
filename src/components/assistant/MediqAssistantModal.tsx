import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Send,
  Building2,
  Clock3,
  MapPin,
  HelpCircle,
  Stethoscope,
  HeartPulse,
  Users,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  MessageCircle,
} from 'lucide-react';
import { MediqAvatar, AvatarState } from './MediqAvatar';
import { MOCK_HOSPITALS } from '../../constants/mockData';
import { Button } from '../ui/Button';

interface SuggestedQuestion {
  icon: React.ReactNode;
  text: string;
  category: 'crowd' | 'timing' | 'location' | 'info';
}

const QUICK_QUESTIONS: SuggestedQuestion[] = [
  {
    icon: <Building2 className="w-3.5 h-3.5 text-[#6F9F82]" />,
    text: 'Which hospital has less crowd right now?',
    category: 'crowd',
  },
  {
    icon: <Clock3 className="w-3.5 h-3.5 text-[#D9A436]" />,
    text: 'When is the best time to visit General OPD?',
    category: 'timing',
  },
  {
    icon: <HeartPulse className="w-3.5 h-3.5 text-[#8574B3]" />,
    text: 'Where can I find Cardiology department?',
    category: 'location',
  },
  {
    icon: <MapPin className="w-3.5 h-3.5 text-[#2B4C3F]" />,
    text: 'Show nearby hospitals with low waiting times',
    category: 'location',
  },
  {
    icon: <Users className="w-3.5 h-3.5 text-[#E9826E]" />,
    text: 'How busy is CityCare General OPD today?',
    category: 'crowd',
  },
  {
    icon: <HelpCircle className="w-3.5 h-3.5 text-[#5C5852]" />,
    text: 'What should I bring for my OPD appointment?',
    category: 'info',
  },
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    url: string;
  };
}

interface MediqAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const MediqAssistantModal: React.FC<MediqAssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuery,
}) => {
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: "Hello! I'm your MEDIQ Assistant 👋 I can help you check live hospital crowd levels, find quiet departments, and plan your hospital visit with minimal wait. How can I guide you today?",
      timestamp: 'Just now',
    },
  ]);

  const handleSend = (queryText: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Transition Avatar: Listening -> Thinking -> Responding -> Success/Idle
    setAvatarState('listening');

    setTimeout(() => {
      setAvatarState('thinking');
    }, 600);

    setTimeout(() => {
      setAvatarState('responding');

      let replyText = '';
      let actionBtn: ChatMessage['actionButton'] = undefined;

      const lower = textToSend.toLowerCase();

      if (lower.includes('less crowd') || lower.includes('low wait') || lower.includes('quiet')) {
        replyText = `Metro Health Medical Center currently has the lowest overall crowd level (LOW, ~12 min average wait). CityCare Emergency is also running smoothly (~5 min wait).`;
        actionBtn = { label: 'View Metro Health Details', url: '/patient/hospitals' };
      } else if (lower.includes('best time') || lower.includes('when')) {
        replyText = `Based on live telemetry, CityCare General OPD queue spikes between 10:00 AM and 2:00 PM. MEDIQ recommends visiting after 5:00 PM when crowd density decreases by 40%.`;
        actionBtn = { label: 'Book Evening Slot', url: '/patient/appointments' };
      } else if (lower.includes('cardiology')) {
        replyText = `Cardiology is available at Metro Health Medical Center (128 Innovation Way) with a Moderate crowd (~25 min wait) and active consultation slots today.`;
        actionBtn = { label: 'Explore Cardiology Dept', url: '/patient/hospitals' };
      } else if (lower.includes('busy') || lower.includes('general opd') || lower.includes('how busy')) {
        replyText = `CityCare General OPD is currently experiencing HIGH crowd (82/100 capacity, ~45 min wait). We recommend checking Metro Health General OPD as a faster alternative.`;
        actionBtn = { label: 'Compare Hospital Loads', url: '/patient/hospitals' };
      } else if (lower.includes('bring') || lower.includes('document')) {
        replyText = `For your OPD visit, please remember to bring: 1) Photo ID card, 2) Previous medical records/prescriptions, 3) Insurance card if applicable, 4) Your digital MEDIQ Token #.`;
      } else {
        replyText = `I have searched our live hospital telemetry database. CityCare Hospital and Metro Health are active. Would you like me to guide you to queue statuses or book an appointment?`;
        actionBtn = { label: 'View Monitored Hospitals', url: '/patient/hospitals' };
      }

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        actionButton: actionBtn,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      setTimeout(() => {
        setAvatarState('idle');
      }, 1500);
    }, 1600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white border border-[#E8E2D5] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[620px] max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#F8F5EF] border-b border-[#E8E2D5] flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <MediqAvatar state={avatarState} size="md" showBadge={true} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-[#252525]">MEDIQ Assistant</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#EAF2EC] text-[#2A543B] text-[10px] font-bold border border-[#C8DDD0]">
                    Official Guide
                  </span>
                </div>
                <p className="text-xs text-[#5C5852]">
                  {avatarState === 'listening'
                    ? 'I am listening...'
                    : avatarState === 'thinking'
                    ? 'Processing live queue database...'
                    : avatarState === 'responding'
                    ? 'Formulating recommendation...'
                    : 'Calm, clear healthcare queue guidance'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#5C5852] hover:bg-[#EFEBE1] hover:text-[#252525] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions Pills */}
          <div className="p-3 bg-[#EFEBE1]/50 border-b border-[#E8E2D5] overflow-x-auto flex gap-2 shrink-0 scrollbar-none">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.text)}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E8E2D5] text-xs text-[#5C5852] hover:text-[#252525] hover:border-[#2B4C3F] whitespace-nowrap flex items-center gap-1.5 transition-all shadow-2xs shrink-0"
              >
                {q.icon}
                <span>{q.text}</span>
              </button>
            ))}
          </div>

          {/* Chat Stream Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F8F5EF]/40">
            {messages.map((m) => (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <MediqAvatar state="idle" size="sm" showBadge={false} className="mt-1 shrink-0" />
                )}

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#2B4C3F] text-white rounded-tr-xs shadow-xs'
                        : 'bg-white border border-[#E8E2D5] text-[#252525] rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.actionButton && (
                    <a
                      href={m.actionButton.url}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EAF2EC] border border-[#C8DDD0] text-[#2A543B] text-xs font-bold hover:bg-[#2B4C3F] hover:text-white transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {m.actionButton.label}
                    </a>
                  )}

                  <span className="text-[10px] text-[#8C867D] block px-1">
                    {m.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}

            {avatarState === 'thinking' && (
              <div className="flex items-center gap-2 text-xs text-[#5C5852] italic p-2 bg-white rounded-xl border border-[#E8E2D5] w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A436] animate-pulse" />
                <span>Checking live queue telemetry feeds...</span>
              </div>
            )}
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-[#E8E2D5] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask MEDIQ Assistant about hospital crowds, wait times..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
              className="flex-1 bg-[#F8F5EF] border border-[#E8E2D5] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[#252525] focus:outline-none focus:border-[#2B4C3F] focus:ring-1 focus:ring-[#2B4C3F]"
            />
            <Button
              variant="primary"
              onClick={() => handleSend(inputText)}
              disabled={!inputText.trim() || avatarState !== 'idle'}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Ask
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
