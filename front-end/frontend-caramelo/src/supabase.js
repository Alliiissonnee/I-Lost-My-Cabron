import { createClient } from '@supabase/supabase-js'
 
/*partie responsable pour gerer tout lentre et sortie des url des photos*/
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('URL:', import.meta.env.VITE_SUPABASE_URL); // ou process.env selon ton setup
 
export const supabase = createClient(supabaseUrl, supabaseKey)