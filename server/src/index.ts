import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected successfully to MongoDB');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
