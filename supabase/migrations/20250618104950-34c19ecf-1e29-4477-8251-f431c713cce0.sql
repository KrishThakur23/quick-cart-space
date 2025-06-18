
-- Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload product images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'product-images' AND 
  auth.role() = 'authenticated'
);

-- Create policy to allow public read access to product images
CREATE POLICY "Allow public read access to product images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Create policy to allow users to update their own product images
CREATE POLICY "Allow users to update their own product images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'product-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy to allow users to delete their own product images
CREATE POLICY "Allow users to delete their own product images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'product-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
