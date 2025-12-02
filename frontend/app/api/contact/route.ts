import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('dztruth');
    const collection = db.collection('contacts');

    const contactMessage = {
      name,
      email,
      message,
      timestamp: new Date(),
      status: 'new',
    };

    const result = await collection.insertOne(contactMessage);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: 'تم إرسال رسالتك بنجاح',
    });
  } catch (error: any) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إرسال الرسالة', details: error.message },
      { status: 500 }
    );
  }
}
