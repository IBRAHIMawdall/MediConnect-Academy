"use client";
import React from "react";

export default function LearningPathMinimalTest() {
  const [result, setResult] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setError("");
      setResult("");
      const payload = {
        careerPath: {
          title: "Healthcare Data Analyst",
        },
        user: {
          name: "Test User",
          email: "test@example.com",
          medicalBackground: {},
        },
      };
      try {
        const res = await fetch("/api/career/learning-path", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const text = await res.text();
        if (!cancelled) setResult(text);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || String(e));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Learning Path Minimal Test</h1>
      {error && <pre style={{ color: "red" }}>{error}</pre>}
      <pre>{result}</pre>
    </div>
  );
}