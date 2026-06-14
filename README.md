# MenuMile: Enterprise Multi-Tenant Food Delivery & Rider Operations Monolith

This project is an enterprise-grade food delivery and rider scheduling platform built using Java 21, Spring Boot, React, and PostgreSQL.

---

## 1. Technical Features Overview

MenuMile replicates the same "deep" enterprise engineering constraints of the modular monolith:
1. **Idempotent Shift Generation:** Uses RFC 5545 Recurrence Rules (`org.dmfs:rfc5545-datetime`) to expand recurring rider shifts into concrete shift slots over a 28-day rolling window, preventing duplicate slots.
2. **Shift Claiming Mechanics:** Allows delivery partners to claim open shifts scoped to their regions, enforcing verification checks.
3. **Multi-Station Order Lifecycle:** A single order contains multiple items prepared across different kitchen stations. Toggling preparation status updates the order state transactionally.
4. **ShedLock Distributed Synchronization:** Multi-instance safe scheduler executions for shift generation, automated rider payout calculations, and onboarding queues.
5. **Tenant Isolation:** Enforces strict role and tenant boundaries (e.g., restaurant staff can only access orders for their specific branch, delivery partners only see assigned deliveries).

---

## 2. Project Structure

```text
menumile-backend
├── pom.xml
├── mvnw
├── mvnw.cmd
├── .mvn/
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── menumile
    │   │           └── platform
    │   │               ├── MMApplication.java
    │   │               ├── common
    │   │               │   ├── exception
    │   │               │   │   ├── GlobalExceptionHandler.java
    │   │               │   │   └── ResourceNotFoundException.java
    │   │               │   ├── model
    │   │               │   │   └── BaseAuditEntity.java
    │   │               │   ├── service
    │   │               │   │   ├── FileStorageService.java
    │   │               │   │   └── LocalFileStorageServiceImpl.java
    │   │               │   └── util
    │   │               │       └── SecurityUtils.java
    │   │               ├── config
    │   │               │   ├── ShedLockConfig.java
    │   │               │   └── OpenApiConfig.java
    │   │               ├── security
    │   │               │   ├── SecurityConfig.java
    │   │               │   ├── jwt
    │   │               │   │   ├── JwtAuthenticationFilter.java
    │   │               │   │   └── JwtTokenProvider.java
    │   │               │   ├── eval
    │   │               │   │   └── RestaurantAccessEvaluator.java
    │   │               │   └── user
    │   │               │       ├── CustomUserDetailsService.java
    │   │               │       └── UserPrincipal.java
    │   │               ├── auth
    │   │               │   ├── controller
    │   │               │   │   └── AuthController.java
    │   │               │   ├── dto
    │   │               │   │   ├── LoginRequest.java
    │   │               │   │   ├── LoginResponse.java
    │   │               │   │   ├── RestaurantRegistrationRequest.java
    │   │               │   │   └── ChangePasswordRequest.java
    │   │               │   ├── service
    │   │               │   │   └── AuthService.java
    │   │               │   └── mapper
    │   │               │       └── AuthMapper.java
    │   │               ├── identity
    │   │               │   ├── model
    │   │               │   │   ├── UserInfo.java
    │   │               │   │   ├── UserLogin.java
    │   │               │   │   ├── RoleMaster.java
    │   │               │   │   └── UserRoleMapping.java
    │   │               │   └── repository
    │   │               │       ├── UserInfoRepository.java
    │   │               │       ├── UserLoginRepository.java
    │   │               │       ├── RoleMasterRepository.java
    │   │               │       └── UserRoleMappingRepository.java
    │   │               ├── restaurant
    │   │               │   ├── model
    │   │               │   │   ├── Restaurant.java
    │   │               │   │   ├── KitchenStation.java
    │   │               │   │   ├── MenuItem.java
    │   │               │   │   └── StationStaffMapping.java
    │   │               │   └── repository
    │   │               │       ├── RestaurantRepository.java
    │   │               │       ├── KitchenStationRepository.java
    │   │               │       └── MenuItemRepository.java
    │   │               ├── scheduling
    │   │               │   ├── model
    │   │               │   │   ├── RiderShiftSchedule.java
    │   │               │   │   └── RiderShiftSlot.java
    │   │               │   └── repository
    │   │               │       ├── RiderShiftScheduleRepository.java
    │   │               │       └── RiderShiftSlotRepository.java
    │   │               │   ├── service
    │   │               │   │   └── ShiftScheduleService.java
    │   │               │   └── job
    │   │               │       └── ShiftGenerationJob.java
    │   │               ├── order
    │   │               │   ├── model
    │   │               │   │   ├── Order.java
    │   │               │   │   ├── OrderLineItem.java
    │   │               │   │   ├── ItemPrepTask.java
    │   │               │   │   └── StationCompletion.java
    │   │               │   └── repository
    │   │               │       ├── OrderRepository.java
    │   │               │       └── StationCompletionRepository.java
    │   │               │   └── service
    │   │               │       └── OrderService.java
    │   │               ├── review
    │   │               │   ├── model
    │   │               │   │   ├── ReviewTemplate.java
    │   │               │   │   └── CustomerReview.java
    │   │               │   └── repository
    │   │               │       ├── ReviewTemplateRepository.java
    │   │               │       └── CustomerReviewRepository.java
    │   │               └── notification
    │   │                   ├── model
    │   │                   │   ├── RestaurantOnboardingQueue.java
    │   │                   │   └── EmailLog.java
    │   │                   ├── repository
    │   │                   │   ├── RestaurantOnboardingQueueRepository.java
    │   │                   │   └── EmailLogRepository.java
    │   │                   ├── service
    │   │                   │   ├── EmailService.java
    │   │                   │   └── OnboardingNotificationService.java
    │   │                   └── job
    │   │                       └── RestaurantOnboardingJob.java
    │   └── resources
    │       ├── application.yml
    │       ├── application-dev.yml
    │       ├── application-prod.yml
    │       ├── application-test.yml
    │       └── db
    │           └── migration
    │               ├── V1__Initial_Schema.sql
    │               └── V2__Add_Migrations.sql
```

---

## 3. Operational Commands

### Compile and Test
```bash
./mvnw clean test
```

### Build Package
```bash
./mvnw clean package
```

### Run Local Database
```bash
docker-compose up -d
```
