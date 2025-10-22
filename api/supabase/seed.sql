insert into public.service_types (slug, label, description, display_order)
values
  ('routine', 'Routine Care', 'Weekly or bi-weekly maintenance visits keeping surfaces dust-free and kitchens sparkling.', 10),
  ('deep-clean', 'Deep Clean', 'Seasonal and first-time deep cleans covering appliances, grout, and baseboards.', 20),
  ('move', 'Move-In / Move-Out', 'Reset spaces during tenancy changes with deposit-ready detailing.', 30),
  ('commercial', 'Commercial Suites', 'After-hours care for offices, lobbies, and shared amenity spaces.', 40)
on conflict (slug) do update
set
  label = excluded.label,
  description = excluded.description,
  is_active = true,
  display_order = excluded.display_order;

insert into public.blog_posts (slug, title, excerpt, content_markdown, hero_image_url, hero_image_alt, reading_time_minutes, tags, status, published_at)
values
  (
    'supabase-powered-intake',
    'How Silver Lining Captures Inquiries in 60 Seconds',
    'A breakdown of the inquiry intake pipeline that routes Webflow submissions into Supabase with Slack alerts.',
    $markdown$
## Intake in minutes, not days

Our Silver Lining team replaces brittle form notification emails with a Supabase-backed pipeline. The contact form hands off to an Edge Function, which verifies the Webflow signature, inserts the payload, and emits notifications.

### Key ingredients

- Supabase `form_events` table keeps the raw payload.
- `inquiries` table stores the normalized view used by the ops team.
- Slack notifications highlight the top-line details instantly.

Customers get a “we received your note” message within a minute, and our team sees the full context without digging through inbox filters.
$markdown$,
    'https://example.com/images/intake-badge.jpg',
    'Operations team reviewing new inquiry on tablet',
    4,
    array['operations', 'automations'],
    'published',
    timezone('utc', now()) - interval '4 days'
  ),
  (
    'checklist-for-deep-cleans',
    'The Deep Clean Checklist We Bring to Every Move-Out',
    'Our supervisors rely on a single source of truth stored in Supabase Storage—here’s how the workflow runs.',
    $markdown$
## One checklist to lead every visit

Move-outs and seasonal resets demand consistency. We store our annotated PDF and task data in Supabase so every crew member sees the same instructions.

1. Coordinator assigns the booking and attaches the storage asset.
2. Team lead opens the checklist from the mobile app.
3. Completed tasks sync back into the dashboard with timestamps and photos.

The result: predictable punch list completion and fewer return trips.
$markdown$,
    'https://example.com/images/deep-clean.jpg',
    'Silver Lining team deep cleaning a kitchen island',
    5,
    array['process', 'checklists'],
    'published',
    timezone('utc', now()) - interval '12 days'
  ),
  (
    'eco-products-we-trust',
    'Eco-Friendly Products Clients Actually Love',
    'A quick tour of the hypoallergenic, human-safe lineup that keeps homes gleaming without harsh chemicals.',
    $markdown$
## The products in our caddies

We vet every solution for safety, scent, and surface compatibility. Supabase Storage keeps SDS sheets handy while a reference table tracks which products apply to which surfaces.

### Tools in rotation

- Plant-based degreaser for kitchen build-up.
- Mineral-infused glass polish for streak-free shine.
- Hypoallergenic floor rinse for hardwood and laminate.

Clients love the results and staff loves the predictable, easy-to-reorder inventory.
$markdown$,
    'https://example.com/images/eco-products.jpg',
    'Eco-friendly cleaning products neatly arranged on a counter',
    6,
    array['eco', 'products'],
    'published',
    timezone('utc', now()) - interval '21 days'
  )
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content_markdown = excluded.content_markdown,
  hero_image_url = excluded.hero_image_url,
  hero_image_alt = excluded.hero_image_alt,
  reading_time_minutes = excluded.reading_time_minutes,
  tags = excluded.tags,
  status = excluded.status,
  published_at = excluded.published_at,
  updated_at = timezone('utc', now());
