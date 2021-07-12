package org.dicadeveloper.weplantaforest.admin.user;

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
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.dicadeveloper.weplantaforest.admin.team.Team;
import org.dicadeveloper.weplantaforest.admin.views.Views;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.common.user.IUser;
import org.dicadeveloper.weplantaforest.common.user.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "User")
public class User implements UserDetails, IUser {

    /**
     * 
     */
    private static final long serialVersionUID = -3845260664014536983L;

    @Id
    @GeneratedValue
    @Column(name = "_userId")
    @JsonView({ Views.OverviewUser.class, Views.ProjectData.class, Views.EventDetails.class, Views.OverviewCart.class })
    private Long id;

    @Column(unique = true, name = "_name")
    @JsonView({ Views.OverviewCart.class, Views.OverviewUser.class, Views.ProjectData.class, Views.EventDetails.class })
    private String name;

    @Column(name = "_password")
    private String password;

    @Column(name = "_email", length = 500)
    @JsonView(Views.OverviewUser.class)
    private String mail;

    @Column(name = "_enabled", nullable = false)
    @JsonView(Views.OverviewUser.class)
    private boolean enabled = false;

    @Column(name = "_banned", nullable = false)
    @JsonView(Views.OverviewUser.class)
    private boolean banned = false;

    @Column(name = "_regDate")
    private Long regDate;

    @Column(name = "_lastVisit")
    private Long lastVisit;

    @Column(name = "_organisationType")
    private int organizationType;

    @Column(name = "_imageName")
    private String imageName;

    @Column(name = "_aboutme")
    private String aboutMe;

    @Column(name = "_location")
    private String location;

    @Column(name = "_organisation")
    private String organisation;

    @Column(name = "_homepage")
    private String homepage;

    @Column(name = "_lang")
    private Language lang;

    @Column(name = "_newsletter")
    private boolean newsletter;

    @Column(name = "_activationKey")
    private String activationKey;

    @ManyToOne(optional = true)
    @JoinColumn(name = "_team__teamId")
    private Team team;

    @Enumerated(EnumType.ORDINAL)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "User__roles", joinColumns = @JoinColumn(name = "USER__USERID"))
    @Column(name = "ELEMENT")
    private Set<Role> roles = new HashSet<Role>();

    @Transient
    @JsonProperty("authenticationExpiresAt")
    private Long authenticationExpiresAt;

    public void addRole(final Role role) {
        roles.add(role);
    }

    public void removeRole(final Role role) {
        roles.remove(role);
    }

    public boolean hasRole(Role role) {
        return roles.contains(role);
    }

    @Override
    @JsonView(Views.OverviewUser.class)
    public boolean isAdmin() {
        return roles.contains(Role.ADMIN);
    }

    @JsonView(Views.OverviewUser.class)
    public boolean isArticleManager() {
        return roles.contains(Role.ARTICLE_MANAGER);
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
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
