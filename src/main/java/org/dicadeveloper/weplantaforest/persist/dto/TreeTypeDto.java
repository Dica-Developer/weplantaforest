package org.dicadeveloper.weplantaforest.persist.dto;

import javax.xml.bind.annotation.XmlRootElement;

import org.springframework.hateoas.Identifiable;

import com.fasterxml.jackson.annotation.JsonIgnore;

@XmlRootElement
public class TreeTypeDto implements Identifiable<Long>, BaseDto {

    public static final TreeTypeDto NO_TREE_TYPE = new TreeTypeDto();

    private Long _id;

    private String _name;

    private String _description;

    private String _imagePath;

    private String _infoPath;

    private double _annualCo2SavingInTons;

    // TODO figure out how to set this properly
    private int limit = 5, offset = 10; // Getters for these

    // TODO figure out how to set this properly
    private int modelLimit = 100; // Getters for these

    public TreeTypeDto() {

    }

    public TreeTypeDto(String name, String description) {
        _name = name;
        _description = description;
    }

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

    public String getImagePath() {
        return _imagePath;
    }

    public void setImagePath(String imagePath) {
        _imagePath = imagePath;
    }

    public String getInfoPath() {
        return _infoPath;
    }

    public void setInfoPath(String infoPath) {
        _infoPath = infoPath;
    }

    @Override
    public Long getId() {
        return _id;
    }

    @JsonIgnore
    public int getLimit() {
        return limit;
    }

    @JsonIgnore
    public int getOffset() {
        return offset;
    }

    @JsonIgnore
    public int getModelLimit() {
        return modelLimit;
    }

    @Override
    public void setId(Long id) {
        _id = id;
    }

    public double getAnnualCo2SavingInTons() {
        return _annualCo2SavingInTons;
    }

    public void setAnnualCo2SavingInTons(double annualCo2SavingInTons) {
        _annualCo2SavingInTons = annualCo2SavingInTons;
    }

}
