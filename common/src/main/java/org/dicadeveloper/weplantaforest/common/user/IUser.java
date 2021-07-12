package org.dicadeveloper.weplantaforest.common.user;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public interface IUser {

    void setAuthenticationExpiresAt(Long expirationInMilliseconds);

    Long getAuthenticationExpiresAt();

    String getName();

    boolean isAdmin();

    Collection<? extends GrantedAuthority> getAuthorities();

    String getPassword();
}
