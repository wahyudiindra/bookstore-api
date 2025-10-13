import { Prisma } from './prisma.utils';
import { Prisma as PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const run = async (total: number) => {
    const data: PrismaClient.BookCreateManyInput[] = [];

    for (let i = 0; i < total; i++) {
        data.push({
            title: faker.lorem.words({ min: 2, max: 5 }),
            author: faker.person.fullName(),
            description: faker.lorem.paragraph(),
            price: Number(faker.commerce.price({ min: 10, max: 200, dec: 2 })),
            stock: faker.number.int({ min: 0, max: 100 }),
            isActive: faker.datatype.boolean(),
        });
    }
    await Prisma.instance.book.createMany({ data, skipDuplicates: true });

    console.log('   └─ Completed: books.');
};
export default {
    run,
};
