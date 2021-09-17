const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const session = require('express-session')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader("Access-Control-Allow-Methods", "*")
    res.setHeader("Access-Control-Allow-Origin", "localhost")
    res.setHeader("Access-Control-Allow-Credentials", "true")

    next();
})
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))
app.use(express.json())
app.use(express.static("public"))


let users = [
    {
        id: "" + Math.random(),
        username: "Vladimir",
        password: "Qwertyuiop",
        email: "test@test.ru",
        avatar: "https://million-wallpapers.ru/wallpapers/1/50/339646622751917/vodopad-v-tailande.jpg"
    },
    {
        id: "" + Math.random(),
        username: "Slava",
        password: "Qwertyuiop",
        email: "test2@test.ru",
        avatar: "https://www.korabli.eu/users/andrey/images/unnamed-gallery-1/full/091033jpg.jpg"
    },
]
app.post("/api/login", (req, res) => {
    const user = users.find(
        (user) =>
            req.body.email == user.email && req.body.password == user.password
    );
    if (!user) {
        res.status(401).json({
            status: "error"
        })
        return;
    }
    req.session.user = user
    res.json({
        status: "success"
    })
})

app.get("/api/profile", (req, res) => {
    if (!req.session.user) {
        res.status(401).json({
            status: "error"
        })
        return;
    }
    res.json(req.session.user)
})
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
