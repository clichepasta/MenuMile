-- V2__Add_Migrations.sql
-- MenuMile Food Delivery and Rider Logistics Platform - Migrations additions

-- 1. Create learnerCohortMapping (formerly studentClassSectionMapping)
CREATE TABLE IF NOT EXISTS "learnerCohortMapping" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "learnerId" UUID NOT NULL REFERENCES "customer"("id") ON DELETE CASCADE,
    "cohortId" UUID NOT NULL REFERENCES "kitchenStation"("id") ON DELETE CASCADE,
    "branchId" UUID NOT NULL REFERENCES "restaurant"("id") ON DELETE CASCADE,
    "academicYear" INTEGER NOT NULL,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "uq_learnerCohort_year" UNIQUE ("learnerId", "academicYear")
);

-- 2. Create assessmentTemplate (formerly examTemplate)
CREATE TABLE IF NOT EXISTS "assessmentTemplate" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "branchId" UUID NOT NULL REFERENCES "restaurant"("id") ON DELETE CASCADE,
    "examType" VARCHAR(100) NOT NULL,
    "standard" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "templateSchema" JSONB NOT NULL,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "uq_assessmentTemplate_branch_type_std_year" UNIQUE ("branchId", "examType", "standard", "year")
);

-- 3. Create learnerAssessmentMarks (formerly studentExamMarks)
CREATE TABLE IF NOT EXISTS "learnerAssessmentMarks" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "learnerId" UUID NOT NULL REFERENCES "customer"("id") ON DELETE CASCADE,
    "assessmentTemplateId" UUID NOT NULL REFERENCES "assessmentTemplate"("id") ON DELETE CASCADE,
    "marksData" JSONB NOT NULL,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "uq_learnerAssessmentMarks" UNIQUE ("learnerId", "assessmentTemplateId")
);

-- 4. Create restaurantOnboardingQueue (formerly teacherOnboardingQueue)
CREATE TABLE IF NOT EXISTS "restaurantOnboardingQueue" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "restaurantId" UUID NOT NULL REFERENCES "restaurant"("id") ON DELETE CASCADE,
    "branchId" UUID NOT NULL REFERENCES "restaurant"("id") ON DELETE CASCADE,
    "status" VARCHAR(50) DEFAULT 'PENDING',
    "attemptCount" INTEGER DEFAULT 0,
    "nextRetryTime" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "lastError" TEXT,
    "messageId" VARCHAR(255),
    "sentTime" TIMESTAMP WITH TIME ZONE,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "idx_restaurantOnboardingQueue_status_nextRetry" 
ON "restaurantOnboardingQueue" ("status", "nextRetryTime");

-- 5. Create emailLog
CREATE TABLE IF NOT EXISTS "emailLog" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "recipient" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "messageId" VARCHAR(255),
    "error" TEXT,
    "sentTime" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create orderCohort (formerly lectureClassSection)
CREATE TABLE IF NOT EXISTS "orderCohort" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL REFERENCES "order"("id") ON DELETE CASCADE,
    "cohortId" UUID NOT NULL REFERENCES "kitchenStation"("id") ON DELETE CASCADE,
    "totalStudents" INTEGER DEFAULT 0,
    "presentStudents" INTEGER DEFAULT 0,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "uq_orderCohort" UNIQUE ("orderId", "cohortId")
);

-- 7. Create orderActivity (formerly lectureClassActivity)
CREATE TABLE IF NOT EXISTS "orderActivity" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL REFERENCES "order"("id") ON DELETE CASCADE,
    "cohortId" UUID NOT NULL REFERENCES "kitchenStation"("id") ON DELETE CASCADE,
    "activityId" UUID NOT NULL REFERENCES "curriculumActivity"("id") ON DELETE CASCADE,
    "isFinalActivity" BOOLEAN DEFAULT FALSE,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "uq_orderActivity" UNIQUE ("orderId", "cohortId", "activityId")
);

-- 8. Create orderModuleCompletion (formerly lectureUnitCompletion)
CREATE TABLE IF NOT EXISTS "orderModuleCompletion" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL REFERENCES "order"("id") ON DELETE CASCADE,
    "cohortId" UUID NOT NULL REFERENCES "kitchenStation"("id") ON DELETE CASCADE,
    "unitId" UUID NOT NULL REFERENCES "curriculumUnit"("id") ON DELETE CASCADE,
    "completedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "completedBy" UUID NOT NULL,
    "createdBy" UUID,
    "updatedBy" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "uq_orderModuleCompletion" UNIQUE ("orderId", "cohortId", "unitId")
);

-- 9. Create shedlock
CREATE TABLE IF NOT EXISTS "shedlock" (
    "name" VARCHAR(64) PRIMARY KEY,
    "lock_until" TIMESTAMP WITH TIME ZONE NOT NULL,
    "locked_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    "locked_by" VARCHAR(255) NOT NULL
);
