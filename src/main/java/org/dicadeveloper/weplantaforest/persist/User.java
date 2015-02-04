package org.dicadeveloper.weplantaforest.persist;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private long _id;

    @Column(name = "nickName")
    private String _nickName;

    public long getId() {
        return _id;
    }

    public void setId(long id) {
        _id = id;
    }

    public String getNickName() {
        return _nickName;
    }

    public void setNickName(String nickName) {
        _nickName = nickName;
    }

}
