package com.menumile.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MMApplication {
    public static void main(String[] args) {
        SpringApplication.run(MMApplication.class, args);
    }
}
