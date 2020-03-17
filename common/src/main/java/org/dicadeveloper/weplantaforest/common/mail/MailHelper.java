package org.dicadeveloper.weplantaforest.common.mail;

import java.io.File;
import java.util.Date;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.SendFailedException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

import lombok.val;

@Component
public class MailHelper {

    protected static final Log LOG = LogFactory.getLog(MailHelper.class.getName());

    @Autowired
    private Environment env;

    // connection properties
    String from;
    String password;
    String host;
    String receiver;
    boolean debug;

    Properties props;
    Session session;

    public void sendAMessage(String subject, String text) {
        setParameter();
        createAndSetProperties();
        createSessionAndAuthenticate();
        try {
            Message msg = createMessage(subject, text);
            Transport.send(msg);
        } catch (MessagingException e) {
            handleException(e);
        }
    }

    public void sendAMessage(String subject, String text, String receiver) {

        setParameter();
        this.receiver = receiver;
        createAndSetProperties();
        createSessionAndAuthenticate();

        try {
            MimeMessage msg = createMessage(subject, text);
            Transport.send(msg);
        } catch (MessagingException e) {
            LOG.error("Cannot send mail: " + subject + " - " + text);
            handleException(e);
        }
    }

    public void sendAMessageWithAttachement(String subject, String text, String receiver, File file) {

        setParameter();
        this.receiver = receiver;
        createAndSetProperties();
        createSessionAndAuthenticate();

        try {
            MimeMessage msg = createMessage(subject, text);
            Multipart multipart = new MimeMultipart();

            MimeBodyPart textBodyPart = new MimeBodyPart();
            textBodyPart.setText(text);

            MimeBodyPart messageBodyPart = new MimeBodyPart();
            DataSource ds = new FileDataSource(file);
            messageBodyPart.setDataHandler(new DataHandler(ds));
            messageBodyPart.setFileName(file.getName());
            multipart.addBodyPart(messageBodyPart);
            multipart.addBodyPart(textBodyPart);
            msg.setContent(multipart);

            Transport.send(msg);
        } catch (MessagingException e) {
            handleException(e);
        }
    }

    private void setParameter() {
        from = env.getProperty("mail.sender");
        password = env.getProperty("mail.password");
        host = env.getProperty("smtp.host");
        receiver = env.getProperty("mail.receiver");
        debug = env.getProperty("mail.debug").equals("true");
    }

    private void createAndSetProperties() {
        props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.ssl", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        if (debug) {
            props.put("mail.debug", "true");
        } else {
            props.put("mail.debug", "false");
        }
    }

    private void createSessionAndAuthenticate() {
        Authenticator auth = new SMTPAuthenticator();
        session = Session.getInstance(props, auth);
        session.setDebug(debug);
    }

    private MimeMessage createMessage(String subject, String text) throws MessagingException {
        // create a message
        subject = HtmlUtils.htmlUnescape(subject);
        text = HtmlUtils.htmlUnescape(text);

        MimeMessage msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(from));
        InternetAddress address = new InternetAddress(receiver);
        msg.setRecipient(Message.RecipientType.TO, address);
        msg.setSubject(subject, "UTF-8");
        msg.setSentDate(new Date());
        msg.setText(text, "UTF-8");

        return msg;
    }

    private void handleException(MessagingException mex) {
        LOG.error("\n--Exception handling in MailHelper.java", mex);
        Exception ex = mex;
        do {
            if (ex instanceof SendFailedException) {
                SendFailedException sfex = (SendFailedException) ex;
                Address[] invalid = sfex.getInvalidAddresses();
                if (invalid != null) {
                    LOG.error("    ** Invalid Addresses", ex);
                    if (invalid != null) {
                        for (int i = 0; i < invalid.length; i++) {
                            LOG.error("         " + invalid[i]);
                        }
                    }
                }
                Address[] validUnsent = sfex.getValidUnsentAddresses();
                if (validUnsent != null) {
                    LOG.error("    ** ValidUnsent Addresses", ex);
                    if (validUnsent != null) {
                        for (int i = 0; i < validUnsent.length; i++) {
                            LOG.error("         " + validUnsent[i], ex);
                        }

                    }
                }
                Address[] validSent = sfex.getValidSentAddresses();
                if (validSent != null) {
                    LOG.error("    ** ValidSent Addresses", ex);
                    if (validSent != null) {
                        for (int i = 0; i < validSent.length; i++) {
                            LOG.error("         " + validSent[i], ex);
                        }
                    }
                }
            }
            if (ex instanceof MessagingException) {
                ex = ((MessagingException) ex).getNextException();
            } else {
                ex = null;
            }
        } while (ex != null);
    }

    private class SMTPAuthenticator extends Authenticator {
        @Override
        public PasswordAuthentication getPasswordAuthentication() {
            val userName = from;
            val passwd = password;
            return new PasswordAuthentication(userName, passwd);
        }
    }

}
