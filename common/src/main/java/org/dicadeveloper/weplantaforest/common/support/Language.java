package org.dicadeveloper.weplantaforest.common.support;

import java.util.Locale;

import lombok.Getter;

@Getter
public enum Language {
    DEUTSCH(Locale.GERMAN, "de"), ENGLISH(Locale.ENGLISH, "en");

    private final Locale locale;

    private final String shortName;

    private Language(final Locale locale, final String shortName) {
        this.locale = locale;
        this.shortName = shortName;
    }
}
