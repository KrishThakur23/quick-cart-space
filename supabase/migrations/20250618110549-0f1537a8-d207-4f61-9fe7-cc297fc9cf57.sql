
-- Add images column to products table to support multiple images
ALTER TABLE public.products 
ADD COLUMN images text[] DEFAULT '{}';
