import raw from '../content/site.es.json';
import {siteSchema} from './schema';
export const site=siteSchema.parse(raw);
