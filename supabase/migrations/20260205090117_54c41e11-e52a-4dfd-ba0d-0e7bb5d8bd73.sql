-- Create media storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create folders table for organizing media
CREATE TABLE public.folders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES public.folders(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media files table
CREATE TABLE public.media_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  folder_id UUID REFERENCES public.folders(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on folders
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;

-- Enable RLS on media_files
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- Public read access for folders (admin dashboard)
CREATE POLICY "Public read access for folders"
ON public.folders FOR SELECT
USING (true);

-- Public insert access for folders
CREATE POLICY "Public insert access for folders"
ON public.folders FOR INSERT
WITH CHECK (true);

-- Public update access for folders
CREATE POLICY "Public update access for folders"
ON public.folders FOR UPDATE
USING (true);

-- Public delete access for folders
CREATE POLICY "Public delete access for folders"
ON public.folders FOR DELETE
USING (true);

-- Public read access for media_files
CREATE POLICY "Public read access for media_files"
ON public.media_files FOR SELECT
USING (true);

-- Public insert access for media_files
CREATE POLICY "Public insert access for media_files"
ON public.media_files FOR INSERT
WITH CHECK (true);

-- Public update access for media_files
CREATE POLICY "Public update access for media_files"
ON public.media_files FOR UPDATE
USING (true);

-- Public delete access for media_files
CREATE POLICY "Public delete access for media_files"
ON public.media_files FOR DELETE
USING (true);

-- Storage policies for media bucket
CREATE POLICY "Public read access for media bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Public upload to media bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Public update in media bucket"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media');

CREATE POLICY "Public delete from media bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'media');

-- Create default folders
INSERT INTO public.folders (name, slug) VALUES
  ('Tours', 'tours'),
  ('Locations', 'locations'),
  ('Banners', 'banners'),
  ('General', 'general');