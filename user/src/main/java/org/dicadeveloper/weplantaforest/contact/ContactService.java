package org.dicadeveloper.weplantaforest.contact;

import org.dicadeveloper.weplantaforest.common.mail.MailHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ContactService {

    private @NonNull MailHelper _mailHelper;

    private @NonNull Environment _env;

    public void sendContactMail(ContactDTO contactDTO) {
        String subject = "Kontaktanfrage - " + contactDTO.getReason();
        String text = generateMailBody(contactDTO);
        new Thread(new Runnable() {
            public void run() {
                _mailHelper.sendAMessage(subject, text);
            }
        }).start();
    }

    private String generateMailBody(ContactDTO contactDTO) {
        StringBuffer sb = new StringBuffer();
        sb.append("Name: " + contactDTO.getName());
        sb.append("\n");
        sb.append("Mail: " + contactDTO.getMail());
        sb.append("\n");
        if (contactDTO.getPhone() != "") {
            sb.append("Tel.: " + contactDTO.getPhone());
            sb.append("\n");
        }
        sb.append("Nachricht: " + contactDTO.getMessage());
        return sb.toString();
    }

}
