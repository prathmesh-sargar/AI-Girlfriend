import express from 'express';
import cors from 'cors';
import chatRoute from './routes/chatRoute.js'; // adjust path as needed
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;


// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend origin
  methods: ['POST'],
  credentials: true
}));

app.use(express.json())
app.use('/api', chatRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
