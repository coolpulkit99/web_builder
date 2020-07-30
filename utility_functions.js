var mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 

const Schema = mongoose.Schema;
const htmlSchema = new Schema({
    "gjs-assets": [Object],
    "gjs-components": [Object],
    "gjs-css": String,
    "gjs-html": String,
    "gjs-styles": [Object]

});
var htmlData = mongoose.model("HTMLData", htmlSchema);


module.exports = {
    setDatabaseData: function (dataObj, callback) {
        htmlData.deleteMany({},()=>{});
        console.log("saving data");
        var page = new htmlData(dataObj);
        page.save(function (err, data) {
            if (err)
                return console.error(err);

            console.log("saved data");

            // callback(null, data);
        });

    },
    getDatabaseData:async function () {
       
        console.log("retreiving data");
        let result={};
        // htmlData.findOne({}, function (err, data) {
        //     if (err) 
        //         return console.log(err);
        //         console.log(data);
        //         result=data;
        //     // done(null, data);
        // });
        result=await htmlData.findOne({}).exec();
        return result;
    },

    foo: function () {
        // whatever
    },
    bar: function () {
        // whatever
    }
};