package org.dicadeveloper.weplantaforest.projects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.dicadeveloper.weplantaforest.persist.Base;
import org.dicadeveloper.weplantaforest.persist.User;

@Entity
@Table(name = "Plant")
public class Project implements Base {

    @Id
    @GeneratedValue
    @Column(name = "_plantId")
    private long _id;

    @Column(name = "_plantId", length = 255)
    private String _name;

    @Column(name = "_description", length = 65535)
    private String _description;

    @Column(name = "_longitude")
    private Float _longitude;

    @Column(name = "_latitude")
    private Float _latitude;

    @Column(name = "_zoom")
    private Integer _zoom;

    @Column
    private Long _shopOpening;

    @Column
    private Long _shopClosing;

    @Column
    private Boolean _shopActive;

    @Column
    private Boolean _visible;

    @Column(name = "_mainImageFileName", length = 255)
    private String _mainImageFileName;

    @Column(name = "_googleMapsOverlayImageFileName", length = 200)
    private String _googleMapsOverlayImageFileName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User _manager;

    @Override
    public long getId() {
        return _id;
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

    public Float getLongitude() {
        return _longitude;
    }

    public void setLongitude(Float longitude) {
        _longitude = longitude;
    }

    public Float getLatitude() {
        return _latitude;
    }

    public void setLatitude(Float latitude) {
        _latitude = latitude;
    }

    public Integer getZoom() {
        return _zoom;
    }

    public void setZoom(Integer zoom) {
        _zoom = zoom;
    }

    public Long getShopOpening() {
        return _shopOpening;
    }

    public void setShopOpening(Long shopOpening) {
        _shopOpening = shopOpening;
    }

    public Long getShopClosing() {
        return _shopClosing;
    }

    public void setShopClosing(Long shopClosing) {
        _shopClosing = shopClosing;
    }

    public Boolean getShopActive() {
        return _shopActive;
    }

    public void setShopActive(Boolean shopActive) {
        _shopActive = shopActive;
    }

    public Boolean getVisible() {
        return _visible;
    }

    public void setVisible(Boolean visible) {
        _visible = visible;
    }

    public String getMainImageFileName() {
        return _mainImageFileName;
    }

    public void setMainImageFileName(String mainImageFileName) {
        _mainImageFileName = mainImageFileName;
    }

    public String getGoogleMapsOverlayImageFileName() {
        return _googleMapsOverlayImageFileName;
    }

    public void setGoogleMapsOverlayImageFileName(String googleMapsOverlayImageFileName) {
        _googleMapsOverlayImageFileName = googleMapsOverlayImageFileName;
    }

    public User getManager() {
        return _manager;
    }

    public void setManager(User manager) {
        _manager = manager;
    }

    public void setId(long id) {
        _id = id;
    }
}
