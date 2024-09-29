import factory from '@adonisjs/lucid/factories';
import School from '#models/school';
export const SchoolFactory = factory
    .define(School, async ({ faker }) => {
    return {
        name: faker.word.words(4),
        address: faker.word.words(4),
        phone: faker.phone.number(),
        email: faker.internet.email(),
    };
})
    .build();
//# sourceMappingURL=school_factory.js.map