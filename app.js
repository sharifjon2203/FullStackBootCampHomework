// import { Console } from "console";
import express from "express";
import fs from "fs/promises";
import cors from "cors"
// import { console } from "inspector";

const app = express();
app.use(cors())
app.use(express.json());
let apiVer = "/api/v1";
app.post(`${apiVer}/register`, async (req, res) => {
    let { email, pass } = req.body;

    try {
        let users = JSON.parse(await fs.readFile("users.json", "utf-8"));
        let userIndex = users.findIndex(user => user.email === email);

        if (userIndex < 0) {
            users.push({ email, pass });
            await fs.writeFile("users.json", JSON.stringify(users, null, 2));
            res.status(201).json({ message: "success", user: { email, pass } });
        } else {
            res.status(409).json({ message: "User already exists" });
        }
        console.log({ users });
    } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({ status: "Failed to create new user" });
    }
});

app.post(`${apiVer}/login`, async (req, res) => {
    let { email, pass } = req.body;
    try {
        let users = JSON.parse(await fs.readFile("users.json", "utf-8"))
        let user = users.findIndex(user => user.email == email)

        if (user >= 0 && users[user].pass == pass) {
            // console.log("User exists")
            res.status(200).json({ "status": "loggedIn", message: "Logging in... ", "user": { email, pass } });
        } else {
            res.status(401).json({ "status": "notFound", "message": "Email or password incorrect!" });
        }
    } catch (e) {
        res.status(500).json({ "status": "error", "message": "Something went wrong!" });
        console.log(e)
    }
})

app.get("*", (req, res) => {
    res.send("NOTHING");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(5000, () => console.log(`Running on http://localhost:5000`));
