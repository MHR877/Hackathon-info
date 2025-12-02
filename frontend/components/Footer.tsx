import { Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">DzTruth</h3>
                        <p className="text-gray-300">
                            منصة ذكية للتحقق من صحة الأخبار المكتوبة بالدارجة الجزائرية
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-300 hover:text-white">الرئيسية</Link></li>
                            <li><Link href="/history" className="text-gray-300 hover:text-white">السجل</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-white">حول</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-white">تواصل معنا</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
                        <a href="mailto:contact@dztruth.dz" className="flex items-center gap-2 text-gray-300 hover:text-white">
                            <Mail className="w-5 h-5" />
                            <span>contact@dztruth.dz</span>
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-400 flex items-center justify-center gap-2">
                        صنع بكل <Heart className="w-4 h-4 text-red-500" /> في الجزائر
                    </p>
                    <p className="text-gray-500 text-sm mt-2">© DzTruth 2024</p>
                </div>
            </div>
        </footer>
    );
}
