package org.dicadeveloper.weplantaforest.admin.event;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dicadeveloper.weplantaforest.admin.team.Team;
import org.dicadeveloper.weplantaforest.admin.user.User;
import org.springframework.hateoas.Identifiable;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Event implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_id")
    private Long id;

    @Column(name = "_name", nullable = false, unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "_team__teamId")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "_user__userId")
    private User user;

}
