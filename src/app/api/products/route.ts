import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Ürünler getirilemedi' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const features = formData.get('features') as string;
    const stock = parseInt(formData.get('stock') as string);
    
    const files = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    for (const file of files) {
      if (file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}_${file.name.replaceAll(' ', '_')}`;
        
        const uploadPath = path.join(process.cwd(), 'public/uploads', filename);
        await writeFile(uploadPath, buffer);
        
        imageUrls.push(`/uploads/${filename}`);
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        images: JSON.stringify(imageUrls),
        category,
        features,
        stock,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Ürün oluşturulamadı' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Ürün silinemedi' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const features = formData.get('features') as string;
    const stock = parseInt(formData.get('stock') as string);
    
    const files = formData.getAll('images') as File[];
    let imageUrls: string[] = [];
    
    // Yeni resim varsa yükle
    if (files.length > 0 && files[0].size > 0) {
        for (const file of files) {
          if (file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = `${Date.now()}_${file.name.replaceAll(' ', '_')}`;
            
            const uploadPath = path.join(process.cwd(), 'public/uploads', filename);
            await writeFile(uploadPath, buffer);
            
            imageUrls.push(`/uploads/${filename}`);
          }
        }
    }

    const updateData: any = {
      name,
      description,
      price,
      category,
      features,
      stock,
    };

    if (imageUrls.length > 0) {
      updateData.images = JSON.stringify(imageUrls);
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id as string) },
      data: updateData,
    });

    return NextResponse.json(product);

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Ürün güncellenemedi' }, { status: 500 });
  }
}