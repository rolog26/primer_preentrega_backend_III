import express from 'express';
import mongoose from 'mongoose';
import mockRouter from './routes/mock.router.js';

const app = express();

app.use(express.json())
app.use('/api/mocks', mockRouter)

mongoose.connect("mongodb+srv://rodrigogigena2611:@cluster0.s1wg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB')
})
.catch(err => {
    console.error('Error connecting to MongoDB', err)
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})
