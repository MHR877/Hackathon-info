'use client';

import { useState, useEffect } from 'react';
import { Search, Trash2, Filter } from 'lucide-react';

interface CheckResult {
    _id: string;
    text: string;
    prediction: 'Fake' | 'True';
    processedText: string;
    timestamp: string;
}

interface Stats {
    total: number;
    fake: number;
    true: number;
    suspicious: number;
}

export default function HistoryPage() {
    const [checks, setChecks] = useState<CheckResult[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, fake: 0, true: 0, suspicious: 0 });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'fake' | 'true'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchHistory();
    }, [filter]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/history?filter=${filter}`);
            const data = await response.json();
            setChecks(data.checks || []);
            setStats(data.stats || { total: 0, fake: 0, true: 0, suspicious: 0 });
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearAll = async () => {
        if (!confirm('هل أنت متأكد من حذف جميع السجلات؟')) return;
        try {
            await fetch('/api/history', { method: 'DELETE' });
            fetchHistory();
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    };

    const filteredChecks = checks.filter((check) =>
        check.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        check.processedText.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-4 text-black">سجل الفحوصات</h1>
                    <p className="text-xl text-gray-700">تتبع جميع عمليات التحقق السابقة</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded p-6">
                        <span className="text-gray-700 font-bold">المجموع</span>
                        <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded p-6">
                        <span className="text-gray-700 font-bold">صحيح</span>
                        <p className="text-3xl font-bold text-green-600">{stats.true}</p>
                    </div>
                    <div className="bg-red-50 border-2 border-red-200 rounded p-6">
                        <span className="text-gray-700 font-bold">زائف</span>
                        <p className="text-3xl font-bold text-red-600">{stats.fake}</p>
                    </div>
                    <div className="bg-orange-50 border-2 border-orange-200 rounded p-6">
                        <span className="text-gray-700 font-bold">مشكوك</span>
                        <p className="text-3xl font-bold text-orange-600">{stats.suspicious}</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ابحث في السجلات..."
                                className="w-full pr-10 p-3 border-2 border-gray-300 rounded text-black"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`py-3 px-6 rounded font-bold ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
                                    }`}
                            >
                                <Filter className="w-4 h-4 inline mr-2" />
                                الكل
                            </button>
                            <button
                                onClick={() => setFilter('true')}
                                className={`py-3 px-6 rounded font-bold ${filter === 'true' ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
                                    }`}
                            >
                                صحيح
                            </button>
                            <button
                                onClick={() => setFilter('fake')}
                                className={`py-3 px-6 rounded font-bold ${filter === 'fake' ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
                                    }`}
                            >
                                زائف
                            </button>
                        </div>

                        <button
                            onClick={handleClearAll}
                            className="py-3 px-6 rounded bg-red-600 text-white font-bold hover:bg-red-700"
                        >
                            <Trash2 className="w-4 h-4 inline mr-2" />
                            حذف الكل
                        </button>
                    </div>
                </div>

                {/* Results List */}
                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600">جاري التحميل...</p>
                    </div>
                ) : filteredChecks.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded p-20 text-center">
                        <p className="text-xl text-gray-600">لا توجد نتائج</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredChecks.map((check) => (
                            <div key={check._id} className="bg-white border-2 border-gray-200 rounded p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`py-2 px-4 rounded font-bold ${check.prediction === 'True'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-red-600 text-white'
                                                }`}>
                                                {check.prediction === 'True' ? 'صحيح ✓' : 'زائف ✗'}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {new Date(check.timestamp).toLocaleDateString('ar-DZ')}
                                            </span>
                                        </div>
                                        <p className="text-black font-bold mb-2">{check.text}</p>
                                        <p className="text-gray-700">
                                            <strong>النص المعالج:</strong> {check.processedText}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
