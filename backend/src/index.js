import express, { json, urlencoded } from "express";
import dbConnect from "./configs/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import eventRoutes from './routes/eventRoutes.js'
import walletRoutes from "./routes/walletRoutes.js";
import exploreRoutes from './routes/exploreRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import searchbarRoutes from './routes/searchbarRoutes.js';
import avaiabilityRoutes from './routes/availabilityRoutes.js';
import disputeRoutes from './routes/disputeRoutes.js';
import speakerProfileRoutes from './routes/speakerProfileRoutes.js';
import Message from './models/message.js';
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./configs/passportConfig.js";
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';

import dotenv from "dotenv";
dotenv.config();

dbConnect();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send_message', async (data) => {
    const { sender, receiver, content } = data;

    const message = new Message({ sender, receiver, content });
    await message.save();

    io.to(receiver).emit('receive_message', message);
  });

  socket.on('join', (userId) => {
    socket.join(userId); // Join user-specific room
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(json({ limit: "32mb" }));
app.use(urlencoded({ limit: "32mb", extended: "true" }));
// app.use(session({
//     secret: process.env.SESSION_SECRET || "sessSecret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false, // Set to true if using HTTPS
//         httpOnly: true,
//         sameSite: 'lax', // Adjust as needed
//         maxAge: 24 * 60 * 60 * 1000,
//     },
// }));

app.use(session({
  secret: process.env.SESSION_SECRET || "sessSecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true for HTTPS
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('uploads'));

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/wallet", walletRoutes);
app.use('/api/explore', exploreRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/search", searchbarRoutes);
app.use("/api/availability", avaiabilityRoutes);
app.use("/api/disputes", disputeRoutes);
app.use("/api/speaker-profile", speakerProfileRoutes);

app.get('/', (req, res) => {
    res.send("VVS Website")
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server Is Running On Port : ${PORT}`);
});