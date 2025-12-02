import { Shield, Target, Users, Zap, CheckCircle, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <section className="py-12 bg-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">حول DzTruth</h1>
                    <p className="text-xl">منصة جزائرية رائدة في مجال التحقق من صحة الأخبار</p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-green-50 border-2 border-green-200 rounded p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="w-8 h-8 text-green-600" />
                            <h2 className="text-3xl font-bold text-black">مهمتنا</h2>
                        </div>
                        <p className="text-lg text-black mb-4">
                            في عصر المعلومات والأخبار الزائفة، نهدف إلى حماية المجتمع الجزائري من المعلومات المضللة.
                        </p>
                        <p className="text-lg text-black">
                            نستخدم أحدث تقنيات الذكاء الاصطناعي ومعالجة اللغة الطبيعية لتحليل النصوص.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-black">كيف يعمل DzTruth؟</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: '1', title: 'إدخال النص', desc: 'قم بإدخال النص المراد التحقق منه', icon: CheckCircle },
                            { step: '2', title: 'التحليل الذكي', desc: 'يقوم النظام بتحليل النص', icon: Zap },
                            { step: '3', title: 'النتيجة', desc: 'احصل على نتيجة فورية', icon: Award },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.step} className="bg-white border-2 border-gray-200 rounded p-8 text-center">
                                    <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                        {item.step}
                                    </div>
                                    <Icon className="w-12 h-12 mx-auto mb-4 text-black" />
                                    <h3 className="text-xl font-bold mb-3 text-black">{item.title}</h3>
                                    <p className="text-gray-700">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-black">لماذا DzTruth؟</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            { icon: Shield, title: 'دقة عالية', desc: 'نماذج ذكاء اصطناعي متقدمة' },
                            { icon: Zap, title: 'سرعة فائقة', desc: 'نتائج في ثوانٍ معدودة' },
                            { icon: Users, title: 'سهولة الاستخدام', desc: 'واجهة بسيطة وسهلة' },
                            { icon: CheckCircle, title: 'مجاني بالكامل', desc: 'خدمة مجانية 100%' },
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="bg-green-50 border-2 border-green-200 rounded p-6 flex items-start gap-4">
                                    <Icon className="w-8 h-8 text-green-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-black">{feature.title}</h3>
                                        <p className="text-gray-700">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
