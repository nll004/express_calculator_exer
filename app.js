const express = require('express');
const MyValError = require('./errors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function convertToNumArrayAndSort(numString){
    let numArray = numString.split(",").map(Number)
    numArray.sort((a, b) => a - b);

    for(let num of numArray){
        if(Number.isNaN(num))
            throw new MyValError('Please check that your query uses this format "?nums=1,2,3,4,5,6"', 400)
    }
    return numArray
}

function medianOfNumArray(numArray){
    let lowMidPoint = Math.floor(numArray.length/2);
    let median;

    if (numArray.length % 2 === 0){
        let upperMidPoint = lowMidPoint + 1;
        median = (numArray[lowMidPoint] + numArray[upperMidPoint] / 2).toFixed(2)
    }
    else {
        median = numArray[lowMidPoint]
    }
    return median
}

function modeOfNumArray(numArray){
    const numObj = {};
    let highestVal = 0;
    let mode = null;

    numArray.forEach((num) => {
        if (!numObj[num]){
            numObj[num] = 1
        }
        else{
            numObj[num] += 1
        }
    })
    for (let key in numObj){
        let val = numObj[key]
        if (val > highestVal){
            highestVal = val
        }
    }
    mode = Object.keys(numObj).find(key => numObj[key] === highestVal);

    return parseInt(mode)
}

function meanOfNumArray(numArray){
    let sum = 0;
    for (let i = 0; i < numArray.length; i++){
        sum = sum + numArray[i];
    }
    let mean = (sum/numArray.length).toFixed(2)

    return mean
}

// --------------------------------------
// -------------  Routes ----------------
// --------------------------------------
app.get('/median', (req, res) => {
    let queryObj = req.query
    if (!queryObj.nums) {
        return res.json('Please check that your query includes numbers using this format "?nums=1,2,3,4,5,6"')
    }
    let numArray;
    try {
        numArray = convertToNumArrayAndSort(queryObj.nums)
    }
    catch (err) {
        return res.json(`Error Occurred! Status ${err.status}, ${err.message}`)
    }
    const median = medianOfNumArray(numArray)
    let response = {operation: "median", value: median}

    return res.json(response)
});


app.get('/mode', (req, res) => {
    let queryObj = req.query
    if (!queryObj.nums) {
        return res.json('Please check that your query includes numbers using this format "?nums=1,2,3,4,5,6"')
    }
    let numArray;
    try {
        numArray = convertToNumArrayAndSort(queryObj.nums)
    }
    catch (err) {
        return res.json(`Error Occurred! Status ${err.status}, ${err.message}`)
    }
    const mode = modeOfNumArray(numArray)
    let response = {operation: "mode", value: mode}

    return res.json(response)
})

app.get('/mean', (req, res) => {
    let queryObj = req.query
    if (!queryObj.nums) {
        return res.json('Please check that your query includes numbers using this format "?nums=1,2,3,4,5,6"')
    }
    let numArray;
    try {
        numArray = convertToNumArrayAndSort(queryObj.nums)
    }
    catch (err) {
        return res.json(`Error Occurred! Status ${err.status}, ${err.message}`)
    }
    const mean = meanOfNumArray(numArray)
    let response = {operation: "mean", value: mean}

    return res.json(response)
})

app.get('/all', (req, res) =>{
    let queryObj = req.query
    if (!queryObj.nums) {
        return res.json('Please check that your query includes numbers using this format "?nums=1,2,3,4,5,6"')
    }
    let numArray;
    try {
        numArray = convertToNumArrayAndSort(queryObj.nums)
    }
    catch (err) {
        return res.json(`Error Occurred! Status ${err.status}, ${err.message}`)
    }
    const mean = meanOfNumArray(numArray)
    const mode = modeOfNumArray(numArray)
    const median = medianOfNumArray(numArray)
    let response = {operation: "all", "mean": mean, "mode": mode, "median": median}

    return res.json(response)
})

app.listen('5000', () => console.log("Node app running on port 5000"))
