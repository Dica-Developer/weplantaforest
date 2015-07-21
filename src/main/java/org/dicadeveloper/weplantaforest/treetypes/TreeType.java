package org.dicadeveloper.weplantaforest.treetypes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.base.Base;

@Entity
@Table(name = "TreeType")
public class TreeType implements Base {

    @Id
    @GeneratedValue
    @Column(name = "treeTypeId")
    private long treeTypeId;

    @Column(name = "_name", unique = true)
    private String _name;
    @Column(name = "_description")
    private String _description;
    @Column(name = "_imageFile")
    private String _imageFile;
    @Column(name = "_infoLink")
    private String _infoLink;
    @Column(name = "_annualCo2SavingInTons")
    private double _annualCo2SavingInTons;

    public String getName() {
        return _name;
    }

    public void setName(String name) {
        _name = name;
    }

    public String getDescription() {
        return _description;
    }

    public void setDescription(String description) {
        _description = description;
    }

    public String getImageFile() {
        return _imageFile;
    }

    public void setImageFile(String imageFile) {
        _imageFile = imageFile;
    }

    public String getInfoLink() {
        return _infoLink;
    }

    public void setInfoLink(String infoLink) {
        _infoLink = infoLink;
    }

    public long getId() {
        return treeTypeId;
    }

    public double getAnnualCo2SavingInTons() {
        return _annualCo2SavingInTons;
    }

    public void setAnnualCo2SavingInTons(double annualCo2SavingInTons) {
        _annualCo2SavingInTons = annualCo2SavingInTons;
    }
}
