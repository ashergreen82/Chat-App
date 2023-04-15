import os


def setup_server():
    os.system("pip install -r ./server/requirements.txt")


def setup_client():
    os.system("npm install --prefix client")
    os.system("npm run build --prefix client")


if __name__ == "__main__":
    setup_server()
    setup_client()
