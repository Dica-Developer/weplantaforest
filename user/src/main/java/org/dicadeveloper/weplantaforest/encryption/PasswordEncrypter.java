
package org.dicadeveloper.weplantaforest.encryption;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncrypter implements PasswordEncoder {

    protected final Log LOG = LogFactory.getLog(PasswordEncrypter.class.getName());

    public static final String US_ASCII = "US-ASCII";

    private MessageDigest _sha;

    public PasswordEncrypter() {
        try {
            _sha = MessageDigest.getInstance("SHA");
        } catch (final NoSuchAlgorithmException e) {
            LOG.error("unable to get MesageDiggest Method SHA", e);
        }
    }

    public String encryptPassword(final String password) {
        if (password == null) {
            return null;
        }
        _sha.update(password.getBytes());
        final byte[] pwhash = _sha.digest();
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