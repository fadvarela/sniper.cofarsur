using System;
using System.Collections.Generic;
using System.Text;
using MailKit.Net.Smtp;
using MimeKit;

namespace Backend.Funciones
{
  public  class MailBackend
    {
        public void SendMail()
        {
            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress("SniperBot", "fvarela@sniperbot.com.ar");
            message.From.Add(from);

            MailboxAddress to = new MailboxAddress("UserTest","fvarela.sbot@gmail.com");
            message.To.Add(to);

            message.Subject = "Test Mail " + DateTime.Now.ToString();

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "<h1>Hello World!</h1>";
            bodyBuilder.TextBody = "Hello World!";

            SmtpClient client = new SmtpClient();
            client.Connect("mail.sniperbot.com.ar", 2525, false);
            client.Authenticate("fvarela@sniperbot.com.ar", "F2a2d0v9");

            client.Send(message);
            client.Disconnect(true);
            client.Dispose();





        }

    }
}
