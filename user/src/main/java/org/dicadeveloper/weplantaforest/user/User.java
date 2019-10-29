package org.dicadeveloper.weplantaforest.user;

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

import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.common.support.Language;
import org.dicadeveloper.weplantaforest.common.user.Role;
import org.dicadeveloper.weplantaforest.team.Team;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "User")
@EqualsAndHashCode(exclude = {"team"})
public class User implements UserDetails {

    /**
     * 
     */
    private static final long serialVersionUID = -4288563962830437191L;

    @Id
    @GeneratedValue
    @Column(name = "_userId")
    private Long id;

    @Column(unique = true, name = "_name")
    @JsonView({ Views.PlantedTree.class, Views.OverviewGift.class, Views.CertificateSummary.class, Views.TeamMember.class })
    private String name;

    @Column(name = "_password")
    private String password;

    @Column(name = "_email", length = 500)
    private String mail;

    @Enumerated(EnumType.ORDINAL)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "User__roles", joinColumns = @JoinColumn(name = "USER__USERID") )
    @Column(name = "ELEMENT")
    private Set<Role> roles = new HashSet<Role>();

    @Column(name = "_enabled", nullable = false)
    private boolean enabled = false;

    @Column(name = "_banned", nullable = false)
    private boolean banned = false;

    @Column(name = "_regDate")
    private Long regDate;

    @Column(name = "_lastVisit")
    private Long lastVisit;

    @Column(name = "_organisationType")
    private OrganizationType organizationType;

    @Column(name = "_imageName")
    @JsonView({Views.TeamMember.class })
    private String imageName;

    @Column(name = "_aboutme")
    private String aboutMe;

    @Column(name = "_location")
    private String location;

    @Column(name = "_organisation")
    private String organisation;
    
    @Column(name ="_homepage")
    private String homepage;
    
    @Column(name ="_lang")
    private Language lang;
    
    @Column(name ="_newsletter")
    private boolean newsletter;
    
    @Column(name = "_activationKey")
    private String activationKey;
    
    @ManyToOne(optional = true)
    @JoinColumn(name = "_team__teamId")
    @JsonIgnore
    private Team team;

    public void addRole(final Role role) {
        roles.add(role);
    }

    public void removeRole(final Role role) {
        roles.remove(role);
    }
    
    @Transient
    @JsonIgnore
    public boolean isAdmin() {
        return roles.contains(Role.ADMIN);
    }

    @Override
    public String toString() {
        return "'" + name + "'(" + mail + ")[" + id + "]";
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
