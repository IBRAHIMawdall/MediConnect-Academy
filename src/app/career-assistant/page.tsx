"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Assessment = {
  recommendedPaths: { 
    title: string; 
    requiredSkills: string[]; 
    timeline?: string; 
    certifications?: string[]; 
    salaryRange?: string;
    fitScore?: number;
    demandScore?: number;
    salaryScore?: number;
    rationale?: string;
  }[];
  reasoning?: string;
};

type LearningPath = {
  timeline?: string;
  monthlyPlan: { month: number; objectives: string[]; courses: string[]; projects: string[]; skills: string[] }[];
};

export default function CareerAssistantPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState<number>(0);
  const [licenses, setLicenses] = useState("");
  const [certificationsHeld, setCertificationsHeld] = useState("");
  const [languages, setLanguages] = useState("");
  const [region, setRegion] = useState("");
  const [preferredShift, setPreferredShift] = useState("");
  const [workEnvironment, setWorkEnvironment] = useState("");
  const [clinicalInterests, setClinicalInterests] = useState("");
  const [nonClinicalInterests, setNonClinicalInterests] = useState("");
  const [techSkills, setTechSkills] = useState("");
  const [yearsCoding, setYearsCoding] = useState<number>(0);
  const [stack, setStack] = useState("");
  const [dataSkills, setDataSkills] = useState("");
  const [softSkills, setSoftSkills] = useState("");
  const [timePerWeekHours, setTimePerWeekHours] = useState<number>(0);
  const [budgetMonthly, setBudgetMonthly] = useState<number>(0);
  const [salaryCurrency, setSalaryCurrency] = useState("");
  const [desiredRole, setDesiredRole] = useState("");
  const [desiredGeography, setDesiredGeography] = useState("");
  const [remotePreference, setRemotePreference] = useState("");
  const [managementPreference, setManagementPreference] = useState("");
  const [workLifeBalancePriority, setWorkLifeBalancePriority] = useState<number>(5);

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration to prevent mismatch errors
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Parse helper: supports newline, comma, and strips numeric prefixes like `1.` or `1)`
  const parseList = (text: string): string[] =>
    text
      .split(/\n|,/)
      .map((s) => s.replace(/^\s*\d+[\.\)]\s*/, '').trim())
      .filter(Boolean);

  const startAssessment = async () => {
    setLoading(true); setError(null); setLearningPath(null);
    try {
      const res = await fetch("/api/career/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          medicalBackground: {
            degree,
            specialization,
            experience,
            currentRole: "",
            licenses: parseList(licenses),
            certificationsHeld: parseList(certificationsHeld),
            languages: parseList(languages),
            region,
            preferredShift,
            workEnvironment: parseList(workEnvironment),
            clinicalInterests: parseList(clinicalInterests),
            nonClinicalInterests: parseList(nonClinicalInterests),
          },
          techSkills: parseList(techSkills),
          techExperience: {
            yearsCoding,
            stack: parseList(stack),
            dataSkills: parseList(dataSkills),
          },
          softSkills: parseList(softSkills),
          constraints: { timePerWeekHours, budgetMonthly },
          careerGoals: {
            desiredRole,
            desiredGeography,
            remotePreference,
            managementPreference,
            workLifeBalancePriority,
            salaryCurrency,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to analyze");
      setAssessment(json.assessment);
    } catch (e: any) {
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const buildLearningPath = async (title: string) => {
    if (!assessment) return;
    setLoading(true); setError(null);
    try {
      const careerPath = assessment.recommendedPaths.find(p => p.title === title);
      if (!careerPath) throw new Error("Career path not found");
      const res = await fetch("/api/career/learning-path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerPath,
          user: {
            name,
            email,
            medicalBackground: {
              degree,
              specialization,
              experience,
              currentRole: "",
              licenses: parseList(licenses),
              certificationsHeld: parseList(certificationsHeld),
              languages: parseList(languages),
              region,
              preferredShift,
              workEnvironment: parseList(workEnvironment),
              clinicalInterests: parseList(clinicalInterests),
              nonClinicalInterests: parseList(nonClinicalInterests),
            },
            techSkills: parseList(techSkills),
            techExperience: {
              yearsCoding,
              stack: parseList(stack),
              dataSkills: parseList(dataSkills),
            },
            softSkills: parseList(softSkills),
            constraints: { timePerWeekHours, budgetMonthly },
            careerGoals: {
              desiredRole,
              desiredGeography,
              remotePreference,
              managementPreference,
              workLifeBalancePriority,
              salaryCurrency,
            },
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to generate learning path");
      setLearningPath(json.learningPath);
    } catch (e: any) {
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  // Prevent hydration mismatch by not rendering form until hydrated
  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Career Assessment</CardTitle>
            <CardDescription>
              Loading...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Career Assessment</CardTitle>
          <CardDescription>
            Most fields are optional. Email is recommended for saving results. For list inputs, enter one item per line or use commas; numbering like "1)" or "1." is fine.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Full Name (optional, e.g., Jane Doe)" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Email (recommended, e.g., jane@clinic.com)" value={email} onChange={e => setEmail(e.target.value)} />
            <Input placeholder="Degree (optional, e.g., RN, PharmD, MD)" value={degree} onChange={e => setDegree(e.target.value)} />
            <Input placeholder="Specialization (optional, e.g., Cardiology, Informatics)" value={specialization} onChange={e => setSpecialization(e.target.value)} />
            <Input type="number" placeholder="Years of Experience (optional, e.g., 5)" value={experience} onChange={e => setExperience(Number(e.target.value) || 0)} />
            <Textarea placeholder="Licenses (one per line; e.g., RN, DHA License)" value={licenses} onChange={e => setLicenses(e.target.value)} />
            <Textarea placeholder="Certifications (one per line; e.g., BCPS, CPEN)" value={certificationsHeld} onChange={e => setCertificationsHeld(e.target.value)} />
            <Textarea placeholder="Languages (one per line; e.g., English, Arabic)" value={languages} onChange={e => setLanguages(e.target.value)} />
            <Input placeholder="Region (optional; e.g., UAE, US-CA)" value={region} onChange={e => setRegion(e.target.value)} />
            <Input placeholder="Preferred Shift (optional; e.g., Day, Night)" value={preferredShift} onChange={e => setPreferredShift(e.target.value)} />
            <Textarea placeholder="Work Environments (one per line; e.g., Hospital, Clinic, Research)" value={workEnvironment} onChange={e => setWorkEnvironment(e.target.value)} />
            <Textarea placeholder="Clinical Interests (one per line; e.g., Cardio, Oncology)" value={clinicalInterests} onChange={e => setClinicalInterests(e.target.value)} />
            <Textarea placeholder="Non-Clinical Interests (one per line; e.g., Product, Teaching)" value={nonClinicalInterests} onChange={e => setNonClinicalInterests(e.target.value)} />
            <Textarea placeholder="Tech Skills (one per line; e.g., Python, SQL, EMR)" value={techSkills} onChange={e => setTechSkills(e.target.value)} />
            <Input type="number" placeholder="Years Coding (optional; e.g., 2)" value={yearsCoding} onChange={e => setYearsCoding(Number(e.target.value) || 0)} />
            <Textarea placeholder="Tech Stack (one per line; e.g., React, Node.js)" value={stack} onChange={e => setStack(e.target.value)} />
            <Textarea placeholder="Data Skills (one per line; e.g., Pandas, Power BI)" value={dataSkills} onChange={e => setDataSkills(e.target.value)} />
            <Textarea placeholder="Soft Skills (one per line; e.g., Communication, Leadership)" value={softSkills} onChange={e => setSoftSkills(e.target.value)} />
            <Input type="number" placeholder="Hours per week (optional; e.g., 8)" value={timePerWeekHours} onChange={e => setTimePerWeekHours(Number(e.target.value) || 0)} />
            <Input type="number" placeholder="Monthly budget (optional; e.g., 200)" value={budgetMonthly} onChange={e => setBudgetMonthly(Number(e.target.value) || 0)} />
            <Input placeholder="Desired Role (optional; e.g., Health Informatics Specialist)" value={desiredRole} onChange={e => setDesiredRole(e.target.value)} />
            <Input placeholder="Desired Geography (optional; e.g., Abu Dhabi, Remote)" value={desiredGeography} onChange={e => setDesiredGeography(e.target.value)} />
            <Input placeholder="Remote Preference (optional; e.g., Remote-first, Hybrid)" value={remotePreference} onChange={e => setRemotePreference(e.target.value)} />
            <Input placeholder="Management Preference (optional; e.g., IC, Managerial)" value={managementPreference} onChange={e => setManagementPreference(e.target.value)} />
            <Input type="number" placeholder="Work-life balance (1-10; optional; e.g., 7)" value={workLifeBalancePriority} onChange={e => setWorkLifeBalancePriority(Number(e.target.value) || 5)} />
            <Input placeholder="Salary Currency (optional; e.g., AED, USD)" value={salaryCurrency} onChange={e => setSalaryCurrency(e.target.value)} />
          </div>
          <Button onClick={startAssessment} disabled={loading}>Start Assessment</Button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </CardContent>
      </Card>

      {assessment && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Paths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assessment.recommendedPaths.map((p) => (
              <div key={p.title} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-muted-foreground">Skills:</p>
                    <ol className="list-decimal pl-5 text-sm text-muted-foreground">
                      {p.requiredSkills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ol>
                    {p.fitScore !== undefined && (
                      <p className="text-sm">Fit Score: {p.fitScore} | Demand: {p.demandScore ?? "N/A"} | Salary: {p.salaryScore ?? "N/A"}</p>
                    )}
                    {p.rationale && (
                      <p className="text-xs text-muted-foreground">Rationale: {p.rationale}</p>
                    )}
                  </div>
                  <Button variant="secondary" onClick={() => buildLearningPath(p.title)} disabled={loading}>Build Learning Path</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {learningPath && (
        <Card>
          <CardHeader>
            <CardTitle>Learning Path</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Timeline: {learningPath.timeline ?? "N/A"}</p>
            {learningPath.monthlyPlan.map((m) => (
              <div key={m.month} className="border rounded p-3">
                <p className="font-semibold">Month {m.month}</p>
                <p className="text-sm font-medium">Objectives:</p>
                <ol className="list-decimal pl-5 text-sm">
                  {m.objectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ol>
                <p className="text-sm font-medium mt-2">Courses:</p>
                <ol className="list-decimal pl-5 text-sm">
                  {m.courses.map((course, idx) => (
                    <li key={idx}>{course}</li>
                  ))}
                </ol>
                <p className="text-sm font-medium mt-2">Projects:</p>
                <ol className="list-decimal pl-5 text-sm">
                  {m.projects.map((proj, idx) => (
                    <li key={idx}>{proj}</li>
                  ))}
                </ol>
                <p className="text-sm font-medium mt-2">Skills:</p>
                <ol className="list-decimal pl-5 text-sm">
                  {m.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ol>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}