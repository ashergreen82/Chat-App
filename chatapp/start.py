import os


def start_server():
    os.system("gunicorn server.Main:app")


def start_client():
    os.system("npm start --prefix Client")


if __name__ == "__main__":
    start_client()
    start_server()
