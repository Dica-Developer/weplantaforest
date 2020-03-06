package org.dicadeveloper.weplantaforest.security;

import org.dicadeveloper.weplantaforest.user.User;
import org.dicadeveloper.weplantaforest.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    private final AccountStatusUserDetailsChecker detailsChecker = new AccountStatusUserDetailsChecker();

    @Override
    public final User loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = userRepo.findByName(username);
        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }
        detailsChecker.check(user);
        updateLastVisit(user);
        return user;
    }

    private void updateLastVisit(User user) {
        user.setLastVisit(System.currentTimeMillis());
        userRepo.save(user);
    }

    public final String getUsernameByEmail(String email) {
        final User user = userRepo.findByEmail(email);
        if (user != null) {
            return user.getName();
        }
        return null;
    }
}