import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { productId, userEmail, rating, comment } = await req.json();

    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });

    const review = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        productId: parseInt(productId),
        userId: user.id
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: 'Yorum yapılamadı' }, { status: 500 });
  }
}
