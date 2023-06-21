const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

//accept json from post call
app.use(express.json())



const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

//create users
app.post('/users', async (req, res) => {
    const password = req.body.password
    const hashedpassword = await bcrypt.hash(password,10)
    const user = { name: req.body.name, password:hashedpassword };
    users.push(user)
    res.send('User added')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})