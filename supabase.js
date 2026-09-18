import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "COLE_AQUI_SUA_PROJECT_URL";
const SUPABASE_PUBLISHABLE_KEY = "COLE_AQUI_SUA_PUBLISHABLE_KEY";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
