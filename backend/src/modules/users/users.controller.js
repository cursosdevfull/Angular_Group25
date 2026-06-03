const {
    getUsers,
    getUser,
    createUserRecord,
    updateUserRecord,
    deleteUserRecord,
} = require("./users.service");

function parseId(rawId) {
    const id = Number.parseInt(rawId, 10);

    return Number.isInteger(id) && id > 0 ? id : null;
}

function isDuplicateEntry(error) {
    return error && error.code === "ER_DUP_ENTRY";
}

async function listUsersController(_req, res) {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getUserController(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const user = await getUser(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function createUserController(req, res) {
    try {
        const { email, password, name } = req.body || {};

        if (!email || !password || !name) {
            return res.status(400).json({ message: "email, password and name are required" });
        }

        const user = await createUserRecord({ email, password, name });
        return res.status(201).json(user);
    } catch (error) {
        if (isDuplicateEntry(error)) {
            return res.status(409).json({ message: "User email already exists" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateUserController(req, res) {
    try {
        const id = parseId(req.params.id);
        const { email, password, name } = req.body || {};

        if (!id) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        if (!email || !password || !name) {
            return res.status(400).json({ message: "email, password and name are required" });
        }

        const user = await updateUserRecord(id, { email, password, name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        if (isDuplicateEntry(error)) {
            return res.status(409).json({ message: "User email already exists" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteUserController(req, res) {
    try {
        const id = parseId(req.params.id);

        if (!id) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const deleted = await deleteUserRecord(id);

        if (!deleted) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    listUsersController,
    getUserController,
    createUserController,
    updateUserController,
    deleteUserController,
};