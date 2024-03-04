const express = require("express");
const cors = require("cors");
//const axios = require("axios");
const app = express();
const PORT = 8000;
const router = require("./router")


var options = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(express.json());
app.use(cors(options));
app.use('/api', router);


app.listen( PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
