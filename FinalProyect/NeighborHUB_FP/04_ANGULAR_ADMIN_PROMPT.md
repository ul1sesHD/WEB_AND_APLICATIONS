# 04 — ANGULAR ADMIN PROMPT: `/src/admin/`

> **Pre-requisite:** read `00_MASTER_PROMPT.md`. Database (`01_…`) deployed. Shared layer (`02_…`) generated.
> **Output target:** `/src/admin/` — Angular 17+ standalone app served at `/admin/*`.

---

## 0. YOUR TASK

Build the **admin control panel** for NeighborHub: a single Angular app that handles full CRUD for **5 entities** with admin-grade UX. This is the piece graded most strictly by the academic rubric — it must explicitly use **Angular Reactive Forms**, **Bootstrap 5** (≥10 distinct uses), and **jQuery** (≥10 distinct uses).

**Code priority:** clean Angular 17 standalone components (no NgModules), feature-scoped folders, every entity gets the same canonical structure (list + form + service + guard).

---

## 1. PROJECT SETUP

### 1.1 Stack

```
@angular/core@17+               bootstrap@5.3              @neighborhub/shared
@angular/forms (Reactive)       jquery@3.7                 mapbox-gl
@angular/router                 ngx-bootstrap or bootstrap.bundle.js
                                @types/jquery
```

### 1.2 `angular.json`

- App name: `neighborhub-admin`
- Output to `../../dist/admin/`
- `baseHref: '/admin/'`
- Styles: `bootstrap/dist/css/bootstrap.min.css` + `@neighborhub/shared/design/css` + `src/styles.scss`
- Scripts: `jquery/dist/jquery.min.js` + `bootstrap/dist/js/bootstrap.bundle.min.js`

### 1.3 `package.json` scripts

```json
{
  "scripts": {
    "dev": "ng serve --port 4200",
    "build": "ng build --configuration production",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "lint": "ng lint"
  }
}
```

---

## 2. FOLDER STRUCTURE

```
src/admin/src/
├── main.ts                       ← bootstrapApplication(AppComponent, ...)
├── index.html
├── styles.scss                   ← Imports tokens.css + Bootstrap overrides
│
├── app/
│   ├── app.component.ts          ← <admin-shell> with sidebar + main outlet
│   ├── app.routes.ts             ← All admin routes
│   ├── app.config.ts             ← provideRouter, provideHttpClient, provideAnimations
│   │
│   ├── core/
│   │   ├── auth/
│   │   │   ├── auth.service.ts          ← Wraps shared Supabase client
│   │   │   ├── admin.guard.ts           ← canActivate: profile.role === 'admin'
│   │   │   └── auth.interceptor.ts      ← (no-op for Supabase but required by rubric)
│   │   ├── jquery/
│   │   │   ├── table-sort.directive.ts  ← jQuery tablesort
│   │   │   ├── tooltip.directive.ts     ← jQuery Bootstrap tooltip init
│   │   │   ├── confirm-modal.service.ts ← jQuery-driven modal show/hide
│   │   │   └── live-search.directive.ts ← jQuery keyup debounce filter
│   │   └── error/
│   │       └── error-handler.service.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── data-table/              ← Reusable Bootstrap table
│   │   │   ├── confirm-modal/           ← Reusable Bootstrap modal
│   │   │   ├── breadcrumb/              ← Bootstrap breadcrumb
│   │   │   ├── alert-banner/            ← Bootstrap alert
│   │   │   ├── pagination/              ← Bootstrap pagination
│   │   │   ├── search-bar/              ← jQuery-powered live filter
│   │   │   └── stat-card/               ← Bootstrap card
│   │   └── pipes/
│   │       ├── relative-date.pipe.ts
│   │       └── distance.pipe.ts
│   │
│   ├── layout/
│   │   ├── admin-shell/                 ← Sidebar + topbar + outlet
│   │   ├── sidebar/                     ← Bootstrap nav-pills
│   │   └── topbar/                      ← Bootstrap navbar
│   │
│   └── features/                        ← One folder per entity (5 total)
│       ├── dashboard/                   ← Landing inside admin
│       │   ├── dashboard.component.ts
│       │   └── dashboard.component.html
│       │
│       ├── profiles/                    ← Entity 1 (catalog: users)
│       │   ├── profiles.routes.ts
│       │   ├── profile-list.component.ts
│       │   ├── profile-list.component.html
│       │   ├── profile-form.component.ts
│       │   ├── profile-form.component.html
│       │   └── profile.service.ts
│       │
│       ├── categories/                  ← Entity 2 (catalog)
│       │   ├── categories.routes.ts
│       │   ├── category-list.component.{ts,html}
│       │   ├── category-form.component.{ts,html}
│       │   └── category.service.ts
│       │
│       ├── businesses/                  ← Entity 3 (catalog from admin POV)
│       │   ├── businesses.routes.ts
│       │   ├── business-list.component.{ts,html}
│       │   ├── business-detail.component.{ts,html}
│       │   ├── business-form.component.{ts,html}
│       │   ├── business-pending.component.{ts,html}  ← Verification queue
│       │   └── business.service.ts
│       │
│       ├── reviews/                     ← Entity 4 (transactional)
│       │   ├── reviews.routes.ts
│       │   ├── review-list.component.{ts,html}
│       │   ├── review-detail.component.{ts,html}
│       │   └── review.service.ts
│       │
│       └── visits/                      ← Entity 5 (transactional, read-only reports)
│           ├── visits.routes.ts
│           ├── visit-list.component.{ts,html}
│           ├── visit-report.component.{ts,html}
│           └── visit.service.ts
│
└── assets/
    └── (logo, favicon)
```

