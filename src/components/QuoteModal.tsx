import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ChevronRight, Smartphone, Mail, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, productName = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: productName ? `Tôi quan tâm đến sản phẩm: ${productName}` : ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-950/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0f18] rounded-[48px] border border-white/10 shadow-2xl overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 md:p-12">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-accent-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-accent-400/40">
                  <CheckCircle2 className="w-12 h-12 text-brand-950" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Gửi thông tin thành công!</h3>
                <p className="text-white/60 font-medium mb-10">Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
                <button 
                  onClick={onClose}
                  className="px-8 py-4 rounded-2xl bg-accent-400 text-brand-950 font-black hover:bg-white transition-all shadow-xl shadow-accent-400/20"
                >
                  Đóng cửa sổ
                </button>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <div className="inline-block px-4 py-1 bg-accent-400/10 border border-accent-400/20 rounded-full text-accent-400 text-xs font-black uppercase tracking-widest mb-4">
                    Tư vấn giải pháp
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tighter">
                    {productName ? `Nhận báo giá ${productName}` : 'Đăng ký nhận tư vấn'}
                  </h2>
                  <p className="text-white/50 font-medium">Để lại thông tin, đội ngũ chuyên gia của VNSIGN sẽ hỗ trợ bạn ngay lập tức.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20">
                        <User className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Họ và tên"
                        required
                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-accent-400 focus:bg-white/10 transition-all font-bold text-white placeholder-white/20"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <input 
                        type="tel" 
                        placeholder="Số điện thoại"
                        required
                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-accent-400 focus:bg-white/10 transition-all font-bold text-white placeholder-white/20"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Email liên hệ"
                      required
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-accent-400 focus:bg-white/10 transition-all font-bold text-white placeholder-white/20"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <textarea 
                    placeholder="Ghi chú thêm về nhu cầu của bạn..."
                    className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-accent-400 focus:bg-white/10 transition-all font-bold text-white placeholder-white/20 h-32 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-accent-400 text-brand-950 py-6 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-accent-400/30 disabled:opacity-50 group flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? 'Đang xử lý...' : (
                      <>
                        Gửi yêu cầu ngay
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
