const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()
let ejs = require('ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

const users = [
    { name: 'Jack', age: 35 },
    { name: 'Amaar', age: 50 },
    { name: 'Kevin', age: 25 }
]

const posts = [
    { title: 'My new phone', id: 1 },
    { title: 'My first blog', id: 2 },
    { title: 'My favorite places', id: 3 }
]

app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/', (req, res) => {
    res.send({
        message: "Hello world!",
        user: {}
    })
})

var today = new Date()
var currentDay = today.getDay()

app.get('/days', (req, res) => {
    if (currentDay == 6 || currentDay == 0) { currentDay = "Weekend" }
    else { currentDay = "Weekend" }
    res.render("signup", { day: currentDay })
})

app.get('/users/:name', (req, res) => {
    const { name } = req.params
    const user = users.find((user) => user.name === name)
    if (user) {
        res.send(user)
    } else res.status(404).send("User not found")
})

app.get('/posts', (req, res) => {
    const { title } = req.query
    if (title) {
        const post = posts.find((post) => post.title === title)
        if (post)
            res.send(post)
        else
            res.status(404).send("Post not found")
    }
    res.send(posts)
})

app.listen(3000)


//mailchimp api key
//8ecc24ac91b6cffc15e58d8828aba557-us20

//listid
//594184