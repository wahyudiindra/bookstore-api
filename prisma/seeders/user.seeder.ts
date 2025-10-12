import { Prisma } from './prisma.utils';
import { Prisma as PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export const run = async (total: number) => {
    const encryptedPass = await bcrypt.hash('password', 10);
    const data: PrismaClient.UserCreateManyInput[] = [
        { email: 'admin@bookstore.id', name: 'Admin Bookstore', role: Role.ADMIN, password: encryptedPass },
    ];

    for (let i = 0; i < total; i++) {
        const role = i % 2 == 0 ? Role.ADMIN : Role.CUSTOMER;
        const name = faker.person.fullName();
        data.push({ email: faker.internet.email({ firstName: name }), name, role, password: encryptedPass });
    }
    await Prisma.instance.user.createMany({ data, skipDuplicates: true });

    console.log('   └─ Completed: users.');
};
export default {
    run,
};
