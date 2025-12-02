import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { text, image } = await request.json();

    if (!text && !image) {
      return NextResponse.json(
        { error: 'يجب إدخال نص أو صورة' },
        { status: 400 }
      );
    }

    // Call AI backend
    const backendUrl = process.env.BACKEND_AI_URL || 'http://localhost:5000';
    const response = await axios.post(`${backendUrl}/predict`, {
      text: text || '',
    });

    const { prediction, processed_text } = response.data;

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db('dztruth');
    const collection = db.collection('checks');

    const checkResult = {
      text: text || '',
      image: image || null,
      prediction,
      processedText: processed_text,
      timestamp: new Date(),
      userIp: request.headers.get('x-forwarded-for') || 'unknown',
    };

    const result = await collection.insertOne(checkResult);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      prediction,
      processedText: processed_text,
    });
  } catch (error: any) {
    console.error('Check error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التحقق', details: error.message },
      { status: 500 }
    );
  }
}
