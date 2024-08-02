import Userdb from '../model/model.js';

// Create and Save a new User
export const create = async (req, res) => {
    const { name, email, bio } = req.body;

    if (!name || !email || !bio) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const user = new Userdb({ name, email, bio });

    try {
        const data = await user.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while creating a user." });
    }
};

// Retrieve and return all users
export const find = async (req, res) => {
    try {
        const users = await Userdb.find();
        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message || "Error occurred while retrieving users." });
    }
};

// Find a single user with a userId
export const findOne = async (req, res) => {
    try {
        const user = await Userdb.findById(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found" });
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: err.message || "Error retrieving user" });
    }
};

// Update a user identified by the userId in the request
export const update = async (req, res) => {
    const { name, email, bio } = req.body;

    if (!name || !email || !bio) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    try {
        const user = await Userdb.findByIdAndUpdate(req.params.id, { name, email, bio }, { new: true });
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send({ message: err.message || "Error updating user" });
    }
};

// Delete a user with the specified userId in the request
export const deleteUser = async (req, res) => {
    try {
        const user = await Userdb.findByIdAndRemove(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message || "Could not delete user" });
    }
};
