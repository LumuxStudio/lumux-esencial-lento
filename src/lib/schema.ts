import {z} from 'zod';
const text=z.string().trim().min(1).max(1500).refine(v=>!/<[^>]+>/.test(v),'Solo texto plano');
const photo=z.string().regex(/^\/images\/[a-z0-9-]+\.webp$/);
const anchor=z.enum(['#inicio','#practicas','#estudio','#primera-vez','#ritmos','#dudas','#contacto']);
const practiceId=z.enum(['pilates','movilidad','fuerza','pausa']);
export const siteSchema=z.object({
 version:z.literal('1.0.0'),brand:text,descriptor:text,seo:z.object({title:text,description:text}),
 nav:z.array(z.object({label:text,href:anchor})).min(1).max(4),
 hero:z.object({lines:z.array(text).length(2),description:text,cta:text,href:anchor,image:photo,alt:text}),
 practices:z.object({title:text,description:text,items:z.array(z.object({id:practiceId,name:text,focus:text,description:text,format:text,intensity:text,choose:text})).length(4)}),
 studio:z.object({title:z.array(text).length(2),description:text,principles:z.array(z.object({title:text,text})).length(3),image:photo,alt:text}),
 first:z.object({title:text,intro:text,items:z.array(z.object({title:text,text})).length(3)}),
 rhythms:z.object({title:text,note:text,label:text,items:z.array(z.object({id:z.enum(['suave','enfoque','energia']),name:text,title:text,text,practice:practiceId,cta:text})).length(3)}),
 faq:z.object({title:text,items:z.array(z.object({question:text,answer:text})).min(1).max(6)}),
 contact:z.object({title:text,intro:text,email:z.string().email(),note:text,submit:text,success:text,error:text,loading:text}),
 footer:z.object({text,credit:text,copyright:text})
}).superRefine((s,ctx)=>{const ids=s.practices.items.map(p=>p.id);if(new Set(ids).size!==ids.length)ctx.addIssue({code:z.ZodIssueCode.custom,message:'Prácticas únicas'});const rhythms=s.rhythms.items.map(r=>r.id);if(new Set(rhythms).size!==rhythms.length)ctx.addIssue({code:z.ZodIssueCode.custom,message:'Ritmos únicos'});});
