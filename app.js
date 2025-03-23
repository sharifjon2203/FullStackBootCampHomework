// import { Console } from "console";
import express from "express";
import cors from "cors"
import { method } from "./libs/lib.js";
// import { console } from "inspector";

const app = express();
app.use(cors())
app.use(express.json());
let apiVer = "/api/v1";


app.post(`${apiVer}/register`, method.register);

app.post(`${apiVer}/login`, method.login)

app.get("*", (req, res) => {
    res.send("NOTHING");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(5000, () => console.log(`Running on http://localhost:5000`));
