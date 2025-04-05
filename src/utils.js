import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateUser = async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('coder123', salt);
    return {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: hash,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
    }
}

export const generatePet = () => {
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        age: faker.number.int({ min: 1, max: 20 }),
        type: faker.helpers.arrayElement(['cat', 'dog']),
    }
}