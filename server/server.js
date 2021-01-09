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
        "title": "Title 1",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "Food"
    },
    {
        "name": "User 2",
        "title": "Title 2",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "EPD"
    },
    {
        "name": "User 3",
        "title": "Title 3",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "ESD"
    },
    {
        "name": "User 4",
        "title": "Title 4",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "ISTD"
    },
    {
        "name": "User 5",
        "title": "Title 5",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "ASD"
    },
    {
        "name": "User 6",
        "title": "Title 6",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "Freshmore"
    },
    {
        "name": "User 7",
        "title": "Title 7",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "Canteen"
    },
    {
        "name": "User 8",
        "title": "Title 8",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "Canteen"
    },
    {
        "name": "User 9",
        "title": "Title 9",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "Marketplace"
    },
    {
        "name": "User 10",
        "title": "Title 10",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": "Hostel"
    }
];

let users = [
    {
        "name": "User 1",
        "password": "user1PW",
        "email": "user1@email.com"
    },
    {
        "name": "User 2",
        "password": "user2PW",
        "email": "user2@email.com"
    },
    {
        "name": "User 3",
        "password": "user3PW",
        "email": "user3@email.com"
    },
    {
        "name": "User 4",
        "password": "user4PW",
        "email": "user4@email.com"
    },
    {
        "name": "User 5",
        "password": "user5PW",
        "email": "user5@email.com"
    }
];

/*
let posts = [];
*/

app.get('/', (req, res) => {
    res.send('server is alive');
})

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
})

app.post('/posts', (req, res) => {
    const { name, title, content, tag } = req.body;
    posts.push({
        'name': name,
        'title': title,
        'content': content,
        'tag': tag
    });
    res.status(201).json({ "Message": "Successfully created new post!" });
})

app.post('/sign-up', (req, res) => {
    const { name, password, email } = req.body;
    let userExists = users.some((item) => item.name === name || item.email === email);
    if (userExists) {
        res.status(403).json({"Message": "Name / email already taken"});
    } else {
        users.push({
            'name': name,
            'password': password,
            'email': email
        });
        res.status(201).json({"Message": "Successfully created new account!"});
    }
    return;
})

app.post('/sign-in', (req, res) => {
    const { name, password } = req.body;
    let user = users.filter((item) => item.name === name && item.password === password)[0];
    if (!user) {
        res.status(404).json({ "Message": "User not found" });
    } else {
        const response = {
            "name": user.name,
            "email": user.email
        }
        res.status(200).json(response);
    }
    return;
})

/*
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "..", "build", "index.html"));
})
*/

app.listen(port, () => {
	console.log(`Server running at port ${port}`);
})