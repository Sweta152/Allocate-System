const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

function getSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

module.exports = getSupabaseClient;