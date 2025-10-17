"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type Draft = any;

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("Practical Point-of-Care Ultrasound");
  const [status, setStatus] = useState<string>("");
  const [publishing, setPublishing] = useState<string>("");
  const { toast } = useToast();

  async function loadDrafts() {
    setLoading(true);
    try {
      const res = await fetch("/api/course-drafts");
      const txt = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(txt);
      } catch {
        throw new Error("Unexpected response format while loading drafts.");
      }
      setDrafts(json.drafts || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadDrafts(); }, []);

  async function generateSample() {
    setStatus("Generating...");
    try {
      const res = await fetch("/api/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          category: "Clinical Medicine",
          subCategory: "Radiology",
          targetLevel: "practitioner",
        }),
      });
      const txt = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(txt);
      } catch {
        throw new Error("Unexpected response format from generate endpoint.");
      }
      if (!res.ok) throw new Error(json.error || "Failed to generate");
      setStatus("Generated & saved as draft.");
      await loadDrafts();
    } catch (e: any) {
      setStatus("Error: " + e.message);
    }
  }

  async function publishDraft(id: string) {
    setPublishing(id);
    setStatus("");
    try {
      const res = await fetch("/api/publish-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const txt = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(txt);
      } catch {
        throw new Error("Unexpected response format from publish endpoint.");
      }
      if (!res.ok) throw new Error(json.error || "Failed to publish");
      setStatus("Published successfully.");
      toast({ title: "Published", description: "Draft published successfully." });
      await loadDrafts();
    } catch (e: any) {
      setStatus("Publish error: " + e.message);
      toast({ title: "Publish error", description: e.message, variant: "destructive" });
    } finally {
      setPublishing("");
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Course Drafts Review</h1>
        <Button onClick={loadDrafts} variant="outline">Refresh</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Practical Sample</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" />
          <Button onClick={generateSample}>Generate & Save Draft</Button>
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <p>Loading drafts...</p>
        ) : drafts.length === 0 ? (
          <p>No drafts yet.</p>
        ) : (
          drafts.map((d, idx) => (
            <Card key={d.id || idx}>
              <CardHeader>
                <CardTitle>{d.title || d.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Category: {d.category} / {d.subCategory}</p>
                <p className="text-sm">Updated: {d.updatedAt ? new Date(d.updatedAt).toLocaleString() : ""}</p>
                <p className="text-sm">Quality: {d?.quality?.isSafe === false ? "Issues detected" : "Safe"}</p>
                <p className="text-sm">References: {Array.isArray(d?.references) ? d.references.length : 0}</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={publishing === d.id}
                    >
                      {publishing === d.id ? "Publishing..." : "Publish"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm publish</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will move the draft into the courses catalog.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    {Array.isArray(d?.quality?.issues) && d.quality.issues.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Quality issues:</p>
                        {d.quality.issues.map((q: any, i: number) => (
                          <p key={i} className="text-sm text-muted-foreground">• {q}</p>
                        ))}
                      </div>
                    )}
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => publishDraft(d.id)}>Publish</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}