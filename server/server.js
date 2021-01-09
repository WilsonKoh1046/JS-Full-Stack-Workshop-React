const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Express.static(path.join(__dirname, "..", "build")));
app.use(Express.static("public"));

let posts = [
    {
        "name": "User 1",
        "content": "Content by User 1",
        "tag": "Food"
    },
    {
        "name": "User 2",
        "content": "Content by User 2",
        "tag": "EPD"
    },
    {
        "name": "User 3",
        "content": "Content by User 3",
        "tag": "ESD"
    },
    {
        "name": "User 4",
        "content": "Content by User 4",
        "tag": "ISTD"
    },
    {
        "name": "User 5",
        "content": "Content by User 5",
        "tag": "ASD"
    },
    {
        "name": "User 6",
        "content": "Content by User 6",
        "tag": "Freshmore"
    },
    {
        "name": "User 7",
        "content": "Content by User 7",
        "tag": "Canteen"
    },
    {
        "name": "User 8",
        "content": "Content by User 8",
        "tag": "Canteen"
    },
    {
        "name": "User 9",
        "content": "Content by User 9",
        "tag": "Marketplace"
    },
    {
        "name": "User 10",
        "content": "Content by User 10",
        "tag": "Hostel"
    }
];

app.get('/', (req, res) => {
    res.send('server is alive');
})

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
})

/*
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "..", "build", "index.html"));
})
*/

app.listen(port, () => {
	console.log(`Server running at port ${port}`);
})