// Hand-written mirror of `database/01_schema.sql`. Regenerate via:
//   npx supabase gen types typescript --project-id <ID> --schema public > database.types.ts
export type Json = string | number | boolean | null | { [k: string]: Json } | Json[];

// ─── Enums ───────────────────────────────────────────────────────────────────
export type UserRole       = 'user' | 'vendor' | 'admin';
export type BusinessStatus = 'active' | 'pending' | 'suspended' | 'inactive';
export type BadgeType =
  | 'community_verified'
  | 'top_rated'
  | 'eco_friendly'
  | 'local_history'
  | 'most_visited';
export type VisitMode      = 'manual' | 'gps';
export type CategoryGroup  = 'food' | 'services' | 'circular';

// ─── Domain shapes ───────────────────────────────────────────────────────────
export type DayName =
  | 'monday' | 'tuesday' | 'wednesday' | 'thursday'
  | 'friday' | 'saturday' | 'sunday';

export type BusinessDay = { open: string; close: string } | { closed: true };
export type BusinessHours = Record<DayName, BusinessDay>;

// GEOGRAPHY(POINT, 4326): WKT string or GeoJSON. Normalize via `helpers/geo.ts`.
export type GeographyPoint = string | { type: 'Point'; coordinates: [number, number] };

// ─── Tables ──────────────────────────────────────────────────────────────────
type ProfileRow = {
  id: string;
  name: string;
  phone: string | null;
  role: UserRole;
  location: GeographyPoint | null;
  neighborhood: string | null;
  city: string;
  avatar_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
type CategoryRow = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  color_hex: string;
  group_name: CategoryGroup;
  display_order: number;
  active: boolean;
  created_at: string;
};
type BadgeRow = {
  id: string;
  type: BadgeType;
  name: string;
  description: string | null;
  icon: string | null;
  color_hex: string;
  criterion: string | null;
};
type BusinessRow = {
  id: string;
  owner_id: string;
  category_id: string;
  name: string;
  description: string | null;
  story: string | null;
  vendor_quote: string | null;
  vendor_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  location: GeographyPoint;
  address: string | null;
  neighborhood: string | null;
  city: string;
  landmark: string | null;
  hours: BusinessHours | null;
  years_in_neighborhood: number | null;
  photo_url: string | null;
  hero_photo_url: string | null;
  is_eco_friendly: boolean;
  eco_practices: string | null;
  status: BusinessStatus;
  rating_avg: number;
  total_reviews: number;
  total_visits: number;
  total_verifications: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
type ReviewRow = {
  id: string;
  business_id: string;
  author_id: string;
  rating: number;
  comment: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};
type VisitRow = {
  id: string;
  business_id: string;
  visitor_id: string;
  km_distance: number;
  co2_saved_kg: number;
  reported_spending: number | null;
  mode: VisitMode;
  visit_location: GeographyPoint | null;
  created_at: string;
};
type VerificationRow = {
  id: string;
  business_id: string;
  verifier_id: string;
  confirms: boolean;
  note: string | null;
  created_at: string;
};
type BusinessBadgeRow = {
  id: string;
  business_id: string;
  badge_type: BadgeType;
  granted_at: string;
};

type Insertable<T, Opt extends keyof T = never> =
  Omit<T, 'id' | 'created_at' | 'updated_at' | Opt>
  & { id?: string; created_at?: string; updated_at?: string }
  & Partial<Pick<T, Opt>>;
type Updatable<T> = Partial<T>;
type NoRel = [];
// ─── Views ───────────────────────────────────────────────────────────────────
type BusinessDirectoryView = BusinessRow & {
  category_name: string;
  category_icon: string | null;
  category_image_url: string | null;
  category_color: string;
  category_group: CategoryGroup;
  owner_profile_id: string;
  owner_name: string;
  owner_avatar_url: string | null;
  badges: Array<{ type: BadgeType; name: string; icon: string | null; color: string }>;
};
type UserImpactView = {
  user_id: string;
  name: string;
  total_visits: number;
  total_km_saved: number;
  total_co2_saved_kg: number;
  total_local_spending: number;
  unique_businesses_visited: number;
  active_days: number;
  first_visit_at: string | null;
  last_visit_at: string | null;
};
type AdminPendingView = {
  id: string;
  name: string;
  created_at: string;
  total_verifications: number;
  status: BusinessStatus;
  category_name: string;
  owner_id: string;
  owner_name: string;
};
// ─── Functions (RPC) ─────────────────────────────────────────────────────────
type FindNearbyBusinessesArgs = {
  user_location: string;
  radius_meters?: number;
  category_filter?: string | null;
  search_query?: string | null;
  result_limit?: number;
};
type FindNearbyBusinessesRow = {
  id: string;
  name: string;
  category_name: string;
  category_icon: string | null;
  category_color: string;
  distance_meters: number;
  rating_avg: number;
  total_reviews: number;
  location: GeographyPoint;
  photo_url: string | null;
  status: BusinessStatus;
};
// ─── Database root ───────────────────────────────────────────────────────────
export type Database = {
  public: {
    Tables: {
      profiles:        { Row: ProfileRow;       Insert: Insertable<ProfileRow,       'deleted_at' | 'active' | 'role' | 'city'>;                                                                              Update: Updatable<ProfileRow>;       Relationships: NoRel };
      categories:      { Row: CategoryRow;      Insert: Insertable<CategoryRow,      'active' | 'display_order'>;                                                                                             Update: Updatable<CategoryRow>;      Relationships: NoRel };
      badges:          { Row: BadgeRow;         Insert: Insertable<BadgeRow>;                                                                                                                                Update: Updatable<BadgeRow>;         Relationships: NoRel };
      businesses:      { Row: BusinessRow;      Insert: Insertable<BusinessRow,      'rating_avg' | 'total_reviews' | 'total_visits' | 'total_verifications' | 'status' | 'is_eco_friendly' | 'city' | 'deleted_at'>; Update: Updatable<BusinessRow>; Relationships: NoRel };
      reviews:         { Row: ReviewRow;        Insert: Insertable<ReviewRow,        'active'>;                                                                                                              Update: Updatable<ReviewRow>;        Relationships: NoRel };
      visits:          { Row: VisitRow;         Insert: Insertable<VisitRow,         'mode' | 'visit_location' | 'reported_spending'>;                                                                       Update: Updatable<VisitRow>;         Relationships: NoRel };
      verifications:   { Row: VerificationRow;  Insert: Insertable<VerificationRow,  'confirms' | 'note'>;                                                                                                   Update: Updatable<VerificationRow>;  Relationships: NoRel };
      business_badges: { Row: BusinessBadgeRow; Insert: Insertable<BusinessBadgeRow, 'granted_at'>;                                                                                                          Update: Updatable<BusinessBadgeRow>; Relationships: NoRel };
    };
    Views: {
      v_business_directory: { Row: BusinessDirectoryView; Relationships: NoRel };
      v_user_impact:        { Row: UserImpactView;        Relationships: NoRel };
      v_admin_pending:      { Row: AdminPendingView;      Relationships: NoRel };
    };
    Functions: {
      calculate_co2:           { Args: { km: number };                                            Returns: number };
      distance_km:             { Args: { p1: string; p2: string };                                Returns: number };
      find_nearby_businesses:  { Args: FindNearbyBusinessesArgs;                                  Returns: FindNearbyBusinessesRow[] };
      is_admin:                { Args: Record<string, never>;                                     Returns: boolean };
    };
    Enums: {
      user_role: UserRole;
      business_status: BusinessStatus;
      badge_type: BadgeType;
      visit_mode: VisitMode;
      category_group: CategoryGroup;
    };
  };
};
// ─── Convenience aliases ─────────────────────────────────────────────────────
type T = Database['public']['Tables'];
type V = Database['public']['Views'];
export type Profile            = T['profiles']['Row'];
export type ProfileInsert      = T['profiles']['Insert'];
export type ProfileUpdate      = T['profiles']['Update'];
export type Category           = T['categories']['Row'];
export type CategoryInsert     = T['categories']['Insert'];
export type Badge              = T['badges']['Row'];
export type Business           = T['businesses']['Row'];
export type BusinessInsert     = T['businesses']['Insert'];
export type BusinessUpdate     = T['businesses']['Update'];
export type Review             = T['reviews']['Row'];
export type ReviewInsert       = T['reviews']['Insert'];
export type Visit              = T['visits']['Row'];
export type VisitInsert        = T['visits']['Insert'];
export type Verification       = T['verifications']['Row'];
export type VerificationInsert = T['verifications']['Insert'];
export type BusinessBadge      = T['business_badges']['Row'];
export type BusinessDirectoryRow = V['v_business_directory']['Row'];
export type UserImpactRow        = V['v_user_impact']['Row'];
export type AdminPendingRow      = V['v_admin_pending']['Row'];
export type FindNearbyResult     = FindNearbyBusinessesRow;
