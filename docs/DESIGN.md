# LENTO — dirección visual

Marca ficticia para un estudio de movimiento consciente. La página abre con un manifiesto tipográfico y fotografía amplia. El índice de prácticas es el centro de la experiencia; las otras secciones desarrollan filosofía, primera visita, una elección de ritmos, dudas y conversación.

Se observó la contundencia tipográfica y la amplitud de [Hobro](https://hobro.digital/), como referencia pública. No se copian su código, fotografías ni marca. Esta propuesta evita sus recursos de video/3D y desarrolla una composición propia para un estudio de movimiento.

- Macroestructura: Manifesto / Practice index.
- Navegación: N7, slab con regla de 2px, palabra LENTO, enlaces horizontales y menú nativo móvil.
- Footer: Ft4, hoja de contacto con colofón denso, créditos y un regreso al inicio.
- Tema: papel cálido, carbón y mandarina discreta. Colores en OKLCH, tipografías y escalas en `../tokens.css`.
- Display: Syne, 600–800, roman. Lectura: Manrope, 400–600.
- SVG: símbolo original de doble L y arco, empleado como logotipo y favicon. Su variante en la sección de filosofía representa dos recorridos abiertos y una pausa; tiene título y descripción accesibles.
- Fotografía: dos imágenes reales de Pexels, sin animación, acompañadas de contenido editorial; véase `CREDITS.md`.

GSAP introduce fragmentos de títulos y textos seleccionados una sola vez al entrar en pantalla mediante IntersectionObserver: un desplazamiento vertical de 12px durante 0.34s, con escalonado de 0.04s por línea. La opacidad comienza en 0.65 para mantener el texto legible desde el primer instante. No se animan contenedores de sección ni fotografías. El SVG de filosofía traza sus dos recorridos durante 0.62s y desplaza el punto mandarina 12px en un gesto breve. Las animaciones liberan sus estilos al terminar; no hay scroll interceptado, parallax, pins, filtros ni render continuo. El movimiento reducido omite las entradas y deja visible el dibujo completo. El contenido permanece visible sin JavaScript y todos los ritmos se muestran como artículos.

Las prácticas usan el grupo nativo `details[name="lento-practicas"]` y las dudas `details[name="lento-dudas"]`: abrir una cierra la anterior dentro de su grupo. El menú móvil no pertenece a estos grupos. Elegir un ritmo y seguir su enlace abre la práctica asociada y conserva la exclusividad nativa. El esquema valida que cada ritmo apunte a una práctica existente. Véase la [documentación de details en MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details#name).

El selector de ritmos no ofrece horarios ni cupos. Los enlaces de prácticas pueden trasladar el interés elegido al formulario. La revisión del formulario sucede en el navegador; no envía ni guarda datos y el mensaje de éxito lo comunica explícitamente. Las fotografías ilustrativas no representan un equipo o estudio real ni implican recomendación de sus protagonistas.

Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5. Verificación final de tamaños a cargo del informe general de navegador.
