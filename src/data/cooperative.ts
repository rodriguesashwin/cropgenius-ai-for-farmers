/**
 * Cooperative Services module — data contracts and demo fixtures.
 *
 * These records are sample UI data only. They do not represent verified
 * cooperative societies, contact details, approval timelines, financial terms,
 * or real applications. The shapes mirror the future Flask + MySQL API.
 */

import {
  BadgeCheck,
  Banknote,
  Boxes,
  ClipboardList,
  HandCoins,
  Handshake,
  PackageCheck,
  Sprout,
  Tractor,
  Wheat,
  type LucideIcon,
} from "lucide-react";

export const serviceCategories = [
  "Cooperative Membership",
  "Agricultural Loans",
  "Farm Equipment",
  "Seeds & Fertilizers",
  "Agricultural Inputs",
  "Storage & Warehousing",
  "Crop Marketing",
  "Subsidy / Financial Support",
  "Other Services",
] as const;

export type CooperativeServiceCategory = (typeof serviceCategories)[number];

export const availabilityOptions = ["Available", "Limited", "Not Available"] as const;
export type ServiceAvailability = (typeof availabilityOptions)[number];

export const requestStatuses = [
  "Submitted",
  "Under Review",
  "Additional Information Required",
  "Approved",
  "Rejected",
  "Completed",
] as const;
export type ServiceRequestStatus = (typeof requestStatuses)[number];

export type CooperativeService = {
  id: string;
  name: string;
  category: CooperativeServiceCategory;
  description: string;
  targetUsers: string;
  requirements: string[];
  documents: string[];
  process: string[];
  cooperativeIds: string[];
  availability: ServiceAvailability;
  lastUpdated: string;
  processingInformation: string;
};

export type Cooperative = {
  id: string;
  name: string;
  location: string;
  description: string;
  services: string[];
  contactInformation: string;
  operatingInformation: string;
  availableSupport: string[];
};

export type ServiceRequestUpdate = {
  date: string;
  message: string;
};

export type ServiceRequest = {
  id: string;
  farmerId: string;
  serviceId: string;
  cooperativeId: string;
  submittedAt: string;
  status: ServiceRequestStatus;
  description: string;
  documents: string[];
  updates: ServiceRequestUpdate[];
};

export type CooperativeFilters = {
  search: string;
  category: string;
  location: string;
  availability: string;
};

export type RequestFormValues = {
  farmerName: string;
  mobileNumber: string;
  serviceId: string;
  cooperativeId: string;
  location: string;
  description: string;
  documents: File[];
};

export type RequestFormErrors = Partial<
  Record<"farmerName" | "mobileNumber" | "serviceId" | "cooperativeId" | "location" | "documents", string>
>;

export type CooperativeStage = "loading" | "ready" | "error";
export type CooperativeView =
  | { name: "services" }
  | { name: "service-detail"; serviceId: string }
  | { name: "request-form"; serviceId: string }
  | { name: "request-detail"; requestId: string }
  | { name: "cooperative-detail"; cooperativeId: string };

export const categoryIcons: Record<CooperativeServiceCategory, LucideIcon> = {
  "Cooperative Membership": BadgeCheck,
  "Agricultural Loans": Banknote,
  "Farm Equipment": Tractor,
  "Seeds & Fertilizers": Sprout,
  "Agricultural Inputs": PackageCheck,
  "Storage & Warehousing": Boxes,
  "Crop Marketing": Wheat,
  "Subsidy / Financial Support": HandCoins,
  "Other Services": ClipboardList,
};

export const demoCooperatives: Cooperative[] = [
  {
    id: "coop-demo-1",
    name: "Demo Primary Agricultural Cooperative",
    location: "Example Taluk",
    description:
      "Sample cooperative profile for UI review. Verified society details will be loaded from the backend later.",
    services: ["membership", "loan-assistance", "input-supply", "marketing-support"],
    contactInformation: "Contact information will be shown after verified data is connected.",
    operatingInformation: "Operating hours will be shown after verified data is connected.",
    availableSupport: ["Membership guidance", "Service request review", "Farmer assistance desk"],
  },
  {
    id: "coop-demo-2",
    name: "Demo Farmer Service Society",
    location: "Sample Market Area",
    description:
      "Sample society card used only to demonstrate the cooperative directory layout.",
    services: ["equipment-access", "storage-support", "seed-fertilizer"],
    contactInformation: "Verified phone, address and email are not connected yet.",
    operatingInformation: "Operating information will be provided by the cooperative later.",
    availableSupport: ["Equipment request support", "Storage enquiry", "Input availability guidance"],
  },
  {
    id: "coop-demo-3",
    name: "Demo Agricultural Marketing Cooperative",
    location: "Example APMC Region",
    description:
      "Sample cooperative entry for previewing market and crop sale assistance workflows.",
    services: ["marketing-support", "warehouse-service", "subsidy-guidance"],
    contactInformation: "Official contact details will appear after backend verification.",
    operatingInformation: "Operating information is pending verified cooperative data.",
    availableSupport: ["Crop marketing guidance", "Warehouse enquiry", "Support program information"],
  },
];

