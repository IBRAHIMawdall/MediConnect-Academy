'use client';

import React from 'react';

export default function CourseGeneratorMinimal() {
  const [topic, setTopic] = React.useState('Point-of-care ultrasound');
  const [category, setCategory] = React.useState('Clinical Medicine');
  const [subCategory, setSubCategory] = React.useState('Radiology');
  const [targetLevel, setTargetLevel] = React.useState<'student' | 'resident' | 'practitioner'>('practitioner');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any>(null);

  async function generateCourse(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/generate-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category, subCategory, targetLevel }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} ${text}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a', // slate-900
        color: '#e5e7eb', // gray-200
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: 900 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Course Generator (Minimal)</h1>
        <p style={{ color: '#cbd5e1' }}>Calls <code>/api/generate-course</code> and shows JSON output.</p>
        <p style={{ color: '#9ca3af', fontSize: 14, marginTop: 4 }}>
          References powered by Europe PMC (no API key required).
        </p>

        <form onSubmit={generateCourse} style={{ display: 'grid', gap: 14, marginTop: 18 }}>
          <label>
            <div style={{ marginBottom: 6, fontWeight: 600 }}>Topic</div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic"
              style={{
                width: '100%',
                padding: 10,
                border: '1px solid #374151', // gray-700
                borderRadius: 8,
                backgroundColor: '#1f2937', // gray-800
                color: '#e5e7eb', // gray-200
              }}
            />
          </label>

          <label>
            <div style={{ marginBottom: 6, fontWeight: 600 }}>Category</div>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              style={{
                width: '100%',
                padding: 10,
                border: '1px solid #374151',
                borderRadius: 8,
                backgroundColor: '#1f2937',
                color: '#e5e7eb',
              }}
            />
          </label>

          <label>
            <div style={{ marginBottom: 6, fontWeight: 600 }}>Sub-Category</div>
            <input
              type="text"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="Sub-Category"
              style={{
                width: '100%',
                padding: 10,
                border: '1px solid #374151',
                borderRadius: 8,
                backgroundColor: '#1f2937',
                color: '#e5e7eb',
              }}
            />
          </label>

          <label>
            <div style={{ marginBottom: 6, fontWeight: 600 }}>Target Level</div>
            <select
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value as any)}
              style={{
                width: '100%',
                padding: 10,
                border: '1px solid #374151',
                borderRadius: 8,
                backgroundColor: '#1f2937',
                color: '#e5e7eb',
              }}
            >
              <option value="student">student</option>
              <option value="resident">resident</option>
              <option value="practitioner">practitioner</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 18px',
              borderRadius: 8,
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
            }}
          >
            {loading ? 'Generating…' : 'Generate Course'}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: 16, color: '#f87171' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: 18 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Result</h2>
            <pre
              style={{
                background: '#111827', // gray-900
                color: '#e5e7eb',
                padding: 12,
                borderRadius: 8,
                overflowX: 'auto',
                border: '1px solid #374151',
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}