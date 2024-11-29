import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { setupSocket } from './socket';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});


const httpServer = createServer(app);


setupSocket(httpServer);


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});