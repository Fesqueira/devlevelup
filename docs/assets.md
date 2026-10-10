# Assets — Convenção de Exportação

Guia de exportação e nomenclatura de assets do DevLevelUp, conforme o handoff de design (`prompt.md`).

## Ícones vetoriais néon

- Formato: **SVG** (vetorial, escalável).
- Nomeação: `icon-[nome]-neon.svg` (ex.: `icon-servidores-neon.svg`, `icon-ferramentas-neon.svg`, `icon-open-source-neon.svg`, `icon-mentorias-neon.svg`).
- No Figma: ativar **Outline Stroke** e simplificar IDs.

## Mockups

- `hero-squad-mockup@2x.png` / `hero-squad-mockup@3x.png` — mockup flutuante da squad no Hero.
- PNG `@2x` para telas Retina; PNG `@3x` para alta densidade.

## Avatares e logos de parceiros

- Fotos: PNG `@2x` — `avatar-[nome]@2x.png`.
- Logos: SVG — `logo-[empresa].svg`.

## Compressão

- Comprimir assets antes do deploy: **SVGO** para SVG, **TinyPNG** para PNG.

## Inventário atual (`public/images/`)

| Pasta/arquivo            | Uso                                   |
| ------------------------ | ------------------------------------- |
| `avatar-squad/`          | Sprites idle dos personagens (Squad)  |
| `personagens/`           | Sprites dos níveis (LevelUp); `levelN/jornada-0X-*-idle-N.png` = frames de idle por nível |
| `vozes/`                 | Fotos dos depoimentos (Voices), `.webp` 128×128 |
| `grid-texture.svg`       | Textura de fundo (Comparison/LevelUp) |
| `mascote-soujunior.png`  | Mascote (Header/PowerUp)              |
| `mascote-apontando.png`  | Mascote apontando (CTA)               |
| `rpg-scene.png`          | Cena RPG (Hero)                       |