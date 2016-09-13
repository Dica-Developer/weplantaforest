package org.dicadeveloper.weplantaforest.projects.offer;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.dicadeveloper.weplantaforest.WeplantaforestApplication;
import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = WeplantaforestApplication.class)
@IntegrationTest({ "spring.profiles.active=test" })
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class ProjectOfferHelperTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    private DbInjecter _dbInjecter;

    @Autowired
    private UserRepository _userRepository;

    @Test
    public void testCreateMailText() {
        ProjectOfferData offer = new ProjectOfferData();
        offer.first = "Hans";
        offer.name = "Wurst";
        offer.isAfforestation = false;
        offer.isLeasing = false;
        offer.isSelling = false;
        offer.lease = "";
        offer.location = "hier";
        offer.mail = "hans@wurst.de";
        offer.owner = "Bernd Wurst";
        offer.purpose = "liegt brach";
        offer.size = "1m²";
        offer.comment = "bemerkung";

        String createdText = ProjectOfferHelper.createMailText(offer, null);
        String compareText = createCompareText(true, false, false, false, false, true, false);

        List<String> createdList = cutByNewLines(createdText);
        List<String> compareList = cutByNewLines(compareText);

        for (int i = 0; i < createdList.size(); i++) {
            assertEquals("Mail text isn't equal at line " + i + "!", createdList.get(i), compareList.get(i));
        }
    }

    @Test
    public void testCreateMailTextEmptyFirst() {
        ProjectOfferData offer = new ProjectOfferData();
        offer.name = "Wurst";
        offer.isAfforestation = false;
        offer.isLeasing = false;
        offer.isSelling = false;
        offer.lease = "";
        offer.location = "hier";
        offer.mail = "hans@wurst.de";
        offer.owner = "Bernd Wurst";
        offer.purpose = "liegt brach";
        offer.size = "1m²";
        offer.comment = "bemerkung";

        String createdText = ProjectOfferHelper.createMailText(offer, null);
        String compareText = createCompareText(false, false, false, false, false, true, false);

        List<String> createdList = cutByNewLines(createdText);
        List<String> compareList = cutByNewLines(compareText);

        for (int i = 0; i < createdList.size(); i++) {
            assertEquals("Mail text isn't equal at line " + i + "!", createdList.get(i), compareList.get(i));
        }
    }

    @Test
    public void testCreateMailTextAfforestationTrue() {
        ProjectOfferData offer = new ProjectOfferData();
        offer.first = "Hans";
        offer.name = "Wurst";
        offer.isAfforestation = true;
        offer.isLeasing = false;
        offer.isSelling = false;
        offer.lease = "";
        offer.location = "hier";
        offer.mail = "hans@wurst.de";
        offer.owner = "Bernd Wurst";
        offer.purpose = "liegt brach";
        offer.size = "1m²";
        offer.comment = "bemerkung";

        String createdText = ProjectOfferHelper.createMailText(offer, null);
        String compareText = createCompareText(true, true, false, false, false, true, false);

        List<String> createdList = cutByNewLines(createdText);
        List<String> compareList = cutByNewLines(compareText);

        for (int i = 0; i < createdList.size(); i++) {
            assertEquals("Mail text isn't equal at line " + i + "!", createdList.get(i), compareList.get(i));
        }
    }

    @Test
    public void testCreateMailTextPurposeEmpty() {
        ProjectOfferData offer = new ProjectOfferData();
        offer.first = "Hans";
        offer.name = "Wurst";
        offer.isAfforestation = true;
        offer.isLeasing = false;
        offer.isSelling = false;
        offer.lease = "";
        offer.location = "hier";
        offer.mail = "hans@wurst.de";
        offer.owner = "Bernd Wurst";
        offer.purpose = "";
        offer.size = "1m²";
        offer.comment = "bemerkung";

        String createdText = ProjectOfferHelper.createMailText(offer, null);
        String compareText = createCompareText(true, true, true, false, false, true, false);

        List<String> createdList = cutByNewLines(createdText);
        List<String> compareList = cutByNewLines(compareText);

        for (int i = 0; i < createdList.size(); i++) {
            assertEquals("Mail text isn't equal at line " + i + "!", createdList.get(i), compareList.get(i));
        }
    }

    @Test
    public void testCreateMailTextSellingTrue() {
        ProjectOfferData offer = new ProjectOfferData();
        offer.first = "Hans";
        offer.name = "Wurst";
        offer.isAfforestation = true;
        offer.isLeasing = false;
        offer.isSelling = true;
        offer.lease = "";
        offer.location = "hier";
        offer.mail = "hans@wurst.de";
        offer.owner = "Bernd Wurst";
        offer.purpose = "";
        offer.size = "1m²";
        offer.comment = "bemerkung";

        String createdText = ProjectOfferHelper.createMailText(offer, null);
        String compareText = createCompareText(true, true, true, true, false, true, false);

        List<String> createdList = cutByNewLines(createdText);
        List<String> compareList = cutByNewLines(compareText);

        for (int i = 0; i < createdList.size(); i++) {
            assertEquals("Mail text isn't equal at line " + i + "!", createdList.get(i), compareList.get(i));
        }
    }

    @Test
    public void testCreateMailTextLeasingTrue() {
        ProjectOfferData offer = new ProjectOfferData();
        offer.first = "Hans";
        offer.name = "Wurst";
        offer.isAfforestation = true;
        offer.isLeasing = true;
        offer.isSelling = true;
        offer.lease = "lange";
        offer.location = "hier";
        offer.mail = "hans@wurst.de";
        offer.owner = "Bernd Wurst";
        offer.purpose = "";
        offer.size = "1m²";
        offer.comment = "bemerkung";

        String createdText = ProjectOfferHelper.createMailText(offer, null);
        String compareText = createCompareText(true, true, true, true, true, true, false);

        List<String> createdList = cutByNewLines(createdText);
        List<String> compareList = cutByNewLines(compareText);

        for (int i = 0; i < createdList.size(); i++) {
            assertEquals("Mail text isn't equal at line " + i + "!", createdList.get(i), compareList.get(i));
        }
    }

    @Test
    public void testCreateMailTextCommentEmpty() {
        ProjectOfferData offer = new ProjectOfferData();
        offer.first = "Hans";
        offer.name = "Wurst";
        offer.isAfforestation = true;
        offer.isLeasing = true;
        offer.isSelling = true;
        offer.lease = "lange";
        offer.location = "hier";
        offer.mail = "hans@wurst.de";
        offer.owner = "Bernd Wurst";
        offer.purpose = "";
        offer.size = "1m²";
        offer.comment = "";

        String createdText = ProjectOfferHelper.createMailText(offer, null);
        String compareText = createCompareText(true, true, true, true, true, false, false);

        List<String> createdList = cutByNewLines(createdText);
        List<String> compareList = cutByNewLines(compareText);

        for (int i = 0; i < createdList.size(); i++) {
            assertEquals("Mail text isn't equal at line " + i + "!", createdList.get(i), compareList.get(i));
        }
    }

    @Test
    public void testCreateMailTextWithUser() {
        _dbInjecter.injectUser("Hans", "hans@wurst.de");

        User user = _userRepository.findOne(1L);

        ProjectOfferData offer = new ProjectOfferData();
        offer.first = "Hans";
        offer.name = "Wurst";
        offer.isAfforestation = true;
        offer.isLeasing = true;
        offer.isSelling = true;
        offer.lease = "lange";
        offer.location = "hier";
        offer.mail = "hans@wurst.de";
        offer.owner = "Bernd Wurst";
        offer.purpose = "";
        offer.size = "1m²";
        offer.comment = "";

        String createdText = ProjectOfferHelper.createMailText(offer, user);
        String compareText = createCompareText(true, true, true, true, true, false, true);

        List<String> createdList = cutByNewLines(createdText);
        List<String> compareList = cutByNewLines(compareText);

        for (int i = 0; i < createdList.size(); i++) {
            assertEquals("Mail text isn't equal at line " + i + "!", createdList.get(i), compareList.get(i));
        }
    }
    
    @Test 
    public void testCreateSubject(){
        String compareSubject = "[Projekt Angebot] Hans hans@wurst.de";
        String createdSubject = ProjectOfferHelper.createSubject("Hans", "hans@wurst.de");
        
        assertThat(compareSubject).isEqualTo(createdSubject);
    }

    private List<String> cutByNewLines(String s) {
        List<String> stringstoCompare = new ArrayList<>();
        while (s.contains("\n")) {
            String toAdd = s.substring(0, s.indexOf("\n"));
            stringstoCompare.add(toAdd);
            s = s.substring(s.indexOf("\n") + 1);
        }
        return stringstoCompare;
    }

    private String createCompareText(boolean withFirst, boolean afforestation, boolean purposeEmpty, boolean selling, boolean leasing, boolean withComment, boolean withUser) {
        final StringBuilder text = new StringBuilder();

        if (withUser) {
            text.append("User: 'Hans'(hans@wurst.de)[1]\n");
        }

        text.append("Name: Wurst\n");
        if (withFirst) {
            text.append("Vorname: Hans\n");
        }
        text.append("E-Mail: hans@wurst.de\n");
        text.append("Ort: hier\n");
        text.append("Größe: 1m²\n");
        text.append("Eigentümer: Bernd Wurst\n");
        if (afforestation) {
            text.append("Aufforstung: ja\n");
        } else {
            text.append("Aufforstung: nein\n");
        }
        if (!purposeEmpty) {
            text.append("Nutzung: liegt brach\n");
        }
        if (selling) {
            text.append("Verkauf: ja\n");
        } else {
            text.append("Verkauf: nein\n");
        }
        if (leasing) {
            text.append("Pachtverträge: ja\n");
            text.append("Zeit der Pachtverträge: lange\n");
        } else {
            text.append("Pachtverträge: nein\n");
        }
        if (withComment) {
            text.append("Bemerkungen: bemerkung\n");
        }

        return text.toString();
    }

}
