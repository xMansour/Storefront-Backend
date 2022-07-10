import express from 'express';



const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Server Working!");
})

app.listen(PORT, () => {
    console.log(`Server started at 127.0.0.1:${PORT}`);
})