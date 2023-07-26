package com.cocochacha.chaeumbackend.repository;

import com.cocochacha.chaeumbackend.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
