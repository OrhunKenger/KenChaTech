import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email },
    select: { name: true, phone: true, address: true, email: true }
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
    try {
        const { email, name, phone, address } = await req.json();

        if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

        const updated = await prisma.user.update({
            where: { email },
            data: { name, phone, address }
        });

        return NextResponse.json(updated);
    } catch (e) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}