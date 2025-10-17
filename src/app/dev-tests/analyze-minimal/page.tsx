"use client";
import { useEffect, useState } from "react";

export default function AnalyzeMinimalTestPage() {
  const [status, setStatus] = useState<number | null>(null);
  const [body, setBody] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/career/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ medicalBackground: {} }),
        });
        if (cancelled) return;
        setStatus(res.status);
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          if (!cancelled) setBody(json);
        } catch {
          if (!cancelled) setBody(text);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Minimal Analyze API Test</h1>
      <p>This page posts a minimal payload to <code>/api/career/analyze</code> and shows the raw result.</p>
      <div style={{ marginTop: 12 }}>
        <strong>Status:</strong> {status ?? "(pending)"}
      </div>
      {error && (
        <div style={{ color: "#c00", marginTop: 8 }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      <pre style={{ marginTop: 12, background: "#f6f6f6", padding: 12, borderRadius: 6, overflowX: "auto" }}>
        {body ? (typeof body === "string" ? body : JSON.stringify(body, null, 2)) : "(waiting for response...)"}
      </pre>
    </div>
  );
}