package org.dicadeveloper.weplantaforest.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.dicadeveloper.weplantaforest.common.user.IUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class TokenAuthenticationService {

    private static final String AUTH_HEADER_NAME = "X-AUTH-TOKEN";

    private static final String USERNAME_HEADER_NAME = "X-AUTH-USERNAME";

    private final TokenHandler tokenHandler;

    @Autowired
    public TokenAuthenticationService(@Value("${token.secret}") String secret) {
        tokenHandler = new TokenHandler(DatatypeConverter.parseBase64Binary(secret));
    }

    public void addAuthentication(HttpServletResponse response, Authentication authentication) {
        final IUser user = (IUser) authentication.getDetails();
        response.addHeader(AUTH_HEADER_NAME, tokenHandler.createTokenForUser(user));
        response.addHeader(USERNAME_HEADER_NAME, user.getName());
    }

    public Authentication getAuthentication(HttpServletRequest request) {
        final String token = request.getHeader(AUTH_HEADER_NAME);
        if (token != null) {
            final IUser user = tokenHandler.parseUserFromToken(token);
            if (user != null) {
                return new UserAuthentication(user);
            }
        }
        return null;
    }

    public IUser getUserFromToken(String userToken) {
        if (userToken != null) {
            return tokenHandler.parseUserFromToken(userToken);
        }
        return null;
    }

    public String getTokenFromUser(IUser user) {
        if (user != null) {
            final String token = tokenHandler.createTokenForUser(user);
            return token;
        }
        return null;
    }

    public boolean isAuthenticatedUser(String userToken, String userName) {
        if (userToken != "") {
            final IUser user = tokenHandler.parseUserFromToken(userToken);
            if (user != null && user.getName().equals(userName)) {
                return true;
            }
        }
        return false;
    }

    public boolean isAdmin(String userToken) {
        if (userToken != "") {
            final IUser user = tokenHandler.parseUserFromToken(userToken);
            return user.isAdmin();
        }
        return false;
    }
}
