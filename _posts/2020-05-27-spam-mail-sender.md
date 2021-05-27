---
title: 'The Spam Email Sender'
date: '2020-05-27'
categories:
  - Others
tags:
  - spam-email
  - python
excerpt: >-
  Recently I am looking at the "Email Spam" Compeition in Kaggle, but somehow I was curious that does Goodle's Gamil have the capability in detecting those spam emails? 
  Base on this motivation, I write a small python script to send the several spam email(defined by the Kaggle dataset) and try to see how good is Gmail's spam filter.
---

### **Motivation:**
![spam.png](\assets\images\2020-05-27-spam-mail-sender\download.jpg)

Recently I am looking at the "Email Spam" Compeition in Kaggle, but somehow I was curious that does Goodle's Gamil have the capability in detecting those spam emails?

Base on this motivation, I write a small python script to send the several spam email(defined by the Kaggle dataset) and try to see how good is Gmail's spam filter.

### **Coode:**

{% highlight python %}
import smtplib
import getpass

# smtplibis saying "we are using SMTP email protocol."
# getpass is for typing password in secret mode.


# Gmail Login
# username = input("Your email: ")
username = 
password = getpass.getpass("Password: ")

# From adrress & To address
# fromaddress = username
# toaddress = input("To address: ")
fromaddress = username
toaddress = 

# message
# message = eval(input("Your message: "))
message = c+"\n[*]"+w+" Running . . ."+w + "\n"+g+"[*]"+w
file = open("spam.txt","r+") 
message1 = file.read()
file.close() 

# Creating a connection
server =smtplib.SMTP('smtp.gmail.com:587')
server.starttls()
server.login(username,password)

# for loop to send multiple spam
total = 1
for i in range (total):
	print(message1)
	server.sendmail(fromaddress,toaddress,message1)
	print("Mail "+str(i)+" send")

server.quit()
{% endhighlight %}

`username`: your email address
`password`: your email's password
`toaddress`: the target agent's email
`message`: The message you want to send, you can either 1)Type in from command line, 2)Open from a .txt file.

Note: This is just a working, you are more than welcome to contribute more at https://github.com/drago1234/spam-mail-sender







