const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixNullPublicIds() {
  try {
    console.log('Null publicId değerlerini düzeltiliyor...');
    
    // Null publicId'si olan ürünleri bul
    const productsWithNullPublicId = await prisma.product.findMany({
      where: {
        publicId: null
      }
    });

    console.log(`${productsWithNullPublicId.length} ürün null publicId'ye sahip.`);

    // Her biri için default bir publicId ata
    for (const product of productsWithNullPublicId) {
      const defaultPublicId = `default_${product.id}_${Date.now()}`;
      
      await prisma.product.update({
        where: { id: product.id },
        data: { publicId: defaultPublicId }
      });

      console.log(`Ürün ${product.name} için publicId güncellendi: ${defaultPublicId}`);
    }

    console.log('Tüm null publicId değerleri düzeltildi!');
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixNullPublicIds();
