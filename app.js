require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')
const validateTokenMiddleware = require('./middleware/authentication')

//security packages
const helmet = require('helmet')
const cors= require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')



// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// extra security packages
app.set('trust proxy', 1) //since we use proxies

app.use(rateLimiter(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  }
))
app.use(helmet())
app.use(cors())
app.use(xss())



// routes
app.get('/', (req, res) => {
  res.send('Welcome to Job API application!!!!!');
});

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',validateTokenMiddleware, jobRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //CONNECT TO THE DATABASE
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to the database')
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();