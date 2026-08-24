import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://htdomxwshtynvgpmclna.supabase.co'
const SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0ZG9teHdzaHR5bnZncG1jbG5hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI1NTY2MiwiZXhwIjoyMTAyODMxNjYyfQ.6xj1n-raBmTR3BsWjNR1pJ-htVVN-tKe4glIoEhn_SM'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

async function run() {
  console.log('Updating Cumin product image to /products/Kura_Gold_Cumin_Seeds.webp in database...')

  const { data, error } = await supabase
    .from('products')
    .update({
      image_url: '/products/Kura_Gold_Cumin_Seeds.webp',
      status: 'coming_soon',
      category: 'whole',
      tagline: 'Future Product — Whole Cumin Seeds',
      is_active: true,
    })
    .eq('slug', 'cumin')
    .select('name, slug, image_url, status, category, is_active')

  if (error) {
    console.error('Error updating cumin:', error.message)
  } else {
    console.log('✅ Updated Cumin product:', data)
  }
}

run()
