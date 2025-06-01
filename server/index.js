import express from 'express';
import cors from 'cors';
import chatRoute from './routes/chatRoute.js'; // adjust path as needed
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;


// Enable CORS
app.use(cors({
  origin: 'https://ai-girlfriend-eta.vercel.app', // Replace with your frontend origin
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// app.options('*', cors());


app.use(express.json())
app.use('/api', chatRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
