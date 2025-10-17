"use server";

// Lightweight Europe PMC reference fetcher (no API key required)
// Docs: https://europepmc.org/RestfulWebService

export type EuropePMCReference = {
  id: string; // Europe PMC ID (e.g., MED/PMID)
  title: string;
  authors: string[];
  journal?: string;
  year?: string;
  url: string;
};

function buildQuery(topic: string): string {
  const q = topic.trim();
  // Bias results to PubMed articles but keep it general
  // Europe PMC query language supports filters; here we search in title/abstract
  return `TITLE:"${q}" OR ABSTRACT:"${q}"`;
}

export async function fetchEuropePMCReferences(topic: string, maxResults = 5): Promise<EuropePMCReference[]> {
  const query = encodeURIComponent(buildQuery(topic));
  const pageSize = Math.max(1, Math.min(maxResults, 25));
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${query}&pageSize=${pageSize}&format=json`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`EuropePMC search failed: ${resp.status}`);
    const json = await resp.json();
    const results: any[] = json?.resultList?.result || [];

    const refs: EuropePMCReference[] = results.map((r) => {
      const id = r?.id || r?.pmid || r?.doi || "";
      const title: string = r?.title || "";
      const authorsRaw: any[] = Array.isArray(r?.authorList?.author) ? r.authorList.author : [];
      const authors: string[] = authorsRaw.map((a: any) => a?.fullName || a?.lastName || a?.collectiveName).filter(Boolean);
      const journal: string | undefined = r?.journalTitle || r?.source || undefined;
      const year: string | undefined = r?.pubYear ? String(r.pubYear) : undefined;
      // Prefer stable PubMed URL if pmid present, else Europe PMC record
      const pmid = r?.pmid;
      const url = pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : `https://europepmc.org/abstract/${r?.source || "MED"}/${id}`;
      return { id: String(id), title, authors, journal, year, url };
    }).filter((r) => r.title);

    return refs;
  } catch (err) {
    console.error("EuropePMC fetch error:", err);
    return [];
  }
}

export type { EuropePMCReference as Reference };