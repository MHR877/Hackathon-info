'use client';

import { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                alert(data.error || 'حدث خطأ');
            }
        } catch (error) {
            alert('حدث خطأ أثناء الاتصال بالخادم');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <section className="py-12 bg-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">تواصل معنا</h1>
                    <p className="text-xl">نحن هنا للإجابة على استفساراتك</p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-2xl mx-auto px-4">
                    {success && (
                        <div className="bg-green-50 border-2 border-green-500 rounded p-6 mb-6">
                            <div className="flex items-center gap-3 text-green-700">
                                <CheckCircle className="w-6 h-6" />
                                <p className="font-bold text-lg">تم إرسال رسالتك بنجاح!</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white border-2 border-gray-200 rounded p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-lg font-bold mb-3 text-black">
                                    <User className="w-5 h-5 text-green-600" />
                                    الاسم
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="أدخل اسمك الكامل"
                                    className="w-full p-4 border-2 border-gray-300 rounded text-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-lg font-bold mb-3 text-black">
                                    <Mail className="w-5 h-5 text-green-600" />
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="example@gmail.com"
                                    className="w-full p-4 border-2 border-gray-300 rounded text-black"
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-lg font-bold mb-3 text-black">
                                    <MessageSquare className="w-5 h-5 text-green-600" />
                                    الرسالة
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="اكتب رسالتك هنا..."
                                    className="w-full p-4 border-2 border-gray-300 rounded text-black"
                                    rows={6}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 px-8 rounded bg-green-600 text-white font-bold text-lg hover:bg-green-700 disabled:bg-gray-400"
                            >
                                {loading ? 'جاري الإرسال...' : (
                                    <>
                                        <Send className="w-5 h-5 inline mr-2" />
                                        إرسال الرسالة
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        <div className="bg-green-50 border-2 border-green-200 rounded p-8 text-center">
                            <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-black">البريد الإلكتروني</h3>
                            <a href="mailto:contact@dztruth.dz" className="text-green-600 font-bold">
                                contact@dztruth.dz
                            </a>
                        </div>

                        <div className="bg-blue-50 border-2 border-blue-200 rounded p-8 text-center">
                            <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-black">الدعم الفني</h3>
                            <p className="text-gray-700">متاح 24/7</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
