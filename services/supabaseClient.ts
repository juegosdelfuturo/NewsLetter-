
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sapfoktcxqcfholhjngn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcGZva3RjeHFjZmhvbGhqbmduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMDkzMzQsImV4cCI6MjA4Mjc4NTMzNH0.d9zsHkiK4kPnPlvu3j6imrrs4H4J8mVWeYOOqUGTfFk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
