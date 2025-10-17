"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function CreateCoursePage() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [level, setLevel] = useState<"student" | "resident" | "practitioner">("practitioner");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, category, subCategory, targetLevel: level }),
      });
      // Guard against HTML error bodies masquerading as JSON
      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Unexpected response format. Please try again.");
      }
      if (!res.ok) throw new Error(data?.error || "Failed to generate");
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Medical Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Course topic (e.g., Advanced Echocardiography)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Category (optional)" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Input placeholder="SubCategory (optional)" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
            <select
              className="border rounded px-3 py-2"
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
            >
              <option value="student">Student</option>
              <option value="resident">Resident</option>
              <option value="practitioner">Practitioner</option>
            </select>
          </div>
          <Button onClick={handleGenerate} disabled={loading || !topic}>
            {loading ? (
              <span className="inline-flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Generating...</span>
            ) : (
              "Generate"
            )}
          </Button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm whitespace-pre-wrap break-words">{JSON.stringify(result, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}