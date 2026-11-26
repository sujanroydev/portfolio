create table if not exists public.unsaid_activities (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  page_slug text not null,
  event_type text not null,
  event_name text not null,
  event_data jsonb not null default '{}'::jsonb,
  search_text text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.unsaid_responses (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid references public.unsaid_activities(id) on delete set null,
  page_slug text not null,
  question_id text not null,
  question_text text not null,
  response jsonb not null,
  search_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists unsaid_activities_created_at_idx on public.unsaid_activities(created_at desc);
create index if not exists unsaid_activities_page_slug_idx on public.unsaid_activities(page_slug);
create index if not exists unsaid_activities_event_type_idx on public.unsaid_activities(event_type);
create index if not exists unsaid_activities_session_id_idx on public.unsaid_activities(session_id);
create index if not exists unsaid_activities_search_text_idx on public.unsaid_activities using gin(to_tsvector('simple', coalesce(search_text, '')));
create index if not exists unsaid_responses_activity_id_idx on public.unsaid_responses(activity_id);
create index if not exists unsaid_responses_page_slug_idx on public.unsaid_responses(page_slug);
create index if not exists unsaid_responses_created_at_idx on public.unsaid_responses(created_at desc);
create index if not exists unsaid_responses_question_id_idx on public.unsaid_responses(question_id);
create index if not exists unsaid_responses_search_text_idx on public.unsaid_responses using gin(to_tsvector('simple', coalesce(search_text, '')));

create or replace function public.set_unsaid_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_unsaid_responses_updated_at on public.unsaid_responses;
create trigger set_unsaid_responses_updated_at
before update on public.unsaid_responses
for each row execute function public.set_unsaid_updated_at();

create or replace function public.set_unsaid_activity_search_text()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.search_text = coalesce(new.event_name, '') || ' ' || coalesce(new.event_data::text, '');
  return new;
end;
$$;

drop trigger if exists set_unsaid_activity_search_text on public.unsaid_activities;
create trigger set_unsaid_activity_search_text
before insert or update on public.unsaid_activities
for each row execute function public.set_unsaid_activity_search_text();

create or replace function public.set_unsaid_response_search_text()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.search_text =
    coalesce(new.question_text, '') || ' ' ||
    coalesce(new.question_id, '') || ' ' ||
    coalesce(new.response::text, '');
  return new;
end;
$$;

drop trigger if exists set_unsaid_response_search_text on public.unsaid_responses;
create trigger set_unsaid_response_search_text
before insert or update on public.unsaid_responses
for each row execute function public.set_unsaid_response_search_text();

alter table public.unsaid_activities enable row level security;
alter table public.unsaid_responses enable row level security;

revoke all on public.unsaid_activities from anon, authenticated;
revoke all on public.unsaid_responses from anon, authenticated;

create or replace function public.unsaid_dashboard_overview()
returns jsonb
language sql
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'totalActivities', (select count(*) from public.unsaid_activities),
    'totalPageVisits', (select count(*) from public.unsaid_activities where event_type = 'page_view'),
    'totalResponses', (select count(*) from public.unsaid_responses),
    'uniquePages', (select count(distinct page_slug) from public.unsaid_activities),
    'firstActivity', (select created_at from public.unsaid_activities order by created_at asc limit 1),
    'mostRecentActivity', (select created_at from public.unsaid_activities order by created_at desc limit 1)
  );
$$;

create or replace function public.unsaid_page_analytics()
returns jsonb
language sql
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(row_to_json(p) order by p.activity_count desc), '[]'::jsonb)
  from (
    select
      a.page_slug,
      count(*)::integer as activity_count,
      count(*) filter (where a.event_type = 'page_view')::integer as visits,
      (select count(*)::integer from public.unsaid_responses r where r.page_slug = a.page_slug) as responses,
      max(a.created_at) as most_recent
    from public.unsaid_activities a
    group by a.page_slug
  ) p;
$$;

revoke all on function public.unsaid_dashboard_overview() from public, anon, authenticated;
revoke all on function public.unsaid_page_analytics() from public, anon, authenticated;
