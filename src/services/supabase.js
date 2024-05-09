import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hvtojfbdmpwcbjnelkha.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dG9qZmJkbXB3Y2JqbmVsa2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5OTU4MzYsImV4cCI6MjAyNjU3MTgzNn0.VT5FtCuDjbRBRd4a9DT6mZ44qoL-9WxrcHiJUhkkaT8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
