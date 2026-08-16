export type Projeto = {
  id: string;
  titulo: string;
  descricao: string;
  /** slug base do arquivo otimizado em public/img/projetos/, ou null para placeholder de marca */
  foto: string | null;
  alt: string;
};

export type Area = {
  id: string;
  nome: string;
  /** nome do ícone em lucide-react */
  icone: string;
  projetos: Projeto[];
};

export const areas: Area[] = [
  {
    id: "infraestrutura-obras",
    nome: "Infraestrutura e Obras",
    icone: "Construction",
    projetos: [
      {
        id: "150km-asfalto",
        titulo: "Mais de 150 km de asfalto",
        descricao:
          "Maior programa de pavimentação da história de Vacaria, levando desenvolvimento e qualidade de vida para milhares de famílias.",
        foto: "150km-asfalto",
        alt: "Vista aérea de bairro de Vacaria com ruas recém-asfaltadas cortando a malha urbana",
      },
      {
        id: "viaduto-br116",
        titulo: "Viaduto da BR-116",
        descricao: "Mais mobilidade e segurança para quem circula pela cidade.",
        foto: "viaduto-br116",
        alt: "Vista aérea do viaduto sobre a BR-116 em Vacaria, com tráfego intenso na via abaixo",
      },
      {
        id: "viaduto-kennedy-jardim-america",
        titulo: "Viaduto ligando o bairro Kennedy ao Jardim América",
        descricao: "Uma nova ligação para melhorar a mobilidade entre os bairros.",
        foto: "viaduto-kennedy-jardim-america",
        alt: "Placa de inauguração do Viaduto sobre a Rede Ferroviária Engenheiro João Alfredo Acauan, com Amadeu Boeira e autoridades municipais",
      },
      {
        id: "perimetral",
        titulo: "Perimetral",
        descricao: "Nova via para melhorar o fluxo e desafogar o trânsito urbano.",
        foto: "perimetral",
        alt: "Vista aérea de via pavimentada cortando área com prédios ao fundo, em Vacaria",
      },
      {
        id: "aeroporto",
        titulo: "Revitalização do antigo aeroporto",
        descricao:
          "Um espaço renovado para lazer, convivência e atividades ao ar livre.",
        foto: "aeroporto",
        alt: "Vista aérea de evento público lotado em parque com playground temático de avião, no espaço do antigo aeroporto",
      },
      {
        id: "iluminacao-led",
        titulo: "100% da iluminação pública em LED",
        descricao: "Mais eficiência, economia e segurança para a cidade.",
        foto: "iluminacao-led",
        alt: "Funcionário em cesto aéreo instalando luminária de LED em poste de iluminação pública",
      },
      {
        id: "parque-maquinas",
        titulo: "Renovação e manutenção do Parque de Máquinas",
        descricao: "Equipamentos renovados para fortalecer os serviços de infraestrutura.",
        foto: "parque-maquinas",
        alt: "Vista aérea de pátio municipal com frota de retroescavadeiras, caminhões e máquinas pesadas amarelas enfileiradas",
      },
    ],
  },
  {
    id: "saude",
    nome: "Saúde",
    icone: "HeartPulse",
    projetos: [
      {
        id: "novas-esf",
        titulo: "Novas ESF — Estratégias de Saúde da Família",
        descricao:
          "Novas unidades para ampliar e aproximar o atendimento de saúde da população.",
        foto: "novas-esf",
        alt: "Inauguração de unidade de Estratégia Saúde da Família, com placa 'Comunidade do Caravaggio Armindo Oliboni' e homem discursando ao microfone",
      },
      {
        id: "nova-farmacia-municipal",
        titulo: "Nova Farmácia Municipal",
        descricao:
          "Mais estrutura para garantir acesso e qualidade na assistência farmacêutica.",
        foto: "nova-farmacia-municipal",
        alt: "Vista aérea da fachada do Centro Municipal de Saúde com letreiro 'Farmácia'",
      },
      {
        id: "farmacia-movel",
        titulo: "Farmácia Móvel",
        descricao:
          "Medicamentos levados até as comunidades, facilitando o acesso à saúde.",
        foto: "farmacia-movel",
        alt: "Van da Farmácia Móvel da Secretaria de Saúde de Vacaria atendendo moradores em uma rua residencial",
      },
      {
        id: "unidade-obstetrica-maternal",
        titulo: "Unidade Obstétrica Maternal — Hospital Nossa Senhora da Oliveira",
        descricao:
          "13 novos leitos para ampliar e qualificar o atendimento às mães e seus bebês.",
        foto: "unidade-obstetrica-maternal",
        alt: "Placa de sinalização 'Unidade Materno Infantil' do Hospital Nossa Senhora da Oliveira",
      },
      {
        id: "frota-saude",
        titulo: "Renovação da frota da Saúde",
        descricao:
          "Novos veículos para garantir mais segurança e conforto no transporte de pacientes.",
        foto: "frota-saude",
        alt: "Van branca da Secretaria Municipal de Saúde de Vacaria estacionada em frente a uma igreja",
      },
      {
        id: "base-samu",
        titulo: "Construção da Base do SAMU",
        descricao:
          "Mais estrutura para agilizar os atendimentos de urgência e emergência.",
        foto: "base-samu",
        alt: "Fachada da nova Base do SAMU 192 de Vacaria, em vermelho e branco",
      },
    ],
  },
  {
    id: "educacao",
    nome: "Educação",
    icone: "GraduationCap",
    projetos: [
      {
        id: "uniformes-material-tenis",
        titulo: "Uniformes, material e tênis",
        descricao: "Para todos os alunos da rede municipal.",
        foto: "uniformes-material-tenis",
        alt: "Fila de crianças com mochilas 'Município de Vacaria' entrando na escola",
      },
      {
        id: "investimentos-escolas",
        titulo: "Investimentos históricos na Educação",
        descricao:
          "Reformas, ampliações e melhorias para fortalecer a estrutura da rede municipal.",
        foto: "investimentos-escolas",
        alt: "Vista aérea de escola municipal de Vacaria com painéis solares no telhado",
      },
      {
        id: "almoxarifado-smed",
        titulo: "Construção do Almoxarifado da SMED",
        descricao:
          "Mais organização e estrutura para atender às demandas da rede municipal de ensino.",
        foto: "almoxarifado-smed",
        alt: "Interior de galpão de almoxarifado com prateleiras organizadas de materiais e suprimentos",
      },
    ],
  },
  {
    id: "desenvolvimento-emprego",
    nome: "Desenvolvimento e Emprego",
    icone: "Factory",
    projetos: [
      {
        id: "distrito-industrial",
        titulo: "Distrito Industrial",
        descricao:
          "Estrutura para atrair empresas, fortalecer a economia e gerar empregos.",
        foto: "distrito-industrial",
        alt: "Vista aérea de canteiro de obras com galpão industrial em construção, ao lado de via pavimentada",
      },
    ],
  },
  {
    id: "cidadania-assistencia-social",
    nome: "Cidadania e Assistência Social",
    icone: "HeartHandshake",
    projetos: [
      {
        id: "coordenadoria-mulher",
        titulo: "Inauguração da Sede da Coordenadoria da Mulher",
        descricao:
          "Um espaço dedicado ao acolhimento, atendimento e proteção das mulheres da comunidade.",
        foto: "coordenadoria-mulher",
        alt: "Fachada da sede da Coordenadoria da Mulher de Vacaria, com mural artístico colorido",
      },
    ],
  },
];
