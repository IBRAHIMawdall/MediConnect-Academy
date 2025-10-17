// Shared schemas and server-side prompts
import { ai } from "@/ai/genkit";
import { z } from "genkit";

// Schemas
export const MedicalBackgroundSchema = z.object({
  degree: z.string().optional(),
  specialization: z.string().optional(),
  experience: z.number().optional(),
  currentRole: z.string().optional(),
  currentHospital: z.string().optional(),
  licenses: z.array(z.string()).default([]),
  certificationsHeld: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  region: z.string().optional(),
  preferredShift: z.string().optional(),
  patientFacing: z.boolean().optional(),
  workEnvironment: z.array(z.string()).default([]), // e.g., Hospital, Clinic, Research, Startup, Remote
  clinicalInterests: z.array(z.string()).default([]),
  nonClinicalInterests: z.array(z.string()).default([]),
});

export const CareerGoalsSchema = z.object({
  targetSalary: z.string().or(z.number()).optional(),
  salaryCurrency: z.string().optional(),
  desiredRole: z.string().optional(),
  desiredGeography: z.string().optional(),
  remotePreference: z.string().optional(), // e.g., Remote-first, Hybrid, Onsite-only
  managementPreference: z.string().optional(), // e.g., IC, Managerial
  workLifeBalancePriority: z.number().optional(),
  timeline: z.string().optional(),
});

