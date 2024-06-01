import { PrismaClient } from '@prisma/client'
import { isDevEnv } from '../src/constants'
const prisma = new PrismaClient()
const hashedPassword = '$2a$12$OSZqHSfgnQtu.6g.Bjghy.xHwoLGTYpg.F74ZqHYmmkcBWPrEcjsO'; // 123456789

async function main() {
  await prisma.user.deleteMany({});

  const users = [
    {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
    {
      email: 'films@example.com',
      password: hashedPassword,
      role: 'FILMS'
    }
  ];

  await prisma.user.createMany({
    data: users
  });
}

if ( !isDevEnv ) {
  process.exit(1);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
