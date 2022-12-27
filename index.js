
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')


//middleware
app.use(express.json());

// routes
app.use('/api', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// jd11rock@gmail.com




