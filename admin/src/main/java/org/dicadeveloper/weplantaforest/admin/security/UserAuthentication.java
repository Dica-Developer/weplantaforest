package org.dicadeveloper.weplantaforest.admin.security;

import java.util.Collection;

import org.dicadeveloper.weplantaforest.admin.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class UserAuthentication implements Authentication {

    /**
     * 
     */
    private static final long serialVersionUID = 4063065909012941587L;

    private final User user;
    private boolean authenticated = true;

    public UserAuthentication(User user) {
        this.user = user;
    }

    @Override
    public String getName() {
        return user.getUsername();
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
    public User getDetails() {
        User customUser = new User();
        customUser.setId(user.getId());
        customUser.setName(user.getName());
        customUser.setMail(user.getMail());
        customUser.setRoles(user.getRoles());
        customUser.setLastVisit(user.getLastVisit());
        return customUser;
    }

    @Override
    public Object getPrincipal() {
        return user.getUsername();
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
