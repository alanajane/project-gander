const bcrypt = require("bcrypt")

const hashedString = bcrypt.hashSync('yourStringHere', bcrypt.genSaltSync(10))