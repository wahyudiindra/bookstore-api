import { TransformFnParams } from 'class-transformer';
import { isNotEmptyObject } from 'class-validator';
import { FindManyDto } from 'src/common/base-repository/dto/find-many.dto';

export type PaginationResponseType = {
    data?: Array<any>;
    total?: number;
};

export const JOINER = '|';

export class PaginationUtils {
    public static transform({ search, searchBy, ...query }: FindManyDto) {
        return {
            take: query.take,
            skip: (query.page - 1) * query.take,
            orderBy: {
                [query.orderBy]: query.sortBy,
            },
            ...(isNotEmptyObject(query.select) && { select: query.select }),
            ...(isNotEmptyObject(query.include) && { include: query.include }),
            where: {
                ...query?.filter,
                ...(search && searchBy?.length && { OR: PaginationUtils.searchQueryHandler(search, searchBy) }),
            },
        };
    }

    static constructArray({ value }: TransformFnParams) {
        return value ? value.split(JOINER) : [];
    }

    public static searchQueryHandler(search: string, fields: Array<string> = []): Array<any> {
        return [...fields.map((value) => ({ [`${value}`]: { contains: search, mode: 'insensitive' } }))];
    }

    public static searchQueryFullNameHandler(search: string): Array<any> {
        if (!search) return [];

        const nameParts = search.split(' ');
        const responseArray: any[] = [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
        ];

        for (let i = 0; i < nameParts.length; i++) {
            responseArray.push({
                firstName: { equals: nameParts.slice(0, i + 1).join(' '), mode: 'insensitive' },
                lastName: { startsWith: nameParts.slice(i + 1).join(' '), mode: 'insensitive' },
            });
        }

        return responseArray;
    }
}
