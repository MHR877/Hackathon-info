'use client';

import { useState } from 'react';
import { Upload, Sparkles, Camera, MessageSquare, Shield } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    prediction: string;
    processedText: string;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text && !image) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, image }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          prediction: data.prediction,
          processedText: data.processedText,
        });
      } else {
        alert(data.error || 'حدث خطأ أثناء التحقق');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-black">
              DzTruth - كاشف الأخبار الزائفة بالدارجة الجزائرية
            </h1>
            <p className="text-xl text-gray-700">
              منصة ذكية للتحقق من صحة الأخبار المكتوبة بالدارجة الجزائرية باستخدام الذكاء الاصطناعي
            </p>
          </div>

          {/* Main Check Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Text Input */}
                  <div>
                    <label className="flex items-center gap-2 text-lg font-bold mb-3 text-black">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      إدخال نص
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="اكتب أو الصق النص هنا..."
                      className="w-full p-4 border-2 border-gray-300 rounded text-black"
                      rows={6}
                    />
                    <p className="text-sm text-gray-600 mt-2">{text.length} حروف</p>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="flex items-center gap-2 text-lg font-bold mb-3 text-black">
                      <Camera className="w-5 h-5 text-green-600" />
                      رفع صورة
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {image ? (
                          <div className="relative w-full h-32">
                            <Image src={image} alt="Uploaded" fill className="object-contain" />
                          </div>
                        ) : (
                          <>
                            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-600">ارفع صورة تحتوي على نص</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || (!text && !image)}
                  className="w-full py-4 px-8 rounded bg-green-600 text-white font-bold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    'جاري التحقق...'
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 inline mr-2" />
                      تحقق الآن
                    </>
                  )}
                </button>
              </form>

              {/* Result */}
              {result && (
                <div className={`mt-6 p-6 rounded border-2 ${result.prediction === 'True'
                    ? 'border-green-600 bg-green-50'
                    : 'border-red-600 bg-red-50'
                  }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className={`w-8 h-8 ${result.prediction === 'True' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    <h3 className="text-2xl font-bold text-black">
                      {result.prediction === 'True' ? 'خبر صحيح ✓' : 'خبر زائف ✗'}
                    </h3>
                  </div>
                  <p className="text-black">
                    <strong>النص المعالج:</strong> {result.processedText}
                  </p>
                </div>
              )}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-700">
                تم فحص <span className="font-bold text-green-600">15847</span> أخبار حتى الآن
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-black">مميزات المنصة</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'تحليل نص ذكي', desc: 'تحليل متقدم للنصوص' },
              { title: 'كشف اللهجة الجزائرية', desc: 'التعرف على اللهجات' },
              { title: 'قراءة من الصور', desc: 'استخراج النصوص من الصور' },
              { title: 'شرح النتائج', desc: 'تفسير واضح للنتائج' },
            ].map((feature, index) => (
              <div key={index} className="bg-green-50 border-2 border-green-200 rounded p-6 text-center">
                <h3 className="text-xl font-bold mb-2 text-black">{feature.title}</h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">مهمتنا</h2>
            <p className="text-xl">
              نحن نعمل لحماية المجتمع من الأخبار الزائفة والمعلومات المضللة من خلال توفير أداة ذكية ودقيقة للتحقق من صحة الأخبار المكتوبة بالدارجة الجزائرية.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
