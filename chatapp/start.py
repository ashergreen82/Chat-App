import os


def start_server():
    os.system("./server/Scripts/gunicorn server.Main:app")


def start_client():
    os.system("npm start --prefix client")


if __name__ == "__main__":
    # start_client()
    start_server()
