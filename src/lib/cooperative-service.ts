/**
 * Cooperative Services API boundary.
 *
 * Future endpoints (not called yet):
 *   GET /api/cooperative/services
 *   GET /api/cooperative/services/:id
 *   GET /api/cooperative/societies
 *   GET /api/cooperative/societies/:id
 *   POST /api/cooperative/requests
 *   GET /api/cooperative/requests
 *   GET /api/cooperative/requests/:id
 */

import {
  demoCooperatives,
  demoServices,
  type Cooperative,
  type CooperativeService,
  type RequestFormValues,
  type ServiceRequest,
} from "@/data/cooperative";

export type CooperativeDashboardPayload = {
  services: CooperativeService[];
  cooperatives: Cooperative[];
  requests: ServiceRequest[];
  isDemo: boolean;
};

export async function loadCooperativeDashboard(
  options: { delayMs?: number } = {},
): Promise<CooperativeDashboardPayload> {
  await new Promise((resolve) => setTimeout(resolve, options.delayMs ?? 700));
  return {
    services: demoServices,
    cooperatives: demoCooperatives,
    requests: [],
    isDemo: true,
  };
}

export function buildLocalServiceRequest(values: RequestFormValues, sequence: number): ServiceRequest {
  return {
    id: `Preview request #${sequence}`,
    farmerId: "local-ui-preview",
    serviceId: values.serviceId,
    cooperativeId: values.cooperativeId,
    submittedAt: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    status: "Submitted",
    description: values.description.trim(),
    documents: values.documents.map((file) => file.name),
    updates: [
      {
        date: "UI preview",
        message:
          "Your service request has been submitted for review in this interface. It has not been sent to an external cooperative yet.",
      },
    ],
  };
}
