const express=require("express");
const path=require("path");

const app=express()

// Add security headers (CSP + COEP + COOP)
app.use((req, res, next) => {
    res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    res.set('Cross-Origin-Opener-Policy', 'same-origin');
    res.set('Content-Security-Policy', 
        "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://sketchfab.com https://*.sketchfab.com;"
    );
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use("/game",express.static(path.join(__dirname, 'game')));

// Start server
app.listen(3000, ()=>{
    console.log("Sever is running")
})
