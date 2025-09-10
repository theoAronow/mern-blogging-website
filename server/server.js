import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

const server = express();
let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

server.post("/sign-up", (req, res) => {
    let { fullname, email, password } = req.body;

    //validating the data from frontend
    if (fullname.length < 3){
        return res.status(403).json({ "error": "Fullname msut be at least 3 letters long"})

    }
    if (!email.length){
        return res.status(403).json({ "error": "Email is required"})
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({ "error": "Email is not valid"})
    }
    if (!passwordRegex.test(password)){
        return res.status(403).json({ "error": "Password is not valid"})
    }
    if (password.length < 6){
        return res.status(403).json({ "error": "Password must be at least 6 characters long"})
    }

    return res.status(200).json({ "status": "User signed up successfully" })
})

server.listen(PORT, () => {
    console.log('listening on port => ', PORT);
})
