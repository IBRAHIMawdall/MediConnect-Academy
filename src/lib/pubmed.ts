"use server";

// Simple PubMed/NCBI E-utilities fetcher to retrieve reference candidates
// Uses NCBI ESearch + ESummary for lightweight metadata (title, authors, year, journal, url)
// Requires optional `NCBI_API_KEY` for better rate limits

type PubMedReference = {
  pmid: string;
  title: string;
  authors: string[];
  journal?: string;
  year?: string;
  url: string;
};

function buildQuery(topic: string): string {
  // Basic sanitization and medical bias terms
  const q = topic.trim().replace(/\s+/g, "+");
  return `${q}`;
}

export async function fetchPubMedReferences(topic: string, maxResults = 5): Promise<PubMedReference[]> {
  const apiKey = process.env.NCBI_API_KEY;
  const base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
  const term = buildQuery(topic);
  const esearchUrl = `${base}/esearch.fcgi?db=pubmed&retmode=json&retmax=${maxResults}&term=${term}${apiKey ? `&api_key=${apiKey}` : ""}`;

  try {
    const esearchResp = await fetch(esearchUrl);
    if (!esearchResp.ok) throw new Error(`ESearch failed: ${esearchResp.status}`);
    const esearchJson = await esearchResp.json();
    const ids: string[] = esearchJson?.esearchresult?.idlist ?? [];
    if (!ids.length) return [];

    const idParam = ids.join(",");
    const esummaryUrl = `${base}/esummary.fcgi?db=pubmed&retmode=json&id=${idParam}${apiKey ? `&api_key=${apiKey}` : ""}`;
    const esummaryResp = await fetch(esummaryUrl);
    if (!esummaryResp.ok) throw new Error(`ESummary failed: ${esummaryResp.status}`);
    const esummaryJson = await esummaryResp.json();

    const result: PubMedReference[] = ids.map((pmid) => {
      const rec = esummaryJson?.result?.[pmid];
      const title: string = rec?.title ?? "";
      const authors: string[] = Array.isArray(rec?.authors)
        ? rec.authors.map((a: any) => a.name).filter(Boolean)
        : [];
      const journal: string | undefined = rec?.fulljournalname || rec?.source || undefined;
      const year: string | undefined = rec?.pubdate ? String(rec.pubdate).split(" ")[0] : undefined;
      const url = `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
      return { pmid, title, authors, journal, year, url };
    }).filter((r) => r.title);

    return result;
  } catch (err) {
    console.error("PubMed fetch error:", err);
    return [];
  }
}

export type { PubMedReference };