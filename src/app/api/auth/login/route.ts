import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(req: Request) {
  try {
    const { email: rawEmail, password } = await req.json();
    
    // Email normalizasyonu
    const email = rawEmail?.trim().toLowerCase();
    
    console.log(`Login attempt for: ${email}`); // Debug log

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log(`User not found: ${email}`);
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Hatalı şifre' }, { status: 401 });
    }

    // JWT Oluştur
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

    // Cookie ayarla
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
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Giriş yapılamadı' }, { status: 500 });
  }
}
