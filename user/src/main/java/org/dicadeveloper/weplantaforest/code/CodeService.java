package org.dicadeveloper.weplantaforest.code;

import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatPreconditions;
import org.dicadeveloper.weplantaforest.event.EventService;
import org.dicadeveloper.weplantaforest.gift.GiftService;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CodeService {

    private @NonNull CodeRepository _codeRepository;

    private @NonNull GiftService _giftService;

    private @NonNull EventService _eventService;

    private @NonNull CodeGenerator _codeGenerator;

    public void redeemCode(User recipient, String codeString) throws IpatException {
        IpatPreconditions.checkArgument(_codeGenerator.isValid(codeString), ErrorCodes.INVALID_CODE);
        Code code = _codeRepository.findByCode(codeString);
        boolean IsGiftOrEventCode = (code.isGiftCode() || code.isEventCode());
        IpatPreconditions.checkArgument(IsGiftOrEventCode, ErrorCodes.CODE_IS_NEITHER_GIFT_NOR_EVENT);
        if (code.isGiftCode()) {
            _giftService.redeemGiftCode(recipient, codeString);
        } else if (code.isEventCode()) {
            _eventService.redeemEventCode(recipient, codeString);
        }
    }
}
