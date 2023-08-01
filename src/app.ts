import httpStatus from 'http-status';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/moddlewares/GlobalHandler';

import routes from './app/modules/routes';
import {
  generateFacultyId,
  generateStudentId,
} from './app/modules/users/user.utils';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Aplication routes
app.use('/api/v1', routes);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});
//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger');
// });

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // next('Ore baba')
//   // throw new Error('Ore Baba error')
// })
//global error handler
app.use(globalErrorHandler);

// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };

// testId();
export default app;
