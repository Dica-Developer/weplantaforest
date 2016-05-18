package org.dicadeveloper.weplantaforest.support;

import java.util.Locale;

import lombok.Getter;

@Getter
public enum Language {
    GERMAN(Locale.GERMANY, "de"),
    ENGLISH(Locale.ENGLISH, "en"),
    ITALIAN(Locale.ITALIAN, "it");

    private final Locale _locale;

    private final String _shortName;

    private Language(final Locale locale, final String shortName) {
        _locale = locale;
        _shortName = shortName;
    }
}
