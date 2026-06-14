package com.menumile.platform.security.eval;

import com.menumile.platform.security.user.UserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component("restaurantAccess")
public class RestaurantAccessEvaluator {

    public boolean hasAccess(Authentication authentication, Object restaurantIdObj) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        Object principalObj = authentication.getPrincipal();
        if (!(principalObj instanceof UserPrincipal principal)) {
            return false;
        }

        // Global admin has access to everything
        if (principal.getRole().equalsIgnoreCase("admin")) {
            return true;
        }

        if (restaurantIdObj == null) {
            return false;
        }

        UUID restaurantId;
        if (restaurantIdObj instanceof UUID) {
            restaurantId = (UUID) restaurantIdObj;
        } else if (restaurantIdObj instanceof String) {
            try {
                restaurantId = UUID.fromString((String) restaurantIdObj);
            } catch (IllegalArgumentException e) {
                return false;
            }
        } else {
            return false;
        }

        // Enforce branch-scoped tenant check
        return restaurantId.equals(principal.getBranchId());
    }
}
