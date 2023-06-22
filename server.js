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



//call to check password
app.post('/users/login', async(req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user === null) {
        return res.status(400).send('No user found')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch (err) {
        return res.status(500).send()
    }
})


app.listen(3000, () => {
    console.log('Server running on port 3000')
})