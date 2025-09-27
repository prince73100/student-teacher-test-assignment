import express from 'express';
// import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router/index.js'; 
import connectDB from './config/dbConfig.js';
import cookieParser from "cookie-parser";
// Load environment variables
dotenv.config();

const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );                
app.use(express.json());     
  app.use(express.urlencoded({ extended: true }));
 app.use(cookieParser());
// Routes
  connectDB();
  app.use('/api', router);

// app.get('/', (req, res) => {
//   res.send('Server is running ✅');
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something broke!' });
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
