// Mock supabase client to allow the application to compile without @supabase/supabase-js

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID ?? "";

if (typeof window === "undefined") {
  console.log("[supabase] env loaded", {
    hasUrl: Boolean(supabaseUrl),
    hasPublishableKey: Boolean(supabasePublishableKey),
    hasProjectId: Boolean(supabaseProjectId),
  });
}

export const supabase = {
  from: (table: string) => ({
    select: (args?: any) => ({
      eq: (key: string, val: any) => ({
        single: async () => ({ data: null, error: null }),
        order: (k: string, opts?: any) => ({
          limit: async (l: number) => ({ data: [], error: null }),
        }),
        delete: async () => ({ error: null }),
        limit: async (l: number) => ({ data: [], error: null })
      }),
      order: (k: string, opts?: any) => Object.assign(Promise.resolve({ data: [], error: null }), {
        limit: (l: number) => Promise.resolve({ data: [], error: null })
      }),
      single: async () => ({ data: null, error: null }),
    }),
    insert: async (args: any) => ({ error: null }),
    update: (args: any) => ({
      eq: async (k: string, v: any) => ({ error: null })
    }),
    delete: () => ({
      eq: async (k: string, v: any) => ({ error: null })
    })
  }),
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
  }
};
