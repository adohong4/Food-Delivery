import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"



//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMath = await bcrypt.compare(password, user.password);

        if (!isMath) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //checking is user already exists
        const exists = await userModel.findOne({ email }); //khai báo xem tk đăng ký đã có trong db
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter  valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "please enter strong password" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //return db
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//get all list user
const listUser = async (req, res) => {
    try {
        const users = await userModel.find({})

        const filteredUsers = users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        }));

        res.json({ success: true, data: filteredUsers })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser, listUser };