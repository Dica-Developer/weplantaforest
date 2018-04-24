package org.dicadeveloper.weplantaforest.articlemanager.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.articlemanager.views.Views;
import org.dicadeveloper.weplantaforest.common.user.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Table(name = "User")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    @Column(name = "_userId")
    private Long id;

    @Column(unique = true, name = "_name")
    @JsonView({ Views.UserArticleView.class, Views.UserArticleShortView.class, Views.BackofficeArticleOverview.class, Views.BackofficeArticleView.class })
    private String name;
    
    @Column(name = "_password")
    private String password;

    @Column(name = "_email", length = 500)
    private String mail;
    
    @Column(name = "_enabled", nullable = false)
    private boolean enabled = false;

    @Column(name = "_banned", nullable = false)
    private boolean banned = false;

    @Column(name = "_regDate")
    private Long regDate;
    
    @Column(name = "_lastVisit")
    private Long lastVisit;

    @Column(name = "_organisationType")
    private int organizationType;
    
    @Enumerated(EnumType.ORDINAL)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "User__roles", joinColumns = @JoinColumn(name = "USER__USERID") )
    @Column(name = "ELEMENT")
    private Set<Role> roles = new HashSet<Role>();

    public boolean isAdmin() {
        return roles.contains(Role.ADMIN);
    }
    
    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getIdentifier()));
        }
        return authorities;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return name;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return enabled && !banned;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

}
