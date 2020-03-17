package org.dicadeveloper.weplantaforest.admin.security;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.binary.Base64;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PasswordEncrypter implements PasswordEncoder {

    public static final String US_ASCII = "US-ASCII";

    private MessageDigest sha;

    public PasswordEncrypter() {
        try {
            sha = MessageDigest.getInstance("SHA");
        } catch (final NoSuchAlgorithmException e) {
            LOG.error("unable to get MesageDiggest Method SHA", e);
        }
    }

    public String encryptPassword(final String password) {
        if (password == null) {
            return null;
        }
        sha.update(password.getBytes());
        final byte[] pwhash = sha.digest();
        try {
            return new String(Base64.encodeBase64(pwhash), US_ASCII);
        } catch (final UnsupportedEncodingException e) {
            // That shouldn't ever happen - US_ASCII is the most basic builtin
            // encoding, it will never go away ...
            LOG.error("Unknown encoding " + US_ASCII, e);
            return null;
        }
    }

    @Override
    public String encode(CharSequence rawPassword) {
        return encryptPassword(rawPassword.toString());
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return encryptPassword(rawPassword.toString()).equals(encodedPassword);
    }

}
