#!/usr/bin/env node
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const URL  = 'https://zctawwyidjjuyfxemjbm.supabase.co'
const KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjdGF3d3lpZGpqdXlmeGVtamJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY3ODY2OCwiZXhwIjoyMDk2MjU0NjY4fQ.B9D5FIJlSDIB_7dMgQ-HqDKo_MXj-iH9sSw0Uv7t-uM'

const schema = readFileSync(join(__dirname, '../supabase/migrations/001_schema.sql'), 'utf8')

async function run() {
  console.log('🚀 Rodando schema no Supabase...\n')

  const res = await fetch(`${URL}/rest/v1/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KEY}`,
      'apikey': KEY,
      'Prefer': 'params=single-object',
    },
    body: JSON.stringify({ query: schema }),
  })

  // Tentar via pg endpoint
  const res2 = await fetch(`${URL}/pg/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KEY}`,
    },
    body: JSON.stringify({ query: schema }),
  })

  const text2 = await res2.text()
  console.log('Schema response:', res2.status, text2.slice(0, 300))
}

run().catch(console.error)
