package org.dicadeveloper.weplantaforest.certificate;

import static org.assertj.core.api.Assertions.assertThat;

import org.dicadeveloper.weplantaforest.common.testSupport.CleanDbRule;
import org.dicadeveloper.weplantaforest.testsupport.DbInjecter;
import org.dicadeveloper.weplantaforest.user.UserRepository;
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
public class CertificateRepositoryIntegrationTest {

    @Rule
    @Autowired
    public CleanDbRule _cleanDbRule;

    @Autowired
    public DbInjecter _dbInjecter;

    @Autowired
    public CertificateRepository _certificateRepository;

    @Autowired
    public UserRepository _userRepository;

    @Test
    public void testGetCertificateByNumber() {
        _dbInjecter.injectUser("Adam");

        Certificate certificate = new Certificate();
        certificate.setCreator(_userRepository.findByName("Adam"));
        certificate.setText("Very happy to save the plaent");
        certificate.setNumber("1-2-3");

        _certificateRepository.save(certificate);

        Certificate savedCertificate = _certificateRepository.findByNumber("1-2-3");

        assertThat(savedCertificate.getCreator().getName()).isEqualTo("Adam");
        assertThat(savedCertificate.getText()).isEqualTo("Very happy to save the plaent");
        assertThat(savedCertificate.getNumber()).isEqualTo("1-2-3");
    }

}
