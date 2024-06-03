const { createServerClient } = require("@supabase/ssr");

const createClient = (context) =>
  createServerClient(
    "https://hzznlpnbxqgktbsnrama.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6em5scG5ieHFna3Ric25yYW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5NTU0NDMsImV4cCI6MjAzMjUzMTQ0M30.DnwSo2cmDPA2cbK56OsJJfyR8kbSnrweg--jO5B7las",
    {
      cookies: {
        get: (key) => {
          const cookies = context.req.cookies;
          const cookie = cookies?.[key] ?? "";
          return decodeURIComponent(cookie);
        },
        set: (key, value, options) => {
          if (!context.res) return;
          context.res.cookie(key, encodeURIComponent(value), {
            ...options,
            sameSite: "Lax",
            httpOnly: true,
          });
        },
        remove: (key, options) => {
          if (!context.res) return;
          context.res.cookie(key, "", { ...options, httpOnly: true });
        },
      },
    }
  );

module.exports = {
  createClient,
};
