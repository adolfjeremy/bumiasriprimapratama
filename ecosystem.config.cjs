module.exports = {
  apps: [
    {
      name: "bapp-frontend", // Sesuaikan dengan nama app Anda di PM2
      script: "./dist/server/entry.mjs", // Script default untuk Astro SSR Node
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: 4321, // Sesuaikan dengan port Astro Anda
        
        // --- Environment Variables ---
        STRAPI_URL: "https://api.bumiasriprimapratama.com", // Sesuaikan dengan URL Backend Anda
        // STRAPI_API_TOKEN: "masukkan_token_strapi_anda_di_sini_jika_ada"
      }
    }
  ]
};
