import { PrismaClient } from '@prisma/client';
import { articleSeed } from './article';
import { userSeed } from './user';

const prisma = new PrismaClient();

async function main() {
  await userSeed(prisma);
  await articleSeed(prisma);
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma Client at the end
    await prisma.$disconnect();
  });
