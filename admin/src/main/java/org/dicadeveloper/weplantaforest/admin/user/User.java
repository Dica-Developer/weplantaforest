package org.dicadeveloper.weplantaforest.admin.user;

import java.util.HashSet;
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

import org.dicadeveloper.weplantaforest.admin.team.Team;
import org.dicadeveloper.weplantaforest.common.user.Role;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.hateoas.Identifiable;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "User")
public class User implements Identifiable<Long> {

    @Id
    @GeneratedValue
    @Column(name = "_userId")
    @JsonView({Views.OverviewUser.class, Views.ProjectData.class})
    private Long id;

    @Column(unique = true, name = "_name")
    @JsonView({Views.OverviewCart.class, Views.OverviewUser.class, Views.ProjectData.class})
    private String name;
    
    @Column(name ="_password")
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

    @Column(name = "_organisationType")
    private int organizationType;

    @ManyToOne(optional = true)
    @JoinColumn(name = "_team__teamId")
    private Team team;
    
    @Enumerated(EnumType.ORDINAL)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "User__roles", joinColumns = @JoinColumn(name = "USER__USERID") )
    @Column(name = "ELEMENT")
    private Set<Role> roles = new HashSet<Role>();
    
    public void addRole(final Role role) {
        roles.add(role);
    }

    public void removeRole(final Role role) {
        roles.remove(role);
    }
    
    public boolean hasRole(Role role){
        return roles.contains(role);
    }

    @Override
    public String toString() {
        return "'" + name + "'(" + mail + ")[" + id + "]";
    }
}
