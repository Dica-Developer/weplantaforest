package org.dicadeveloper.weplantaforest.contact;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContactDTO {

    private String reason;
    private String name;
    private String mail;
    private String phone;
    private String message;
}
