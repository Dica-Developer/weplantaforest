package org.dicadeveloper.weplantaforest.admin.codes;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.dicadeveloper.weplantaforest.trees.User;

@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long _teamId;

    private Long _timeStamp;

    @Column(nullable = false, unique = true, length = 256)
    private String _name;

    @OneToMany(mappedBy = "_team", fetch = FetchType.EAGER)
    private List<User> _members = new ArrayList<User>();

    @Column(/* length = ModifiedMySql5InnoDbDialect.LENGTH_FOR_TEXT_TYPE */)
    private String _description;

    @OneToOne(optional = false)
    private User _admin;

    public Team() {
        _timeStamp = System.currentTimeMillis();
    }

    public Team setId(final Long teamId) {
        _teamId = teamId;
        return this;
    }

    public Long getId() {
        return _teamId;
    }

    public Team setName(final String name) {
        _name = name;
        return this;
    }

    public String getName() {
        return _name;
    }

    public void addMember(final User member) {
        if (!_members.contains(member)) {
            _members.add(member);
        }
    }

    public void setMembers(final List<User> members) {
        _members = members;
    }

    public void removeMember(final User user) {
        if (!_admin.equals(user)) {
            _members.remove(user);
        }
    }

    public List<User> getMembers() {
        return _members;
    }

    public int getMembersCount() {
        return _members.size();
    }

    public void setTimeStamp(final Long timeStamp) {
        _timeStamp = timeStamp;
    }

    public Long getTimeStamp() {
        return _timeStamp;
    }

    public Date getDate() {
        return new Date(_timeStamp);
    }

    public void setDescription(final String description) {
        _description = description;
    }

    public String getDescription() {
        return _description;
    }

    public void setAdmin(final User admin) {
        _admin = admin;
        addMember(_admin);
    }

    public User getAdmin() {
        return _admin;
    }

    public boolean isMember(final User user) {
        return _members.contains(user);
    }

    public boolean isLeader(final User user) {
        return _admin.equals(user);
    }

    @Override
    public String toString() {
        return "'" + _name + "'[" + _teamId + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((_teamId == null) ? 0 : _teamId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Team other = (Team) obj;
        if (_teamId == null) {
            if (other._teamId != null)
                return false;
        } else if (!_teamId.equals(other._teamId))
            return false;
        return true;
    }

}
