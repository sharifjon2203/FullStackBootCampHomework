import fs from "fs/promises";
import { getUserData } from "../entities/getUserData.js";

export const method = {
    register: async (req, res) => {
        // let { email, pass } = req.body;
        let userData = getUserData(req.body)

        try {
            let users = JSON.parse(await fs.readFile("users.json", "utf-8"));
            let userIndex = users.findIndex(user => user.email === userData.email);

            if (userIndex < 0) {
                users.push(userData);
                await fs.writeFile("users.json", JSON.stringify(users, null, 2));
                res.status(201).json({ message: "success", user: userData });
            } else {
                res.status(409).json({ message: "User already exists" });
            }
            // console.log({ users });
        } catch (e) {
            console.error("Error:", e);
            return res.status(500).json({ status: "Failed to create new user" });
        }
    },
    login: async (req, res) => {
        let userData = getUserData(req.body)
        try {
            let users = JSON.parse(await fs.readFile("users.json", "utf-8"))
            let user = users.findIndex(user => user.email == userData.email)

            if (user >= 0 && users[user].pass == userData.pass) {
                // console.log("User exists")
                res.status(200).json({ "status": "loggedIn", message: "Logging in... ", "user": userData });
            } else {
                res.status(401).json({ "status": "notFound", "message": "Email or password incorrect!" });
            }
        } catch (e) {
            res.status(500).json({ "status": "error", "message": "Something went wrong!" });
            console.log(e)
        }
    }
}