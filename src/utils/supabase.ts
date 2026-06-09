import { createClient } from '@supabase/supabase-js';

// Retrieve values from environment variables
const rawUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const rawPublishableKey = (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const rawAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// Choose whichever key is provided
const rawKey = rawAnonKey || rawPublishableKey || '';

const isValidUrl = (url: string): boolean => {
  return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
};

const supabaseUrl = isValidUrl(rawUrl) ? rawUrl : 'https://krwnrmttjvwlmejuzbss.supabase.co';
const supabaseKey = rawKey || 'sb_publishable_z2ptXt568RwyFVCAvhTn4A_yu_KJz6Z';

// Concrete Verification Logging
console.log('--- SUPABASE CONNECTION DIAGNOSTICS ---');
console.log('Supabase URL Loaded:', supabaseUrl);
console.log('Is Supabase URL Valid:', isValidUrl(rawUrl) ? 'YES (Env loaded)' : 'NO (Falling back to default)');
console.log('Supabase Key Source:', rawAnonKey ? 'VITE_SUPABASE_ANON_KEY' : rawPublishableKey ? 'VITE_SUPABASE_PUBLISHABLE_KEY' : 'None found (Using fallback)');
console.log('Supabase Key Loaded:', supabaseKey ? `${supabaseKey.substring(0, 8)}...[len: ${supabaseKey.length}]` : 'EMPTY');

if (!isValidUrl(rawUrl) || !rawKey) {
  console.warn('⚠️ CONFIGURATION WARNING: Supabase URL, Anon Key, or Publishable Key is missing or invalid in environment variables. Falling back to default project credentials.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Self-test checking credentials
async function verifySupabaseConnection() {
  try {
    // A quick request to verify connection and auth keys
    const { data, error } = await supabase.from('contacts').select('*').limit(1);
    
    if (error) {
      // If table is missing but API key is authorized, we will get a PGRST116 (no row) or a relation not found.
      // A bad API key will usually throw an auth or invalid key error.
      if (error.code === 'PGRST116' || error.message?.includes('relation "contacts" does not exist')) {
        console.log('✅ Supabase Connection: Client authenticated successfully. Note: "contacts" table may need setup.');
      } else {
        console.error('❌ Supabase Connection test error Details:', error);
      }
    } else {
      console.log('✅ Supabase Connection: Client authenticated and connected successfully! Found records:', data.length);
    }
  } catch (err) {
    console.error('❌ Supabase unexpected connection error:', err);
  }
}

// Fire self test asynchronously on load
verifySupabaseConnection();
