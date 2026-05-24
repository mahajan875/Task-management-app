import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({

    plugins: [

        react(),

        VitePWA({

            registerType: "autoUpdate",

            manifest: {

                name: "Task Management App",

                short_name: "TaskManager",

                theme_color: "#0c0c0e",

                background_color: "#0c0c0e",

                display: "standalone",

                start_url: "/",

                icons: [

                    {
                        src: "/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },

                    {
                        src: "/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        })
    ]
});