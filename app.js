const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()
let ejs = require('ejs');
const date = require(__dirname + "/date")
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true });

//schema
const itemsSchema = {
    name: String
};
//model based on schema
const Item = mongoose.model('Item', itemsSchema);

//creating documents based on model
// const item1 = new Item({
//     name: "Complete the course"
// })
// const item2 = new Item({
//     name: "Write an article on NodeJs"
// })
// const item3 = new Item({
//     name: "Study DSA alogrithms"
// })

// const defaultItems = [item1, item2, item3]

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

app.get('/', (req, res) => {

    let currentDay = date.getDate()
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (error) {
                console.log(error)
            });
            res.redirect('/')
        }
        else {
            res.render("signup", { day: currentDay, newItem: foundItems })
        }
    })
})

app.post('/', (req, res) => {
    var itemName = req.body.newItem
    const item = new Item({
        name: itemName
    })
    item.save()
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox

    Item.findByIdAndRemove(checkedItemId, function (err) {
        if (!err) {
            console.log("Item deleted successfully")
            res.redirect("/")
        }

    })
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

