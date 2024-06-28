from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        return super().end_headers()

    def translate_path(self, path):
        # Base directory to serve files from
        base_dir = os.path.dirname(__file__)
        
        # Serve index.html for the root path
        if path == '/':
            path = '/index.html'
        
        # Serve files from the game directory or root directory
        requested_file = os.path.join(base_dir, path.lstrip('/'))
        if os.path.exists(requested_file):
            return requested_file
        
        game_file_path = os.path.join(base_dir, 'game', path.lstrip('/'))
        if os.path.exists(game_file_path):
            return game_file_path
        
        # Fallback to original path
        return requested_file

httpd = HTTPServer(('localhost', 8000), CORSRequestHandler)
print("Serving on port 8000")
httpd.serve_forever()

