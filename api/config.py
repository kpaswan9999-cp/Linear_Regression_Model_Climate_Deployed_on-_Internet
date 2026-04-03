import os
import json
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Allow CORS if needed, but since it's on the same Vercel domain as the frontend, it's fine.
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # Get the variable from Vercel's environment settings
        render_url = os.environ.get('RENDER_API_URL', 'http://127.0.0.1:5000')
        
        response = {
            "RENDER_API_URL": render_url
        }
        
        self.wfile.write(json.dumps(response).encode('utf-8'))
        return
