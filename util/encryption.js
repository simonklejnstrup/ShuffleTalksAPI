const bcrypt = require("bcrypt");

const saltRounds = 12;

module.exports = async function encrypt(password) {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
};







