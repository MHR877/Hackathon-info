'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle, Home, History, Info, Mail } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'الرئيسية', icon: Home },
        { href: '/history', label: 'السجل', icon: History },
        { href: '/about', label: 'حول', icon: Info },
        { href: '/contact', label: 'تواصل معنا', icon: Mail },
    ];

    return (
        <nav className="bg-green-600 text-white border-b border-green-700">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <CheckCircle className="w-8 h-8" />
                        <div>
                            <h1 className="text-2xl font-bold">DzTruth</h1>
                            <p className="text-xs text-green-100">كاشف الأخبار الزائفة</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded ${isActive
                                            ? 'bg-green-700 font-bold'
                                            : 'hover:bg-green-700'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
