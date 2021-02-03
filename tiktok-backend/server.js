import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';

import Videos from './dbModel.js';

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection = 'mongodb+srv://admin:QIDOWHYWG8fsmhQx@cluster0.7oipi.mongodb.net/tiktokdb?retryWrites=true&w=majority';

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

// API Endpoints
app.get('/', (req, res) => res.status(200).send('HELLO WORLD'));

app.get('/v2/posts', (req, res) => {
    
    Videos.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body;

    Videos.create(dbVideos, (err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

// Listener
app.listen(port, () => console.log(`listening localhost ${port}`));
