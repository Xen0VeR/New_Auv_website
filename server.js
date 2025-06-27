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

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    res.set('Cross-Origin-Opener-Policy', 'same-origin');
    res.set('Content-Security-Policy',
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://sketchfab.com https://*.sketchfab.com;"
    );
  }
}));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});