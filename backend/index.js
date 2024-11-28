
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");

const cors = require('cors');  
const usersFilePath = path.join(__dirname + "users.json")

const app = express();
const port = 3000;

app.use(cors());  
app.use(bodyParser.json());

let users = require("./users.json");
const { log } = require('console');

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (user && user.password === password) {
    return res.json({ message: 'Login successful', user: { email: user.email, email: user.email } });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});


app.post('/users', (req, res) => {
  const user = req.body;
  user.id = Date.now().toString()
  users.push(user);

  fs.writeFile(usersFilePath, JSON.stringify(users), "utf8");
  res.json({message: "user added successfully"})
});

app.put('/users', (req, res) => {
  let user = req.body;
  console.log(req.body);
  users = users.map(item => {
    if (item.id == user.id) {
      return user;
    }
    return item;
  });
  console.log(users);
  

  fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ message: 'Failed to update user' }); 
    }
    res.json({ message: 'User updated successfully' });
  });
});


app.get('/users', (req, res) => {
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    return res.json(usersWithoutPassword);
});
  
app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find(user => user.id === id); 

    if (user) {
        const { password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
