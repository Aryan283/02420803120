const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;

app.use(express.json());

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODkyNDkyNDMsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiNjcxYTkyM2UtNDhmOC00NmE0LWE0NmItZjkyM2E4ZmMyNWViIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMDMwMzEwNTAzOCJ9.Za8dfKKoLHP_pKEJNRZcJ847YyLMzgx1CO0GL1dpVVo'; 

let data = {
    "companyName": "Train Central",
    "ownerName": "Aryan Sharma",
    "ownerEmail": "aryan283bh@gmail.com",
    "rollNo": "02420803120",
    "accessCode": "sAzlpA"
}

let authData = {
    "companyName": "Train Central",
    "clientID": "e03ffec2-aa35-4a59-b456-65914ed947ef",
    "ownerName": "Aryan Sharma",
    "ownerEmail": "aryan283bh@gmail.com",
    "rollNo": "02420803120",
    "clientSecret": "qdNVEeTEgaLUDpuP"
}

let response = [];

app.post('/register', (req,res)=>{
    fetch('http://20.244.56.144/train/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
});


app.post('/login', (req,res)=>{
    fetch('http://20.244.56.144/train/auth', {
        method: 'POST',
        body: JSON.stringify(authData),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
});

app.get('/trains', async (req, res) => {
    fetch('http://20.244.56.144/train/trains', {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(json => {
            response.push(json);
            (response[0]).sort((a,b)=>{
                return (a.price.sleeper - b.price.sleeper && b.departureTime.Hours - a.departureTime.Hours);
            })
            console.log(response[0]);
        })
});


app.get('/trains/2344', async (req, res) => {
    fetch('http://20.244.56.144/train/trains/2344', {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});