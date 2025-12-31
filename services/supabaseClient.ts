
import { createClient } from '@supabase/supabase-js';

/**
 * CONFIGURACIÓN DE SUPABASE
 * 
 * Para que la app funcione, ejecuta este SQL en tu panel de Supabase:
 * 
 * create table leads (
 *   id uuid default gen_random_uuid() primary key,
 *   full_name text,
 *   email text unique,
 *   keyword text,
 *   created_at timestamptz default now()
 * );
 * 
 * create table posts (
 *   id uuid default gen_random_uuid() primary key,
 *   author text,
 *   author_img text,
 *   title text,
 *   content text,
 *   likes int default 0,
 *   comments int default 0,
 *   created_at timestamptz default now()
 * );
 */

const supabaseUrl = 'https://sapfoktcxqcfholhjngn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcGZva3RjeHFjZmhvbGhqbmduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMDkzMzQsImV4cCI6MjA4Mjc4NTMzNH0.d9zsHkiK4kPnPlvu3j6imrrs4H4J8mVWeYOOqUGTfFk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
