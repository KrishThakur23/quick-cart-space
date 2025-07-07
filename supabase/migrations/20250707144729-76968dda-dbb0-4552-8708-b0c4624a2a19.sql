-- Add new columns to products table for enhanced pricing and tracking
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS actual_price numeric,
ADD COLUMN IF NOT EXISTS discount_percentage integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_from_dashboard boolean DEFAULT false;

-- Update existing user-created products to mark them as dashboard-created
UPDATE public.products 
SET created_from_dashboard = true 
WHERE user_id != 'system';

-- Delete products not created from dashboard (like the imported dental products)
DELETE FROM public.products 
WHERE created_from_dashboard = false OR created_from_dashboard IS NULL;

-- Update the price column to be the discounted price (calculated field)
-- For existing products, set actual_price to current price if not set
UPDATE public.products 
SET actual_price = price 
WHERE actual_price IS NULL AND created_from_dashboard = true;