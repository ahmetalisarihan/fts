// import express, { Request, Response } from 'express';
// import next from 'next';

// const port: number = parseInt(process.env.PORT as string, 10) || 3000;
// const dev: boolean = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   // Özel sunucu rotalarınız burada tanımlanabilir
//   server.get('/a', (req: Request, res: Response) => app.render(req, res, '/a'));

//   // Tüm diğer HTTP isteklerini handle eder
//   server.get('*', (req: Request, res: Response) => {
//     return handle(req, res);
//   });

//   server.listen(port, (err?: any) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });