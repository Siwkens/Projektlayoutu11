// Konfiguracja Supabase dla własnego hostingu
// Używa zmiennych środowiskowych z pliku .env

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://upslsklauyerlkyisngq.supabase.co';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwc2xza2xhdXllcmxreWlzbmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNjY1MTksImV4cCI6MjA3OTc0MjUxOX0.cERANcobhS4lbu94E9XFEAQf7epbbLruMHQoFBR3AXk';

// Wyciągnij project ID z URL
export const projectId = supabaseUrl.replace('https://', '').split('.')[0];
export const publicAnonKey = supabaseAnonKey;

// Dla kompatybilności wstecznej z istniejącym kodem
export { supabaseUrl as SUPABASE_URL, supabaseAnonKey as SUPABASE_ANON_KEY };
