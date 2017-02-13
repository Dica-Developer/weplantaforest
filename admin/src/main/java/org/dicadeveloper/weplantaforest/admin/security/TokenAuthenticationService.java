package org.dicadeveloper.weplantaforest.admin.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.dicadeveloper.weplantaforest.admin.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@PropertySource(value = { "classpath:application.properties" })
public class TokenAuthenticationService {

    private static final String AUTH_HEADER_NAME = "X-AUTH-TOKEN";
    private static final long TEN_DAYS = 1000 * 60 * 60 * 24 * 10;

    private final TokenHandler tokenHandler;

    @Autowired
    public TokenAuthenticationService(@Value("${token.secret}") String secret) {
        tokenHandler = new TokenHandler(DatatypeConverter.parseBase64Binary(secret));
    }

    public Authentication getAuthentication(HttpServletRequest request) {
        final String token = request.getHeader(AUTH_HEADER_NAME);
        if (token != null) {
            final User user = tokenHandler.parseUserFromToken(token);
            if (user != null) {
                return new UserAuthentication(user);
            }
        }
        return null;
    }

    public User getUserFromToken(String userToken) {
        if (userToken != null) {
            final User user = tokenHandler.parseUserFromToken(userToken);
            return user;
        }
        return null;
    }

    public boolean isAdmin(String userToken) {
        if (userToken != "") {
            final User user = tokenHandler.parseUserFromToken(userToken);
            return user.isAdmin();
        }
        return false;
    }
}
