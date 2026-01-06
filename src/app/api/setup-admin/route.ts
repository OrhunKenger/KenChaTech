import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const targetEmail = 'orhunkenger1929@gmail.com';

    const user = await prisma.user.update({
      where: { email: targetEmail },
      data: { role: 'ADMIN' }
    });

    return NextResponse.json({ 
      success: true, 
      message: `${targetEmail} kullanıcısı başarıyla ADMIN yapıldı. Şimdi panele girebilirsin.`,
      user
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: `Kullanıcı bulunamadı. Önce ${'orhunkenger1929@gmail.com'} adresiyle kayıt olmalısın.`,
      details: error.message
    }, { status: 500 });
  }
}
