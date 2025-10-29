import { resolve } from 'path';
import { ModuleFormat } from 'rollup';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// 1. NAPRAWA BŁĘDU KOMPILACJI: Funkcja musi być eksportowana (dla wtyczek)
export const appendExtension = (format: ModuleFormat, name: string): string => {
    if (format === 'es') {
        return `${name}.mjs`;
    } else {
        return `${name}.js`;
    }
};
// KONIEC NAPRAWY

// 2. KONFIGURACJA Z BAZĄ DLA GITHUB PAGES
const REPO_NAME = 'presentation-csharp'; // Zastąp to rzeczywistą nazwą repozytorium!

export default defineConfig({
    // 👇 KONFIGURACJA BASE DLA GITHUB PAGES
    base: `/${REPO_NAME}/`, 
    
    // Konfiguracja builda (nadpisana, aby budować DEMO)
	build: {
		// UWAGA: Sekcja 'lib' musi być usunięta lub zmieniona, aby nie kolidować. 
        // Jeśli chcesz tylko build DEMO, usuń 'lib' lub użyj oddzielnego pliku konfiguracyjnego.
		emptyOutDir: true,
		outDir: 'dist-demo', // Wdražamy ten katalog
		rollupOptions: {
            input: 'index.html', // Budujemy index.html
			output: {
				assetFileNames: 'reveal.[ext]',
			},
		},
	},
    
	resolve: {
		alias: {
			'reveal.js/plugin': '/plugin',
			'reveal.js': './js',
			'reveal.css': '/css/reveal.scss',
		},
	},
    
	plugins: [dts({ insertTypesEntry: true, rollupTypes: true })], // Zachowujemy dla zgodności
	
    css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
});
