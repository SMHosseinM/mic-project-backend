import config  from './config';
import express from 'express';
import membershipRoutes from './src/app/services/membership/routes';
import dashboardRoutes from './src/app/services/dashboard/routes';
import authRoutes from './src/app/services/authentication/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
let corsOrigins = {
    origin: ['http://localhost:5173'],
    credentials: true,
}

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOrigins));

app.use('/', authRoutes);
app.use('/membership', membershipRoutes);
app.use('/dashboard',   dashboardRoutes);

app.listen(config.port, () => {
    console.log('the app is listening on port ' + config.port);
});


