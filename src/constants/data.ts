// ── Conteúdo mockado (fictício, para portfólio) ─────────────────────
export const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const BRAND = {
  name: "RJS Laticínios",
  short: "RJS",
  phone: "(33) 99877-9375",
  whatsapp: "5533998779375",
  email: "contato@rjslaticinios.com.br",
  address: "Rod. BR-116, km 412 — Governador Valadares, MG",
  since: 1998,
};

// ── CTA unificado: WhatsApp é a ação primária (único caminho sem backend) ──
export const waLink = (text: string) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;

export const CTA_COPY = {
  primary: "Falar no WhatsApp",
  distributor: "Quero ser distribuidor",
  catalog: "Conheça nossos produtos",
  quote: "Pedir orçamento",
};

export const NAV = [
  { label: "Produtos", href: "#produtos" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Receitas", href: "#receitas" },
  { label: "Distribuidores", href: "#distribuidores" },
  { label: "Contato", href: "#contato" },
] as const;

export type Product = {
  id: string;
  name: string;
  category: string;
  desc: string;
  /** descrição longa para a ficha/modal do produto */
  long: string;
  /** selos curtos exibidos na ficha */
  tags: string[];
  weight: string;
  image: string;
  color: "blue" | "yellow" | "green" | "orange";
};

export const CATEGORIES = [
  "Leites",
  "Queijos",
  "Manteigas",
  "Iogurtes",
  "Requeijão",
  "Doces",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "leite-integral",
    name: "Leite Integral",
    category: "Leites",
    desc: "Cremoso e fresco, ordenhado todos os dias na nossa fazenda.",
    long: "Leite integral pasteurizado, da ordenha à embalagem em menos de 24h. Sabor encorpado e natural, sem reconstituição. Ideal para o café da manhã, vitaminas e receitas da família.",
    tags: ["Produção própria", "Sem reconstituição", "Coleta diária"],
    weight: "1 L",
    image: U("1550583724-b2692b85b150"),
    color: "blue",
  },
  {
    id: "queijo-minas",
    name: "Queijo Minas Frescal",
    category: "Queijos",
    desc: "Macio, levemente salgado — o queijo do café da manhã da família.",
    long: "Queijo Minas Frescal artesanal, textura macia e sabor suave. Produzido com leite fresco da própria fazenda e maturação controlada. Perfeito no pão, na tapioca ou puro.",
    tags: ["Artesanal", "Baixo sódio", "Leite fresco"],
    weight: "500 g",
    image: U("1486297678162-eb2a19b0a32d"),
    color: "yellow",
  },
  {
    id: "manteiga-extra",
    name: "Manteiga Extra",
    category: "Manteigas",
    desc: "Batida no ponto certo, com aquele sabor de comida de vó.",
    long: "Manteiga extra batida lentamente, com creme selecionado e teor de gordura premium. Aroma intenso e cor dourada natural. Dá outro nível ao pão quente e ao preparo de massas.",
    tags: ["Teor premium", "Sem corantes", "Cor natural"],
    weight: "200 g",
    image: U("1628088062854-d1870b4553da"),
    color: "yellow",
  },
  {
    id: "iogurte-natural",
    name: "Iogurte Natural",
    category: "Iogurtes",
    desc: "Encorpado e vivo, sem conservantes. Saúde a cada colher.",
    long: "Iogurte natural integral com fermentos vivos e nada de conservantes. Cremoso, levemente ácido e versátil — puro, com mel, granola ou frutas. Aliado da boa digestão.",
    tags: ["Fermentos vivos", "Sem conservantes", "Probiótico"],
    weight: "170 g",
    image: U("1631452180519-c014fe946bc7"),
    color: "green",
  },
  {
    id: "requeijao-cremoso",
    name: "Requeijão Cremoso",
    category: "Requeijão",
    desc: "Aquele requeijão que escorre no pão quentinho. Irresistível.",
    long: "Requeijão cremoso de verdade, encorpado e brilhante, que derrete e escorre. Feito com leite e creme frescos, sem amido em excesso. O queridinho do pão na chapa.",
    tags: ["Cremosíssimo", "Sem amido extra", "Derrete bem"],
    weight: "220 g",
    image: U("1589881133595-a3c085cb731d"),
    color: "orange",
  },
  {
    id: "doce-de-leite",
    name: "Doce de Leite",
    category: "Doces",
    desc: "Cozido lentamente no tacho. Doçura de tradição mineira.",
    long: "Doce de leite cozido lentamente em tacho de cobre, no ponto cremoso mineiro. Cor âmbar, sabor profundo de leite caramelizado. Puro na colher, no pão ou rechear o que quiser.",
    tags: ["Tacho de cobre", "Receita mineira", "Sem gordura vegetal"],
    weight: "400 g",
    image: U("1452251889946-8ff5ea7b27ab"),
    color: "orange",
  },
];

export type Recipe = {
  name: string;
  time: string;
  yield: string;
  difficulty: "Fácil" | "Média" | "Difícil";
  ingredients: string[];
  steps: string[];
  image: string;
};

