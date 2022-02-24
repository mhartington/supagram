create table supagram
(
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  caption text,
  img text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table supagram
enable row level security;

create policy "Users can delete their own posts."
  on supagram
  for delete
  using (auth.uid() = user_id);

create policy "Users can insert their own posts."
  on supagram
  for insert
  with check ( auth.uid() = user_id );

create policy "Users can see public posts."
  on supagram
  for select
  using ( auth.role() = 'authenticated' );

-- Set up Storage!
insert into storage.buckets (id, name)
values ('public', 'public');

create policy "Public photos are accessible."
  on storage.objects for select
  using ( bucket_id = 'public' );

create policy "Users can create photos."
  on storage.objects for insert
  with check ( auth.role() = 'authenticated' );

create policy "Delete photos"
  on storage.objects for delete
  using ( auth.uid() = owner );

-- Enable Realtime
begin;
-- remove the realtime publication
drop publication if exists supabase_realtime;

-- re-create the publication but don't enable it for any tables
create publication supabase_realtime;
commit;

-- add a table to the publication
alter publication supabase_realtime add table supagram
;

-- get full information even on remove
alter table supagram
replica identity full;
