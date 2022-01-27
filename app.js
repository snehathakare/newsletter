const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()
let ejs = require('ejs');
const date = require(__dirname + "/date")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
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

var items = ["Make lunch", "Do the dishes", "Study"]

app.get('/', (req, res) => {
    let currentDay = date()
    res.render("signup", { day: currentDay, newItem: items })
})

app.post('/', (req, res) => {
    var item = req.body.newItem
    items.push(item)
    res.redirect("/")
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