export const RECIPES: Recipe[] = [
  {
    name: "Pão de Queijo da Roça",
    time: "40 min",
    yield: "20 unidades",
    difficulty: "Fácil",
    ingredients: ["Queijo Minas RJS", "Polvilho", "Leite Integral", "Ovos"],
    steps: [
      "Ferva 1 xícara de Leite Integral RJS com ½ xícara de óleo e uma pitada de sal.",
      "Despeje sobre 500 g de polvilho e misture até esfarelar (escalda o polvilho).",
      "Quando amornar, junte 2 ovos e 200 g de Queijo Minas RJS ralado; sove até soltar das mãos.",
      "Modele bolinhas, disponha na assadeira e leve ao forno a 180 °C por ~25 min, até dourar.",
      "Sirva quentinho — de preferência com um café passado na hora.",
    ],
    image: U("1576186726115-4d51596775d1"),
  },
  {
    name: "Bolo de Iogurte Fofinho",
    time: "55 min",
    yield: "1 bolo (10 fatias)",
    difficulty: "Fácil",
    ingredients: ["Iogurte Natural RJS", "Farinha", "Açúcar", "Manteiga Extra"],
    steps: [
      "Bata 1 pote de Iogurte Natural RJS, 3 ovos, 1 xícara de açúcar e ½ xícara de Manteiga Extra derretida.",
      "Adicione 2 xícaras de farinha e 1 colher de fermento; misture sem bater demais.",
      "Despeje em forma untada e leve ao forno a 180 °C por ~40 min.",
      "Faça o teste do palito; espere amornar antes de desenformar.",
      "Finalize com uma calda de iogurte e mel, se quiser.",
    ],
    image: U("1563636619-e9143da7973b"),
  },
  {
    name: "Brigadeiro de Doce de Leite",
    time: "30 min",
    yield: "25 brigadeiros",
    difficulty: "Média",
    ingredients: ["Doce de Leite RJS", "Chocolate", "Manteiga", "Granulado"],
    steps: [
      "Em fogo baixo, misture 1 lata de leite condensado, 1 xícara de Doce de Leite RJS e 1 colher de Manteiga RJS.",
      "Mexa sem parar até desgrudar do fundo da panela (ponto de enrolar).",
      "Transfira para um prato untado e deixe esfriar completamente.",
      "Enrole as bolinhas com as mãos untadas e passe no granulado.",
      "Guarde em forminhas — se sobrar (dificilmente sobra).",
    ],
    image: U("1628689469838-524a4a973b8e"),
  },
];

// ── Selos / gatilhos de confiança (essenciais p/ alimento) ──────────────
export type Seal = { icon: string; title: string; desc: string };
export const SEALS: Seal[] = [
  { icon: "factory", title: "Produção própria", desc: `Da fazenda à embalagem, desde ${BRAND.since}.` },
  { icon: "seal", title: "Inspecionado", desc: "Selo de inspeção e lotes rastreados." },
  { icon: "drop", title: "Frescor garantido", desc: "Da ordenha à embalagem em até 24h." },
  { icon: "truck", title: "Entrega nacional", desc: "Logística refrigerada para todo o Brasil." },
];

// ── Prova social ───────────────────────────────────────────────────────
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  city: string;
  initials: string;
  accent: "blue" | "yellow" | "green" | "orange";
};
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "O requeijão da RJS virou item fixo da padaria. Os clientes voltam só por causa do pão na chapa com ele.",
    name: "Marcos Tavares",
    role: "Padaria Pão Quente",
    city: "Ipatinga, MG",
    initials: "MT",
    accent: "orange",
  },
  {
    quote:
      "Frescor de verdade e entrega sempre no prazo. Trabalho com a RJS há 4 anos e nunca tive dor de cabeça.",
    name: "Cláudia Reis",
    role: "Mercado Bom Preço",
    city: "Governador Valadares, MG",
    initials: "CR",
    accent: "blue",
  },
  {
    quote:
      "Meus filhos só tomam o iogurte natural da RJS. É cremoso, não é doce demais e dá pra ver a qualidade.",
    name: "Juliana Prado",
    role: "Cliente desde 2019",
    city: "Teófilo Otoni, MG",
    initials: "JP",
    accent: "green",
  },
];

export const PARTNERS = [
  "MercadoBom",
  "SuperFamília",
  "Rede Fresco",
  "Atacadão do Vale",
  "Hortifruti Sol",
  "Empório Mineiro",
  "BoxMix",
  "Casa do Pão",
];

export type Stat = { value: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: 8, suffix: "M+", label: "Litros produzidos/ano" },
  { value: 320, suffix: "+", label: "Produtos vendidos por dia (mil)" },
  { value: 27, label: "Anos de tradição" },
  { value: 1500, suffix: "+", label: "Clientes atendidos" },
];

export type Step = { title: string; desc: string; icon: string };

export const TIMELINE: Step[] = [
  { title: "Fazenda", desc: "Vacas felizes, pasto livre e ordenha diária.", icon: "farm" },
  { title: "Produção", desc: "Beneficiamento próprio com receita de família.", icon: "factory" },
  { title: "Controle de Qualidade", desc: "Cada lote testado, do leite ao rótulo.", icon: "quality" },
  { title: "Distribuição", desc: "Frota refrigerada que cruza o Brasil.", icon: "truck" },
  { title: "Mercados", desc: "Nas gôndolas dos melhores mercados.", icon: "store" },
  { title: "Consumidor", desc: "Fresquinho na mesa da sua família.", icon: "home" },
];

export type Differential = { title: string; desc: string; icon: string };

export const DIFFERENTIALS: Differential[] = [
  { title: "Leite Fresco", desc: "Da ordenha à embalagem em menos de 24h.", icon: "drop" },
  { title: "Produção Própria", desc: "Controle total, da fazenda ao seu carrinho.", icon: "leaf" },
  { title: "Entrega Nacional", desc: "Logística refrigerada para todo o país.", icon: "truck" },
  { title: "Controle de Qualidade", desc: "Certificações e testes em cada etapa.", icon: "shield" },
];
