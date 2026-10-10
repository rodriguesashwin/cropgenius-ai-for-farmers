export const schemeCategories = [
  "Agriculture",
  "Crop Insurance",
  "Agricultural Credit",
  "Subsidy",
  "Irrigation",
  "Farm Equipment",
  "Seeds",
  "Soil & Fertilizer",
  "Livestock",
  "Horticulture",
  "Other",
] as const;

export type SchemeCategory = (typeof schemeCategories)[number];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
] as const;

export const schemeCrops = [
  "Rice", "Wheat", "Maize", "Tomato", "Potato", "Onion", "Soybean", "Groundnut",
  "Coconut", "Arecanut",
] as const;

export const farmerTypes = [
  "Small / Marginal Farmer",
  "Other Farmer",
  "Tenant Farmer",
  "Agricultural Worker",
  "Other",
] as const;

export const farmingInterests = [
  "Crop insurance",
  "Agricultural loans",
  "Subsidies",
  "Farm equipment",
  "Irrigation",
  "Seeds",
  "Horticulture",
  "Livestock",
] as const;

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  category: SchemeCategory;
  state: string | null;
  crops: string[];
  farmerTypes: string[];
  benefits: string[];
  eligibility: string[];
  whoCanApply: string[];
  documents: string[];
  applicationProcess: string[];
  importantNotes: string[];
  officialUrl: string | null;
  sourceName: string | null;
  lastUpdated: string | null;
  featured: boolean;
}

export interface SchemeFilters {
  query: string;
  category: string;
  state: string;
  crop: string;
  farmerType: string;
}

export interface SchemeFinderValues {
  age: string;
  state: string;
  farmerType: string;
  landSize: string;
  crops: string[];
  interests: string[];
}

export interface SchemeMatch {
  scheme: GovernmentScheme;
  reasons: string[];
}

export const emptySchemeFilters: SchemeFilters = {
  query: "",
  category: "",
  state: "",
  crop: "",
  farmerType: "",
};

export const emptySchemeFinderValues: SchemeFinderValues = {
  age: "",
  state: "",
  farmerType: "",
  landSize: "",
  crops: [],
  interests: [],
};

/** Empty until verified scheme records are provided by a trusted source. */
export const verifiedGovernmentSchemes: GovernmentScheme[] = [];

export function validateSchemeFinder(values: SchemeFinderValues): Partial<Record<keyof SchemeFinderValues, string>> {
  const errors: Partial<Record<keyof SchemeFinderValues, string>> = {};
  const age = Number(values.age);
  const landSize = Number(values.landSize);

  if (!values.age.trim() || !Number.isFinite(age) || age <= 0 || age > 120) {
    errors.age = "Enter an age between 1 and 120.";
  }
  if (!indianStates.includes(values.state as (typeof indianStates)[number])) {
    errors.state = "Select a state.";
  }
  if (!farmerTypes.includes(values.farmerType as (typeof farmerTypes)[number])) {
    errors.farmerType = "Select a farmer type.";
  }
  if (!values.landSize.trim() || !Number.isFinite(landSize) || landSize < 0) {
    errors.landSize = "Enter a land size of zero or more acres.";
  }
  if (values.crops.length === 0) errors.crops = "Select at least one crop.";
  return errors;
}

function includesTerm(value: string, query: string) {
  return value.toLocaleLowerCase().includes(query.toLocaleLowerCase());
}

export function filterSchemes(schemes: GovernmentScheme[], filters: SchemeFilters) {
  const query = filters.query.trim();
  return schemes.filter((scheme) => {
    const matchesQuery = !query || [scheme.name, scheme.description, scheme.category,
      scheme.state ?? "", ...scheme.benefits].some((value) => includesTerm(value, query));
    return matchesQuery
      && (!filters.category || scheme.category === filters.category)
      && (!filters.state || scheme.state === filters.state)
      && (!filters.crop || scheme.crops.includes(filters.crop))
      && (!filters.farmerType || scheme.farmerTypes.includes(filters.farmerType));
  });
}

/** Match only explicit scheme metadata; a match is not an eligibility decision. */
export function findPotentialMatches(
  schemes: GovernmentScheme[],
  values: SchemeFinderValues,
): SchemeMatch[] {
  return schemes.flatMap((scheme) => {
    const reasons: string[] = [];
    if (scheme.state && scheme.state === values.state) reasons.push(`The scheme lists ${values.state}.`);
    if (scheme.farmerTypes.includes(values.farmerType)) reasons.push("The scheme lists your farmer type.");
    const matchingCrops = values.crops.filter((crop) => scheme.crops.includes(crop));
    if (matchingCrops.length) reasons.push(`The scheme lists ${matchingCrops.join(", ")}.`);
    const categoryInterest = categoryByInterest[values.interests.find((interest) =>
      categoryByInterest[interest] === scheme.category) ?? ""];
    if (categoryInterest) reasons.push(`The scheme category relates to ${categoryInterest.toLowerCase()}.`);
    return reasons.length ? [{ scheme, reasons }] : [];
  });
}

const categoryByInterest: Record<string, SchemeCategory> = {
  "Crop insurance": "Crop Insurance",
  "Agricultural loans": "Agricultural Credit",
  Subsidies: "Subsidy",
  "Farm equipment": "Farm Equipment",
  Irrigation: "Irrigation",
  Seeds: "Seeds",
  Horticulture: "Horticulture",
  Livestock: "Livestock",
};