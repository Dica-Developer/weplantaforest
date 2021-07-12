package org.dicadeveloper.weplantaforest.security;

import java.util.Collection;

import org.dicadeveloper.weplantaforest.common.user.IUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class UserAuthentication implements Authentication {

    private static final long serialVersionUID = -2242106351785882988L;
    private final IUser user;
    private boolean authenticated = true;

    public UserAuthentication(IUser user) {
        this.user = user;
    }

    @Override
    public String getName() {
        return user.getName();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return user.getPassword();
    }

    @Override
    public IUser getDetails() {
        return user;
    }

    @Override
    public Object getPrincipal() {
        return user.getName();
    }

    @Override
    public boolean isAuthenticated() {
        return authenticated;
    }

    @Override
    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
}
