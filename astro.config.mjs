// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import {remarkHeadingId} from 'remark-custom-heading-id';

// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [remarkHeadingId],
    },
    integrations: [mdx()],
});
