const db = require("mongoose");

db.connect("mongodb://localhost:27017/vegiFresh",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    })
    .then(() => {
        console.log("connected to database");
    })
    .catch((e) => {
        console.log("Something is wrong");

    })


module.exports = db;
