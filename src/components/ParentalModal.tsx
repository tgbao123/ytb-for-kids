'use client';

import { useState } from 'react';
import { useSettings } from '@/store/useSettings';
import { X, Settings } from 'lucide-react';
import Link from 'next/link';

interface ParentalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ParentalModal({ isOpen, onClose }: ParentalModalProps) {
  const [passed, setPassed] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  
  const { enableSearch, enableShorts, prioritizeNewest, toggleSearch, toggleShorts, togglePrioritizeNewest } = useSettings();

  if (!isOpen) return null;

  const handleCheck = () => {
    if (answer === '20') {
      setPassed(true);
      setError(false);
    } else {
      setError(true);
      setAnswer('');
    }
  };

  const handleClose = () => {
    setPassed(false);
    setAnswer('');
    setError(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <X size={24} className="text-gray-600" />
        </button>

        {!passed ? (
          <div className="flex flex-col items-center py-6">
            <h2 className="text-2xl font-black text-gray-800 mb-2">Dành cho phụ huynh</h2>
            <p className="text-gray-500 mb-6 font-medium">Vui lòng giải bài toán để tiếp tục</p>
            
            <div className="text-4xl font-black text-blue-600 mb-6">5 x 4 = ?</div>
            
            <input 
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="text-center text-2xl font-bold text-gray-800 border-4 border-gray-400 rounded-2xl w-32 py-3 mb-2 focus:border-blue-500 outline-none"
              placeholder="Đáp án"
            />
            {error && <p className="text-red-500 font-bold mb-4">Sai rồi, thử lại nhé!</p>}
            
            <button 
              onClick={handleCheck}
              className="mt-4 w-full bg-blue-500 text-white text-xl font-bold py-4 rounded-full hover:bg-blue-600"
            >
              Xác nhận
            </button>
          </div>
        ) : (
          <div className="flex flex-col py-2">
            <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">Cài đặt Phụ Huynh</h2>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Thanh tìm kiếm</h3>
                <p className="text-sm text-gray-500">Cho phép bé tự tìm kiếm video</p>
              </div>
              <button 
                onClick={toggleSearch}
                className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${enableSearch ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform ${enableSearch ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">YouTube Shorts</h3>
                <p className="text-sm text-gray-500">Hiển thị tab video ngắn</p>
              </div>
              <button 
                onClick={toggleShorts}
                className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${enableShorts ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform ${enableShorts ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-6">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Ưu tiên video mới nhất</h3>
                <p className="text-sm text-gray-500">Hiển thị các video mới nạp lên đầu</p>
              </div>
              <button 
                onClick={togglePrioritizeNewest}
                className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${prioritizeNewest ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform ${prioritizeNewest ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Link 
                href="/admin"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 w-full bg-gray-800 text-white text-lg font-bold py-4 rounded-xl hover:bg-gray-900 transition"
              >
                <Settings size={20} />
                Vào trang Quản Trị Video
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
