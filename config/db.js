const mongoose = require("mongoose");

const DB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB);
        console.log(`Database connected ${connect.connection.host}:${connect.connection.name}`);
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    };
};

module.exports = DB;