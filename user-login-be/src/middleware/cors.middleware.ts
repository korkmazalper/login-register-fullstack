import cors from 'cors';

export function corsMiddleware() {
  return cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
  });
}
