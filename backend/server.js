const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname,"feedbacks.json");

//Start express app
const app = express();
const PORT = 3000;

//Middleware
app.use(cors());
app.use(bodyParser.json())

//Function tp read feedbacks from file 
function readFeedbacks(){
    if(!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

//Function to write feedbacks to file 
function writeFeedbacks(data){
    fs.writeFileSync(filePath,JSON.stringify(data,null,2));
}

const feedbacks = readFeedbacks();

//Routes 

//POST new feedback 
app.post("/feedback",(req,res)=>{
    const feedbacks = readFeedbacks();
    const {username,message} = req.body;
    feedbacks.push({username,message});
    writeFeedbacks(feedbacks);
    res.status(201).json({message:"Feedback added"});
});

//GET all feedback 
app.get('/feedback',(req,res)=>{
    const feedbacks = readFeedbacks();
    res.json(feedbacks);
}); 

//DELETE feedback by index 
app.delete('/feedback/:id', (req, res) => {
    const index = parseInt(req.params.id);
    const feedbacks = readFeedbacks();
    if (index >= 0 && index < feedbacks.length) {
        feedbacks.splice(index, 1);
        writeFeedbacks(feedbacks);
        res.status(200).json({ message: 'Deleted' });
    } else {
        return res.status(404).json({ message: 'Not found' });
    }
});

//Start Server
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})
