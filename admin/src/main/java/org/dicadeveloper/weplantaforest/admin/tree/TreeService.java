package org.dicadeveloper.weplantaforest.admin.tree;

import java.util.List;

import org.dicadeveloper.weplantaforest.admin.user.User;
import org.dicadeveloper.weplantaforest.admin.user.UserRepository;
import org.dicadeveloper.weplantaforest.common.errorHandling.ErrorCodes;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatException;
import org.dicadeveloper.weplantaforest.common.errorHandling.IpatPreconditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired) )
public class TreeService {

    private @NonNull UserRepository _userRepository;
    private @NonNull TreeRepository _treeRepository;
    
    public void transformTrees(Long fromUserId, Long toUserId) throws IpatException{
        User fromUser = _userRepository.findById(fromUserId).orElse(null);
        User toUser = _userRepository.findById(toUserId).orElse(null);
        IpatPreconditions.checkNotNull(fromUser, ErrorCodes.USER_NOT_FOUND);
        IpatPreconditions.checkNotNull(toUser, ErrorCodes.USER_NOT_FOUND);
        
        List<Tree> treesToTransform = _treeRepository.findByOwner(fromUser);
        if(treesToTransform != null && treesToTransform.size() > 0) {
            for(Tree tree : treesToTransform) {
                tree.setOwner(toUser);
           }
            _treeRepository.saveAll(treesToTransform);
        }                                
    }
}
