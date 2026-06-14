package com.menumile.platform.security.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public UserDetails loadUserByUsername(String usernameOrPhone) throws UsernameNotFoundException {
        String query = """
            SELECT ul.id, ul.email, ul.password, urm."schoolId", rm.role_name
            FROM "userLogin" ul
            LEFT JOIN "userRoleMapping" urm ON ul.id = urm."userId" AND urm."isActive" = TRUE
            LEFT JOIN "rolesMaster" rm ON urm."roleId" = rm.uuid
            WHERE ul.email = ? OR ul."phoneNumber" = ?
            LIMIT 1
        """;

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query, usernameOrPhone, usernameOrPhone);

        if (rows.isEmpty()) {
            throw new UsernameNotFoundException("User not found with identifier: " + usernameOrPhone);
        }

        Map<String, Object> row = rows.get(0);
        UUID id = (UUID) row.get("id");
        String email = (String) row.get("email");
        String password = (String) row.get("password");
        String roleName = (String) row.get("role_name");
        UUID schoolId = (UUID) row.get("schoolId"); // Mapped as branchId/schoolId

        if (roleName == null) {
            roleName = "customer"; // Default fallback role
        }

        return new UserPrincipal(id, email, password, roleName, schoolId);
    }
}
