package org.dicadeveloper.weplantaforest.encryption;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;

import org.apache.commons.codec.binary.Base64;
import org.dicadeveloper.weplantaforest.abo.Param;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.stereotype.Component;

@Component
public class ParamEncrypter {

    private transient static final String CHARSET = "UTF16";
    private transient static final String ALGORITHM = "PBEWithMD5AndDES";
    private transient static final String TRANSFORMATION = "PBEWithMD5AndDES/CBC/PKCS5Padding";

    // private transient static final byte[] SALT = { (byte) 0xc9, (byte) 0xc9,
    // (byte) 0xc9, (byte) 0xc9, (byte) 0xc9, (byte) 0xc9, (byte) 0xc9, (byte)
    // 0xc9 };

    private transient static final byte[] SALT = { 0x74, 0x15, 0x15, 0x1b, 0x1a, 0x27, (byte) 0xa7, 0x23 };
    private transient static final int ITERATIONS = 11;

    private Cipher _encrypter;
    private Cipher _decrypter;
    private static ParamEncrypter instance;

    protected ParamEncrypter() {
    }

    public static ParamEncrypter getInstance() {
        if (instance == null) {
            instance = new ParamEncrypter();
        }
        return instance;

    }

    public void init(final User user) {
        final int iterations = 5 + (int) (user.getId() % ITERATIONS);

        final char[] chars = user.getMail().toCharArray();
        final byte[] salt = new byte[8];
        for (int i = 0; i < salt.length; i++) {
            if (chars.length <= i) {
                salt[i] = 0x7f;
            } else {
                salt[i] = (byte) chars[i];
            }
        }

        init(user.getPassword(), salt, iterations);
    }

    public void init(final String pass) {
        init(pass, SALT, ITERATIONS);
    }

    public void init(final String pass, final int iterations) {
        init(pass, SALT, iterations);
    }

    public void init(final String pass, final byte[] salt, final int iterations) throws SecurityException {
        try {
            final PBEParameterSpec ps = new PBEParameterSpec(salt, iterations);

            final SecretKeyFactory skf = SecretKeyFactory.getInstance(ALGORITHM);
            final PBEKeySpec ks = new PBEKeySpec(pass.toCharArray());
            final SecretKey sk = skf.generateSecret(ks);

            _encrypter = Cipher.getInstance(TRANSFORMATION);
            _encrypter.init(Cipher.ENCRYPT_MODE, sk, ps);

            _decrypter = Cipher.getInstance(TRANSFORMATION);
            _decrypter.init(Cipher.DECRYPT_MODE, sk, ps);

        } catch (final Exception e) {
            throw new SecurityException("Could not initialize CryptoLibrary: ", e);
        }
    }

    public synchronized String encrypt(final String str) throws SecurityException {
        try {
            final byte[] b = str.getBytes(CHARSET);
            final byte[] enc = _encrypter.doFinal(b);
            return new String(Base64.encodeBase64(enc));
        } catch (final Exception e) {
            throw new SecurityException("Could not encrypt: " + e.getMessage());
        }

    }

    public synchronized List<Param> encryptParams(Map<String, String> paramMap) {
        final List<Param> params = new ArrayList<>();
        for (Entry<String, String> entry : paramMap.entrySet()) {
            Param param = new Param();
            param.setName(encrypt(entry.getKey()));
            param.setValue(encrypt(entry.getValue()));
            params.add(param);
        }
        return params;
    }

    public synchronized String decrypt(final String str) throws SecurityException {
        try {
            byte[] dec = Base64.decodeBase64(str.getBytes());
            final byte[] b = _decrypter.doFinal(dec);
            return new String(b, CHARSET);
        } catch (final Exception e) {
            e.printStackTrace();
            throw new SecurityException("Could not decrypt: " + e.getMessage());
        }
    }

    public synchronized Map<String, String> decryptParams(final List<Param> params) {
        final Map<String, String> map = new HashMap<String, String>();
        for (final Param param : params) {
            final String name = decrypt(param.getName());
            final String value = decrypt(param.getValue());
            map.put(name, value);
        }

        return map;
    }
}
