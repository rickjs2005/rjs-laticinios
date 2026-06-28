# Assets do Hero — RJS Laticínios

O site é o **motor** (estrutura + animações). Os **renders** são feitos por IA de
imagem (Midjourney / DALL·E 3 / Firefly / Flux) e apenas **soltos nesta pasta**.
Assim que o arquivo existir, o placeholder some sozinho e o render entra com todas
as animações (float, parallax, splash, sombra).

## Como usar
1. Gere cada imagem com o prompt abaixo.
2. Exporte com **fundo transparente (PNG)** — exceto a fazenda (JPG).
3. Salve **exatamente com o nome do arquivo** listado.
4. Recarregue o site. Pronto.

## Especificação técnica
- Renders de produto/panda: **PNG transparente**, ~2000px no maior lado, sombra de
  contato já no próprio render é opcional (o site também aplica drop-shadow).
- Fundo: **JPG**, 2560×1440, paisagem.
- Estilo unificado: render 3D, materiais PBR, iluminação cinematográfica, luz
  dourada de amanhecer, vindo da direita-superior (pra casar com a sombra do site).

---

## Arquivos esperados

| Arquivo | Conteúdo | Formato |
|---|---|---|
| `farm.jpg` | Fazenda desfocada (DOF), céu azul, gramado, amanhecer dourado | JPG |
| `panda.png` | Panda mascote 3D (corpo inteiro, de pé) | PNG transp. |
| `milk.png` | Copo/garrafa de leite | PNG transp. |
| `yogurt.png` | Pote de iogurte | PNG transp. |
| `cheese.png` | Queijo (peça ou fatia) | PNG transp. |
| `butter.png` | Pote/tablete de manteiga | PNG transp. |
| `strawberry.png` | Morango | PNG transp. |
| `blueberry.png` | Mirtilos (cacho) | PNG transp. |
| `leaf.png` | Folha verde | PNG transp. |
| `splash-hero.png` | Splash de leite grande (atravessa atrás do panda) | PNG transp. |
| `splash-milk.png` | Splash pequeno atrás do leite | PNG transp. |
| `splash-yogurt.png` | Splash pequeno atrás do iogurte | PNG transp. |

---

## Prompts (copie e cole)

### panda.png
> Adorable 3D mascot giant panda, Pixar/DreamWorks cinematic style, full body
> standing, extremely fluffy detailed fur, big glossy expressive eyes with
> reflections, warm friendly smile, wearing blue denim overalls with a small "RJS"
> tag, holding a glass of fresh milk, PBR materials, soft golden sunrise rim light
> from upper right, studio quality, 4K render, **transparent background**, full
> character visible, centered.

### farm.jpg
> Photorealistic dairy farm at golden sunrise, rolling green grass hills, vivid
> deep blue sky with soft volumetric clouds, distant red barn and silo out of
> focus, shallow depth of field (bokeh), warm golden hour light, cinematic, 4K,
> landscape, no text, no people.

### milk.png / yogurt.png / cheese.png / butter.png
> Single [milk bottle / yogurt cup / cheese wedge / butter tub] product, premium
> 3D render, glossy realistic surface, condensation droplets, dramatic studio
> lighting, soft contact shadow, vibrant, **transparent background**, centered,
> 4K. (Label/embalagem azul-marinho com "RJS".)

### strawberry.png / blueberry.png / leaf.png
> Hyper-realistic [strawberry / cluster of blueberries / fresh green leaf], juicy,
> glossy, water droplets, studio light, **transparent background**, 4K.

### splash-hero.png / splash-milk.png / splash-yogurt.png
> Dynamic milk (or yogurt) splash crown, frozen liquid motion, glossy white
> droplets and ribbons, high-speed photography look, **transparent background**,
> 4K, no container.

---

## Poses extras do panda (outras seções)

| Arquivo | Onde aparece | Pose |
|---|---|---|
| `panda-cheese.png` | Seção "Pandito" (interativa) | Panda oferecendo um queijo, sorrindo |
| `panda-sign.png` | CTA "Vamos crescer juntos?" | Panda segurando uma placa de madeira/leite escrita "Vamos crescer juntos?" |

> Mesmo personagem do `panda.png` (mesma pelagem, olhos, macacão azul "RJS"),
> apenas mudando a pose. Mantenha o estilo Pixar/PBR e a luz do amanhecer.

## Dica
Mantenha a mesma direção de luz (amanhecer vindo da direita-superior) em todos os
renders pra parecerem da mesma cena. Use o mesmo prompt-base de estilo em todos.
