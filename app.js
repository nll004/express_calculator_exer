const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    const objTest = {
        one: 1,
        two: 2
    }
    return res.send(objTest)
});

// app.get('/median')
// app.get('/mode')
app.get('/mean', (req, res) => {
    // let query_obj = req.query

    return res.send("Mean page")
})

app.listen('5000', () => console.log("Node app running on port 5000"))
