import http from 'http';
import dotenv from 'dotenv';
import handler from './handler';

dotenv.config();
const PORT = process.env.PORT || 4001;

const server = http.createServer(handler);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});

export { server };
