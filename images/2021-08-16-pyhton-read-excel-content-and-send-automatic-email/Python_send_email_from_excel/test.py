import pandas as pd
import smtplib
from email.mime.text import MIMEText
from email.header import Header

def send_simple_email(host, subject, from_addr, to_addr, body, password):
    # from_email and to_email addresss
    message = MIMEText(body, 'html', 'utf-8')
    message['From'], message['To'] = from_addr, to_addr
    message['Subject'] = Header(subject, "utf-8")

    # Using Gmail server to send the email
    server = smtplib.SMTP_SSL(host, 465)   # smtpObj, or aka server
    server.login(from_addr, password)
    server.sendmail(from_addr, [to_addr], message.as_string())
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
    
    import getpass
    password = getpass.getpass()
    send_simple_email(host, subject, from_addr, to_addr, html_body, password)
