const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { v4 } = require('uuid');

async function hashPassword(password) {
    const salt = await bcrypt.hash(password, 10);
    return salt;
}

async function comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

function generateCode() {
    return crypto.randomUUID();
}

function generatePhotoName() {
    return `${v4()}.jpg`;
}

module.exports = { hashPassword, comparePasswords, generateCode, generatePhotoName };