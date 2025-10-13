import { Prisma } from './prisma.utils';
import User from './user.seeder';
import Book from './book.seeder';

async function main() {
    console.log('\n-> START::SEEDING');

    await User.run(10);
    await Book.run(25);

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
