import { Prisma } from './prisma.utils';
import user from './user.seeder';

async function main() {
    console.log('\n-> START::SEEDING');

    await user.run(10);

    console.log('-> FINISH::SEEDING\n');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await Prisma.instance.$disconnect();
    });
