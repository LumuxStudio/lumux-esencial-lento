import {existsSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {siteSchema} from '../src/lib/schema';
const root=resolve(import.meta.dirname,'..');
const site=siteSchema.parse(JSON.parse(readFileSync(resolve(root,'src/content/site.es.json'),'utf8')));
for(const image of [site.hero.image,site.studio.image])for(const variant of [image,image.replace('.webp','-768.webp')])if(!existsSync(resolve(root,'public',variant.slice(1))))throw new Error(`Recurso faltante: ${variant}`);
for(const asset of ['favicon.svg','favicon-32.png','apple-touch-icon.png'])if(!existsSync(resolve(root,'public',asset)))throw new Error(`Recurso faltante: ${asset}`);
console.log('Contenido y recursos LENTO válidos.');
