# Government Schemes Module

## Scope
- Complete only the existing `/schemes` page and new scheme-specific UI/data files; preserve shared navigation and all other modules.
- Use existing CropGenius dashboard styling and responsive controls.

## Build
- Add typed scheme, finder form, matching result, filter, and future API service contracts.
- Keep the verified scheme list empty because the project currently contains no official scheme records; never invent benefits, eligibility, or official links.
- Build browse/search/filter, scheme details, a rule-based “Find Schemes For Me” form, potential-relevance messaging, official-source warning, and loading/error/empty states.
- Keep UI components separate from the data/service boundary for future Flask + MySQL responses.

## Verification
- Check `/schemes` navigation, filtering and empty results, finder validation and matching behavior, details presentation, and responsive layout.
- Confirm only scheme-specific files and project task notes changed.

## Technical details
- Reuse `DashboardShell` and existing shadcn controls; do not add backend calls or change shared navigation.