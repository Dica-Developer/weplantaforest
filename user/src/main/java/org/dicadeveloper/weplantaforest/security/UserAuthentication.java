package org.dicadeveloper.weplantaforest.security;

import java.util.Collection;

import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class UserAuthentication implements Authentication {

    private static final long serialVersionUID = -2242106351785882988L;
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
	    customUser.setLang(user.getLang());
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
