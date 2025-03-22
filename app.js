import { Console } from "console";
import express from "express";
import fs from "fs/promises";
import { console } from "inspector";

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
    let { email, pass } = req.body;
    console.log(`Email: ${email} - Pass: ${pass}`);

    try {
        let users = JSON.parse(await fs.readFile("users.json", "utf-8"));

        let userIndex = users.findIndex(user => user.email === email);
        console.log("User Index:", userIndex);

        if (userIndex < 0) {
            users.push({ email, pass });
            await fs.writeFile("users.json", JSON.stringify(users, null, 2));
            res.status(201).json({ message: "User registered successfully", users });
        } else {
            res.status(409).json({ message: "User already exists" });
        }
        console.log({ users });
    } catch (e) {
        console.error("Error:", e);
        return res.status(500).json({ status: "Failed to create new user" });
    }
});

app.post("/login", async (req, res) => {
    let { email, pass } = req.body;
    try {
        let users = JSON.parse(await fs.readFile("users.json", "utf-8"))
        let user = user.findIndex((user) => user.email == email)
        console.log(user)
        if (user >= 0) {
            console.log("User exists")
            res.status(201).json({ email, pass });
            // res.redirect(`/home?email=${email}`);
        }
    } catch (e) {
        res.status(500).json({ "status": "Email or password incorrect!" });
        console.log(e)
    }
})

app.get("*", (req, res) => {
    res.send("NOTHING");
});

app.listen(5000, () => console.log(`Running on http://localhost:5000`));
