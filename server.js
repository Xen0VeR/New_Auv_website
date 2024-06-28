const express=require("express");
const path=require("path");

const app=express()
app.use((req, res, next) => {
    res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    res.set('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use("/game",express.static(path.join(__dirname, 'game')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'game', 'game.html'));
// });

app.listen(3000, ()=>{
    console.log("Sever is running")
})
