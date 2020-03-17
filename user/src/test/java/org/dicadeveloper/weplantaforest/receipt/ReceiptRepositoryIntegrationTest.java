package org.dicadeveloper.weplantaforest.receipt;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.dicadeveloper.weplantaforest.common.testsupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ReceiptRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private ReceiptRepository _receiptRepository;

    @Test
    public void testGetReceiptsByOwnerId() {
        long createAndSentDate = System.currentTimeMillis();

        _dbInjecter.injectUser("Adam");
        _dbInjecter.injectReceipt("Adam", createAndSentDate, createAndSentDate, "12345");

        List<Receipt> receipts = _receiptRepository.findByOwnerId(1L);

        assertThat(receipts.size()).isEqualTo(1);
    }
}
