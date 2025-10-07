// lib/supabase.ts (Modificado para Server-Side)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! // URL é pública
// Use a chave de anon para o cliente front-end (se necessário)
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// Use a chave de service_role para operações de Server-Side (com RLS ativada)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Cliente principal (deve ser usado nas API Routes/Server Actions)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
// OU crie um cliente específico que use a Service Key para suas rotas:
// export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);