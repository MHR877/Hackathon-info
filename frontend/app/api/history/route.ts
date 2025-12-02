import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('dztruth');
    const collection = db.collection('checks');

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter') || 'all';
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    let query: any = {};
    if (filter === 'fake') {
      query.prediction = 'Fake';
    } else if (filter === 'true') {
      query.prediction = 'True';
    }

    // Get checks
    const checks = await collection
      .find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    // Get statistics
    const total = await collection.countDocuments();
    const fake = await collection.countDocuments({ prediction: 'Fake' });
    const trueCount = await collection.countDocuments({ prediction: 'True' });

    return NextResponse.json({
      checks: checks.map((check) => ({
        ...check,
        _id: check._id.toString(),
      })),
      stats: {
        total,
        fake,
        true: trueCount,
        suspicious: 0,
      },
    });
  } catch (error: any) {
    console.error('History error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب السجل', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('dztruth');
    const collection = db.collection('checks');

    await collection.deleteMany({});

    return NextResponse.json({ success: true, message: 'تم حذف جميع السجلات' });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء الحذف', details: error.message },
      { status: 500 }
    );
  }
}
