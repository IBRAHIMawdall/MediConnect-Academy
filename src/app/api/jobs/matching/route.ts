import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const jobs = [
    {
      id: "job-ml-health-001",
      title: "Healthcare ML Analyst",
      company: "MediTech Analytics",
      location: "Remote",
      matchScore: 0.82,
      requirements: ["Python", "TensorFlow", "Healthcare datasets"],
    },
    {
      id: "job-bi-health-002",
      title: "Clinical Data BI Specialist",
      company: "CareInsight",
      location: "Hybrid - Dubai",
      matchScore: 0.76,
      requirements: ["SQL", "Tableau", "Clinical KPIs"],
    },
  ];
  return NextResponse.json({ success: true, jobs }, { status: 200 });
}