package com.vedant.invoicegeneratorapi.controller;

import com.vedant.invoicegeneratorapi.entity.User;
import com.vedant.invoicegeneratorapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication; // <-- Correct import
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public User createOrUpdateUser(@RequestBody User user, Authentication authentication) {
            try {
                if (!authentication.getName().equals(user.getClerkId())) {
                    throw new ResponseStatusException(
                            HttpStatus.FORBIDDEN,
                            "User does not have access"
                    );
                }
                return userService.saveOrUpdateUser(user);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

