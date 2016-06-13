package org.dicadeveloper.weplantaforest.certificate;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.dicadeveloper.weplantaforest.admin.codes.Cart;
import org.dicadeveloper.weplantaforest.trees.Tree;
import org.dicadeveloper.weplantaforest.trees.TreeRepository;
import org.dicadeveloper.weplantaforest.views.Views;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class CertificateController {

    private @NonNull CertificateRepository _certificateRepository;
    
    private @NonNull TreeRepository _treeRepository;

    @RequestMapping(value = "/certificate/search/{certificateNumber:.+}", method = RequestMethod.GET)
    @JsonView(Views.PlantedTree.class)
    @Transactional
    public List<Tree> findTreesForCertificateNumber(@PathVariable("certificateNumber") String certificateNumber) {
        certificateNumber = certificateNumber.replace("#", "");
        
        Certificate certificate = _certificateRepository.findByNumber(certificateNumber);
        
        List<Long> treeIds = new ArrayList<>();
        for(Cart cart : certificate.getCarts()){
            treeIds.addAll(cart.getTreeIds());
        }
        
        List<Tree> trees = _treeRepository.findTreesByIdIn(treeIds);
        
        return trees;
    }

}
