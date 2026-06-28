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
    weight: "1 L",
    image: U("1550583724-b2692b85b150"),
    color: "blue",
  },
  {
    id: "queijo-minas",
    name: "Queijo Minas Frescal",
    category: "Queijos",
    desc: "Macio, levemente salgado — o queijo do café da manhã da família.",
    weight: "500 g",
    image: U("1486297678162-eb2a19b0a32d"),
    color: "yellow",
  },
  {
    id: "manteiga-extra",
    name: "Manteiga Extra",
    category: "Manteigas",
    desc: "Batida no ponto certo, com aquele sabor de comida de vó.",
    weight: "200 g",
    image: U("1628088062854-d1870b4553da"),
    color: "yellow",
  },
  {
    id: "iogurte-natural",
    name: "Iogurte Natural",
    category: "Iogurtes",
    desc: "Encorpado e vivo, sem conservantes. Saúde a cada colher.",
    weight: "170 g",
    image: U("1631452180519-c014fe946bc7"),
    color: "green",
  },
  {
    id: "requeijao-cremoso",
    name: "Requeijão Cremoso",
    category: "Requeijão",
    desc: "Aquele requeijão que escorre no pão quentinho. Irresistível.",
    weight: "220 g",
    image: U("1589881133595-a3c085cb731d"),
    color: "orange",
  },
  {
    id: "doce-de-leite",
    name: "Doce de Leite",
    category: "Doces",
    desc: "Cozido lentamente no tacho. Doçura de tradição mineira.",
    weight: "400 g",
    image: U("1452251889946-8ff5ea7b27ab"),
    color: "orange",
  },
];

export type Recipe = {
  name: string;
  time: string;
  ingredients: string[];
  image: string;
};

export const RECIPES: Recipe[] = [
  {
    name: "Pão de Queijo da Roça",
    time: "40 min",
    ingredients: ["Queijo Minas RJS", "Polvilho", "Leite Integral", "Ovos"],
    image: U("1576186726115-4d51596775d1"),
  },
  {
    name: "Bolo de Iogurte Fofinho",
    time: "55 min",
    ingredients: ["Iogurte Natural RJS", "Farinha", "Açúcar", "Manteiga Extra"],
    image: U("1563636619-e9143da7973b"),
  },
  {
    name: "Brigadeiro de Doce de Leite",
    time: "30 min",
    ingredients: ["Doce de Leite RJS", "Chocolate", "Manteiga", "Granulado"],
    image: U("1628689469838-524a4a973b8e"),
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
