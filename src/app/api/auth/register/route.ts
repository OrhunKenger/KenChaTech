import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(req: Request) {
  try {
    const { name, email: rawEmail, password, phone, address } = await req.json();
    
    // Email normalizasyonu
    const email = rawEmail?.trim().toLowerCase();

    // Basit Validasyonlar
    if (!email || !password || !name) {
       return NextResponse.json({ error: 'Zorunlu alanları doldurun.' }, { status: 400 });
    }
    
    if (password.length < 6) {
       return NextResponse.json({ error: 'Şifre en az 6 karakter olmalıdır.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kayıtlı.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        role: 'USER',
      },
    });

    // Otomatik Giriş (Token Oluştur)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ 
      id: user.id, 
      email: user.email, 
      role: user.role,
      name: user.name 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 gün
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Kayıt oluşturulamadı' }, { status: 500 });
  }
}