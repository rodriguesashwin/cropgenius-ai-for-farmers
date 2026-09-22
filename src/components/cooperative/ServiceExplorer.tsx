import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  Filter,
  Handshake,
  Info,
  FileText,
  Search,
  UsersRound,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  availabilityOptions,
  categoryIcons,
  demoCooperatives,
  demoServices,
  emptyFilters,
  filterServices,
  serviceCategories,
  serviceCategorySummary,
  validateRequest,
  type Cooperative,
  type CooperativeFilters,
  type CooperativeService,
  type RequestFormErrors,
  type RequestFormValues,
  type ServiceRequest,
} from "@/data/cooperative";
import { getCooperativeName } from "@/data/cooperative";
import { buildLocalServiceRequest } from "@/lib/cooperative-service";
import { cn } from "@/lib/utils";

import {
  AvailabilityBadge,
  EmptyState,
  FieldError,
  ProgressTimeline,
  SectionHeading,
  StatusBadge,
} from "./CooperativeShared";

export function DashboardSummary({ services, requests }: { services: CooperativeService[]; requests: ServiceRequest[] }) {
  const underReview = requests.filter((request) => request.status === "Under Review").length;
  const completed = requests.filter((request) => request.status === "Completed").length;
  const items = [
    { label: "Available Services", value: services.length, icon: ClipboardList },
    { label: "My Requests", value: requests.length, icon: FileCheck2 },
    { label: "Under Review", value: underReview, icon: Search },
    { label: "Completed", value: completed, icon: CheckCircle2 },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="border-border/80 shadow-[var(--shadow-soft)]">
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-display text-2xl font-bold text-foreground">{item.value}</p>
              </div>
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function CooperativeIntroCard() {
  return (
    <section className="rounded-2xl border border-primary/15 bg-primary/5 p-5 shadow-[var(--shadow-card)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
          <Handshake className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            CropGenius helps you discover and request cooperative services.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Availability and approval depend on the respective cooperative society. Demo records below show how the service flow will work after Flask and MySQL are connected.
          </p>
        </div>
      </div>
    </section>
  );
}

export function CategoryFilterGrid({
  activeCategory,
  onSelect,
}: {
  activeCategory: string;
  onSelect: (category: string) => void;
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {serviceCategories.map((category) => {
        const Icon = categoryIcons[category];
        const active = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(active ? "all" : category)}
            className={cn(
              "group flex min-h-28 flex-col rounded-2xl border bg-card p-4 text-left shadow-[var(--shadow-soft)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "border-primary bg-primary/5" : "border-border hover:-translate-y-0.5 hover:border-primary/40",
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="mt-3 text-sm font-semibold leading-5 text-foreground">{category}</span>
            <span className="mt-auto pt-2 text-xs text-muted-foreground">{serviceCategorySummary(category)} services</span>
          </button>
        );
      })}
    </section>
  );
}

export function ServiceSearchFilters({
  filters,
  onChange,
  onClear,
}: {
  filters: CooperativeFilters;
  onChange: (filters: CooperativeFilters) => void;
  onClear: () => void;
}) {
  return (
    <Card className="border-border/80 shadow-[var(--shadow-card)]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-display text-lg">
          <Filter className="size-5 text-primary" aria-hidden="true" />
          Search and Filter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto] lg:items-end">
          <div className="space-y-2">
            <Label htmlFor="service-search">Search cooperative services</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="service-search"
                value={filters.search}
                onChange={(event) => onChange({ ...filters, search: event.target.value.slice(0, 80) })}
                placeholder="Search cooperative services..."
                className="min-h-11 pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-category">Service Category</Label>
            <Select value={filters.category} onValueChange={(category) => onChange({ ...filters, category })}>
              <SelectTrigger id="service-category" className="min-h-11">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {serviceCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-location">Location</Label>
            <Input
              id="service-location"
              value={filters.location}
              onChange={(event) => onChange({ ...filters, location: event.target.value.slice(0, 80) })}
              placeholder="Select market or location"
              className="min-h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-availability">Availability/Status</Label>
            <Select
              value={filters.availability}
              onValueChange={(availability) => onChange({ ...filters, availability })}
            >
              <SelectTrigger id="service-availability" className="min-h-11">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {availabilityOptions.map((availability) => (
                  <SelectItem key={availability} value={availability}>
                    {availability}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 lg:justify-end">
            <Button type="button" variant="outline" className="min-h-11 flex-1 lg:flex-none" onClick={onClear}>
              <X className="size-4" aria-hidden="true" />
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ServiceCards({
  services,
  onViewDetails,
}: {
  services: CooperativeService[];
  onViewDetails: (serviceId: string) => void;
}) {
  if (services.length === 0) {
    return <EmptyState title="No cooperative services found." description="Try changing the search, category, location or availability filter." />;
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => {
        const Icon = categoryIcons[service.category];
        return (
          <Card key={service.id} className="group flex h-full flex-col border-border/80 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <AvailabilityBadge availability={service.availability} />
              </div>
              <div className="pt-3">
                <Badge variant="outline" className="mb-2 text-muted-foreground">
                  {service.category}
                </Badge>
                <CardTitle className="font-display text-xl leading-tight">{service.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold text-foreground">Who it is for: </span>
                  <span className="text-muted-foreground">{service.targetUsers}</span>
                </p>
                <p>
                  <span className="font-semibold text-foreground">Basic requirement: </span>
                  <span className="text-muted-foreground">{service.requirements[0]}</span>
                </p>
              </div>
              <Button className="mt-auto min-h-11 w-full" onClick={() => onViewDetails(service.id)}>
                View Details
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}

export function ServiceDetails({
  service,
  cooperatives,
  onRequest,
  onBack,
}: {
  service: CooperativeService;
  cooperatives: Cooperative[];
  onRequest: () => void;
  onBack: () => void;
}) {
  const availableCooperatives = cooperatives.filter((coop) => service.cooperativeIds.includes(coop.id));

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline" onClick={onBack} className="min-h-11 self-start">
          Back to Services
        </Button>
        <Button onClick={onRequest} className="min-h-11 self-start sm:self-auto">
          Request This Service
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <Card className="border-border/80 shadow-[var(--shadow-card)]">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge variant="outline" className="mb-3 text-muted-foreground">
                {service.category}
              </Badge>
              <CardTitle className="font-display text-2xl">{service.name}</CardTitle>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{service.description}</p>
            </div>
            <AvailabilityBadge availability={service.availability} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-2">
          <InfoBlock title="About" items={[service.description]} icon={Info} />
          <InfoBlock title="Who Can Use This Service" items={[service.targetUsers]} icon={UsersRound} />
          <InfoBlock title="Basic Eligibility/Requirements" items={service.requirements} icon={CheckCircle2} />
          <InfoBlock
            title="Required Documents"
            items={service.documents.length ? service.documents : ["No document selected at this step. The cooperative may ask for details after review."]}
            icon={FileCheck2}
          />
          <InfoBlock title="How It Works" items={service.process} icon={ClipboardList} ordered />
          <InfoBlock title="Processing Information" items={[service.processingInformation]} icon={ClockInfoIcon} />
          <div className="lg:col-span-2">
            <SectionHeading icon={Building2} title="Cooperative/Contact Information" />
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {availableCooperatives.map((coop) => (
                <div key={coop.id} className="rounded-xl border border-border bg-muted/20 p-4">
                  <h4 className="font-semibold text-foreground">{coop.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{coop.location}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{coop.contactInformation}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function ClockInfoIcon(props: React.ComponentProps<typeof Info>) {
  return <Info {...props} />;
}

function InfoBlock({
  title,
  items,
  icon,
  ordered = false,
}: {
  title: string;
  items: string[];
  icon: typeof Info;
  ordered?: boolean;
}) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <SectionHeading icon={icon} title={title} />
      <ListTag className={cn("mt-3 space-y-2 text-sm leading-6 text-muted-foreground", ordered && "list-decimal pl-5")}> 
        {items.map((item) => (
          <li key={item} className={ordered ? "" : "flex gap-2"}>
            {ordered ? null : <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />}
            <span>{item}</span>
          </li>
        ))}
      </ListTag>
    </div>
  );
}

export function RequestServiceForm({
  service,
  cooperatives,
  sequence,
  onSubmitRequest,
  onCancel,
}: {
  service: CooperativeService;
  cooperatives: Cooperative[];
  sequence: number;
  onSubmitRequest: (request: ServiceRequest) => void;
  onCancel: () => void;
}) {
  const eligibleCooperatives = cooperatives.filter((coop) => service.cooperativeIds.includes(coop.id));
  const [values, setValues] = React.useState<RequestFormValues>({
    farmerName: "",
    mobileNumber: "",
    serviceId: service.id,
    cooperativeId: eligibleCooperatives[0]?.id ?? "",
    location: "",
    description: "",
    documents: [],
  });
  const [errors, setErrors] = React.useState<RequestFormErrors>({});
  const [submitted, setSubmitted] = React.useState(false);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const accepted = Array.from(files).filter((file) => {
      const name = file.name.toLowerCase();
      return name.endsWith(".pdf") || name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png");
    });
    setValues((current) => ({ ...current, documents: [...current.documents, ...accepted].slice(0, 4) }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRequest(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const request = buildLocalServiceRequest(values, sequence);
    setSubmitted(true);
    onSubmitRequest(request);
  }

  if (submitted) {
    return (
      <Card className="border-primary/20 bg-primary/5 shadow-[var(--shadow-card)]">
        <CardContent className="p-8 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
            Your service request has been submitted for review.
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            This UI preview recorded your request inside CropGenius only. It has not been sent to an external cooperative yet.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={onCancel} className="min-h-11">Explore Cooperative Services</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="font-display text-2xl">Request This Service</CardTitle>
        <p className="text-sm text-muted-foreground">Please review your information before submitting.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={submit} noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="farmer-name">Farmer Name</Label>
              <Input
                id="farmer-name"
                value={values.farmerName}
                onChange={(event) => setValues({ ...values, farmerName: event.target.value.slice(0, 80) })}
                aria-invalid={Boolean(errors.farmerName)}
                aria-describedby={errors.farmerName ? "farmer-name-error" : undefined}
                className="min-h-11"
              />
              <FieldError id="farmer-name-error" message={errors.farmerName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile-number">Mobile Number</Label>
              <Input
                id="mobile-number"
                value={values.mobileNumber}
                inputMode="numeric"
                onChange={(event) => setValues({ ...values, mobileNumber: event.target.value.replace(/\D/g, "").slice(0, 10) })}
                aria-invalid={Boolean(errors.mobileNumber)}
                aria-describedby={errors.mobileNumber ? "mobile-number-error" : undefined}
                className="min-h-11"
              />
              <FieldError id="mobile-number-error" message={errors.mobileNumber} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="request-service">Service</Label>
              <Input id="request-service" value={service.name} readOnly className="min-h-11 bg-muted/50" />
              <FieldError id="request-service-error" message={errors.serviceId} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="request-cooperative">Cooperative/Society</Label>
              <Select
                value={values.cooperativeId}
                onValueChange={(cooperativeId) => setValues({ ...values, cooperativeId })}
              >
                <SelectTrigger
                  id="request-cooperative"
                  className="min-h-11"
                  aria-invalid={Boolean(errors.cooperativeId)}
                  aria-describedby={errors.cooperativeId ? "request-cooperative-error" : undefined}
                >
                  <SelectValue placeholder="Select cooperative" />
                </SelectTrigger>
                <SelectContent>
                  {eligibleCooperatives.map((coop) => (
                    <SelectItem key={coop.id} value={coop.id}>
                      {coop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id="request-cooperative-error" message={errors.cooperativeId} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="request-location">Location</Label>
              <Input
                id="request-location"
                value={values.location}
                onChange={(event) => setValues({ ...values, location: event.target.value.slice(0, 100) })}
                placeholder="Village, taluk or nearby market"
                aria-invalid={Boolean(errors.location)}
                aria-describedby={errors.location ? "request-location-error" : undefined}
                className="min-h-11"
              />
              <p className="text-xs text-muted-foreground">Used to help the selected society understand where support is needed.</p>
              <FieldError id="request-location-error" message={errors.location} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="request-description">Optional Description</Label>
              <Textarea
                id="request-description"
                value={values.description}
                onChange={(event) => setValues({ ...values, description: event.target.value.slice(0, 600) })}
                placeholder="Add crop, season, equipment or support details if useful."
                className="min-h-28"
              />
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Label htmlFor="request-documents">Document Upload</Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Accepted file types: PDF, JPG, PNG. Maximum file size: 5 MB each.
                </p>
              </div>
              <Button type="button" variant="outline" className="min-h-11" onClick={() => document.getElementById("request-documents")?.click()}>
                <FileText className="size-4" aria-hidden="true" />
                Add Document
              </Button>
            </div>
            <input
              id="request-documents"
              type="file"
              accept="application/pdf,image/jpeg,image/jpg,image/png"
              multiple
              className="sr-only"
              onChange={(event) => {
                handleFiles(event.target.files);
                event.target.value = "";
              }}
            />
            <FieldError id="request-documents-error" message={errors.documents} />
            {service.documents.length ? (
              <p className="mt-3 text-xs text-muted-foreground">Suggested for this service: {service.documents.join(", ")}</p>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">Documents are optional for this preview unless the cooperative asks later.</p>
            )}
            {values.documents.length ? (
              <ul className="mt-3 space-y-2">
                {values.documents.map((file) => (
                  <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-lg bg-card px-3 py-2 text-sm">
                    <span className="min-w-0 truncate">{file.name}</span>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-xs text-primary">Ready to attach</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => setValues((current) => ({ ...current, documents: current.documents.filter((item) => item !== file) }))}
                      >
                        <X className="size-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" className="min-h-11" onClick={onCancel}>
              Back to Services
            </Button>
            <Button type="submit" className="min-h-11">
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function filterServicesForView(services: CooperativeService[], filters: CooperativeFilters) {
  return filterServices(services, filters);
}

export { emptyFilters, getCooperativeName, demoCooperatives };

export function MyRequests({
  requests,
  onExplore,
  onView,
}: {
  requests: ServiceRequest[];
  onExplore: () => void;
  onView: (requestId: string) => void;
}) {
  return (
    <Card className="border-border/80 shadow-[var(--shadow-card)]">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-display text-xl">My Service Requests</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Track requests recorded in CropGenius.</p>
          </div>
          <Button variant="outline" className="min-h-11 self-start" onClick={onExplore}>
            Explore Cooperative Services
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <EmptyState
            title="You haven't submitted any service requests yet."
            description="Explore Cooperative Services to find support and submit a request for review."
            action={<Button onClick={onExplore}>Explore Cooperative Services</Button>}
          />
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <div key={request.id} className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-foreground">{request.id}</p>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="mt-2 text-sm text-foreground">{demoServices.find((service) => service.id === request.serviceId)?.name ?? "Cooperative service"}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {getCooperativeName(request.cooperativeId)} · {request.submittedAt}
                  </p>
                </div>
                <Button variant="outline" className="min-h-11" onClick={() => onView(request.id)}>
                  View Details
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function RequestDetails({
  request,
  onBack,
}: {
  request: ServiceRequest;
  onBack: () => void;
}) {
  const service = demoServices.find((item) => item.id === request.serviceId);
  return (
    <section className="space-y-5">
      <Button variant="outline" onClick={onBack} className="min-h-11">
        Back to My Requests
      </Button>
      <Card className="border-border/80 shadow-[var(--shadow-card)]">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">{request.id}</p>
              <CardTitle className="mt-1 font-display text-2xl">{service?.name ?? "Cooperative Service Request"}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">{getCooperativeName(request.cooperativeId)} · {request.submittedAt}</p>
            </div>
            <StatusBadge status={request.status} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <SectionHeading icon={ClipboardList} title="Request Progress" />
            <div className="mt-4">
              <ProgressTimeline status={request.status} />
            </div>
          </div>
          <div className="rounded-xl border border-border p-4">
            <SectionHeading icon={FileText} title="Notes / Updates" description="Updates will be populated by the backend later." />
            <div className="mt-4 space-y-3">
              {request.updates.map((update) => (
                <div key={`${update.date}-${update.message}`} className="rounded-lg bg-muted/30 p-3">
                  <p className="text-xs font-semibold text-primary">{update.date}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{update.message}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export function CooperativeDirectory({
  cooperatives,
  location,
  onLocationChange,
  onView,
}: {
  cooperatives: Cooperative[];
  location: string;
  onLocationChange: (location: string) => void;
  onView: (cooperativeId: string) => void;
}) {
  const visible = cooperatives.filter((coop) => coop.location.toLowerCase().includes(location.trim().toLowerCase()));
  return (
    <Card className="border-border/80 shadow-[var(--shadow-card)]">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle className="font-display text-xl">Cooperative Societies</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Sample directory records for UI review only.</p>
          </div>
          <div className="w-full space-y-2 md:max-w-xs">
            <Label htmlFor="directory-location">Filter by location</Label>
            <Input
              id="directory-location"
              value={location}
              onChange={(event) => onLocationChange(event.target.value.slice(0, 80))}
              placeholder="Enter a location"
              className="min-h-11"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {visible.length === 0 ? (
          <EmptyState title="No cooperative societies found for the selected location." description="Clear the location or try another nearby area." />
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {visible.map((coop) => (
              <div key={coop.id} className="flex flex-col rounded-xl border border-border bg-card p-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{coop.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{coop.location}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{coop.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">{coop.contactInformation}</p>
                <Button className="mt-4 min-h-11 w-full" variant="outline" onClick={() => onView(coop.id)}>
                  View Cooperative
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function CooperativeDetails({
  cooperative,
  services,
  onExploreService,
  onBack,
}: {
  cooperative: Cooperative;
  services: CooperativeService[];
  onExploreService: (serviceId: string) => void;
  onBack: () => void;
}) {
  const offered = services.filter((service) => cooperative.services.includes(service.id));
  return (
    <section className="space-y-5">
      <Button variant="outline" onClick={onBack} className="min-h-11">
        Back to Cooperative Societies
      </Button>
      <Card className="border-border/80 shadow-[var(--shadow-card)]">
        <CardHeader>
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="size-6" aria-hidden="true" />
            </span>
            <div>
              <Badge variant="outline" className="mb-2">Sample cooperative record</Badge>
              <CardTitle className="font-display text-2xl">{cooperative.name}</CardTitle>
              <p className="mt-1 text-sm font-medium text-primary">{cooperative.location}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-2">
          <InfoBlock title="About" items={[cooperative.description]} icon={Info} />
          <InfoBlock title="Available Support" items={cooperative.availableSupport} icon={Handshake} />
          <InfoBlock title="Contact Information" items={[cooperative.contactInformation]} icon={Building2} />
          <InfoBlock title="Operating Information" items={[cooperative.operatingInformation]} icon={Info} />
          <div className="lg:col-span-2 rounded-xl border border-border p-4">
            <SectionHeading icon={ClipboardList} title="Services Offered" />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {offered.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => onExploreService(service.id)}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>
                    <span className="block font-semibold text-foreground">{service.name}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{service.category}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
