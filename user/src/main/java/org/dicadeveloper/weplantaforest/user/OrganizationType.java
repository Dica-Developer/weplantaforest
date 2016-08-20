package org.dicadeveloper.weplantaforest.user;

public enum OrganizationType {

    PRIVATE("Privatperson"), COMMERCIAL("Firma"), NONPROFIT("Non-Profit Organisation"), EDUCATIONAL("Schule"), TEAM("Team");

    private final String description;

    private OrganizationType(String s) {
        description = s;
    }

    public boolean equalsName(String otherName) {
        return (otherName == null) ? false : description.equals(otherName);
    }

    public String getDescription() {
        return this.description;
    }

}
