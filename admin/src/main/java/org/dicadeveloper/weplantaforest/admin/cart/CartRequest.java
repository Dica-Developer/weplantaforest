package org.dicadeveloper.weplantaforest.admin.cart;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CartRequest {

    private List<String> cartStates;
    private Long from;
    private Long to;

}
