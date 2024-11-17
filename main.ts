import config  from './config';
import express from 'express';
import membershipRoutes from './src/app/services/membership/routes';
import cors from 'cors';

const app = express();
let corsOrigins = {
    origin: ['http://localhost:5173']
}

app.use(express.json());
app.use(cors(corsOrigins))
app.use('/membership', membershipRoutes);

app.listen(config.port, () => {
    console.log('the app is listening on port ' + config.port);
});


