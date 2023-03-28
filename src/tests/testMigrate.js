const sequelize = require('../utils/connection');
require("../models/Category")
require("../models/Product")
require("../models/Productimg")
require("../models/Purchase")
require("../models")

const User = require("../models/User")
const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "test",
            lastName:"User",
            email:"test@gmail.com",
            password:"test123",
            phone:"12334"

        })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();