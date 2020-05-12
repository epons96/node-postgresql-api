const express = require('express');
const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:8100',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))


//routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server en el puerto 3000');