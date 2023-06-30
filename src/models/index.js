const Product = require("./Product")
const Category = require("./Category")
const Car = require("./Car")
const User = require("./User")

Product.belongsTo(Category)
Category.hasMany(Product)

Car.belongsTo(User)
User.hasOne(Car)

Car.belongsTo(Product)
Product.hasMany(Car)