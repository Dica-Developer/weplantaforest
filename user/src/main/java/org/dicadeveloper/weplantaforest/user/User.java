package org.dicadeveloper.weplantaforest.user;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.admin.codes.Team;
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
    private Long id;

    @Column(unique = true, name = "_name")
    @JsonView({Views.PlantedTree.class, Views.OverviewGift.class})
    private String name;
    
    @Column(name ="_password")
    private String password;

    @Column(name = "_email", length = 500)
    private String mail;
    
    
    @Enumerated(EnumType.ORDINAL)
    @ElementCollection
    @CollectionTable(name = "USER__ROLES",
                     joinColumns = @JoinColumn(name = "USER__USERID"))
    @Column(name = "ELEMENT")
    private Set<Role> _roles = new HashSet<Role>();

    @Column(name = "_enabled", nullable = false)
    private boolean enabled = false;

    @Column(name = "_banned", nullable = false)
    private boolean banned = false;

    @Column(name = "_regDate")
    private Long regDate;

    @Column(name = "_organisationType")
    private int organizationType;

    @ManyToOne(optional = true)
    @JoinColumn(name = "_team__teamId")
    private Team team;
    
    public void addRole(final Role role) {
        _roles.add(role);
    }

    public void removeRole(final Role role) {
        _roles.remove(role);
    }

    @Override
    public String toString() {
        return "'" + name + "'(" + mail + ")[" + id + "]";
    }
}
