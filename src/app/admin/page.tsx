'use client';

import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Wand2, Trash2, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  views: string;
  authorName: string;
  createdAt: string;
}

export default function AdminPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/videos');
      const data = await res.json();
      if (data.success) {
        setVideos(data.videos);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('mp4')) {
      alert('Vui lòng chọn file định dạng MP4');
      return;
    }

    setIsUploading(true);
    setStatusMsg({ text: `Đang upload và convert ${file.name} sang HLS (Vui lòng không đóng trang)...`, type: 'info' });

    const formData = new FormData();
    formData.append('video', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.success) {
        setStatusMsg({ text: data.message, type: 'success' });
        fetchVideos(); // Reload list
      } else {
        setStatusMsg({ text: 'Lỗi upload: ' + data.error, type: 'error' });
      }
    } catch (err) {
      setStatusMsg({ text: 'Lỗi kết nối khi upload', type: 'error' });
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xoá video này khỏi DB? (File gốc vẫn giữ lại)')) return;
    
    try {
      const res = await fetch(`/api/admin/videos?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setVideos(videos.filter(v => v.id !== id));
      } else {
        alert('Lỗi khi xoá: ' + data.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trang Quản Trị Video</h1>
          <p className="text-gray-400">Quản lý và Import video vào hệ thống</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input 
            type="file" 
            accept="video/mp4" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
          >
            <PlayCircle className={`w-5 h-5 ${isUploading ? 'animate-pulse' : ''}`} />
            {isUploading ? 'Đang Upload & HLS...' : 'Upload Video (MP4)'}
          </button>
        </div>
      </div>

      {statusMsg.text && (
        <div className={`p-4 rounded-lg mb-8 flex items-center gap-3 ${
          statusMsg.type === 'error' ? 'bg-red-900/50 text-red-200 border border-red-800' : 
          statusMsg.type === 'success' ? 'bg-green-900/50 text-green-200 border border-green-800' : 
          'bg-blue-900/50 text-blue-200 border border-blue-800'
        }`}>
          {statusMsg.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          {statusMsg.text}
        </div>
      )}

      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Danh sách video trong Database ({videos.length})</h2>
        </div>
        
        <div className="overflow-x-auto overflow-y-auto max-h-[65vh]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#222] text-gray-400 text-sm sticky top-0 z-10 shadow-md">
              <tr>
                <th className="p-4 font-medium">Video</th>
                <th className="p-4 font-medium hidden sm:table-cell">Kênh</th>
                <th className="p-4 font-medium hidden sm:table-cell">Lượt xem</th>
                <th className="p-4 font-medium hidden md:table-cell">Ngày tạo</th>
                <th className="p-4 font-medium">Link HLS</th>
                <th className="p-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">Đang tải...</td>
                </tr>
              ) : videos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">Chưa có video nào. Bấm Quét File MP4 Mới.</td>
                </tr>
              ) : (
                videos.map((video) => (
                  <tr key={video.id} className="hover:bg-[#222] transition">
                    <td className="p-4">
                      <div className="font-medium text-sm sm:text-base truncate max-w-[200px] sm:max-w-[300px]">
                        {video.title}
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-sm text-gray-400">{video.authorName}</td>
                    <td className="p-4 hidden sm:table-cell text-sm text-gray-400">{video.views}</td>
                    <td className="p-4 hidden md:table-cell text-sm text-gray-400">
                      {new Date(video.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {video.videoUrl.includes('.m3u8') ? (
                          <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">HLS Ready</span>
                        ) : (
                          <span className="bg-yellow-900 text-yellow-300 text-xs px-2 py-1 rounded">MP4 Raw</span>
                        )}
                        <span className="text-xs text-gray-500 truncate max-w-[150px]">{video.videoUrl}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(video.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
