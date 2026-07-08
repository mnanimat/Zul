// Edite este arquivo para usar conteúdos autorizados.
// Não baixe nem copie imagens do Instagram sem autorização do autor.
// Opções seguras:
// 1) Coloque imagens autorizadas em /public/assets e use '/assets/nome.png'.
// 2) Use links oficiais do Instagram no campo instagramUrl, sem copiar o arquivo.
// 3) Troque textos, capítulos, perguntas e jogos conforme a identidade do projeto.

export const profile = {
  name: 'OliverZul',
  handle: '@oliverzul',
  tagline: 'Uma jornada interativa entre memórias, ruínas, poemas e fé.',
  instagramUrl: 'https://www.instagram.com/oliverzul/',
  notice:
    'Este projeto usa placeholders e links externos. Substitua por fotos, vídeos e textos com autorização antes de publicar comercialmente.'
};

export const references = [
  {
    title: 'Referência pública do perfil',
    category: 'Instagram',
    description:
      'Use este espaço para conectar posts autorizados, reels incorporados ou imagens próprias inspiradas na estética do perfil.',
    instagramUrl: 'https://www.instagram.com/oliverzul/',
    image: '/assets/reference-portal.svg'
  },
  {
    title: 'Cena de arqueologia',
    category: 'Arqueologia',
    description:
      'Fotografias de viagens, pedras, mapas, sítios históricos e detalhes de objetos podem virar fragmentos clicáveis da narrativa.',
    instagramUrl: '',
    image: '/assets/reference-archaeology.svg'
  },
  {
    title: 'Cena poética',
    category: 'Poesia',
    description:
      'Frases, versos, cartas e reflexões podem virar pergaminhos interativos que aparecem com o movimento do mouse.',
    instagramUrl: '',
    image: '/assets/reference-poetry.svg'
  },
  {
    title: 'Cena de fé',
    category: 'Fé Evangélica',
    description:
      'Use imagens de culto, Bíblia, natureza, oração e testemunhos autorizados para compor a caminhada espiritual.',
    instagramUrl: '',
    image: '/assets/reference-faith.svg'
  }
];

export const chapters = [
  {
    id: 'portal',
    label: 'Prólogo',
    title: 'O Portal das Memórias',
    theme: 'História interativa',
    image: '/assets/reference-portal.svg',
    narration:
      'Ao mover o mouse, a luz revela símbolos escondidos. Cada fragmento abre uma lembrança: uma ruína, uma palavra, uma oração.',
    action: 'Mover o cursor acende o cenário e acorda a história.'
  },
  {
    id: 'arqueologia',
    label: 'Capítulo I',
    title: 'As Ruínas que Falam',
    theme: 'Arqueologia',
    image: '/assets/reference-archaeology.svg',
    narration:
      'A terra guarda marcas de povos, fé, quedas e recomeços. Cada objeto encontrado é uma pergunta esperando paciência.',
    action: 'Clique nos fragmentos para montar o mapa antigo.'
  },
  {
    id: 'poesia',
    label: 'Capítulo II',
    title: 'O Pergaminho dos Versos',
    theme: 'Poesia',
    image: '/assets/reference-poetry.svg',
    narration:
      'A poesia transforma silêncio em caminho. Nas linhas, o coração aprende a nomear o que antes só sentia.',
    action: 'Escolha palavras e crie um verso vivo.'
  },
  {
    id: 'fe',
    label: 'Capítulo III',
    title: 'A Trilha da Promessa',
    theme: 'Fé Evangélica',
    image: '/assets/reference-faith.svg',
    narration:
      'A fé conduz a história sem apagar as perguntas. Ela aponta para esperança, arrependimento, serviço e renovação.',
    action: 'Responda aos desafios e avance pela trilha.'
  }
];

export const quizQuestions = [
  {
    question: 'Na proposta do site, o que a arqueologia representa?',
    options: ['Um mapa de compras', 'A leitura dos vestígios do passado', 'Um jogo sem história'],
    answer: 1,
    note: 'A arqueologia ajuda a interpretar marcas materiais deixadas por pessoas e culturas.'
  },
  {
    question: 'Qual é a função da poesia na narrativa?',
    options: ['Dar voz à experiência interior', 'Substituir todos os fatos', 'Remover a interação'],
    answer: 0,
    note: 'A poesia aqui é usada como ponte entre memória, emoção e reflexão.'
  },
  {
    question: 'Na trilha de fé evangélica, qual atitude combina com o tema?',
    options: ['Esperança e serviço', 'Orgulho sem amor', 'Desistência da história'],
    answer: 0,
    note: 'O roteiro valoriza esperança, serviço, oração e transformação.'
  }
];

export const poetryWords = {
  openings: ['Na poeira do tempo', 'Entre pedras e salmos', 'Quando a noite pergunta', 'No silêncio da estrada'],
  verbs: ['nasce', 'desperta', 'canta', 'se acende'],
  images: ['uma luz antiga', 'um verso de esperança', 'a memória do chão', 'uma promessa viva']
};