---

## 3. ROUTING — `app.routes.ts`

```ts
export const routes: Routes = [
  {
    path: '',
    component: AdminShellComponent,
    canActivate: [adminGuard],
    children: [
      { path: '',           component: DashboardComponent, title: 'Admin · NeighborHub' },
      { path: 'profiles',   loadChildren: () => import('./features/profiles/profiles.routes').then(m => m.PROFILE_ROUTES) },
      { path: 'categories', loadChildren: () => import('./features/categories/categories.routes').then(m => m.CATEGORY_ROUTES) },
      { path: 'businesses', loadChildren: () => import('./features/businesses/businesses.routes').then(m => m.BUSINESS_ROUTES) },
      { path: 'reviews',    loadChildren: () => import('./features/reviews/reviews.routes').then(m => m.REVIEW_ROUTES) },
      { path: 'visits',     loadChildren: () => import('./features/visits/visits.routes').then(m => m.VISIT_ROUTES) },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
```

Each entity's `*.routes.ts` exposes 3 routes: `''` (list), `'new'` (form), `':id'` (form-edit).

---

## 4. CANONICAL FEATURE STRUCTURE — Apply to all 5

Every entity follows the same pattern. Example with `profiles`.

### 4.1 `profile.service.ts`

```ts
import { Injectable, inject } from '@angular/core';
import { from, type Observable } from 'rxjs';
import { getSupabase, type Profile, type ProfileInsert, type ProfileUpdate } from '@neighborhub/shared';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private sb = getSupabase();

  list(filters: { search?: string; role?: string } = {}): Observable<Profile[]> {
    return from((async () => {
      let q = this.sb.from('profiles').select('*').is('deleted_at', null).order('created_at', { ascending: false });
      if (filters.search) q = q.ilike('name', `%${filters.search}%`);
      if (filters.role)   q = q.eq('role', filters.role);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    })());
  }

  getById(id: string): Observable<Profile | null> { /* ... */ }
  create(payload: ProfileInsert): Observable<Profile> { /* ... */ }
  update(id: string, patch: ProfileUpdate): Observable<Profile> { /* ... */ }
  softDelete(id: string): Observable<void> { /* ... */ }
}
```

### 4.2 `profile-list.component.ts`

```ts
@Component({
  standalone: true,
  selector: 'admin-profile-list',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, DataTableComponent, SearchBarComponent, ConfirmModalComponent],
  templateUrl: './profile-list.component.html',
})
export class ProfileListComponent {
  private service = inject(ProfileService);
  private confirm = inject(ConfirmModalService);

  search = new FormControl('', { nonNullable: true });
  role   = new FormControl('', { nonNullable: true });
  rows   = signal<Profile[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.refresh();
    this.search.valueChanges.pipe(debounceTime(250)).subscribe(() => this.refresh());
    this.role.valueChanges.subscribe(() => this.refresh());
  }

  refresh() {
    this.loading.set(true);
    this.service.list({ search: this.search.value, role: this.role.value || undefined })
      .subscribe(rows => { this.rows.set(rows); this.loading.set(false); });
  }

  async onDelete(p: Profile) {
    const ok = await this.confirm.ask(`Delete user "${p.name}"?`);
    if (ok) this.service.softDelete(p.id).subscribe(() => this.refresh());
  }
}
```

