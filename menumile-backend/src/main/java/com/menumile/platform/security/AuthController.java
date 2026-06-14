package com.menumile.platform.security;

import com.menumile.platform.security.jwt.JwtTokenProvider;
import com.menumile.platform.security.user.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String jwt = jwtTokenProvider.generateToken(userPrincipal);

        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", jwt);

        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("id", userPrincipal.getId().toString());
        userDetails.put("email", userPrincipal.getEmail());
        userDetails.put("role", userPrincipal.getRole().toUpperCase()); // Convert to match frontend role names
        userDetails.put("name", "System Admin"); // Default name for master admin
        if (userPrincipal.getBranchId() != null) {
            userDetails.put("branchId", userPrincipal.getBranchId().toString());
        }
        
        response.put("user", userDetails);

        return ResponseEntity.ok(response);
    }

    public static class LoginRequest {
        private String email;
        private String password;

        // Getters and Setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
