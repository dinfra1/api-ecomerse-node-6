const User = require("../../models/User")

const user = async()=>{

    const userCreate={

            firstName: "EDINSON",
            lastName: "RAMIREZ",
            email: "edinsonramirez94@gmail.com",
            password: "Cls.3196",
            phone: "3245731320"
        
    }

    await User.create(userCreate)
}

module.exports = user