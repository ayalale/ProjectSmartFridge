const express = require('express');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001", // כתובת הלקוח שלך
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

io.on('connection', (socket)=>{
  console.log('A user connected');

  socket.on('message', (message)=>{
    console.log('Message received:', message);
    io.emit('message', message);
  });

  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

mongoose.connect(URI)
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error.message));
