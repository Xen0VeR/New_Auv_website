const express = require("express");
const path = require("path");

const app = express();

// app.use((req, res, next) => {
//   res.set('Cross-Origin-Embedder-Policy', 'require-corp');
//   res.set('Cross-Origin-Opener-Policy', 'same-origin');
//   res.set('Content-Security-Policy',
//     "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://sketchfab.com https://*.sketchfab.com;"
//   );

//   res.on('finish', () => {
//     console.log('Headers for:', req.url);
//     console.log(res.getHeaders());
//   });

//   next();
// });

app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path, stat) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set('Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://static.sketchfab.com https://sketchfab.com https://cdnjs.cloudflare.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://use.fontawesome.com; " +
        "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; " +
        "frame-src https://sketchfab.com https://*.sketchfab.com https://www.youtube.com https://www.youtube-nocookie.com; " +
        "connect-src 'self' https://www.auv-iitb.org https://sketchfab.com https://*.sketchfab.com; " +
        "img-src 'self' https://sketchfab.com https://*.sketchfab.com data:;"
      );
      // res.set('Cross-Origin-Embedder-Policy', 'require-corp');
      // res.set('Cross-Origin-Opener-Policy', 'same-origin');
    },
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
