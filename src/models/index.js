const Product = require("./Product")
const Category = require("./Category")
const Car = require("./Car")
const User = require("./User")
const Purchase = require("./Purchase")
const ProductImg = require("./Productimg")

//product -> categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//car -> userId
Car.belongsTo(User)
User.hasOne(Car)

//car -> productyId
Car.belongsTo(Product)
Product.hasMany(Car)

//purchase -> userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//purchase -> productid
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//productImg -> productId
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)