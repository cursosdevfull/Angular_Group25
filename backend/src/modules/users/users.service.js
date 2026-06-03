const {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("./users.repository");

function getUsers() {
    return findAllUsers();
}

function getUser(id) {
    return findUserById(id);
}

function createUserRecord(user) {
    return createUser(user);
}

function updateUserRecord(id, user) {
    return updateUser(id, user);
}

function deleteUserRecord(id) {
    return deleteUser(id);
}

module.exports = {
    getUsers,
    getUser,
    createUserRecord,
    updateUserRecord,
    deleteUserRecord,
};