export const UserProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  medicalBackground: MedicalBackgroundSchema,
  techSkills: z.array(z.string()).default([]),
  techExperience: z
    .object({
      yearsCoding: z.number().optional(),
      stack: z.array(z.string()).default([]),
      dataSkills: z.array(z.string()).default([]),
    })
    .optional(),
  softSkills: z.array(z.string()).default([]),
  constraints: z
    .object({
      timePerWeekHours: z.number().optional(),
      budgetMonthly: z.number().optional(),
    })
    .optional(),
  learningPreferences: z
    .object({
      style: z.string().optional(), // e.g., Video, Text, Hands-on
      pace: z.string().optional(), // e.g., Fast, Moderate, Slow
    })
    .optional(),
  careerGoals: CareerGoalsSchema.optional(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const RecommendedPathSchema = z.object({
  title: z.string(),
  roleSummary: z.string().optional(),
  requiredSkills: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  recommendedCertifications: z.array(z.string()).default([]),
  salaryRange: z.string().optional(),
  timeline: z.string().optional(),
  timelineMonths: z.number().optional(),
  demand: z.string().optional(),
  typicalEmployers: z.array(z.string()).default([]),
  regionFit: z.array(z.string()).default([]),
  remoteEligible: z.boolean().optional(),
  fitScore: z.number().optional(), // 0-100
  demandScore: z.number().optional(),
  salaryScore: z.number().optional(),
  skillGap: z.array(z.string()).default([]),
  rationale: z.string().optional(),
  riskNotes: z.array(z.string()).default([]),
});

export const AssessmentResultSchema = z.object({
  recommendedPaths: z.array(RecommendedPathSchema).default([]),
  reasoning: z.string().optional(),
  bestMatchTitle: z.string().optional(),
  rankingMethod: z.string().optional(),
  scoringExplanation: z.string().optional(),
});
export type AssessmentResult = z.infer<typeof AssessmentResultSchema>;

export const MonthlyPlanItemSchema = z.object({
  month: z.number(),
  objectives: z.array(z.string()).default([]),
  courses: z.array(z.string()).default([]),
  projects: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
});

export const LearningPathSchema = z.object({
  timeline: z.string().optional(),
  monthlyPlan: z.array(MonthlyPlanItemSchema).default([]),
});
export type LearningPath = z.infer<typeof LearningPathSchema>;

// Prompts
export async function analyzeUserProfilePrompt(user: UserProfile) {
  const bg = user?.medicalBackground ?? {};
  const goals = user?.careerGoals ?? {};
  
  const prompt = (
    `Analyze this medical professional's profile and recommend hybrid career paths.\n\n` +
    `Medical Background: degree=${bg.degree ?? ""}, specialization=${bg.specialization ?? ""}, experience=${bg.experience ?? 0} years, role=${bg.currentRole ?? ""}, region=${bg.region ?? ""}\n` +
    `Licenses/Certs: ${(bg.licenses ?? []).join(", ")} | ${(bg.certificationsHeld ?? []).join(", ")}\n` +
    `Languages: ${(bg.languages ?? []).join(", ")} | Interests: ${(bg.clinicalInterests ?? []).join(", ")} / ${(bg.nonClinicalInterests ?? []).join(", ")}\n` +
    `Work Env: ${(bg.workEnvironment ?? []).join(", ")} | Preferred Shift: ${bg.preferredShift ?? ""}\n` +
    `Tech Skills: ${(user?.techSkills ?? []).join(", ")} | Tech Experience: stack=${(user?.techExperience?.stack ?? []).join(", ")}, data=${(user?.techExperience?.dataSkills ?? []).join(", ")}, yearsCoding=${user?.techExperience?.yearsCoding ?? 0}\n` +
    `Soft Skills: ${(user?.softSkills ?? []).join(", ")} | Constraints: hours/week=${user?.constraints?.timePerWeekHours ?? ""}\n` +
    `Career Goals: salary=${String(goals.targetSalary ?? "")} ${goals.salaryCurrency ?? ""}, role=${goals.desiredRole ?? ""}, geography=${goals.desiredGeography ?? ""}, remote=${goals.remotePreference ?? ""}, management=${goals.managementPreference ?? ""}, WLB=${String(goals.workLifeBalancePriority ?? "")}\n\n` +
    `Use a scoring rubric: fitScore (40%), demandScore (25%), salaryScore (20%), constraints/preferences (15%).\n` +
    `Return strictly JSON matching the output schema with 2-3 recommendedPaths, including fitScore, demandScore, salaryScore, skillGap, rationale, riskNotes, and set bestMatchTitle to the highest composite. Provide rankingMethod and scoringExplanation.`
  );
  
  return ai.generate({
    model: "googleai/gemini-2.0-flash-exp",
    prompt,
    output: { schema: AssessmentResultSchema },
  });
}

export async function generateLearningPathPrompt(careerPath: z.infer<typeof RecommendedPathSchema>, user: UserProfile) {
  const prompt = `Create a detailed 6-month learning path for ${user?.medicalBackground?.degree ?? "a healthcare professional"} to become ${careerPath?.title ?? "a target role"}.\n` +
    `Current skills: ${(user?.techSkills ?? []).join(", ")} | Experience: ${user?.medicalBackground?.experience ?? 0} years.\n` +
    `Return strictly JSON with monthlyPlan items (month, objectives, courses, projects, skills).`;
  
  return ai.generate({
    model: "googleai/gemini-2.0-flash-exp",
    prompt,
    output: { schema: LearningPathSchema },
  });
}

// Service functions with fallbacks
export async function analyzeUserProfile(user: UserProfile): Promise<AssessmentResult> {
  try {
    const res = await analyzeUserProfilePrompt(user);
    if (res?.output) {
      return res.output;
    }
    throw new Error("No output from AI model");
  } catch (e) {
    console.warn("analyzeUserProfile fallback:", e);
    return {
      recommendedPaths: [
        {
          title: "Clinical Pharmacy Specialist + Informatics",
          requiredSkills: ["Clinical Pharmacology", "EMR Systems", "Data Analysis"],
          prerequisites: ["Pharmacy degree", "Clinical experience"],
          salaryRange: "35,000-45,000 AED",
          timeline: "6-8 months",
          certifications: ["BCPS", "CPIS"],
          recommendedCertifications: ["Informatics certification"],
          demand: "High",
          typicalEmployers: ["Hospitals", "Health systems", "Pharmacy chains"],
          regionFit: ["Urban areas", "Academic medical centers"],
          fitScore: 78,
          demandScore: 85,
          salaryScore: 70,
          rationale: "Strong overlap with clinical background and interest in EMR.",
          skillGap: ["Advanced SQL", "FHIR interoperability"],
          riskNotes: ["Requires additional training", "Competitive field"],
        },
        {
          title: "Healthcare Data Analyst",
          requiredSkills: ["Python", "SQL", "Medical Statistics"],
          prerequisites: ["Healthcare background", "Basic programming"],
          salaryRange: "30,000-40,000 AED",
          timeline: "8-10 months",
          certifications: ["Healthcare Analytics"],
          recommendedCertifications: ["Data Science certification"],
          demand: "Growing",
          typicalEmployers: ["Hospitals", "Consulting firms", "Health tech companies"],
          regionFit: ["Major cities", "Healthcare hubs"],
          fitScore: 74,
          demandScore: 80,
          salaryScore: 68,
          rationale: "Good fit for tech skills and analytical interests.",
          skillGap: ["Dashboarding best practices", "Statistical modeling"],
          riskNotes: ["Steep learning curve", "Requires statistical knowledge"],
        },
      ],
      reasoning: "Fallback recommendations due to AI unavailability.",
      bestMatchTitle: "Clinical Pharmacy Specialist + Informatics",
      rankingMethod: "Weighted composite: fit 40%, demand 25%, salary 20%, constraints 15%",
      scoringExplanation: "Scores estimated from background alignment and market demand.",
    };
  }
}

export async function generateLearningPath(
  careerPath: z.infer<typeof RecommendedPathSchema>,
  user: UserProfile
): Promise<LearningPath> {
  try {
    // Provide defensive defaults to avoid runtime TypeErrors if callers pass undefined
    const safeUser: UserProfile = {
      name: user?.name,
      email: user?.email,
      medicalBackground: user?.medicalBackground ?? {},
      techSkills: user?.techSkills ?? [],
      softSkills: user?.softSkills ?? [],
      techExperience: user?.techExperience ?? { stack: [], dataSkills: [], yearsCoding: 0 },
      constraints: user?.constraints ?? { timePerWeekHours: undefined },
      careerGoals: user?.careerGoals ?? {},
    } as UserProfile;

    const safePath = {
      title: careerPath?.title ?? "Target Role",
      requiredSkills: careerPath?.requiredSkills ?? [],
      salaryRange: careerPath?.salaryRange,
      timeline: careerPath?.timeline,
      certifications: careerPath?.certifications ?? [],
      demand: careerPath?.demand,
      fitScore: careerPath?.fitScore ?? 0,
      demandScore: careerPath?.demandScore ?? 0,
      salaryScore: careerPath?.salaryScore ?? 0,
      rationale: careerPath?.rationale,
      skillGap: careerPath?.skillGap ?? [],
      riskNotes: careerPath?.riskNotes ?? [],
    } as z.infer<typeof RecommendedPathSchema>;

    const res = await generateLearningPathPrompt(safePath, safeUser);
    if (res?.output) {
      return res.output;
    }
    throw new Error("No output from AI model");

    // If the model did not return output, fall back gracefully
    console.warn("generateLearningPath: empty output; returning fallback");
    return {
      timeline: "6 months",
      monthlyPlan: [
        {
          month: 1,
          objectives: ["Foundation in Clinical Pharmacology", "Basic Data Analysis"],
          courses: ["Advanced Clinical Pharmacology", "Healthcare Data Basics"],
          projects: ["Medication Review Project"],
          skills: ["Drug Interaction Analysis", "Excel for Healthcare"],
        },
        {
          month: 2,
          objectives: ["Specialized Pharmacology", "EMR Systems"],
          courses: ["Infectious Diseases Pharmacotherapy", "EMR Management"],
          projects: ["EMR Optimization Proposal"],
          skills: ["Protocol Development", "System Customization"],
        },
      ],
    };
  } catch (e) {
    console.warn("generateLearningPath fallback:", e);
    return {
      timeline: "6 months",
      monthlyPlan: [
        {
          month: 1,
          objectives: ["Foundation in Clinical Pharmacology", "Basic Data Analysis"],
          courses: ["Advanced Clinical Pharmacology", "Healthcare Data Basics"],
          projects: ["Medication Review Project"],
          skills: ["Drug Interaction Analysis", "Excel for Healthcare"],
        },
        {
          month: 2,
          objectives: ["Specialized Pharmacology", "EMR Systems"],
          courses: ["Infectious Diseases Pharmacotherapy", "EMR Management"],
          projects: ["EMR Optimization Proposal"],
          skills: ["Protocol Development", "System Customization"],
        },
      ],
    };
  }
}