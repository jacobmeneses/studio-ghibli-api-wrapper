import { PrismaClient } from '@prisma/client'
import { isDevEnv } from '../src/constants'
const prisma = new PrismaClient()
const hashedPassword = '$2a$12$OSZqHSfgnQtu.6g.Bjghy.xHwoLGTYpg.F74ZqHYmmkcBWPrEcjsO'; // 123456789

async function main() {
  await prisma.user.deleteMany({});

  const users = [
    {
      id: 1,
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
    {
      id: 2,
      email: 'films@example.com',
      password: hashedPassword,
      role: 'FILMS'
    },
    {
      id: 3,
      email: 'to-edit-2@example.com',
      password: hashedPassword,
      role: 'FILMS'
    },
    {
      id: 4,
      email: 'to-edit-3@example.com',
      password: hashedPassword,
      role: 'FILMS'
    },
    {
      id: 5,
      email: 'to-delete-1@example.com',
      password: hashedPassword,
      role: 'FILMS'
    },
    {
      id: 6,
      email: 'to-delete-2@example.com',
      password: hashedPassword,
      role: 'FILMS'
    },
    {
      id: 7,
      email: 'people@example.com',
      password: hashedPassword,
      role: 'PEOPLE'
    },
    {
      id: 8,
      email: 'locations@example.com',
      password: hashedPassword,
      role: 'LOCATIONS',
    },
    {
      id: 9,
      email: 'species@example.com',
      password: hashedPassword,
      role: 'SPECIES'
    },
    {
      id: 10,
      email: 'vehicles@example.com',
      password: hashedPassword,
      role: 'VEHICLES'
    },
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
