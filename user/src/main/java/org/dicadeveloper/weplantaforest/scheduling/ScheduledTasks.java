package org.dicadeveloper.weplantaforest.scheduling;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.cart.CartService;
import org.dicadeveloper.weplantaforest.code.Code;
import org.dicadeveloper.weplantaforest.code.CodeRepository;
import org.dicadeveloper.weplantaforest.receipt.Receipt;
import org.dicadeveloper.weplantaforest.receipt.ReceiptRepository;
import org.dicadeveloper.weplantaforest.receipt.ReceiptService;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.NonNull;

@Service
public class ScheduledTasks {

    private static final Log LOG = LogFactory.getLog(ScheduledTasks.class.getName());

    private final static long FOUR_HOURS_IN_MILLISECONDS = 14400000;
    
    private final static long DAY_IN_MILLISECONDS = 86400000;

    @Autowired
    private @NonNull CartRepository _cartRepository;

    @Autowired
    private @NonNull TreeRepository _treeRepository;

    @Autowired
    private @NonNull CodeRepository _codeRepostiory;
    
    @Autowired
    private @NonNull CartService _cartService;
    
    @Autowired
    private @NonNull ReceiptRepository _receiptRepository;
    
    @Autowired
    private @NonNull ReceiptService _receiptService;
    
    @Autowired
    private @NonNull Environment _env;

    //@Scheduled(fixedRate = FOUR_HOURS_IN_MILLISECONDS)
    // disabled because there seems a bug in the cart state change and we don't know if we delete valid carts
    private void cleanUpInitialCarts() {
        List<Cart> carts = _cartRepository.findInitialCartsOlderThanFourHours(System.currentTimeMillis());
        for (Cart cart : carts) {
            // quick fix because of fk constraint violations
            // TODO: if there's a code, there has to be also a Gift i think,
            // think this should also be checked
            if (cart.getCode() != null) {
                Code code = cart.getCode();
                code.setCart(null);
                cart.setCode(null);
                _codeRepostiory.delete(code);
            }
        }
        _cartRepository.delete(carts);
        LOG.info("deleted initial carts(" + carts.size() + ") and their trees");
    }
    
    @Scheduled(fixedRate = DAY_IN_MILLISECONDS)
    private void checkCartsForReceipts() {
        boolean sendMails = _env.getProperty("send.mails") == "true" ? true : false;
        List<Cart> carts = _cartRepository.findReceiptableCarts();
        
        if(carts != null && carts.size() > 0) {
            Map<String, List<Cart>> userCartMap = _cartService.groupCartsByUser(carts);
            for(String userName: userCartMap.keySet()) {
                User owner = userCartMap.get(userName).get(0).getBuyer();
                int currentYear = Calendar.getInstance().get(Calendar.YEAR);
                Receipt receipt = new Receipt();
                //this save is to get the id, which is needed to create the invoiceNumber
                _receiptRepository.save(receipt);
                receipt.setOwner(owner);
                receipt.setInvoiceNumber(receipt.getReceiptId() + "/" + currentYear);
                receipt.setCarts(userCartMap.get(userName));
                _receiptRepository.save(receipt);
                if(sendMails) {
                    _receiptService.sendReceiptMail(owner.getId(), receipt.getReceiptId());
                }
            }
        }
    }
}
