const UserSchema = require('../Models/userModel');
const jwt = require("jsonwebtoken");


// Controller functions
const createUser = async (req, res) => {
    try {
        const { name, email, password, address, phoneNumber } = req.body;
        const User = await UserSchema.findOne({ email });
        if (User) {
            res.status(404).send("User already exit!");
        }
        const user = new UserSchema({
            name,
            email,
            password,
            address,
            phoneNumber
        });
        await user.save()
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await UserSchema.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { name,
        email,
        password,
        address,
        phoneNumber } = req.body
    const { id } = req.params;
    try {
        const user = await UserSchema.findByIdAndUpdate(id, {
            name,
            email,
            password,
            address,
            phoneNumber
        }, { new: true });
        // if (!user) {
        //     return res.status(404).json({ error: 'User not found' });
        // }
        res.status(200).json({ message: "success", data: user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await UserSchema.findByIdAndDelete(req.params.userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // //Check if the input is empty
        // if (!email || !password) {
        //     res.status(400);
        //     throw Error("All Field must be filled!");
        // }

        const User = await UserSchema.findOne({ email });
        if (!User) {
            res.status(404).send("User is not Found!");
        }
        if (User && (await User.matchPassword(password))) {
            // generateToken(res, User);
            const token = jwt.sign({ User }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1d"
            });
            res.cookie("jwt", token);
            res.status(200).json({
                _id: User.id,
                jwt: token,
                email: User.email
            });
        } else {
            res.status(400);
            throw Error("Invalid email or password")
        }
    } catch (err) {
        next(err);
    }
};

const currentUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            // Handle case where ID is missing
            return res.status(404).json({ message: 'User ID not provided' });
        }
        const user = await UserSchema.findById(userId);
        if (!user) {
            // Handle case where user doesn't exist
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            address: user.address
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }

};


module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    logUser,
    currentUser
};
