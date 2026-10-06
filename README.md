# LENTO · Estudio de movimiento

Plantilla Astro independiente de Lumux Esencial. Una presencia gráfica sencilla para Pilates y movimiento consciente: manifiesto tipográfico, índice nativo de prácticas, filosofía, primera visita, selector de ritmos, dudas y formulario de demostración.

Requiere Node.js 22.12 o superior.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Desarrollo y vista previa: http://127.0.0.1:4337. La salida estática se genera en `dist/`. El proyecto puede copiarse e instalarse sin otra plantilla; tiene paquete, lockfile, dependencias, recursos y estilos propios.

## Editar

- `src/content/site.es.json`: textos, prácticas, ritmos, navegación y contacto. Zod valida su contrato en `src/lib/schema.ts`.
- `tokens.css`: colores OKLCH, Syne/Manrope, escalas y movimiento.
- `src/pages/index.astro` y `src/styles/site.css`: estructura y diseño.
- `src/scripts/interactions.ts`: selector, interés del formulario y validación. Las prácticas y las dudas usan grupos nativos `details[name]`: solo se abre una por grupo y el menú móvil es independiente. El selector de ritmos abre su práctica correspondiente.
- `src/scripts/motion.ts`, `idle-motion.ts` e `idle-gate.ts`: entradas con GSAP solo al detener el desplazamiento; cancelación inmediata al reanudarlo.
- `public/images/`: fotos locales y variantes de 768px. Créditos en [docs/CREDITS.md](docs/CREDITS.md).
- `public/favicon.svg`, `favicon-32.png` y `apple-touch-icon.png`: identidad de pestaña propia.

Las siete secciones son `inicio`, `practicas`, `estudio`, `primera-vez`, `ritmos`, `dudas` y `contacto`. La composición respeta movimiento reducido, conserva texto y SVG visibles sin JavaScript y usa desplazamiento nativo. El formulario valida localmente, sin enviar ni guardar datos ni crear reservas.

El concepto y la marca son ficticios. Las fotografías son de referencia; no representan un estudio o equipo real. Consulte [docs/DESIGN.md](docs/DESIGN.md) para la dirección visual.

## Fluidez

El desplazamiento es nativo. Las entradas esperan 160 ms después del último evento de rueda, tacto, teclado o scroll. Los listeners de rueda, tacto y scroll son pasivos y no alteran distancias ni bloquean el navegador. Al volver a desplazar, las animaciones activas se cancelan y se restauran inmediatamente. El texto mantiene su posición: solo cambia sutilmente de opacidad (0.9 a 1 durante 0.18 s) al detenerse; los SVG se trazan una vez durante 0.35–0.45 s. GSAP se carga bajo demanda después de la pausa. Las imágenes usan decodificación asíncrona. Pausa y movimiento reducido conservan el contenido visible. Cada proyecto contiene su propio controlador, sin dependencias entre plantillas.
