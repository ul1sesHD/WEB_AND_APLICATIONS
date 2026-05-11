export * from './_base';

// Namespaced (preferred for callers that want explicit grouping)
export * as businessService     from './businessService';
export * as categoryService     from './categoryService';
export * as reviewService       from './reviewService';
export * as visitService        from './visitService';
export * as verificationService from './verificationService';
export * as profileService      from './profileService';
export * as storageService      from './storageService';

// Direct type re-exports for ergonomic consumer imports
export type { BusinessFilters, NearbyArgs }      from './businessService';
export type { ReviewWithAuthor }                 from './reviewService';
export type { RegisterVisitArgs }                from './visitService';
export type { BusinessPhotoKind }                from './storageService';
