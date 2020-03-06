package org.dicadeveloper.weplantaforest.certificate;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.cart.CartRepository;
import org.dicadeveloper.weplantaforest.security.TokenAuthenticationService;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CertificateController {

    protected final static Log LOG = LogFactory.getLog(CertificateController.class.getName());

    private @NonNull CertificateRepository _certificateRepository;

    private @NonNull TreeRepository _treeRepository;

    private @NonNull UserRepository _userRepository;

    private @NonNull CartRepository _cartRepository;

    private @NonNull TokenAuthenticationService _tokenAuthenticationService;

    private @NonNull CertificateService _certificateSerivce;

    /*
     * returns a list of trees belonging to the certificate number
     */
    @RequestMapping(value = Uris.CERTIFICATE_SEARCH + "{certificateNumber:.+}", method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    @Transactional
    public ResponseEntity<List<Tree>> findTreesForCertificateNumber(@PathVariable("certificateNumber") String certificateNumber) {
        final String certificateNumberCleaned = certificateNumber.replace("#", "");
        Certificate certificate = _certificateRepository.findByNumber(certificateNumberCleaned);

        if (null != certificate) {
            List<Tree> trees = new ArrayList<>();
            for (Cart cart : certificate.getCarts()) {
                trees.addAll(cart.getTrees());
            }
            return new ResponseEntity<>(trees, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /*
     * returns the summary of the belonging certificate number(creator-name and
     * text)
     */
    @RequestMapping(value = Uris.CERTIFICATE_SUMMARY + "{certificateNumber:.+}", method = RequestMethod.GET)
    @JsonView(Views.CertificateSummary.class)
    public ResponseEntity<Certificate> findCertificateText(@PathVariable("certificateNumber") String certificateNumber) {
        final String certificateNumberCleaned = certificateNumber.replace("#", "");
        Certificate certificate = _certificateRepository.findByNumber(certificateNumberCleaned);

        if (null != certificate) {
            return new ResponseEntity<>(certificate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /*
     * generating an entry into table Certificate
     */
    @RequestMapping(value = Uris.CERTIFICATE_CREATE, method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<?> createCertificate(@RequestHeader(value = "X-AUTH-TOKEN") String userToken, @RequestBody CertificateRequestData requestData) {
        User user = _tokenAuthenticationService.getUserFromToken(userToken);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            Certificate certificate = new Certificate();
            certificate.setCreator(user);
            certificate.setText(requestData.getText());

            List<Cart> carts = _cartRepository.findCartsByIdIn(requestData.getCartIds());

            for (Cart cart : carts) {
                certificate.addCart(cart);
            }

            // generate certificate number
            int certificateCountByUser = _certificateRepository.countCertificatesByUser(user.getId());
            String certificateNumber = certificate.generateAndSetNumber(certificateCountByUser);

            _certificateRepository.save(certificate);
            return new ResponseEntity<>(certificateNumber, HttpStatus.OK);
        }
    }

    /*
     * getting the PDF document belonging to the certificateNumber
     */
    @RequestMapping(value = Uris.CERTIFICATE_PDF + "{certificateNumber:.+}", method = RequestMethod.GET, headers = "Accept=application/pdf")
    @Transactional
    public ResponseEntity<?> getCertificatePdf(HttpServletResponse response, @PathVariable String certificateNumber) {
        certificateNumber = certificateNumber.replace("#", "");
        Certificate certificate = _certificateRepository.findByNumber(certificateNumber);

        if (certificate == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                _certificateSerivce.generatePdf(certificate, response, certificateNumber);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }

    }

}