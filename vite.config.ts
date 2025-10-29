import { defineConfig } from 'vite';

// Zmienna musi odpowiadać Twojej nazwie repozytorium!
const REPO_NAME = 'presentation-csharp'; 

export default defineConfig({
    // Ustawia katalog wyjściowy na 'dist-demo'
    build: {
        outDir: 'dist-demo',
        emptyOutDir: true,
        // Upewniamy się, że to jest build aplikacji (nie biblioteki)
        rollupOptions: {
            input: 'index.html',
        }
    },
    // Ustawia ścieżkę bazową dla zasobów (CSS, JS) wewnątrz zbudowanego index.html
    base: `/${REPO_NAME}/`,
    
    // Używamy aliasów, aby Vite poprawnie znalazł pliki
    resolve: {
        alias: {
            // Te aliasy z oryginalnego configu muszą zostać zachowane
            'reveal.js/plugin': '/plugin',
            'reveal.js': '/js',
            // Wymuszamy, aby SCSS został załadowany poprawnie
            'reveal.css': '/css/reveal.scss', 
        },
    },
    // Konfiguracja dla SCSS
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
});
