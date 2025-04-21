// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import {remarkHeadingId} from 'remark-custom-heading-id';

import solidJs from '@astrojs/solid-js';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [remarkHeadingId],
    },
    integrations: [mdx(), solidJs()],
    // not sure what this does, but they recommend to set it
    site: 'https://barrysir.github.io',
    // since deploying on github pages, deploy static site
    output: 'static',
    build: {
        // 1. hunterstory guide for example, want hunterstory/shops.mdx to generate as hunterstory/shops.html
        // rather than hunterstory/shops/index.html
        // 2. in ongeki/reiwa/index.html, i want it to generate as ongeki/reiwa/index.html
        // and not ongeki/reiwa.html
        // (1) - cannot use 'directory' option
        // (2) - canont use 'file' option
        // 'preserve' is the option i want (for now)
        format: 'preserve',
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
