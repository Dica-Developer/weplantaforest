package org.dicadeveloper.weplantaforest.admin.codes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.dicadeveloper.weplantaforest.abo.Abo;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Param {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "_id")
    private Long id;

    @Column(name = "_name", nullable = false)
    private String name;

    @Column(name = "_value", nullable = false, length = 10000)
    private String value;

    @ManyToOne
    @JoinColumn(name = "_abo__id")
    private Abo abo;

    public Param() {
    }

    public Param(final String name, final String value) {
        this.name = name;
        this.value = value;
    }
}
