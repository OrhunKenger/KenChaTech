const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'orhunkenger1929@gmail.com';
  const password = 'Orhun123.';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Orhun Kenger'
    },
    create: {
      email: email,
      password: hashedPassword,
      name: 'Orhun Kenger',
      role: 'ADMIN',
    },
  });

  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
