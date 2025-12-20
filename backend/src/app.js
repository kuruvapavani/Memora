import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/authRoutes.js";
import capsuleRoutes from "./routes/capsuleRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.get('/', (req, res) => {
  res.send('Memora API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/reminders',reminderRoutes);
app.use('/api/capsule',capsuleRoutes);
app.use('/api/upload',uploadRoutes);
app.use((req, res, next) => {
  res.setTimeout(10 * 60 * 1000, () => {
    console.log("Request timed out.");
    res.status(408).send("Request Timeout");
  });
  next();
});

export default app;
