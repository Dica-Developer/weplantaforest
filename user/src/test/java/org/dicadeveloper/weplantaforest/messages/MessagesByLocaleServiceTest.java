package org.dicadeveloper.weplantaforest.messages;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Locale;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
public class MessagesByLocaleServiceTest {

    @Autowired
    private MessageByLocaleService _messageByLocaleService;

    @Test
    public void getMailMessageById() {
        String messageDE = _messageByLocaleService.getMessage("mail.registration.subject", Locale.GERMAN);
        assertThat(messageDE).isEqualTo("[I Plant A Tree] - Vielen Dank für Deine Registrierung");

        String messageEN = _messageByLocaleService.getMessage("mail.registration.subject", Locale.ENGLISH);
        assertThat(messageEN).isEqualTo("[I Plant A Tree] - Thanks for your registration");
    }

    @Test
    public void getValidationMessageById() {
        String messageDE = _messageByLocaleService.getMessage("user.already.exists", Locale.GERMAN);
        assertThat(messageDE).isEqualTo("Dieser Name ist bereits vergeben!");

        String messageEN = _messageByLocaleService.getMessage("user.already.exists", Locale.ENGLISH);
        assertThat(messageEN).isEqualTo("Username already exists!");
    }
}
