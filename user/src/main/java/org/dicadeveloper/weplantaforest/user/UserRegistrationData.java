package org.dicadeveloper.weplantaforest.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class UserRegistrationData {

    @NonNull
    private String username;

    @NonNull
    private String password;

    @NonNull
    private String mail;

    @JsonProperty
    private boolean newsLetter;

    @NonNull
    private String orgType;
    
    @NonNull
    private String language;

}
