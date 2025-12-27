import requests, json

class StartupAPIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        # Session keeps cookies across multiple requests automatically
        self.session = requests.Session()
        self.csrf_token = None

    def login(self, email, password):
        url = f"{self.base_url}/login"
        payload = {"email": email, "password": password}
        # 1. Perform Login
        response = self.session.post(url, json=payload)
        if response.status_code == 200:
            # 2. Extract CSRF token from the cookies returned by the server
            # Flask-JWT-Extended calls this 'csrf_access_token' by default
            self.csrf_token = self.session.cookies.get("csrf_access_token")
            return response.json()
        else:
            print(f"❌ Login Failed: {response.text}")
            return None

    def state(self):
        url = f"{self.base_url}/state"
        # 3. Add the CSRF token to headers for a POST request
        headers = {
            "X-CSRF-TOKEN": self.csrf_token,
            "Content-Type": "application/json"
        }
        response = self.session.get(url,headers=headers)
        return response.json()

    def profileinfo(self):
        url = f"{self.base_url}/profile"
        # 3. Add the CSRF token to headers for a POST request
        headers = {
            "X-CSRF-TOKEN": self.csrf_token,
            "Content-Type": "application/json"
        }
        response = self.session.get(url,headers=headers)
        return response.json()
# --- USAGE ---
BASE_URL = "http://127.0.0.1:5000/api/v1"  # Or your Render URL


def main():
  client = StartupAPIClient(BASE_URL)
  user_info = client.login("pradeepholagundi@gmail.com", "Abcd@1234")
  if user_info:
    print(user_info)
    state=client.state()
    print(state)
    state=client.profileinfo()
    print(state["data"])

main()
