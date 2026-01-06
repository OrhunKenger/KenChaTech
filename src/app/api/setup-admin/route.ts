import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const email = 'orhunkenger1929@gmail.com';
    const password = 'Orhun123.';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'ADMIN',
        name: 'Orhun Kenger'
      },
      create: {
        email,
        password: hashedPassword,
        name: 'Orhun Kenger',
        role: 'ADMIN',
        phone: '05310140429'
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Admin kullanıcısı başarıyla oluşturuldu.", 
      email: user.email,
      role: user.role 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
