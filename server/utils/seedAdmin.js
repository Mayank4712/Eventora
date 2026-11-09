const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdmin = async () => {
    const email = "admin@eventora.com";
    const existing = await User.findOne({ email });
    if (existing) {
        return;
    }

    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.create({
        name: "Admin",
        email,
        password: hashedPassword,
        role: "admin",
        isVerified: true,
    });
    console.log("Admin user ready: admin@eventora.com");
};

module.exports = seedAdmin;
