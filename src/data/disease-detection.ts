export type SupportedCrop =
  | "Rice"
  | "Wheat"
  | "Maize"
  | "Tomato"
  | "Potato"
  | "Onion"
  | "Soybean"
  | "Groundnut"
  | "Coconut"
  | "Arecanut";

export const supportedCrops: SupportedCrop[] = [
  "Rice",
  "Wheat",
  "Maize",
  "Tomato",
  "Potato",
  "Onion",
  "Soybean",
  "Groundnut",
  "Coconut",
  "Arecanut",
];

/**
 * Result categories the future Flask + TensorFlow/CNN service is expected to
 * return. Purely reference metadata for the UI — never used as a prediction.
 */
export const supportedDiseases: Record<SupportedCrop, string[]> = {
  Rice: ["Leaf Blast", "Brown Spot"],
  Wheat: ["Leaf Rust"],
  Maize: ["Common Rust"],
  Tomato: ["Early Blight", "Late Blight"],
  Potato: ["Late Blight"],
  Onion: ["Purple Blotch"],
  Soybean: ["Soybean Rust"],
  Groundnut: ["Leaf Spot"],
  Coconut: ["Bud Rot"],
  Arecanut: ["Koleroga / Mahali Disease"],
};

export const uploadTips = [
  "Use a clear image of the leaf",
  "Make sure the leaf is visible",
  "Avoid very dark or blurry images",
  "Keep the affected area in focus",
  "Use good lighting when possible",
];

export const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function validateImage(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type.toLowerCase())) {
    return "Please upload a JPG, JPEG, or PNG image.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "Image size must be less than 10 MB.";
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Shape the future `POST /api/disease-detection` response must match.
 * multipart/form-data fields: `image` (required), `crop` (optional).
 */
export type DiseaseDetectionResponse = {
  success: boolean;
  crop: string;
  disease: string;
  confidence: number;
  treatment: string;
  prevention: string;
};

export type AnalysisResultData = {
  cropName: string;
  diseaseName: string;
  confidence: number | null;
  treatment: string;
  prevention: string;
  isExample?: boolean;
};

export function mapResponse(res: DiseaseDetectionResponse): AnalysisResultData {
  return {
    cropName: res.crop,
    diseaseName: res.disease,
    confidence: typeof res.confidence === "number" ? res.confidence : null,
    treatment: res.treatment,
    prevention: res.prevention,
  };
}

/**
 * Clearly-labelled demo payload used only by the development preview toggle so
 * the result layout can be reviewed before the AI service exists.
 */
export const exampleResult: AnalysisResultData = {
  cropName: "[Crop name from API]",
  diseaseName: "[Disease name from API]",
  confidence: null,
  treatment: "[Treatment information returned by backend]",
  prevention: "[Prevention information returned by backend]",
  isExample: true,
};

export type AnalysisStage = "idle" | "preview" | "loading" | "result" | "error";
