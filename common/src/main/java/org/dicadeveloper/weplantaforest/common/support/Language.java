package org.dicadeveloper.weplantaforest.common.support;

import java.util.Locale;

import lombok.Getter;

@Getter
public enum Language {
    DEUTSCH(Locale.GERMAN, "de"), ENGLISH(Locale.ENGLISH, "en");

    private final Locale _locale;

    private final String _shortName;

    private Language(final Locale locale, final String shortName) {
        _locale = locale;
        _shortName = shortName;
    }
}