export const demoServices: CooperativeService[] = [
  {
    id: "membership",
    name: "Cooperative Membership Guidance",
    category: "Cooperative Membership",
    description: "Guidance for farmers who want to understand and request cooperative membership.",
    targetUsers: "Farmers interested in joining a cooperative society.",
    requirements: ["Basic farmer details", "Local cooperative selection", "Review by the society"],
    documents: ["Identity proof", "Address proof"],
    process: [
      "Choose a nearby cooperative society.",
      "Submit your basic details for review.",
      "The society reviews the request and asks for any additional information if needed.",
    ],
    cooperativeIds: ["coop-demo-1"],
    availability: "Available",
    lastUpdated: "Demo data",
    processingInformation:
      "Processing depends on the selected cooperative society. CropGenius only records the request until backend integration is complete.",
  },
  {
    id: "loan-assistance",
    name: "Agricultural Loan Assistance",
    category: "Agricultural Loans",
    description: "Information and request support for farmers seeking cooperative credit assistance.",
    targetUsers: "Eligible farmers or cooperative members seeking agricultural credit guidance.",
    requirements: ["Cooperative selection", "Purpose of request", "Review by cooperative staff"],
    documents: ["Identity proof", "Land or cultivation-related document, if requested by the society"],
    process: [
      "Submit a request for review.",
      "The cooperative checks basic details.",
      "Further guidance is provided by the society after review.",
    ],
    cooperativeIds: ["coop-demo-1"],
    availability: "Limited",
    lastUpdated: "Demo data",
    processingInformation:
      "No loan amount, rate, deadline or approval is promised in this interface.",
  },
  {
    id: "equipment-access",
    name: "Farm Equipment Access",
    category: "Farm Equipment",
    description: "Request information about cooperative-supported farm equipment access.",
    targetUsers: "Farmers who need support using shared agricultural equipment.",
    requirements: ["Preferred equipment type", "Farm location", "Society review"],
    documents: [],
    process: [
      "Describe the equipment support needed.",
      "Select a cooperative society.",
      "Wait for availability and review updates from the society.",
    ],
    cooperativeIds: ["coop-demo-2"],
    availability: "Available",
    lastUpdated: "Demo data",
    processingInformation: "Availability depends on the cooperative and cannot be guaranteed here.",
  },
  {
    id: "seed-fertilizer",
    name: "Seeds & Fertilizers Support",
    category: "Seeds & Fertilizers",
    description: "Discover seed and fertilizer support services offered through cooperatives.",
    targetUsers: "Farmers looking for seasonal input support through a society.",
    requirements: ["Crop details", "Location", "Cooperative review"],
    documents: [],
    process: [
      "Choose the service and cooperative.",
      "Share a short note about your crop requirement.",
      "The cooperative reviews availability and next steps.",
    ],
    cooperativeIds: ["coop-demo-2"],
    availability: "Available",
    lastUpdated: "Demo data",
    processingInformation: "Input availability will be confirmed only by verified cooperative data later.",
  },
  {
    id: "input-supply",
    name: "Agricultural Inputs Enquiry",
    category: "Agricultural Inputs",
    description: "Request guidance for general agricultural inputs through cooperative channels.",
    targetUsers: "Farmers seeking basic agricultural input information.",
    requirements: ["Input type", "Location", "Review by society"],
    documents: [],
    process: [
      "Submit your input requirement.",
      "CropGenius records the request for review.",
      "The cooperative response will be shown here after backend integration.",
    ],
    cooperativeIds: ["coop-demo-1"],
    availability: "Available",
    lastUpdated: "Demo data",
    processingInformation: "This is a request flow only and not a confirmed order.",
  },
  {
    id: "storage-support",
    name: "Storage & Warehousing Enquiry",
    category: "Storage & Warehousing",
    description: "Request information about cooperative storage or warehousing support.",
    targetUsers: "Farmers who want to explore safe storage support after harvest.",
    requirements: ["Crop type", "Approximate storage need", "Cooperative availability review"],
    documents: [],
    process: [
      "Share your storage support requirement.",
      "Choose the cooperative society.",
      "The cooperative reviews availability and updates the request status.",
    ],
    cooperativeIds: ["coop-demo-2", "coop-demo-3"],
    availability: "Limited",
    lastUpdated: "Demo data",
    processingInformation: "Storage availability and conditions must be verified by the society.",
  },
  {
    id: "marketing-support",
    name: "Crop Marketing Support",
    category: "Crop Marketing",
    description: "Find cooperative support options for crop marketing and sale-related guidance.",
    targetUsers: "Farmers comparing sale support through cooperative channels.",
    requirements: ["Crop details", "Market or society selection", "Review by cooperative"],
    documents: [],
    process: [
      "Select the crop marketing service.",
      "Share basic crop and location details.",
      "Review updates will appear in My Service Requests later.",
    ],
    cooperativeIds: ["coop-demo-1", "coop-demo-3"],
    availability: "Available",
    lastUpdated: "Demo data",
    processingInformation: "This module does not guarantee price, sale or buyer availability.",
  },
  {
    id: "subsidy-guidance",
    name: "Subsidy / Financial Support Guidance",
    category: "Subsidy / Financial Support",
    description: "Understand support programs that a cooperative may help farmers access.",
    targetUsers: "Farmers who need assistance understanding available support routes.",
    requirements: ["Basic farmer details", "Service need", "Eligibility review by relevant authority"],
    documents: ["Identity proof", "Relevant farming document, if requested later"],
    process: [
      "Submit a request for guidance.",
      "The cooperative reviews the request.",
      "Any additional steps depend on the official program and cooperative process.",
    ],
    cooperativeIds: ["coop-demo-3"],
    availability: "Limited",
    lastUpdated: "Demo data",
    processingInformation:
      "No benefit amount, approval, deadline or entitlement is claimed by CropGenius.",
  },
  {
    id: "other-services",
    name: "Other Cooperative Services",
    category: "Other Services",
    description: "Ask for help with a cooperative service not listed in this module.",
    targetUsers: "Farmers who need general cooperative assistance.",
    requirements: ["Short description of need", "Location", "Cooperative review"],
    documents: [],
    process: [
      "Describe the support you need.",
      "Select the nearest relevant society.",
      "The request can later be routed to cooperative staff through the backend.",
    ],
    cooperativeIds: ["coop-demo-1", "coop-demo-2", "coop-demo-3"],
    availability: "Available",
    lastUpdated: "Demo data",
    processingInformation: "The selected cooperative decides whether it can assist.",
  },
];

