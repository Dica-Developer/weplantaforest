package org.dicadeveloper.weplantaforest.user;

import javax.persistence.Column;
import javax.persistence.Entity;
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

    @Column(name = "_email", length = 500)
    private String mail;

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

    @Override
    public String toString() {
        return "'" + name + "'(" + mail + ")[" + id + "]";
    }
}
