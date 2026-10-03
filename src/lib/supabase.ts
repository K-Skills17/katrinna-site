import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase não configurado. Adicione as variáveis de ambiente.");
  }
  return createClient(supabaseUrl, serviceKey);
}

export type PortfolioItem = {
  id: string;
  url: string;
  storage_path: string;
  category: string;
  title: string;
  created_at: string;
};
