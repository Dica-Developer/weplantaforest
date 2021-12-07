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
import lombok.val;

@Service
public class ScheduledTasks {

    private static final Log LOG = LogFactory.getLog(ScheduledTasks.class.getName());

    private final static long A_HALF_HOUR_IN_MILLISECONDS = 30 * 60 * 1000;

    private final static long DAY_IN_MILLISECONDS = 86400000;

    @Autowired
    private @NonNull CartRepository _cartRepository;

    @Autowired
    private @NonNull TreeRepository _treeRepository;

    @Autowired
    private @NonNull CodeRepository _codeRepository;

    @Autowired
    private @NonNull CartService _cartService;

    @Autowired
    private @NonNull ReceiptRepository _receiptRepository;

    @Autowired
    private @NonNull ReceiptService _receiptService;

    @Autowired
    private @NonNull Environment _env;

    @Scheduled(fixedRate = A_HALF_HOUR_IN_MILLISECONDS)
    private void cleanUpInitialCarts() {
        List<Cart> carts = _cartRepository.findInitialCartsOlderThanHalfHour(System.currentTimeMillis());
        for (Cart cart : carts) {
            if (cart.getCode() != null) {
                Code code = cart.getCode();
                code.setCart(null);
                _codeRepository.save(code);

                cart.setCode(null);
                _cartRepository.save(cart);

                _codeRepository.delete(code);
            }
        }
        _cartRepository.deleteAll(carts);
        LOG.info("deleted initial carts(" + carts.size() + ") and their trees");
    }

    @Scheduled(fixedRate = DAY_IN_MILLISECONDS)
    private void checkCartsForReceipts() {
        boolean sendMails = "true".equalsIgnoreCase(_env.getProperty("send.mails"));
        List<Cart> carts = _cartRepository.findReceiptableCarts();

        if (carts != null && carts.size() > 0) {
            Map<String, List<Cart>> userCartMap = _cartService.groupCartsByUser(carts);
            for (String userName : userCartMap.keySet()) {
                val cartsByUser = userCartMap.get(userName);
                User owner = cartsByUser.get(0).getBuyer();
                int currentYear = Calendar.getInstance().get(Calendar.YEAR);
                Receipt receipt = new Receipt();
                // this save is to get the id, which is needed to create the
                // invoiceNumber
                _receiptRepository.save(receipt);
                for (val cart : cartsByUser) {
                    cart.setReceipt(receipt);
                    _cartRepository.save(cart);
                }
                receipt.setOwner(owner);
                receipt.setInvoiceNumber(receipt.getReceiptId() + "/" + currentYear);
                receipt.setCarts(userCartMap.get(userName));
                _receiptRepository.save(receipt);
                if (sendMails) {
                    _receiptService.sendReceiptMail(owner.getId(), receipt.getReceiptId());
                }
            }
        }
    }
}
