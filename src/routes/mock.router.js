import { Router } from 'express';
import { generateUser, generatePet } from '../utils.js'
import Pet from '../models/pet.model.js'
import User from '../models/user.model.js'
import { faker } from '@faker-js/faker';

const mockRouter = Router()

mockRouter.get('/mockingusers', async (req, res) => {
    const amount = parseInt(req.query.amount) || 50
    const users = []
    for(let i = 0; i < amount; i++){
        users.push(await generateUser())
    }
    res.send({ message: `Se generaron ${amount} usuarios correctamente`, payload: users })
})

mockRouter.get('/mockingpets',  (req, res) => {
    const amount = parseInt(req.query.amount) || 50
    const pets = []
    for(let i = 0; i < amount; i++){
        pets.push( generatePet())
    }
    res.send({ message: `Se generaron ${amount} mascotas correctamente`, payload: pets })
})

mockRouter.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body

        const numUsers = parseInt(users) || 0
        const numPets = parseInt(pets) || 0
        if (numUsers < 0 || numPets < 0) {
            return res.status(400).json({ error: 'Los valores deben ser positivos' })
        }

        const petArray = []
        for (let i = 0; i < numPets; i++) {
            petArray.push(generatePet())
        }
        const insertedPets = await Pet.insertMany(petArray)

        const userArray = []
        for (let i = 0; i < numUsers; i++) {
            const randomPets = faker.helpers.arrayElements(insertedPets, faker.number.int({ min: 1, max: 3 }))
            const user = await generateUser()
            user.pets = randomPets.map(pet => pet._id)
            userArray.push(user)
        }
        const insertedUsers = await User.insertMany(userArray)
        res.json({ message: 'Datos generados correctamente', users: insertedUsers.length, pets: insertedPets.length })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al generar los datos' })
    }
})

export default mockRouter