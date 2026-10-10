import {
  filterSchemes,
  findPotentialMatches,
  verifiedGovernmentSchemes,
  type GovernmentScheme,
  type SchemeFilters,
  type SchemeFinderValues,
  type SchemeMatch,
} from "@/data/government-schemes";

/** Future API boundary: GET /api/schemes and GET /api/schemes/:id. */
export async function loadGovernmentSchemes(filters: SchemeFilters): Promise<GovernmentScheme[]> {
  // Replace this local data source with GET /api/schemes?category=&state=&crop=&farmer_type=.
  return filterSchemes(verifiedGovernmentSchemes, filters);
}

export async function loadGovernmentScheme(id: string): Promise<GovernmentScheme | null> {
  // Replace with GET /api/schemes/:id.
  return verifiedGovernmentSchemes.find((scheme) => scheme.id === id) ?? null;
}

/** Future API boundary: POST /api/schemes/recommend. */
export async function recommendGovernmentSchemes(
  values: SchemeFinderValues,
): Promise<SchemeMatch[]> {
  // Local rule-based matching uses only explicit scheme metadata, not eligibility decisions.
  return findPotentialMatches(verifiedGovernmentSchemes, values);
}