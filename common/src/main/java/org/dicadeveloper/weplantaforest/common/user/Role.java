package org.dicadeveloper.weplantaforest.common.user;

public enum Role {
    ADMIN, USER, ANONYMOUS, UNKNOWN, ARTICLE_MANAGER, UNKNOWN_2;

    public String getIdentifier() {
        return toString();
    }
}
