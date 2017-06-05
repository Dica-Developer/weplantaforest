package org.dicadeveloper.weplantaforest.admin.team;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.views.Views;
import org.springframework.hateoas.Identifiable;

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
public class Team implements Identifiable<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_teamId")
    @JsonView({Views.EventDetails.class, Views.TeamOverview.class})
    private Long id;

    private Long _timeStamp;

    @Column(name = "_name", nullable = false, unique = true, length = 256)
    @JsonView({Views.EventDetails.class, Views.TeamOverview.class})
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "team", fetch = FetchType.EAGER)
    private List<User> members = new ArrayList<User>();

    @Column(/* length = ModifiedMySql5InnoDbDialect.LENGTH_FOR_TEXT_TYPE, */ columnDefinition = "TEXT")
    private String _description;

    @JsonIgnore
    @OneToOne(optional = false)
    @JoinColumn(name = "_admin__userId")
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
        return new Date(_timeStamp);
    }

    public boolean isMember(final User user) {
        return members.contains(user);
    }

    public boolean isLeader(final User user) {
        return admin.equals(user);
    }
}
