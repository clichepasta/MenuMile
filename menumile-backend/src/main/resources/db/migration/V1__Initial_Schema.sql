-- V1__Initial_Schema.sql
-- MenuMile Food Delivery and Rider Logistics Platform

CREATE TABLE IF NOT EXISTS "restaurant" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "contactNumber" VARCHAR(20) UNIQUE NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "address" TEXT,
    "pincode" VARCHAR(10),
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "userInfo" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "firstName" VARCHAR(100) NOT NULL,
    "middleName" VARCHAR(100),
    "surname" VARCHAR(100) NOT NULL,
    "contactNumber" VARCHAR(20) UNIQUE NOT NULL,
    "whatsappNumber" VARCHAR(20),
    "email" VARCHAR(255),
    "panCard" VARCHAR(20),
    "bankName" VARCHAR(100),
    "accountNumber" VARCHAR(50),
    "ifscCode" VARCHAR(20),
    "branchName" VARCHAR(100),
    "profilePhotoUrl" VARCHAR(512),
    "panCardUrl" VARCHAR(512),
    "cancelledChequeUrl" VARCHAR(512),
    "teachingSince" INTEGER, -- Mapped to 'activeSince' or general experience year
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "userLogin" (
    "id" UUID PRIMARY KEY REFERENCES "userInfo"("id") ON DELETE CASCADE,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(20) UNIQUE NOT NULL,
    "isFirstLogin" BOOLEAN DEFAULT TRUE,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "rolesMaster" (
    "uuid" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "role_name" VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "userRoleMapping" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "schoolId" UUID REFERENCES "restaurant"("id") ON DELETE SET NULL, -- Reused 'schoolId' for restaurant reference
    "roleId" UUID NOT NULL REFERENCES "rolesMaster"("uuid") ON DELETE CASCADE,
    "userId" UUID NOT NULL REFERENCES "userInfo"("id") ON DELETE CASCADE,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "kitchenStation" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL REFERENCES "restaurant"("id") ON DELETE CASCADE,
    "standard" INTEGER, -- Grade/Difficulty Level of Station
    "section" VARCHAR(50) NOT NULL, -- e.g., 'Prep', 'Grill', 'Beverage'
    "totalStudents" INTEGER DEFAULT 0, -- Reused for capacity limit or count
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "customer" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "firstName" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "fullName" VARCHAR(200) NOT NULL,
    "guardianName" VARCHAR(200),
    "guardianContact" VARCHAR(20),
    "gender" VARCHAR(20),
    "dob" DATE,
    "whatsappNumber" VARCHAR(20),
    "schoolId" UUID REFERENCES "restaurant"("id") ON DELETE SET NULL,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "trainerCohortMapping" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "teacherId" UUID NOT NULL REFERENCES "userInfo"("id") ON DELETE CASCADE,
    "classSectionId" UUID NOT NULL REFERENCES "kitchenStation"("id") ON DELETE CASCADE,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "curriculumUnit" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "standard" INTEGER,
    "subject" VARCHAR(100),
    "unitNumber" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "curriculumActivity" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "unitId" UUID NOT NULL REFERENCES "curriculumUnit"("id") ON DELETE CASCADE,
    "activityNumber" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "unitCohortMapping" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "unitId" UUID NOT NULL REFERENCES "curriculumUnit"("id") ON DELETE CASCADE,
    "classSectionId" UUID NOT NULL REFERENCES "kitchenStation"("id") ON DELETE CASCADE,
    "completedAt" TIMESTAMP WITH TIME ZONE,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "riderShiftSchedule" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL REFERENCES "restaurant"("id") ON DELETE CASCADE,
    "classSectionId" UUID NOT NULL REFERENCES "kitchenStation"("id") ON DELETE CASCADE,
    "subject" VARCHAR(100), -- shift details/name
    "recurrenceRule" TEXT NOT NULL, -- RRULE string
    "startTime" VARCHAR(10) NOT NULL, -- "HH:mm"
    "endTime" VARCHAR(10) NOT NULL, -- "HH:mm"
    "assignedTeacherId" UUID REFERENCES "userInfo"("id") ON DELETE SET NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "status" VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "order" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "schoolId" UUID NOT NULL REFERENCES "restaurant"("id") ON DELETE CASCADE,
    "classSectionId" UUID REFERENCES "kitchenStation"("id") ON DELETE SET NULL,
    "teacher1Id" UUID REFERENCES "userInfo"("id") ON DELETE SET NULL,
    "teacher2Id" UUID REFERENCES "userInfo"("id") ON DELETE SET NULL,
    "startTime" TIMESTAMP WITH TIME ZONE NOT NULL,
    "endTime" TIMESTAMP WITH TIME ZONE NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "activities" TEXT, -- Legacy string representation
    "activityId" UUID, -- Legacy single activity
    "unitId" UUID REFERENCES "curriculumUnit"("id") ON DELETE SET NULL, -- Legacy single unit
    "totalStudents" INTEGER DEFAULT 0,
    "presentStudents" INTEGER DEFAULT 0,
    "photoOfDayUrl" VARCHAR(512), -- Delivery photo
    "lectureDetails" JSONB, -- Order/Delivery metadata
    "fellowVisitNote" TEXT, -- Quality auditor visit notes
    "cyclicScheduleId" UUID REFERENCES "riderShiftSchedule"("id") ON DELETE SET NULL,
    "isAutoGenerated" BOOLEAN DEFAULT FALSE,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
