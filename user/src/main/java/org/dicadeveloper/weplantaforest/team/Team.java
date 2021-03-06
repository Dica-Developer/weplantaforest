package org.dicadeveloper.weplantaforest.team;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Nonnull;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.user.User;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_teamId")
    private Long id;

    @Column(name = "_timeStamp")
    private Long timeStamp;

    @Column(name = "_name", nullable = false, unique = true, length = 256)
    @Nonnull
    private String name;

    @OneToMany(mappedBy = "team", fetch = FetchType.EAGER)
    // necessary to avoid infinite recursion in authenticated user json object
    @JsonIgnore
    private List<User> members = new ArrayList<User>();

    @Column(name = "_description", columnDefinition = "TEXT")
    private String description;

    @OneToOne(optional = false)
    @JoinColumn(name = "_admin__userId")
    // necessary to avoid infinite recursion in authenticated user json object
    @JsonIgnore
    private User admin;

    public void addMember(final User member) {
        if (!members.contains(member)) {
            members.add(member);
        }
    }

    public void removeMember(final User user) {
        if (!admin.equals(user)) {
            members.remove(user);
        }
    }

    public Date getDate() {
        return new Date(timeStamp);
    }

    public boolean isMember(final User user) {
        return members.contains(user);
    }

    public boolean isLeader(final User user) {
        return admin.equals(user);
    }
}
