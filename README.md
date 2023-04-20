# **Super Simple Chat APP**

*A basic group chat app written in Javascript, HTML, CSS, and Python, using PostgreSQL database*

You can run the program from [here](https://chatapp-fdyf.onrender.com).
<br /><br />

![screenshot](login_screenshot.png)
![screenshot](Screenshot3.png)

## **Summary**

My very first large scale project!!!!  I created this app as an educational project to learn PostgreSQL, web sockets and JSON Tokens, while at the same time expanding my Python knowledge with Flask, and my Javascript knowledge with ReactJS, and Bootstrap 5.

This project has taught me the development fundamentals in building a large scale project.  I started off with creating what I wanted it to look like and listing the features it will have.  I then started with the simple features first, and then built out the UI.  I created a dummy list of users and messages to test the UI.  Then came the server portion.  I used Flask, because, well, I love Python and I also want to be able to practice programming in different languages and get the languages to work together complimenting each other.  I then managed to get the two talking to each other, and instead of the front end handling the registering and user logins as well as messages I now have the server doing it.  Then after the server was successfully handling calls from the UI, then came the juicy part, learning PostgreSQL.  I then created a simple database with two tables, one for users and one for messages and cross referenced the users to the messages.

I also learned what is important and what isn’t.  For example, when working with the messages, the message ID failed to update properly.  I didn’t bother wasting time to fix this because I knew that the database I was going to setup would handle the unique message IDs when it came time to setup the database.  Not to mention that the database did an excellent job of handling the message IDs.  Knowing where, what, and when to focus my attention on when working on a project is crucial to completing it on time.

So, I have successfully created an app that can send messages to a group of people, where those people can all contribute to the conversation.

As this app was for educational purposes and to demonstrate what I can do, it is very simple, and therefore very simple to use.  If this is your first time, click on the register button and create a login and password.  This app also serves as a demo, so if you just want to take a look at the message screen without logging in, you can click on the "Guest" button and it will allow you to view the action unfolding on the screen, but you will not be able to enter any messages.  For that, you need to login.  Please be patient as this is a demo and as such probably not being used much, so the server hosting the web site has to reactivate the app, which will take time.

## Installation Instructions

Client:

1. Run "cd client"
2. Run "npm install"

Server:

1. Open new Terminal
2. From root directory, run "cd server"
3. Run "server\Scripts\activate"
4. Run "pip install -r requirements.txt"
5. Create the .env file and include a CHAT_APP_PASSWORD = "xxxx", SECRET_KEY = "xxxx", DEBUG = "False"  #NOTE: You can set the DEBUG to True or False.
6. Run "./server/Scripts/gunicorn server.Main:app"

#### **Author**

Asher Green - *Full Stack Developer* \
[website](http://www.ashergreen.ca) | [LinkedIn](https://www.linkedin.com/in/asher-green-6a96551/)