### 4.3 `profile-list.component.html` — Bootstrap table + jQuery search

```html
<admin-breadcrumb [items]="[{label:'Admin', link:'/'}, {label:'Profiles'}]"></admin-breadcrumb>

<div class="card shadow-sm">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h2 class="h5 mb-0 text-uppercase">Users</h2>
    <a routerLink="new" class="btn btn-primary btn-sm">+ New</a>
  </div>

  <div class="card-body">
    <div class="row g-2 mb-3">
      <div class="col-md-6">
        <admin-search-bar [control]="search" placeholder="Search by name…"></admin-search-bar>
      </div>
      <div class="col-md-3">
        <select class="form-select" [formControl]="role">
          <option value="">All roles</option>
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>

    <table class="table table-hover align-middle" appTableSort>
      <thead class="table-light">
        <tr>
          <th data-sort="name">Name</th>
          <th data-sort="role">Role</th>
          <th data-sort="neighborhood">Neighborhood</th>
          <th data-sort="created_at">Created</th>
          <th class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (p of rows(); track p.id) {
          <tr>
            <td><strong>{{ p.name }}</strong></td>
            <td><span class="badge text-uppercase" [class]="badgeClass(p.role)">{{ p.role }}</span></td>
            <td>{{ p.neighborhood ?? '—' }}</td>
            <td>{{ p.created_at | relativeDate }}</td>
            <td class="text-end">
              <a [routerLink]="[p.id]" class="btn btn-outline-primary btn-sm">Edit</a>
              <button class="btn btn-outline-danger btn-sm ms-1" (click)="onDelete(p)">Delete</button>
            </td>
          </tr>
        } @empty {
          <tr><td colspan="5" class="text-center text-muted py-4">No users found.</td></tr>
        }
      </tbody>
    </table>

    @if (loading()) { <admin-alert-banner kind="info">Loading…</admin-alert-banner> }
  </div>
</div>
```

### 4.4 `profile-form.component.ts` — Reactive Forms with validators

```ts
@Component({ /* standalone, ReactiveFormsModule */ })
export class ProfileFormComponent implements OnInit {
  form = this.fb.group({
    name:         ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    phone:        ['', [Validators.pattern(/^\+?[0-9]{10,15}$/)]],
    role:         ['user' as UserRole, Validators.required],
    neighborhood: ['', Validators.maxLength(100)],
    city:         ['Mexico City', Validators.required],
    active:       [true],
  });

  id = signal<string | null>(null);
  saving = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.id.set(id);
      this.service.getById(id).subscribe(p => p && this.form.patchValue(p));
    }
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const op$ = this.id() ? this.service.update(this.id()!, this.form.value) : this.service.create(this.form.value as ProfileInsert);
    op$.subscribe({
      next:  () => this.router.navigate(['/profiles']),
      error: (e) => { this.saving.set(false); /* show alert */ },
    });
  }
}
```

### 4.5 `profile-form.component.html` — Bootstrap form

Use Bootstrap classes: `form-control`, `form-select`, `form-check`, `is-invalid`/`is-valid`, `invalid-feedback`. Fieldsets in `.card .card-body`.

---

## 5. APPLY THE PATTERN TO THE OTHER 4 ENTITIES

### Categories
- Form fields: name, description, icon (emoji), image_url (path), color_hex (color picker), group_name (select), display_order, active
- Validators: `name unique` (async), `color_hex` regex `^#[0-9A-Fa-f]{6}$`

### Businesses
- List has filter chips: status (all / active / pending / suspended), category, neighborhood
- Pending tab is a separate component with quick-action buttons: **Approve** / **Suspend**
- Form is the most complex — split into 3 cards: Identity, Story, Location & Hours
- Map embed for location editing (Mapbox GL static or interactive)

