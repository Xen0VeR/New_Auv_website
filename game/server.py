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
            path = '/game_runner.html'
        
        # Resolve the requested file path
        requested_file = os.path.join(base_dir, path.lstrip('/'))
        
        # Check if the requested file exists in the base directory
        if os.path.exists(requested_file):
            return requested_file
        
        # If not found, check the game directory
        game_file_path = os.path.join(base_dir, 'game', path.lstrip('/'))
        if os.path.exists(game_file_path):
            return game_file_path
        
        # Fallback to the original requested path
        return super().translate_path(path)

httpd = HTTPServer(('localhost', 8000), CORSRequestHandler)
print("Serving on port 8000")
httpd.serve_forever()


