#!/bin/bash
sed -i '/<\/style>/i \
        /* Ultimate Mobile Gap Removal */ \
        @media (max-width: 760px) { \
            body, html { margin: 0 !important; padding: 0 !important; } \
            .app-container { min-height: 100vh !important; } \
            .site-header { margin-bottom: 0 !important; border-bottom: none !important; box-shadow: none !important; } \
            .app-container > .content { padding-top: 0 !important; margin-top: 0 !important; } \
            .screen { padding-top: 0 !important; margin-top: 0 !important; } \
            .admin-hero { margin-top: 0 !important; margin-bottom: 8px !important; border-top-left-radius: 0 !important; border-top-right-radius: 0 !important; } \
            .auth-brand { padding-top: 10px !important; padding-bottom: 0 !important; margin-bottom: 0 !important; } \
            .auth-layout { gap: 5px !important; padding-top: 0 !important; } \
            .brand-mark { margin-bottom: 5px !important; width: 48px !important; height: 48px !important; font-size: 1.2rem !important; } \
            .auth-brand h2 { margin-bottom: 5px !important; font-size: 1.5rem !important; } \
            .auth-brand p { margin-bottom: 0 !important; font-size: 0.8rem !important; } \
            .card { padding: 12px !important; } \
            h1, h2, h3, p { margin-top: 0 !important; } \
            * { box-sizing: border-box !important; } \
        }' attached_assets/index.html
