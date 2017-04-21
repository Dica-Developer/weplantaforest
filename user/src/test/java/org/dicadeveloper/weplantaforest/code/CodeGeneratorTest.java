package org.dicadeveloper.weplantaforest.code;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.event.Event;
import org.dicadeveloper.weplantaforest.event.EventRepository;
import org.dicadeveloper.weplantaforest.gift.Gift;
import org.dicadeveloper.weplantaforest.gift.GiftRepository;
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
public class CodeGeneratorTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    private GiftRepository _giftRepository;

    @Autowired
    private EventRepository _eventRepository;

    @Autowired
    private CodeGenerator _codegenerator;

    @Test
    public void generateCodeForGift() {
        Gift gift = new Gift();
        gift = _giftRepository.save(gift);
        Code code = _codegenerator.generate(gift);

        gift.setCode(code);
        _giftRepository.save(gift);

        Gift savedGiftWithCode = _giftRepository.findOne(1L);

        assertThat(_giftRepository.count()).isEqualTo(1);
        assertThat(savedGiftWithCode.getCode()).isNotNull();
        assertThat(savedGiftWithCode.getCode()
                                    .getCode()).isNotNull();

        assertThat(_codegenerator.isValid(savedGiftWithCode.getCode()
                                                           .getCode())).isTrue();
    }

    @Test
    public void generateCodeForGiftWithNumber() {
        Gift gift = new Gift();
        gift = _giftRepository.save(gift);
        Code code = _codegenerator.generate(gift, 2016, 1, 4);

        gift.setCode(code);
        _giftRepository.save(gift);

        Gift savedGiftWithCode = _giftRepository.findOne(1L);

        assertThat(_giftRepository.count()).isEqualTo(1);
        assertThat(savedGiftWithCode.getCode()).isNotNull();
        assertThat(savedGiftWithCode.getCode()
                                    .getCode()).isNotNull();

        assertThat(_codegenerator.isValid(savedGiftWithCode.getCode()
                                                           .getCode())).isTrue();
    }

    @Test
    @Transactional
    public void generateCodeForEvent() {
        Event event = new Event();

        Code code = _codegenerator.generate(event, 2016, 1, 1);

        List<Code> codes = new ArrayList<>();
        codes.add(code);

        event.setCodes(codes);
        _eventRepository.save(event);

        Event savedEventWithCode = _eventRepository.findOne(1L);

        assertThat(_eventRepository.count()).isEqualTo(1);
        assertThat(savedEventWithCode.getCodes()
                                     .size()).isEqualTo(1);
        assertThat(savedEventWithCode.getCodes()
                                     .get(0)).isNotNull();
        assertThat(savedEventWithCode.getCodes()
                                     .get(0)
                                     .getCode()).isNotNull();

        assertThat(_codegenerator.isValid(savedEventWithCode.getCodes()
                                                            .get(0)
                                                            .getCode())).isTrue();
    }

    @Test
    @Transactional
    public void generateCodesForEventWithTreeCount() {
        int codeCount = 100;

        Event event = new Event();
        event = _eventRepository.save(event);
        List<Code> codes = _codegenerator.generate(event, codeCount, 2);

        event.setCodes(codes);
        _eventRepository.save(event);

        Event savedEventWithCode = _eventRepository.findOne(1L);

        assertThat(_eventRepository.count()).isEqualTo(1);
        assertThat(savedEventWithCode.getCodes()
                                     .size()).isEqualTo(codeCount);

        for (int i = 0; i < codeCount; i++) {
            assertThat(savedEventWithCode.getCodes()
                                         .get(i)).isNotNull();
            assertThat(savedEventWithCode.getCodes()
                                         .get(i)
                                         .getCode()).isNotNull();

            assertThat(_codegenerator.isValid(savedEventWithCode.getCodes()
                                                                .get(i)
                                                                .getCode())).isTrue();
        }
    }

    @Test
    @Transactional
    public void generateCodesForEventHasAlreadyCreatedCodesWithTreeCount() {
        int codeCount = 100;
        int codeCount2 = 10;

        Event event = new Event();
        event = _eventRepository.save(event);
        List<Code> codes = _codegenerator.generate(event, codeCount, 2);

        event.setCodes(codes);
        _eventRepository.save(event);

        codes = _codegenerator.generate(event, codeCount2, 2);
        event.getCodes()
             .addAll(codes);
        _eventRepository.save(event);

        Event savedEventWithCode = _eventRepository.findOne(1L);

        assertThat(_eventRepository.count()).isEqualTo(1);
        assertThat(savedEventWithCode.getCodes()
                                     .size()).isEqualTo(codeCount + codeCount2);

        for (int i = 0; i < codeCount + codeCount2; i++) {
            assertThat(savedEventWithCode.getCodes()
                                         .get(i)).isNotNull();
            assertThat(savedEventWithCode.getCodes()
                                         .get(i)
                                         .getCode()).isNotNull();

            assertThat(_codegenerator.isValid(savedEventWithCode.getCodes()
                                                                .get(i)
                                                                .getCode())).isTrue();
        }
    }

    @Test
    @Transactional
    public void generateCodesForEventWithAmount() {
        int codeCount = 100;

        Event event = new Event();
        event = _eventRepository.save(event);
        List<Code> codes = _codegenerator.generate(event, codeCount, 2.0f);

        event.setCodes(codes);
        _eventRepository.save(event);

        Event savedEventWithCode = _eventRepository.findOne(1L);

        assertThat(_eventRepository.count()).isEqualTo(1);
        assertThat(savedEventWithCode.getCodes()
                                     .size()).isEqualTo(codeCount);

        for (int i = 0; i < codeCount; i++) {
            assertThat(savedEventWithCode.getCodes()
                                         .get(i)).isNotNull();
            assertThat(savedEventWithCode.getCodes()
                                         .get(i)
                                         .getCode()).isNotNull();

            assertThat(_codegenerator.isValid(savedEventWithCode.getCodes()
                                                                .get(i)
                                                                .getCode())).isTrue();
        }
    }
    
    @Test
    @Transactional
    public void generateCodesForEventHasAlreadyCreatedCodesWithAmount() {
        int codeCount = 100;
        int codeCount2 = 10;

        Event event = new Event();
        event = _eventRepository.save(event);
        List<Code> codes = _codegenerator.generate(event, codeCount, 2.0f);

        event.setCodes(codes);
        _eventRepository.save(event);

        codes = _codegenerator.generate(event, codeCount2, 2.0f);
        event.getCodes()
             .addAll(codes);
        _eventRepository.save(event);

        Event savedEventWithCode = _eventRepository.findOne(1L);

        assertThat(_eventRepository.count()).isEqualTo(1);
        assertThat(savedEventWithCode.getCodes()
                                     .size()).isEqualTo(codeCount + codeCount2);

        for (int i = 0; i < codeCount + codeCount2; i++) {
            assertThat(savedEventWithCode.getCodes()
                                         .get(i)).isNotNull();
            assertThat(savedEventWithCode.getCodes()
                                         .get(i)
                                         .getCode()).isNotNull();

            assertThat(_codegenerator.isValid(savedEventWithCode.getCodes()
                                                                .get(i)
                                                                .getCode())).isTrue();
        }
    }

    @Test
    public void testInValidCodeNoPatterMatch() {
        String codeString = "a-b-c";
        assertThat(_codegenerator.isValid(codeString)).isFalse();
    }

    @Test
    public void testInValidCodeCausOfCheckSum() {
        String codeString = "ABCD-47BD-A46B-A3BB";
        assertThat(_codegenerator.isValid(codeString)).isFalse();
    }

    @Test
    public void testInValidCodeNotInDb() {
        String codeString = "GGCY-47BD-A46B-A3BB";
        assertThat(_codegenerator.isValid(codeString)).isFalse();
    }

}
