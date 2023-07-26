package com.cocochacha.chaeumbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ChaeumBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChaeumBackendApplication.class, args);
    }

}