### Reviews
- List shows: business name, rating (stars), comment preview, author, active toggle
- No "create" form (admins moderate, they don't write)
- Detail view: full review + business + author + "Deactivate" / "Reactivate" / "Delete"

### Visits
- **Read-only**. List only. With filters: date range, business, user
- "Reports" sub-page with aggregated metrics: total km, total CO₂, top businesses, top users (uses `v_user_impact` and direct queries)
- Export to CSV button (use `papaparse`)

---

## 6. JQUERY USAGE — Mandatory ≥10 distinct uses

| # | Use case | File |
|---|----------|------|
| 1 | Live search filter (debounced keyup) | `live-search.directive.ts` |
| 2 | Sortable tables | `table-sort.directive.ts` |
| 3 | Confirm modal show/hide | `confirm-modal.service.ts` |
| 4 | Bootstrap tooltip init | `tooltip.directive.ts` |
| 5 | Toast notifications | `toast.service.ts` |
| 6 | Sidebar collapse on mobile | `sidebar.component.ts` |
| 7 | Form validation visual feedback | `form-feedback.directive.ts` |
| 8 | CSV download link generation | `visits/visit-report.component.ts` |
| 9 | Dropdown autocomplete | `business-form` (vendor selector) |
| 10 | Image preview before upload | `business-form` (photo input) |
| 11 | Smooth scroll to errors on form submit | `form-feedback.directive.ts` |
| 12 | Tab switcher on dashboard | `dashboard.component.ts` |

Each usage must be **inside a directive or service**, not inline in components, so the rubric document can cite exact file:line.

---

## 7. BOOTSTRAP USAGE — Mandatory ≥10 distinct uses

| # | Component | Where |
|---|-----------|-------|
| 1 | Navbar | `topbar` |
| 2 | Sidebar nav-pills | `sidebar` |
| 3 | Card | every list/detail |
| 4 | Table responsive | every list |
| 5 | Form controls + validation | every form |
| 6 | Modal | `confirm-modal` |
| 7 | Alert | `alert-banner` |
| 8 | Badge | role/status indicators |
| 9 | Breadcrumb | every page |
| 10 | Pagination | every list |
| 11 | Dropdown | filters |
| 12 | Toast | notifications |
| 13 | Tabs / Pills | dashboard, business detail |
| 14 | Grid system | layout |

---

## 8. AUTH GUARD — Admin-only

```ts
// admin.guard.ts
export const adminGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const profile = await auth.getCurrentProfile();
  if (!profile || profile.role !== 'admin') {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
```

`AuthService.getCurrentProfile()` reads the Supabase session from `@neighborhub/shared`'s `getSupabase()` and fetches the profile row. The user is the **same** as the React app — they sign in once and the session is persisted under `neighborhub.auth` in `localStorage`.

---

## 9. STYLES — `styles.scss`

```scss
@import '@neighborhub/shared/design/css';
@import 'bootstrap/dist/css/bootstrap.min.css';

/* Brand overrides */
.btn-primary {
  --bs-btn-bg: var(--color-toldo-red);
  --bs-btn-border-color: var(--color-toldo-red);
  --bs-btn-hover-bg: #A52F22;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
}
.navbar-brand { font-family: var(--font-display); letter-spacing: 0.08em; }
.card-header h2 { font-family: var(--font-display); }
body { font-family: var(--font-body); background: var(--color-paper-cream); }
```

---

## 10. ENV — `src/environments/environment.ts` + `.prod.ts`

```ts
export const environment = {
  production: false,
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'eyJ...',
  mapboxToken: 'pk.eyJ...',
};
```

Loaded via Angular's `fileReplacements` in `angular.json` for production. Pass through to `getSupabase()` via `(window as any).__NH_ENV__` polyfill set in `main.ts` so the shared client picks them up.

---

## 11. ACCEPTANCE CRITERIA

- [ ] All 5 entities have full CRUD: list + form (create) + form (edit) + delete (soft).
- [ ] Reactive Forms with `Validators` on every input.
- [ ] Update form pre-fills via `patchValue()` from fetched record.
- [ ] ≥10 distinct Bootstrap component types used (cite each in `RUBRIC_COMPLIANCE.md`).
- [ ] ≥10 distinct jQuery uses isolated in directives/services (cite each).
- [ ] `adminGuard` blocks non-admin users; RLS enforces server-side.
- [ ] Admin user can log in once and use both `/` (React) and `/admin` (Angular) without re-login.
- [ ] `npm run build` produces `dist/admin/` with `baseHref: /admin/`.
- [ ] No file > 250 lines; canonical feature structure followed by all 5 entities.
- [ ] No duplicated logic from `@neighborhub/shared`.
- [ ] All UI text in **English**.

---

**END OF ANGULAR ADMIN PROMPT**
