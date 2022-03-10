const express = require("express");
const path = require("path");
const geocode = require("../utils/geocode");
const hbs = require("hbs");
const { response } = require("express");
const app = express();

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
const port = process.env.PORT || 8080;
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.get("/", (req, res) => {
    res.render("index", {
        name: "Brg",
        title: "App",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        name: "Brg",
        title: "About",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        help: "Click this button",
        name: "Brg",
        title: "Help",
    });
});
//simple routes
// app.get('/', (req, res) => {
//     res.send('<h1>Home</h1>');
// })

app.get("/weather", (req, res) => {
    const address = req.query.location;
    console.log(address)
    if (address === undefined) {

        return res.send({ error: "location is required" });
    }
    if (address) {
        geocode.geocode(address, (error, data) => {


            if (error > 0) {

                res.send({ error: 'Unable to find location!!' })
            }
            else {
                if (data.features.length > 0) {
                    let coord = data.features[0].center;
                    geocode.weatherCast(coord[0], coord[1]);
                    res.send(data);
                }
                else {
                    res.send({ error: 'Unable to find location, Please Enter Valid Location!!' })
                }
            }
        });
    }
    else {
        res.send({ error: 'Please enter location!!' })
    }
});

app.get("/products", (req, res) => {
    if (!req.query.name) {
        return res.send({ erorr: "name is required" });
    }

    //console.log(req.query.type)
    res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
    res.render("404notfound", {
        title: "Eror:404 ",
        text: "help not found",
        name: "Brg",
    });
});

app.get("*", (req, res) => {
    res.render("404notfound", {
        title: "Error:404 ",
        name: "Brg",
        text: "Can't resolve this url",
    });
});

// serving HTML and JSON

app.listen(port, () => console.log("Serve is up on port" + port));
