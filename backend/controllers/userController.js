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

// check token validity
const checkToken = async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: { id: user._id, email: user.email } });
    try {

    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
}

const createToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
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

//add Address User
const addUserAddress = async (req, res) => {
    const { userId, firstName, lastName, street, city, state, zipcode, country, phone } = req.body;

    try {
        // Tạo địa chỉ mới
        const newAddress = {
            firstname: firstName,
            lastname: lastName,
            street,
            city,
            state,
            zipcode,
            country,
            phone
        };

        // Tìm và cập nhật user với địa chỉ mới
        const user = await userModel.findByIdAndUpdate(
            userId,
            { $push: { addresses: newAddress } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Address added successfully", addresses: user.addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//get all list user address by id
const getAllUserAddresses = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, addresses: user.addresses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


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

//get user by id
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const users = await userModel.findById(userId)

        if (!users) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const filteredUsers = {
            _id: users._id,
            name: users.name,
            email: users.email,
            password: users.password
        };

        res.json({ success: true, data: filteredUsers })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//get user by name
const getUserByName = async (req, res) => {
    try {
        const userName = req.query.term || '';
        const users = await userModel.find({ name: { $regex: userName, $options: 'i' } })

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

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

//update user by id
const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.body.email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(req.body.email)) {
                return res.status(400).json({ success: false, message: "Invalid email format" });
            }
            // check email exist?
            const emailExists = await userModel.findOne({ email: req.body.email });
            if (emailExists && emailExists._id.toString() !== userId) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }
            updates.email = req.body.email;
        }
        if (req.body.password) {
            if (req.body.password.length < 8) {
                return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
            }
            // Hash new password
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(req.body.password, salt);
        }

        // update user
        const updatedUser = await userModel.findByIdAndUpdate(userId, updates, { new: true });

        res.json({ success: true, message: "User Updated", data: updatedUser });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


//delete User By Id
const deleteUserById = async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await userModel.findByIdAndDelete(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export {
    loginUser, registerUser, listUser,
    getUserById, updateUserById, getUserByName,
    deleteUserById, checkToken, addUserAddress, getAllUserAddresses
};