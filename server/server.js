
let users = [
    {
        name: "Sameer",
        fathername: "Ali",
        email: "sameer@gmail.com",
        password: "123"
    },

];


var PORT = process.env.PORT || 5000;
var express = require("express");
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
let fs = require('fs');


var app = express();

app.use(cors());

// jaisa ya hum nai pora ak log banya han is kae liya hum package use karay gayn jo banae howa
// wo huma nai use karna han iskae liya "Morgan package use karay gayn"
// app.use(function (req, reponse, next) {
//     console.log("Method :" + req.method);
//     console.log("URL :" + req.url);
//     console.log("Connection is :" + req.connection.remoteAddress);
//     console.log("Connection is Port :" + req.connection.remotePort);
//     next();
// });

app.use(morgan('dev'));
app.use(bodyParser.json())



// app.get('', (req, res) => {
//     res.render('index');
// })

// app.get('/signup', (req, res) => {
//     res.render('signup');
// })



// app.get('/', function (req, res) {
//     res.render('index.html');
// });


// app.get('/', (request, response, next) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     fs.readFile('./index.html', null, function (error, data) {
//         if (error) {
//             response.writeHead(404);
//             respone.write('Whoops! File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });

// });
app.get("/", (req, res, next) => {
    console.log("some one get menu");
    res.send("signup success full");
});
app.post('/signup', (req, res) => {
    let isFound = false;
    let getdata = users;
    if (getdata) {
        users = getdata;
    }
    else {
        users = [];
    }
    for (i = 0; i < users.length; i++) {
        if (users[i].email === req.body.email) {
            isFound = true;
            break;
        }
    }
    if (isFound) {
        res.send("already exit");

    }
    else {
        users.push(req.body);
        console.log(req.body);
        res.send("Sign Up Succesfuly");
    }






})

app.post('/login', (req, res) => {
    let e = req.body.email;
    let p = req.body.password;
    let isFound = false;
    for (let i = 0; i < users.length; i++) {
        if (e === users[i].email && p === users[i].password) {
            isFound = i;
            break;
        }
    }
    if (isFound === false) {
        res.send("User Not Found");
    }
    else {
        res.send({
            name: users[isFound].name,
            fname: users[isFound].fathername,
            email: users[isFound].email,

            "message": "Login Succes"
        });

    }


})




// app.post('/index', (req, res) => {
//     console.log('Got body:', req.body);
//     res.sendStatus(200);
// });

app.listen(PORT, () => {
    console.log("server is running on " + PORT);
})