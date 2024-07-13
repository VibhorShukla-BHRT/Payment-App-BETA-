const express = require("express");
const router = require("./routes/index");
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use("/api/v1",router);

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
});
