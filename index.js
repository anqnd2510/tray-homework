const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const httpStatus = require('http-status');
const database = require("./backend/configs/database");
const ApiError = require('./backend/utils/ApiError');
const {
    swaggerUi,
    swaggerDocs
} = require('./backend/docs/swagger');

require("dotenv").config();

const routesApiVer1 = require("./backend/v1/routes/index.route");

const app = express();
const port = process.env.PORT;

database.connect();

// enable cors
app.use(cors());
app.options('*', cors());

// app middlewares
app.use(morgan('tiny'));

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// cookie-parser
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());
app.use(express.json());

//Routes Version 1
routesApiVer1(app);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});