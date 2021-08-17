# Author: Zhengqi Dong
# Date: 08/17/2021
# Type: Data Analysis, Python
import pandas as pd
import smtplib  
# 用于构造可视化的content
from email.mime.text import MIMEText
from email.header import Header

# No attachements, just simple plain-text or html content
def send_simple_email(host, subject, from_addr, to_addr, body, password):
    # Instantiate MIMEText object
    message = MIMEText(body, 'html', 'utf-8')
    message['From'], message['To'] = from_addr, to_addr
    message['Subject'] = Header(subject, "utf-8")
    message = message.as_string()   # Because SMTP.sendmail, required bytes-like string. Otherwise you will see error like: Error: expected string or bytes-like object

    try:
        import ssl
        context = ssl.create_default_context()
        server = smtplib.SMTP_SSL(host, 465, context=context)
        server.login(from_addr, password)
        server.sendmail(from_addr, [to_addr], message)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        server.quit()
        print("Email Sent!")


if __name__ == "__main__":
    # Reading excel content
    df = pd.read_excel("Student_Grade.xlsx")

    # Editing Email Info
    host = "smtp.gmail.com"     # Using Gmail server to send the email
    subject = "[AUTO EMAIL] Student Grader Report"
    html_body = f"""<h1> Student Grade Report </h1> {df.describe().to_html()}"""
    from_addr, to_addr = "dongzq760@gmail.com", "dongzq760@gmail.com"

    # Get Passwork from user
    import getpass
    password = getpass.getpass()

    # Sending Email
    send_simple_email(host, subject, from_addr, to_addr, html_body, password)


# Debug:
# 1） xlrd.biffh.XLRDError: Excel xlsx file; not supported ===》 Because, the latest version of xlrd (2.0.1) only supports .xls files. so try this `pip install xlrd==1.2.0`, refers to https://stackoverflow.com/questions/65254535/xlrd-biffh-xlrderror-excel-xlsx-file-not-supported
# 2) smtplib.SMTPAuthenticationError: (535, b'5.7.8 Username and Password not accepted. Learn more at\n5.7.8  https://support.google.com/mail/?p=BadCredentials j18sm735815qke.75 - gsmtp') ==> Mean wrong username or password.
# 3) smtplib.SMTPServerDisconnected: Connection unexpectedly closed ==> This means you need do something on your Gmail Setting: Turn Allow less secure apps to ON(https://myaccount.google.com/lesssecureapps). Be aware that this makes it easier for others to gain access to your account.

