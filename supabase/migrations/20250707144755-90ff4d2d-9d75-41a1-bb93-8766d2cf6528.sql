-- Add new columns to products table for enhanced pricing and tracking
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS actual_price numeric,
ADD COLUMN IF NOT EXISTS discount_percentage integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_from_dashboard boolean DEFAULT false;

-- Update existing user-created products to mark them as dashboard-created
-- Only update products that have a real user_id (not the dental products we want to remove)
UPDATE public.products 
SET created_from_dashboard = true 
WHERE user_id IN (SELECT id FROM auth.users);

-- For existing products, set actual_price to current price if not set
UPDATE public.products 
SET actual_price = price 
WHERE actual_price IS NULL AND created_from_dashboard = true;