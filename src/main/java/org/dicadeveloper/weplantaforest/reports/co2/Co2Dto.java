package org.dicadeveloper.weplantaforest.reports.co2;

import org.dozer.Mapping;

public class Co2Dto {

    @Mapping("trees")
    private long _treesCount;

    @Mapping("co2")
    private float _co2;

    public Co2Dto(long treesCount, float co2) {
        _treesCount = treesCount;
        _co2 = co2;
    }

    public long getTreesCount() {
        return _treesCount;
    }

    public void setTreesCount(long trees) {
        _treesCount = trees;
    }

    public float getCo2() {
        return _co2;
    }

    public void setCo2(float co2) {
        _co2 = co2;
    }
}
