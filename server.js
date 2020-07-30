var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json({ limit: '50mb' })
var utilityFunctions = require("./utility_functions");

var data = {};

//return template editor
app.get("/", (req, resp) => {
    app.use(express.static(__dirname + "/Editor"));
    resp.sendFile(__dirname + "/Editor/index.html");
});

//return test template
app.get("/rendered", (req, resp) => {
    resp.send(data["gjs-html"] + "<style>" + data["gjs-css"] + "</style>");
});

//return saved template from mongo database
app.get("/showSaved", (req, resp) => {
    databaseData = utilityFunctions.getDatabaseData();
    databaseData.then((databaseDataResolved) => {
        // console.log(databaseDataResolved);
        let htmlRenderComp = "";
        let htmlListing = "";

        htmlComponents = JSON.parse(databaseDataResolved["gjs-components"][0]);
        // console.log(htmlComponents);
        htmlComponents.forEach((element, index) => {
            if (element) {
                if (element["attributes"]) {
                    let tagname = element["tagName"] ? element["tagName"] : "";
                    let typec = element["type"] ? element["type"] : "";
                    htmlListing = htmlListing + "<li><a href=#" + element["attributes"]["id"] + ">Element:" + index + " "
                        + tagname
                        + " "
                        + typec
                        + "</a></li>";
                }
            }

        });
        htmlListing = "<ul>Site Map<br/>" + htmlListing + "</ul>";

        htmlPortion = databaseDataResolved["gjs-html"];
        cssPortion = databaseDataResolved["gjs-css"];

        htmlRenderComp = htmlRenderComp + htmlListing + "<br/>" + htmlPortion + "<style>" + cssPortion + "</style>";
        resp.send(htmlRenderComp);
    })
        .catch((err) => {
            console.error(err);
            console.error("Error fetching data");
            resp.send("Error loading");
        });



});

//submit the template for saving in local demo variable
app.post("/submit", jsonParser, (req, resp) => {
    // console.log(req);

    data = (req.body);
    // resp.status(200);
    resp.send("");

});

// submit the template for saving to mongo database
app.post("/submitmongo", jsonParser, (req, resp) => {
    data = (req.body);
    utilityFunctions.setDatabaseData(req.body, null);
    resp.send("");
});


app.listen(process.env.PORT || 3000);