export const emptyFilters: CooperativeFilters = {
  search: "",
  category: "all",
  location: "",
  availability: "all",
};

export function serviceCategorySummary(category: CooperativeServiceCategory) {
  return demoServices.filter((service) => service.category === category).length;
}

export function getCooperativeName(id: string): string {
  return demoCooperatives.find((coop) => coop.id === id)?.name ?? "Selected cooperative";
}

export function filterServices(services: CooperativeService[], filters: CooperativeFilters) {
  const q = filters.search.trim().toLowerCase();
  const location = filters.location.trim().toLowerCase();

  return services.filter((service) => {
    const cooperatives = service.cooperativeIds
      .map((id) => demoCooperatives.find((coop) => coop.id === id))
      .filter((coop) => Boolean(coop));
    const matchesSearch =
      !q ||
      service.name.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      service.category.toLowerCase().includes(q);
    const matchesCategory = filters.category === "all" || service.category === filters.category;
    const matchesAvailability =
      filters.availability === "all" || service.availability === filters.availability;
    const matchesLocation =
      !location || cooperatives.some((coop) => coop?.location.toLowerCase().includes(location));

    return matchesSearch && matchesCategory && matchesAvailability && matchesLocation;
  });
}

export function validateRequest(values: RequestFormValues): RequestFormErrors {
  const errors: RequestFormErrors = {};
  if (!values.farmerName.trim()) errors.farmerName = "Please enter the farmer name.";
  if (values.farmerName.trim().length > 80) errors.farmerName = "Name must be shorter than 80 characters.";
  if (!/^\d{10}$/.test(values.mobileNumber.trim())) {
    errors.mobileNumber = "Enter a 10-digit mobile number.";
  }
  if (!values.serviceId) errors.serviceId = "Please select a service.";
  if (!values.cooperativeId) errors.cooperativeId = "Please select a cooperative society.";
  if (!values.location.trim()) errors.location = "Please enter your location.";
  const largeFile = values.documents.find((file) => file.size > 5 * 1024 * 1024);
  if (largeFile) errors.documents = "Each file must be 5 MB or smaller.";
  return errors;
}
