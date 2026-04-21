export type QLocale = 'fr' | 'pt';

export interface QuestionTranslation {
  group: string;
  title: string;
  statement: string;
  options: Array<{ label: string; text: string }>;
}

export const QUESTION_I18N: Record<string, Record<QLocale, QuestionTranslation>> = {

  // ── T1.1 ──
  'T1.1': {
    fr: {
      group: 'Tendances des Accidents et Incidents Graves',
      title: "Les États maintiennent une tendance décroissante du taux d'accidents et d'incidents graves",
      statement: "L'État a-t-il mis en place des mécanismes pour surveiller, analyser et rendre compte des accidents et incidents graves, et confirme-t-il que le taux national d'accidents/incidents graves démontre une tendance décroissante continue sur les trois dernières années, conformément au Plan d'action des Objectifs Révisés de Sécurité d'Abuja ?",
      options: [
        { label: 'Non commencé',         text: "Données indisponibles ou système de surveillance non encore établi." },
        { label: 'Non atteint',          text: "Aucune tendance décroissante observée." },
        { label: 'Partiellement atteint',text: "Tendance décroissante observée mais non maintenue de façon constante." },
        { label: 'En cours',             text: "Systèmes de surveillance établis mais tendance décroissante non encore évidente." },
        { label: 'Pleinement atteint',   text: "Tendance décroissante soutenue observée sur les trois dernières années." },
      ],
    },
    pt: {
      group: 'Tendências de Acidentes e Incidentes Graves',
      title: 'Estados mantêm tendência decrescente da taxa de acidentes e incidentes graves',
      statement: 'O Estado estabeleceu mecanismos para monitorizar, analisar e reportar acidentes e incidentes graves, e confirma que a taxa nacional de acidentes/incidentes graves demonstra uma tendência decrescente consistente nos últimos três anos, em conformidade com o Plano de Ação das Metas Revistas de Segurança de Abuja?',
      options: [
        { label: 'Não iniciado',           text: "Dados indisponíveis ou sistema de monitorização ainda não estabelecido." },
        { label: 'Não atingido',           text: "Nenhuma tendência decrescente observada." },
        { label: 'Parcialmente atingido',  text: "Tendência decrescente observada, mas não mantida de forma consistente." },
        { label: 'Em progresso',           text: "Sistemas de monitorização estabelecidos, mas tendência decrescente ainda não evidente." },
        { label: 'Totalmente atingido',    text: "Tendência decrescente sustentada observada nos últimos três anos." },
      ],
    },
  },

  // ── T1.2 ──
  'T1.2': {
    fr: {
      group: 'Tendances des Accidents et Incidents Graves',
      title: "Tous les États maintiennent une réduction continue des pertes de séparation d'au moins 50 %",
      statement: "L'État a-t-il mis en place des mesures de surveillance et d'atténuation pour réduire les pertes de séparation, et les données nationales confirment-elles une tendance de réduction continue d'au moins 50 % conformément au Plan d'action des Objectifs Révisés de Sécurité d'Abuja ?",
      options: [
        { label: 'Non applicable',        text: "Données indisponibles ou surveillance non encore établie." },
        { label: 'Non atteint',           text: "Aucune tendance de réduction observée." },
        { label: 'En cours',              text: "Mesures mises en œuvre mais réduction non encore évidente." },
        { label: 'Partiellement atteint', text: "Tendance de réduction observée mais n'atteignant pas encore 50 %." },
        { label: 'Pleinement atteint',    text: "Réduction continue de ≥ 50 % atteinte et maintenue." },
      ],
    },
    pt: {
      group: 'Tendências de Acidentes e Incidentes Graves',
      title: 'Todos os Estados atingem e mantêm redução contínua de separações em pelo menos 50%',
      statement: 'O Estado implementou medidas de monitorização e mitigação para reduzir as ocorrências de perda de separação, e os dados nacionais confirmam uma tendência de redução contínua de pelo menos 50%, em conformidade com o Plano de Ação das Metas Revistas de Segurança de Abuja?',
      options: [
        { label: 'Não aplicável',          text: "Dados indisponíveis ou monitorização ainda não estabelecida." },
        { label: 'Não atingido',           text: "Nenhuma tendência de redução observada." },
        { label: 'Em progresso',           text: "Medidas implementadas mas redução ainda não evidente." },
        { label: 'Parcialmente atingido',  text: "Tendência de redução observada mas ainda não atinge 50%." },
        { label: 'Totalmente atingido',    text: "Redução contínua de ≥ 50% atingida e mantida." },
      ],
    },
  },

  // ── T2.1 ──
  'T2.1': {
    fr: {
      group: 'Renforcement de la Supervision de la Sécurité',
      title: "Tous les États établissent et renforcent des Autorités Civiles de l'Aviation (AAC) autonomes",
      statement: "L'État a-t-il établi et renforcé une Autorité de l'Aviation Civile (AAC) autonome disposant d'une supervision réglementaire indépendante, de sources de financement durables et de ressources adéquates pour assurer efficacement la supervision de la sécurité et la réglementation de l'industrie aéronautique ?",
      options: [
        { label: 'Non encore mis en œuvre',    text: "Aucune AAC autonome n'a été établie." },
        { label: 'Mise en œuvre débutée',       text: "Début — premières étapes en cours." },
        { label: 'Partiellement mis en œuvre', text: "En cours — certains éléments en place." },
        { label: 'Mise en œuvre avancée',       text: "AAC établie mais pas encore entièrement autonome ni durable." },
        { label: 'Pleinement mis en œuvre',     text: "AAC autonome pleinement établie avec supervision indépendante et financement durable." },
      ],
    },
    pt: {
      group: 'Fortalecimento da Supervisão de Segurança',
      title: 'Todos os Estados estabelecem e fortalecem Autoridades de Aviação Civil (AAC) autónomas',
      statement: 'O Estado estabeleceu e fortaleceu uma Autoridade de Aviação Civil (AAC) autónoma com supervisão regulatória independente, fontes de financiamento sustentáveis e recursos adequados para exercer eficazmente a supervisão da segurança e a regulação da indústria aeronáutica?',
      options: [
        { label: 'Ainda não implementado',    text: "Nenhuma AAC autónoma foi estabelecida." },
        { label: 'Implementação iniciada',    text: "Início — primeiras etapas em curso." },
        { label: 'Parcialmente implementado', text: "Em curso — alguns elementos em vigor." },
        { label: 'Implementação avançada',    text: "AAC estabelecida mas ainda não totalmente autónoma ou sustentável." },
        { label: 'Totalmente implementado',   text: "AAC autónoma totalmente estabelecida com supervisão independente e financiamento sustentável." },
      ],
    },
  },

  // ── T2.2 ──
  'T2.2': {
    fr: {
      group: 'Renforcement de la Supervision de la Sécurité',
      title: "Tous les États améliorent leur score de Mise en Œuvre Effective (MOE) des Éléments Critiques (EC)",
      statement: "Quel est le statut actuel du score de Mise en Œuvre Effective (MOE) des Éléments Critiques (EC) du système de supervision de la sécurité de votre État, avec un focus particulier sur les Questions de Protocole (QP) prioritaires ? Objectif : 75 % en 2025, 85 % en 2026, 95 % en 2030.",
      options: [
        { label: 'Score MOE 0–25 %',   text: "Éléments critiques largement non mis en œuvre." },
        { label: 'Score MOE 26–50 %',  text: "Mise en œuvre partielle des éléments critiques." },
        { label: 'Score MOE 51–74 %',  text: "Mise en œuvre modérée — lacunes importantes subsistent." },
        { label: 'Score MOE 75–84 %',  text: "Objectif 2025 atteint — mise en œuvre avancée." },
        { label: 'Score MOE 85–100 %', text: "Objectifs 2026/2030 atteints ou dépassés — mise en œuvre complète." },
      ],
    },
    pt: {
      group: 'Fortalecimento da Supervisão de Segurança',
      title: 'Todos os Estados melhoram a pontuação de Implementação Efetiva (IE) dos Elementos Críticos (EC)',
      statement: 'Qual é o estado atual da pontuação de Implementação Efetiva (IE) dos Elementos Críticos (EC) do sistema de supervisão de segurança do seu Estado, com foco particular nas Questões de Protocolo (QP) prioritárias? Meta: 75% em 2025, 85% em 2026, 95% em 2030.',
      options: [
        { label: 'Pontuação IE 0–25%',   text: "Elementos críticos amplamente não implementados." },
        { label: 'Pontuação IE 26–50%',  text: "Implementação parcial dos elementos críticos." },
        { label: 'Pontuação IE 51–74%',  text: "Implementação moderada — lacunas significativas subsistem." },
        { label: 'Pontuação IE 75–84%',  text: "Meta 2025 atingida — implementação avançada." },
        { label: 'Pontuação IE 85–100%', text: "Metas 2026/2030 atingidas ou superadas — implementação completa." },
      ],
    },
  },

  // ── T2.3 ──
  'T2.3': {
    fr: {
      group: 'Renforcement de la Supervision de la Sécurité',
      title: "Tous les États établissent des organismes indépendants d'enquête sur les accidents et incidents aériens",
      statement: "L'État a-t-il établi et renforcé un organisme/unité indépendant d'enquête sur les accidents et incidents aériens, avec des sources de financement durables et des ressources adéquates, pour mener efficacement des enquêtes sur les accidents et incidents graves, avec une mise en œuvre complète prévue d'ici 2028 ?",
      options: [
        { label: 'Non encore mis en œuvre',        text: "Aucun organisme d'enquête indépendant n'a été établi ; des discussions ou premières étapes sont en cours." },
        { label: 'Planifié pour mise en œuvre',    text: "Des plans formels existent pour établir l'organisme avant 2028, mais la mise en œuvre n'a pas encore débuté." },
        { label: 'Partiellement mis en œuvre',     text: "L'organisme existe mais nécessite un renforcement — indépendance, financement, personnel pas encore pleinement durables." },
        { label: 'Mis en œuvre',                   text: "L'organisme d'enquête indépendant est établi mais pas encore entièrement durable." },
        { label: 'Pleinement mis en œuvre',        text: "L'organisme d'enquête indépendant est établi, opérationnel et durablement financé." },
      ],
    },
    pt: {
      group: 'Fortalecimento da Supervisão de Segurança',
      title: 'Todos os Estados estabelecem organismos independentes de investigação de acidentes e incidentes aéreos',
      statement: 'O Estado estabeleceu e fortaleceu um organismo/unidade independente de investigação de acidentes e incidentes aéreos, com fontes de financiamento sustentáveis e recursos adequados, para conduzir eficazmente investigações de acidentes e incidentes graves, com implementação completa prevista até 2028?',
      options: [
        { label: 'Ainda não implementado',        text: "Nenhum organismo de investigação independente foi estabelecido; discussões ou primeiras etapas em curso." },
        { label: 'Planeado para implementação',   text: "Existem planos formais para estabelecer o organismo antes de 2028, mas a implementação ainda não começou." },
        { label: 'Parcialmente implementado',     text: "O organismo existe mas requer reforço — independência, financiamento, pessoal ainda não totalmente sustentáveis." },
        { label: 'Implementado',                  text: "O organismo de investigação independente está estabelecido mas ainda não totalmente sustentável." },
        { label: 'Totalmente implementado',       text: "O organismo de investigação independente está estabelecido, operacional e com financiamento sustentável." },
      ],
    },
  },

  // ── T2.4 ──
  'T2.4': {
    fr: {
      group: 'Renforcement de la Supervision de la Sécurité',
      title: "Tous les États établissent les départements pertinents soutenant les fonctions de sécurité de l'État",
      statement: "L'État a-t-il établi et/ou renforcé les départements ou unités pertinents (ex. : services météorologiques, entités de réglementation des matières radioactives, autorités des communications) qui soutiennent directement les fonctions de sécurité de l'État, avec un financement durable et des ressources adéquates ?",
      options: [
        { label: 'Non mis en œuvre',                             text: "Aucun département/unité pertinent n'existe OU les existants ne soutiennent pas les fonctions de sécurité de l'État." },
        { label: 'Initié',                                       text: "Certains départements/unités existent mais sont faibles, fragmentés ou manquent de mandats clairs." },
        { label: 'Mise en œuvre en cours',                       text: "Départements/unités existants avec des mandats définis soutenant les fonctions de sécurité. Financement disponible mais non durable." },
        { label: 'Mis en œuvre',                                 text: "Tous les départements/unités pertinents sont établis et fonctionnels avec un financement durable." },
        { label: 'Pleinement mis en œuvre, maintenu et renforcé', text: "Départements/unités pleinement opérationnels, continuellement renforcés, avec financement durable sécurisé et planification à long terme." },
      ],
    },
    pt: {
      group: 'Fortalecimento da Supervisão de Segurança',
      title: 'Todos os Estados estabelecem departamentos relevantes de apoio às funções de segurança do Estado',
      statement: 'O Estado estabeleceu e/ou fortaleceu departamentos ou unidades relevantes (ex.: serviços meteorológicos, entidades reguladoras de materiais radioativos, autoridades de comunicações) que apoiam diretamente as funções de segurança do Estado, com financiamento sustentável e recursos adequados?',
      options: [
        { label: 'Não implementado',                               text: "Nenhum departamento/unidade relevante existe OU os existentes não apoiam as funções de segurança do Estado." },
        { label: 'Iniciado',                                       text: "Alguns departamentos/unidades existem mas são fracos, fragmentados ou sem mandatos claros." },
        { label: 'Implementação em curso',                         text: "Departamentos/unidades existentes com mandatos definidos de apoio às funções de segurança. Financiamento disponível mas não sustentável." },
        { label: 'Implementado',                                   text: "Todos os departamentos/unidades relevantes estabelecidos e funcionais com financiamento sustentável." },
        { label: 'Totalmente implementado, mantido e reforçado',   text: "Departamentos/unidades totalmente operacionais, continuamente reforçados, com financiamento sustentável garantido e planeamento a longo prazo." },
      ],
    },
  },

  // ── T3.1 ──
  'T3.1': {
    fr: {
      group: 'Programme National de Sécurité (PNS)',
      title: "Tous les États mettent en œuvre les bases d'un Programme National de Sécurité (PNS)",
      statement: "L'État a-t-il établi et mis en œuvre les éléments fondamentaux d'un Programme National de Sécurité (PNS), notamment la désignation d'une autorité responsable, l'élaboration d'un cadre PNS aligné sur l'Annexe 19 de l'OACI, et l'initiation de processus de gestion des risques, d'assurance et de promotion de la sécurité ?",
      options: [
        { label: 'Non encore initié',         text: "Aucune mesure n'a été prise vers la fondation du PNS." },
        { label: 'Phase de planification',    text: "Cadre PNS en cours d'élaboration." },
        { label: 'Partiellement mis en œuvre', text: "Certains éléments du PNS sont en place." },
        { label: 'Mis en œuvre',              text: "Base du PNS établie et opérationnelle." },
        { label: 'Pleinement mis en œuvre',   text: "PNS pleinement mis en œuvre, maintenu et pleinement opérationnel." },
      ],
    },
    pt: {
      group: 'Programa Nacional de Segurança (PNS)',
      title: 'Todos os Estados implementam a base de um Programa Nacional de Segurança (PNS)',
      statement: 'O Estado estabeleceu e implementou os elementos fundamentais de um Programa Nacional de Segurança (PNS), incluindo a designação de uma autoridade responsável, o desenvolvimento de um quadro PNS alinhado com o Anexo 19 da ICAO, e o início de processos de gestão de riscos, garantia e promoção da segurança?',
      options: [
        { label: 'Ainda não iniciado',         text: "Nenhuma medida tomada em direção à fundação do PNS." },
        { label: 'Fase de planeamento',        text: "Quadro PNS em desenvolvimento." },
        { label: 'Parcialmente implementado',  text: "Alguns elementos do PNS em vigor." },
        { label: 'Implementado',               text: "Base do PNS estabelecida e operacional." },
        { label: 'Totalmente implementado',    text: "PNS totalmente implementado, mantido e plenamente operacional." },
      ],
    },
  },

  // ── T3.2 ──
  'T3.2': {
    fr: {
      group: 'Programme National de Sécurité (PNS)',
      title: "Tous les États publient un Plan National de Sécurité de l'Aviation (PNSA)",
      statement: "L'État a-t-il élaboré, publié et officiellement communiqué un Plan National de Sécurité de l'Aviation (PNSA) conformément aux orientations de l'OACI, avec une publication achevée avant le 31 décembre 2026 ?",
      options: [
        { label: 'Non élaboré',                      text: "PNSA non encore élaboré ou publié." },
        { label: 'En cours',                         text: "Projet de PNSA élaboré mais non encore publié." },
        { label: 'Publié — Communication limitée',  text: "PNSA publié mais non communiqué à toutes les parties prenantes." },
        { label: 'Publié — Communication partielle', text: "PNSA publié et communiqué à certaines parties prenantes." },
        { label: 'Pleinement mis en œuvre',         text: "PNSA publié et communiqué à toutes les parties prenantes." },
      ],
    },
    pt: {
      group: 'Programa Nacional de Segurança (PNS)',
      title: 'Todos os Estados publicam um Plano Nacional de Segurança da Aviação (PNSA)',
      statement: 'O Estado desenvolveu, publicou e comunicou formalmente um Plano Nacional de Segurança da Aviação (PNSA) em conformidade com as orientações da ICAO, com publicação concluída até 31 de dezembro de 2026?',
      options: [
        { label: 'Não desenvolvido',                     text: "PNSA ainda não desenvolvido ou publicado." },
        { label: 'Em progresso',                         text: "Projeto de PNSA desenvolvido mas ainda não publicado." },
        { label: 'Publicado — Comunicação limitada',    text: "PNSA publicado mas não comunicado a todas as partes interessadas." },
        { label: 'Publicado — Comunicação parcial',     text: "PNSA publicado e comunicado a algumas partes interessadas." },
        { label: 'Totalmente implementado',              text: "PNSA publicado e comunicado a todas as partes interessadas." },
      ],
    },
  },

  // ── T3.3 ──
  'T3.3': {
    fr: {
      group: 'Programme National de Sécurité (PNS)',
      title: "Tous les États œuvrent vers un PNS efficace (Présent en 2026, Efficace en 2028)",
      statement: "L'État a-t-il développé et mis en œuvre un Programme National de Sécurité (PNS) conformément aux exigences de l'OACI, et progresse-t-il vers son efficacité selon les Objectifs Révisés de Sécurité d'Abuja (A : d'ici 2026 — Présent ; B : d'ici 2028 — Présent et Efficace) ?",
      options: [
        { label: 'Non initié',              text: "Aucun PNS n'a été initié." },
        { label: 'Cadre rédigé',            text: "Cadre PNS rédigé mais pas encore formellement adopté ou mis en œuvre." },
        { label: 'Partiellement mis en œuvre', text: "PNS formellement établi et partiellement mis en œuvre." },
        { label: 'Mis en œuvre (suivi)',    text: "PNS mis en œuvre avec la plupart des composantes fonctionnelles." },
        { label: 'Pleinement efficace',     text: "PNS pleinement mis en œuvre, efficace et aligné sur les exigences OACI." },
      ],
    },
    pt: {
      group: 'Programa Nacional de Segurança (PNS)',
      title: 'Todos os Estados trabalham para um PNS eficaz (Presente em 2026, Eficaz em 2028)',
      statement: 'O Estado desenvolveu e implementou um Programa Nacional de Segurança (PNS) de acordo com os requisitos da ICAO, e está a progredir para a sua eficácia conforme as Metas Revistas de Segurança de Abuja (A: até 2026 — Presente; B: até 2028 — Presente e Eficaz)?',
      options: [
        { label: 'Não iniciado',               text: "Nenhum PNS foi iniciado." },
        { label: 'Quadro redigido',            text: "Quadro PNS redigido mas ainda não formalmente adotado ou implementado." },
        { label: 'Parcialmente implementado',  text: "PNS formalmente estabelecido e parcialmente implementado." },
        { label: 'Implementado (monitorizado)', text: "PNS implementado com a maioria das componentes funcionais." },
        { label: 'Totalmente eficaz',          text: "PNS totalmente implementado, eficaz e alinhado com os requisitos da ICAO." },
      ],
    },
  },

  // ── T4.1 ──
  'T4.1': {
    fr: {
      group: 'Assistance et Plans Régionaux de Sécurité',
      title: "Les États n'attendant pas atteindre les Objectifs 2 et 3 d'ici déc. 2026 sollicitent de l'aide",
      statement: "Si l'État ne s'attend pas à atteindre les Objectifs 2 et 3 d'ici décembre 2026, votre État a-t-il formellement sollicité de l'aide pour renforcer ses capacités de supervision de la sécurité ?",
      options: [
        { label: 'Aucune reconnaissance / Aucune aide', text: "Pas de reconnaissance de l'incapacité à atteindre les Objectifs 2 et 3 ; aucune aide sollicitée." },
        { label: 'Difficultés reconnues',               text: "L'État a reconnu les difficultés mais n'a pas encore initié de demandes formelles d'aide." },
        { label: 'Premières demandes soumises',         text: "L'État a soumis des demandes initiales d'aide à l'AFCAC, l'OACI, les RSOO ou partenaires." },
        { label: "Recherche active d'aide",             text: "L'État recherche activement de l'aide, avec des programmes de soutien ou partenariats en cours." },
        { label: 'Pleinement engagé',                   text: "L'État est pleinement engagé dans les mécanismes d'aide, mettant en œuvre des mesures de renforcement des capacités." },
      ],
    },
    pt: {
      group: 'Assistência e Planos Regionais de Segurança',
      title: 'Estados que não esperam cumprir os Objetivos 2 e 3 até dez. 2026 solicitam assistência',
      statement: 'Se o Estado não espera cumprir os Objetivos 2 e 3 até dezembro de 2026, o seu Estado solicitou formalmente assistência para reforçar as suas capacidades de supervisão de segurança?',
      options: [
        { label: 'Sem reconhecimento / Sem assistência', text: "Sem reconhecimento da incapacidade de cumprir os Objetivos 2 e 3; nenhuma assistência solicitada." },
        { label: 'Dificuldades reconhecidas',            text: "O Estado reconheceu as dificuldades mas ainda não iniciou pedidos formais de assistência." },
        { label: 'Primeiros pedidos submetidos',         text: "O Estado submeteu pedidos iniciais de assistência à AFCAC, ICAO, RSOOs ou parceiros." },
        { label: 'Assistência ativamente solicitada',    text: "O Estado solicita ativamente assistência, com programas de apoio ou parcerias em curso." },
        { label: 'Totalmente empenhado',                 text: "O Estado está totalmente empenhado nos mecanismos de assistência, implementando medidas de reforço de capacidades." },
      ],
    },
  },

  // ── T4.2 ──
  'T4.2': {
    fr: {
      group: 'Assistance et Plans Régionaux de Sécurité',
      title: "Publier un Plan Régional de Sécurité de l'Aviation (PRSA) mis à jour d'ici fin 2026",
      statement: "L'État a-t-il publié un Plan Régional de Sécurité de l'Aviation (PRSA) mis à jour pour le RASG-AFI, RASG-MID ou EUR RASG d'ici fin 2026, en assurant l'alignement avec la dernière édition du Plan Mondial de Sécurité de l'Aviation (GASP) de l'OACI ?",
      options: [
        { label: 'Aucun progrès',                  text: "Aucune initiative vers la mise à jour du PRSA." },
        { label: 'Premières étapes',               text: "Ébauche préparée, consultations débutées, mais aucun projet formel complété." },
        { label: 'Projet élaboré',                 text: "Projet de PRSA élaboré et diffusé en interne, mais non finalisé ni publié." },
        { label: 'Finalisé — Non publié',          text: "PRSA finalisé et approuvé au niveau régional, mais non encore publié officiellement." },
        { label: 'Publié et communiqué',           text: "PRSA mis à jour entièrement publié, aligné sur le dernier GASP de l'OACI." },
      ],
    },
    pt: {
      group: 'Assistência e Planos Regionais de Segurança',
      title: 'Publicar um Plano Regional de Segurança da Aviação (PRSA) atualizado até final de 2026',
      statement: 'O Estado publicou um Plano Regional de Segurança da Aviação (PRSA) atualizado para o RASG-AFI, RASG-MID ou EUR RASG até final de 2026, assegurando o alinhamento com a última edição do Plano Global de Segurança da Aviação (GASP) da ICAO?',
      options: [
        { label: 'Sem progresso',              text: "Nenhuma iniciativa em direção à atualização do PRSA." },
        { label: 'Primeiras etapas',           text: "Esboço preparado, consultas iniciadas, mas nenhum projeto formal concluído." },
        { label: 'Projeto desenvolvido',       text: "Projeto de PRSA desenvolvido e circulado internamente, mas ainda não finalizado ou publicado." },
        { label: 'Finalizado — Não publicado', text: "PRSA finalizado e aprovado a nível regional, mas ainda não publicado oficialmente." },
        { label: 'Publicado e comunicado',     text: "PRSA atualizado totalmente publicado, alinhado com o último GASP da ICAO." },
      ],
    },
  },

  // ── T5.1 ──
  'T5.1': {
    fr: {
      group: "Normes de Sécurité de l'Industrie",
      title: "Maintenir une tendance croissante dans les réseaux de partage d'informations de sécurité",
      statement: "Dans quelle mesure l'État a-t-il maintenu une tendance croissante dans la contribution d'informations de sécurité aux réseaux régionaux et mondiaux de partage d'informations, en soutien à l'élaboration des PNSA et des PRSA ?",
      options: [
        { label: 'Aucune contribution',          text: "Aucune contribution aux réseaux de partage d'informations de sécurité." },
        { label: 'Contribution limitée',         text: "Partage occasionnel ou ad hoc d'informations de sécurité." },
        { label: 'Contribution modérée',         text: "Partage régulier mais incomplet d'informations de sécurité." },
        { label: 'Contribution significative',   text: "Partage cohérent et structuré d'informations de sécurité." },
        { label: 'Contribution pleine',          text: "Tendance soutenue et croissante de partage d'informations de sécurité." },
      ],
    },
    pt: {
      group: 'Padrões de Segurança da Indústria',
      title: 'Manter uma tendência crescente nas redes de partilha de informações de segurança',
      statement: 'Em que medida o Estado manteve uma tendência crescente de contribuição de informações de segurança para redes regionais e globais de partilha de informações, em apoio ao desenvolvimento dos PNSA e PRSA?',
      options: [
        { label: 'Sem contribuição',           text: "Nenhuma contribuição para redes de partilha de informações de segurança." },
        { label: 'Contribuição limitada',      text: "Partilha ocasional ou ad hoc de informações de segurança." },
        { label: 'Contribuição moderada',      text: "Partilha regular mas incompleta de informações de segurança." },
        { label: 'Contribuição significativa', text: "Partilha consistente e estruturada de informações de segurança." },
        { label: 'Contribuição plena',         text: "Tendência sustentada e crescente de partilha de informações de segurança." },
      ],
    },
  },

  // ── T5.2 ──
  'T5.2': {
    fr: {
      group: "Normes de Sécurité de l'Industrie",
      title: "Augmenter le nombre de prestataires participant aux programmes d'évaluation OACI (IOSA, ISSA, ISAGO)",
      statement: "Dans quelle mesure votre État a-t-il augmenté le nombre de prestataires de services (compagnies aériennes, assistants en escale, etc.) participant aux programmes d'évaluation reconnus par l'OACI tels que IOSA, ISSA, ISAGO ou équivalents ?",
      options: [
        { label: 'Non commencé',               text: "Aucun prestataire n'est inscrit aux programmes d'évaluation reconnus par l'OACI." },
        { label: 'Mise en œuvre initiale',     text: "Une faible proportion (jusqu'au quart) des prestataires est inscrite." },
        { label: 'Mise en œuvre modérée',      text: "Environ la moitié des prestataires est inscrite." },
        { label: 'Mise en œuvre avancée',      text: "La majorité (trois quarts) des prestataires est inscrite." },
        { label: 'Pleinement mis en œuvre',    text: "Tous les prestataires éligibles sont inscrits." },
      ],
    },
    pt: {
      group: 'Padrões de Segurança da Indústria',
      title: 'Aumentar o número de prestadores participantes em programas de avaliação ICAO (IOSA, ISSA, ISAGO)',
      statement: 'Em que medida o seu Estado aumentou o número de prestadores de serviços (companhias aéreas, prestadores de assistência em terra, etc.) que participam em programas de avaliação reconhecidos pela ICAO, como IOSA, ISSA, ISAGO ou equivalentes?',
      options: [
        { label: 'Não iniciado',              text: "Nenhum prestador está inscrito em programas de avaliação reconhecidos pela ICAO." },
        { label: 'Implementação inicial',     text: "Uma pequena proporção (até um quarto) dos prestadores está inscrita." },
        { label: 'Implementação moderada',    text: "Cerca de metade dos prestadores está inscrita." },
        { label: 'Implementação avançada',    text: "A maioria (três quartos) dos prestadores está inscrita." },
        { label: 'Totalmente implementado',   text: "Todos os prestadores elegíveis estão inscritos." },
      ],
    },
  },

  // ── T5.3 ──
  'T5.3': {
    fr: {
      group: "Normes de Sécurité de l'Industrie",
      title: "Les compagnies aériennes africaines éligibles atteignent les normes IATA IOSA/ISSA",
      statement: "Dans quelle mesure les compagnies aériennes africaines éligibles relevant de la supervision de l'État ont-elles atteint des normes de sécurité opérationnelle acceptables grâce au programme IATA IOSA/ISSA reconnu mondialement ?",
      options: [
        { label: 'Aucune inscription',             text: "Aucune compagnie aérienne éligible n'a obtenu l'inscription IOSA/ISSA." },
        { label: 'Préparation aux audits',         text: "Certaines compagnies se préparent aux audits IOSA/ISSA, mais aucune n'a encore obtenu l'inscription." },
        { label: 'Au moins une inscrite',          text: "Au moins une compagnie aérienne éligible a obtenu l'inscription IOSA/ISSA." },
        { label: 'Majorité inscrite',              text: "La majorité des compagnies aériennes éligibles a obtenu l'inscription IOSA/ISSA." },
        { label: 'Toutes inscrites et maintenues', text: "Toutes les compagnies éligibles ont obtenu l'inscription IOSA/ISSA et maintiennent un renouvellement régulier." },
      ],
    },
    pt: {
      group: 'Padrões de Segurança da Indústria',
      title: 'Companhias aéreas africanas elegíveis atingem padrões IATA IOSA/ISSA',
      statement: 'Em que medida as companhias aéreas africanas elegíveis sob supervisão do Estado atingiram padrões de segurança operacional aceitáveis através do programa IATA IOSA/ISSA reconhecido globalmente?',
      options: [
        { label: 'Sem registo',                    text: "Nenhuma companhia aérea elegível obteve registo IOSA/ISSA." },
        { label: 'Preparação para auditoria',      text: "Algumas companhias estão a preparar-se para auditorias IOSA/ISSA, mas nenhuma obteve ainda registo." },
        { label: 'Pelo menos uma registada',       text: "Pelo menos uma companhia aérea elegível obteve registo IOSA/ISSA." },
        { label: 'Maioria registada',              text: "A maioria das companhias aéreas elegíveis obteve registo IOSA/ISSA." },
        { label: 'Todas registadas e mantidas',    text: "Todas as companhias elegíveis obtiveram registo IOSA/ISSA e mantêm renovação recorrente." },
      ],
    },
  },

  // ── T5.4 ──
  'T5.4': {
    fr: {
      group: "Normes de Sécurité de l'Industrie",
      title: "Les prestataires d'assistance en escale éligibles atteignent et maintiennent les normes IATA ISAGO",
      statement: "Dans quelle mesure l'État a-t-il veillé à ce que les prestataires d'assistance en escale (GSP) éligibles atteignent et maintiennent des normes de sécurité opérationnelle acceptables grâce au programme IATA ISAGO reconnu mondialement ?",
      options: [
        { label: 'Aucun GSP identifié/engagé',   text: "Aucun GSP éligible n'a été identifié ou engagé dans la certification ISAGO." },
        { label: 'Premières étapes',              text: "Certains GSP identifiés, sensibilisation réalisée, mais aucune certification obtenue." },
        { label: 'Mise en œuvre partielle',       text: "Au moins un GSP éligible certifié sous ISAGO, mais couverture limitée." },
        { label: 'Majorité certifiée',            text: "Majorité des GSP éligibles certifiés et conformes." },
        { label: 'Mise en œuvre complète',        text: "Tous les GSP éligibles certifiés sous ISAGO, avec supervision continue." },
      ],
    },
    pt: {
      group: 'Padrões de Segurança da Indústria',
      title: 'Prestadores de assistência em terra (GSP) elegíveis atingem e mantêm padrões IATA ISAGO',
      statement: 'Em que medida o Estado assegurou que os prestadores de assistência em terra (GSP) elegíveis atingem e mantêm padrões de segurança operacional aceitáveis através do programa IATA ISAGO reconhecido globalmente?',
      options: [
        { label: 'Nenhum GSP identificado/envolvido', text: "Nenhum GSP elegível foi identificado ou envolvido na certificação ISAGO." },
        { label: 'Primeiras etapas',                  text: "Alguns GSP identificados, sensibilização realizada, mas nenhuma certificação obtida." },
        { label: 'Implementação parcial',             text: "Pelo menos um GSP elegível certificado sob ISAGO, mas cobertura limitada." },
        { label: 'Maioria certificada',               text: "Maioria dos GSP elegíveis certificados e em conformidade." },
        { label: 'Implementação completa',            text: "Todos os GSP elegíveis certificados sob ISAGO, com supervisão contínua." },
      ],
    },
  },

  // ── T6.1 ──
  'T6.1': {
    fr: {
      group: 'Infrastructure de Navigation Aérienne et Aérodromique',
      title: "Maintenir une tendance croissante des infrastructures répondant aux normes OACI",
      statement: "Dans quelle mesure l'État a-t-il établi et maintenu une tendance croissante des infrastructures de navigation aérienne, des systèmes interopérables et des infrastructures aérodromiques conformes aux normes OACI pertinentes ?",
      options: [
        { label: 'Aucune mise en œuvre',          text: "Aucune preuve de mise en œuvre." },
        { label: 'Premières étapes',              text: "Mises à niveau limitées des infrastructures ou activités de planification en cours." },
        { label: 'Mise en œuvre modérée',         text: "Certaines infrastructures et systèmes conformes aux normes OACI, mais couverture partielle." },
        { label: 'Mise en œuvre significative',   text: "La plupart des infrastructures et systèmes sont conformes OACI." },
        { label: 'Mise en œuvre complète',        text: "Toutes les infrastructures de navigation aérienne et aérodromiques conformes aux normes OACI." },
      ],
    },
    pt: {
      group: 'Infraestrutura de Navegação Aérea e Aeródromos',
      title: 'Manter uma tendência crescente de infraestruturas conformes com os padrões ICAO',
      statement: 'Em que medida o Estado estabeleceu e manteve uma tendência crescente de infraestruturas de navegação aérea, sistemas interoperáveis e infraestruturas de aeródromo conformes com os padrões ICAO relevantes?',
      options: [
        { label: 'Sem implementação',           text: "Nenhuma evidência de implementação." },
        { label: 'Primeiras etapas',            text: "Melhorias limitadas de infraestrutura ou atividades de planeamento em curso." },
        { label: 'Implementação moderada',      text: "Algumas infraestruturas e sistemas conformes com os padrões ICAO, mas cobertura parcial." },
        { label: 'Implementação significativa', text: "A maioria das infraestruturas e sistemas é conforme com a ICAO." },
        { label: 'Implementação completa',      text: "Todas as infraestruturas de navegação aérea e aeródromos conformes com os padrões ICAO." },
      ],
    },
  },

  // ── T7.1 ──
  'T7.1': {
    fr: {
      group: 'Infrastructure de Navigation Aérienne et Aérodromique',
      title: "Tous les États identifient les lacunes des infrastructures aérodromiques internationales existantes",
      statement: "L'État a-t-il identifié et documenté les lacunes des infrastructures aérodromiques internationales existantes conformément aux normes OACI et aux Objectifs Révisés de Sécurité d'Abuja, avec un plan clair pour y remédier d'ici 2026 ?",
      options: [
        { label: 'Aucune action engagée',       text: "Aucune évaluation ou documentation des lacunes n'a été initiée." },
        { label: 'Premières étapes',            text: "Certaines lacunes informellement identifiées, mais aucune évaluation ni documentation complète." },
        { label: 'Progrès partiel',             text: "Une évaluation formelle a été menée, mais la documentation est incomplète." },
        { label: 'Progrès significatif',        text: "Lacunes pleinement identifiées et documentées, avec des plans d'action en projet." },
        { label: 'Conformité totale',           text: "Toutes les lacunes identifiées, documentées et intégrées dans un plan d'action national." },
      ],
    },
    pt: {
      group: 'Infraestrutura de Navegação Aérea e Aeródromos',
      title: 'Todos os Estados identificam lacunas nas infraestruturas aeroportuárias internacionais existentes',
      statement: 'O Estado identificou e documentou lacunas nas infraestruturas aeroportuárias internacionais existentes em conformidade com os padrões ICAO e as Metas Revistas de Segurança de Abuja, com um plano claro para as resolver até 2026?',
      options: [
        { label: 'Nenhuma ação tomada',      text: "Nenhuma avaliação ou documentação de lacunas foi iniciada." },
        { label: 'Passos preliminares',      text: "Algumas lacunas informalmente identificadas, mas sem avaliação ou documentação completa." },
        { label: 'Progresso parcial',        text: "Uma avaliação formal foi conduzida, mas a documentação está incompleta." },
        { label: 'Progresso significativo',  text: "Lacunas totalmente identificadas e documentadas, com planos de ação em projeto." },
        { label: 'Conformidade total',       text: "Todas as lacunas identificadas, documentadas e integradas num plano de ação nacional." },
      ],
    },
  },

  // ── T7.2 ──
  'T7.2': {
    fr: {
      group: 'Infrastructure de Navigation Aérienne et Aérodromique',
      title: "Tous les États identifient les lacunes des infrastructures des Services de Navigation Aérienne (SNA)",
      statement: "L'État a-t-il mené une évaluation complète pour identifier les lacunes des infrastructures de services de navigation aérienne (SNA) existantes, et a-t-il documenté ces conclusions conformément aux normes OACI ?",
      options: [
        { label: "Aucune évaluation initiée",                text: "Aucune preuve d'identification des lacunes SNA." },
        { label: 'Premières étapes',                         text: "Planification ou collecte partielle de données en cours, mais analyse formelle non complétée." },
        { label: 'Analyse partielle des lacunes',            text: "Analyse menée pour certains éléments SNA, mais incomplète." },
        { label: 'Globale — Alignement partiel',             text: "Analyse complète réalisée et documentée, couvrant la plupart des domaines SNA." },
        { label: 'Analyse complète des lacunes réalisée',    text: "Analyse complète, documentée et validée." },
      ],
    },
    pt: {
      group: 'Infraestrutura de Navegação Aérea e Aeródromos',
      title: 'Todos os Estados identificam lacunas nas infraestruturas dos Serviços de Navegação Aérea (SNA)',
      statement: 'O Estado realizou uma avaliação abrangente para identificar lacunas nas infraestruturas dos serviços de navegação aérea (SNA) existentes, e documentou essas conclusões em conformidade com os padrões ICAO?',
      options: [
        { label: 'Nenhuma avaliação iniciada',             text: "Nenhuma evidência de identificação de lacunas SNA." },
        { label: 'Passos preliminares',                    text: "Planeamento ou recolha parcial de dados em curso, mas análise formal não concluída." },
        { label: 'Análise parcial de lacunas',             text: "Análise realizada para alguns elementos SNA, mas incompleta." },
        { label: 'Abrangente — Alinhamento parcial',       text: "Análise abrangente realizada e documentada, cobrindo a maioria das áreas SNA." },
        { label: 'Análise completa de lacunas concluída',  text: "Análise completa, documentada e validada." },
      ],
    },
  },

  // ── T8 ──
  'T8': {
    fr: {
      group: 'Certification des Aérodromes',
      title: "Tous les aérodromes internationaux certifiés d'ici fin 2030",
      statement: "Dans quelle mesure votre État a-t-il réalisé la certification de tous les aérodromes internationaux conformément à l'Objectif Révisé de Sécurité d'Abuja requérant une réalisation d'ici 2030 ?",
      options: [
        { label: 'Aucun aérodrome certifié',         text: "Aucun aérodrome international certifié." },
        { label: 'Moins de 25 % certifiés',          text: "Premières étapes ; moins d'un quart des aérodromes internationaux certifiés." },
        { label: 'Moitié certifiée',                 text: "La moitié des aérodromes internationaux certifiée." },
        { label: 'Majorité certifiée',               text: "Majorité des aérodromes internationaux certifiés ; proche de la conformité totale." },
        { label: 'Tous certifiés',                   text: "Tous les aérodromes internationaux certifiés conformément aux exigences OACI." },
      ],
    },
    pt: {
      group: 'Certificação de Aeródromos',
      title: 'Todos os aeródromos internacionais certificados até final de 2030',
      statement: 'Em que medida o seu Estado alcançou a certificação de todos os aeródromos internacionais em conformidade com a Meta Revista de Segurança de Abuja que exige a conclusão até 2030?',
      options: [
        { label: 'Nenhum aeródromo certificado',  text: "Nenhum aeródromo internacional certificado." },
        { label: 'Menos de 25% certificados',     text: "Primeiras etapas; menos de um quarto dos aeródromos internacionais certificados." },
        { label: 'Metade certificada',            text: "Metade dos aeródromos internacionais certificada." },
        { label: 'Maioria certificada',           text: "Maioria dos aeródromos internacionais certificada; próximo da conformidade total." },
        { label: 'Todos certificados',            text: "Todos os aeródromos internacionais certificados de acordo com os requisitos da ICAO." },
      ],
    },
  },

  // ── T9.1 ──
  'T9.1': {
    fr: {
      group: 'Recherche et Sauvetage (SAR)',
      title: "Tous les États établissent une organisation SAR efficace et opérationnelle",
      statement: "Dans quelle mesure l'État a-t-il établi une organisation SAR efficace et opérationnelle comprenant : (i) Comité national de coordination SAR, (ii) Plan national SAR, (iii) Accords SAR avec les États voisins, (iv) Exercices SAR multi-agences, (v) Lien coopératif avec GADSS, (vi) Base de données nationale des ELT liée à COSPAS-SARSAT ?",
      options: [
        { label: 'Aucune action engagée',        text: "Aucune action sur les exigences SAR." },
        { label: 'Premières étapes',             text: "Comité SAR établi OU Plan SAR rédigé, mais la plupart des exigences incomplètes." },
        { label: 'Mise en œuvre partielle',      text: "Comité et Plan SAR en place, certains accords initiés." },
        { label: 'Mise en œuvre avancée',        text: "Comité, Plan et accords SAR complétés ; exercices SAR initiaux menés." },
        { label: 'Conformité totale',            text: "Toutes les exigences SAR complétées, opérationnelles et testées." },
      ],
    },
    pt: {
      group: 'Busca e Salvamento (SAR)',
      title: 'Todos os Estados estabelecem uma organização SAR eficaz e operacional',
      statement: 'Em que medida o Estado estabeleceu uma organização SAR eficaz e operacional incluindo: (i) Comité Nacional de Coordenação SAR, (ii) Plano Nacional SAR, (iii) Acordos SAR com Estados vizinhos, (iv) Exercícios SAR multiagências, (v) Ligação cooperativa ao GADSS, (vi) Base de dados nacional de ELT ligada ao COSPAS-SARSAT?',
      options: [
        { label: 'Nenhuma ação tomada',        text: "Nenhuma ação sobre os requisitos SAR." },
        { label: 'Primeiras etapas',           text: "Comité SAR estabelecido OU Plano SAR redigido, mas a maioria dos requisitos incompletos." },
        { label: 'Implementação parcial',      text: "Comité e Plano SAR em vigor, alguns acordos iniciados." },
        { label: 'Implementação avançada',     text: "Comité, Plano e acordos SAR concluídos; exercícios SAR iniciais realizados." },
        { label: 'Conformidade total',         text: "Todos os requisitos SAR concluídos, operacionais e testados." },
      ],
    },
  },

  // ── T10.1 ──
  'T10.1': {
    fr: {
      group: 'Transition AIS vers AIM',
      title: "Tous les États élaborent des plans d'action nationaux pour la transition AIS vers AIM",
      statement: "L'État a-t-il élaboré et mis en œuvre un plan d'action national pour la transition des Services d'Information Aéronautique (AIS) vers la Gestion de l'Information Aéronautique (AIM), incluant la mise en œuvre effective des Blocs de construction de base (BBB) et des éléments ASBU DAIM-B1, d'ici décembre 2026 ?",
      options: [
        { label: 'Aucun progrès',              text: "Aucun plan d'action national élaboré ; aucune mise en œuvre des BBB ou éléments ASBU DAIM-B1." },
        { label: 'Progrès initial',            text: "Projet de plan d'action national existant ; mise en œuvre limitée ou pilote." },
        { label: 'Mise en œuvre partielle',    text: "Plan d'action national formellement adopté ; mise en œuvre modérée." },
        { label: 'Mise en œuvre avancée',      text: "Plan d'action national opérationnel ; mise en œuvre substantielle." },
        { label: 'Mise en œuvre complète',     text: "Plan d'action national entièrement exécuté ; mise en œuvre complète et efficace." },
      ],
    },
    pt: {
      group: 'Transição AIS para AIM',
      title: 'Todos os Estados desenvolvem planos de ação nacionais para a transição AIS para AIM',
      statement: 'O Estado desenvolveu e implementou um plano de ação nacional para a transição dos Serviços de Informação Aeronáutica (AIS) para a Gestão de Informação Aeronáutica (AIM), incluindo a implementação efetiva dos Blocos de Construção Básicos (BBB) e dos elementos ASBU DAIM-B1, até dezembro de 2026?',
      options: [
        { label: 'Sem progresso',              text: "Nenhum plano de ação nacional desenvolvido; nenhuma implementação de BBB ou elementos ASBU DAIM-B1." },
        { label: 'Progresso inicial',          text: "Projeto de plano de ação nacional existente; implementação limitada ou piloto." },
        { label: 'Implementação parcial',      text: "Plano de ação nacional formalmente adotado; implementação moderada." },
        { label: 'Implementação avançada',     text: "Plano de ação nacional operacional; implementação substancial." },
        { label: 'Implementação completa',     text: "Plano de ação nacional totalmente executado; implementação completa e eficaz." },
      ],
    },
  },

  // ── T10.2 ──
  'T10.2': {
    fr: {
      group: 'Transition AIS vers AIM',
      title: "Mise en œuvre du Plan d'Action National conformément à l'ASBU Bloc 0 D-AIM",
      statement: "L'État a-t-il élaboré et mis en œuvre un Plan d'Action National pour la transition AIS vers AIM, en alignement avec l'ASBU Bloc 0 D-AIM, et est-il en bonne voie pour une réalisation d'ici fin 2026 ?",
      options: [
        { label: "Aucun Plan d'Action National",              text: "Aucun Plan d'Action National n'a été élaboré." },
        { label: 'Projet existant',                           text: "Projet de Plan d'Action National existant mais non formellement adopté." },
        { label: 'Adopté — Mise en œuvre partielle',         text: "Plan d'Action National formellement adopté ; mise en œuvre partielle en cours." },
        { label: 'Bien avancé',                              text: "Mise en œuvre du Plan d'Action National bien avancée." },
        { label: 'Pleinement mis en œuvre',                  text: "Plan d'Action National pleinement mis en œuvre conformément à l'ASBU Bloc 0 D-AIM." },
      ],
    },
    pt: {
      group: 'Transição AIS para AIM',
      title: 'Implementação do Plano de Ação Nacional de acordo com o ASBU Bloco 0 D-AIM',
      statement: 'O Estado desenvolveu e implementou um Plano de Ação Nacional para a transição AIS para AIM, em alinhamento com o ASBU Bloco 0 D-AIM, e está no bom caminho para a conclusão até final de 2026?',
      options: [
        { label: 'Sem Plano de Ação Nacional',              text: "Nenhum Plano de Ação Nacional foi desenvolvido." },
        { label: 'Projeto existente',                       text: "Projeto de Plano de Ação Nacional existente mas não formalmente adotado." },
        { label: 'Adotado — Implementação parcial',        text: "Plano de Ação Nacional formalmente adotado; implementação parcial em curso." },
        { label: 'Bem avançado',                           text: "Implementação do Plano de Ação Nacional bem avançada." },
        { label: 'Totalmente implementado',                text: "Plano de Ação Nacional totalmente implementado de acordo com o ASBU Bloco 0 D-AIM." },
      ],
    },
  },

  // ── T10.3 ──
  'T10.3': {
    fr: {
      group: 'Transition AIS vers AIM',
      title: "Développer un programme central de base de données aéronautiques pour l'Afrique d'ici fin 2028",
      statement: "L'État a-t-il développé et initié la mise en œuvre d'un programme central de base de données aéronautiques, aligné sur les objectifs d'harmonisation continentale, devant être opérationnel d'ici fin 2028 ?",
      options: [
        { label: 'Aucune action',                  text: "Aucune action ; aucun plan ni initiative en place." },
        { label: 'Planification initiale',         text: "Note conceptuelle ou étude de faisabilité élaborée, mais aucun programme formel lancé." },
        { label: 'Conception du programme achevée', text: "Ressources allouées et activités pilotes initiées, mais pas encore opérationnel." },
        { label: 'Partiellement mis en œuvre',     text: "Programme de base de données partiellement mis en œuvre ; opérationnel à portée limitée." },
        { label: 'Pleinement opérationnel',        text: "Programme central de base de données aéronautiques pleinement mis en œuvre et opérationnel." },
      ],
    },
    pt: {
      group: 'Transição AIS para AIM',
      title: 'Desenvolver um programa central de base de dados aeronáuticos para África até final de 2028',
      statement: 'O Estado desenvolveu e iniciou a implementação de um programa central de base de dados aeronáuticos, alinhado com os objetivos de harmonização continental, a ser operacional até final de 2028?',
      options: [
        { label: 'Nenhuma ação',                    text: "Nenhuma ação; nenhum plano ou iniciativa em vigor." },
        { label: 'Planeamento inicial',             text: "Nota conceptual ou estudo de viabilidade desenvolvido, mas nenhum programa formal lançado." },
        { label: 'Conceção do programa concluída',  text: "Recursos alocados e atividades piloto iniciadas, mas ainda não operacional." },
        { label: 'Parcialmente implementado',       text: "Programa de base de dados parcialmente implementado; operacional em âmbito limitado." },
        { label: 'Totalmente operacional',          text: "Programa central de base de dados aeronáuticos totalmente implementado e operacional." },
      ],
    },
  },

  // ── T11.1 ──
  'T11.1': {
    fr: {
      group: 'Navigation Fondée sur les Performances (PBN)',
      title: "75 % des pistes aux instruments ont mis en œuvre des procédures PBN d'ici le 31 décembre 2026",
      statement: "Dans quelle mesure l'État a-t-il mis en œuvre des procédures de Navigation Fondée sur les Performances (PBN) sur les pistes aux instruments, conformément à l'Objectif de Sécurité d'Abuja requérant 75 % de mise en œuvre d'ici le 31 décembre 2026 ?",
      options: [
        { label: '0 % des pistes',               text: "Aucune piste aux instruments n'a mis en œuvre des procédures PBN." },
        { label: "Jusqu'à 25 % des pistes",      text: "Procédures PBN mises en œuvre sur jusqu'à 25 % des pistes aux instruments." },
        { label: "Jusqu'à 50 % des pistes",      text: "Procédures PBN mises en œuvre sur jusqu'à 50 % des pistes aux instruments." },
        { label: '≥ 75 % des pistes (Objectif)', text: "Procédures PBN mises en œuvre sur au moins 75 % des pistes aux instruments." },
        { label: '100 % des pistes',             text: "Procédures PBN mises en œuvre sur toutes les pistes aux instruments." },
      ],
    },
    pt: {
      group: 'Navegação Baseada em Desempenho (PBN)',
      title: '75% das pistas de instrumentos implementaram procedimentos PBN até 31 de dezembro de 2026',
      statement: 'Em que medida o Estado implementou procedimentos de Navegação Baseada em Desempenho (PBN) nas pistas de instrumentos, em conformidade com a Meta de Segurança de Abuja que exige 75% de implementação até 31 de dezembro de 2026?',
      options: [
        { label: '0% das pistas',              text: "Nenhuma pista de instrumentos implementou procedimentos PBN." },
        { label: 'Até 25% das pistas',         text: "Procedimentos PBN implementados em até 25% das pistas de instrumentos." },
        { label: 'Até 50% das pistas',         text: "Procedimentos PBN implementados em até 50% das pistas de instrumentos." },
        { label: '≥75% das pistas (Meta)',     text: "Procedimentos PBN implementados em pelo menos 75% das pistas de instrumentos." },
        { label: '100% das pistas',            text: "Procedimentos PBN implementados em todas as pistas de instrumentos." },
      ],
    },
  },

  // ── T11.2 ──
  'T11.2': {
    fr: {
      group: 'Navigation Fondée sur les Performances (PBN)',
      title: "100 % des pistes aux instruments ont mis en œuvre des procédures PBN",
      statement: "L'État a-t-il assuré la mise en œuvre des procédures PBN sur 100 % des pistes aux instruments, conformément à l'Objectif Révisé de Sécurité d'Abuja 11.2, à réaliser d'ici le 31 décembre 2026 ?",
      options: [
        { label: '0 % des pistes',   text: "Aucune piste aux instruments n'a mis en œuvre de procédures PBN." },
        { label: '25 % des pistes',  text: "Procédures PBN mises en œuvre sur jusqu'à un quart des pistes aux instruments." },
        { label: '50 % des pistes',  text: "Procédures PBN mises en œuvre sur la moitié des pistes aux instruments." },
        { label: '75 % des pistes',  text: "Procédures PBN mises en œuvre sur trois quarts des pistes aux instruments." },
        { label: '100 % des pistes', text: "Procédures PBN mises en œuvre sur toutes les pistes aux instruments." },
      ],
    },
    pt: {
      group: 'Navegação Baseada em Desempenho (PBN)',
      title: '100% das pistas de instrumentos implementaram procedimentos PBN',
      statement: 'O Estado assegurou a implementação de procedimentos PBN em 100% das pistas de instrumentos, em conformidade com a Meta Revista de Segurança de Abuja 11.2, a alcançar até 31 de dezembro de 2026?',
      options: [
        { label: '0% das pistas',   text: "Nenhuma pista de instrumentos implementou procedimentos PBN." },
        { label: '25% das pistas',  text: "Procedimentos PBN implementados em até um quarto das pistas de instrumentos." },
        { label: '50% das pistas',  text: "Procedimentos PBN implementados em metade das pistas de instrumentos." },
        { label: '75% das pistas',  text: "Procedimentos PBN implementados em três quartos das pistas de instrumentos." },
        { label: '100% das pistas', text: "Procedimentos PBN implementados em todas as pistas de instrumentos." },
      ],
    },
  },

  // ── T12.1 ──
  'T12.1': {
    fr: {
      group: 'Services de Navigation Aérienne Sans Couture',
      title: "Tous les États mènent une analyse des lacunes de l'infrastructure SNA",
      statement: "L'État a-t-il mené une analyse complète des lacunes de l'infrastructure SNA, conformément aux orientations de l'OACI, pour identifier les déficiences et exigences nécessaires à l'établissement de services de navigation aérienne sans couture dans la région AFI, avec une réalisation ciblée en décembre 2026 ?",
      options: [
        { label: 'Aucune action',                      text: "Aucune action initiée." },
        { label: 'Premières étapes',                   text: "Planification ou collecte partielle de données en cours, mais analyse non encore complétée." },
        { label: 'Partiellement menée',                text: "Certains domaines d'infrastructure évalués, mais pas de manière complète." },
        { label: 'Substantiellement complétée',        text: "Analyse des lacunes substantiellement complétée ; la plupart des domaines d'infrastructure évalués." },
        { label: 'Entièrement complétée et reportée',  text: "Analyse des lacunes entièrement complétée, documentée, validée et officiellement reportée." },
      ],
    },
    pt: {
      group: 'Serviços de Navegação Aérea Harmonizados',
      title: 'Todos os Estados conduzem uma análise de lacunas da infraestrutura SNA',
      statement: 'O Estado realizou uma análise abrangente das lacunas da infraestrutura SNA, em conformidade com as orientações da ICAO, para identificar deficiências e requisitos para o estabelecimento de serviços de navegação aérea harmonizados na região AFI, com conclusão prevista para dezembro de 2026?',
      options: [
        { label: 'Nenhuma ação',                      text: "Nenhuma ação iniciada." },
        { label: 'Primeiras etapas',                  text: "Planeamento ou recolha parcial de dados em curso, mas análise ainda não concluída." },
        { label: 'Parcialmente conduzida',            text: "Algumas áreas de infraestrutura avaliadas, mas não de forma abrangente." },
        { label: 'Substancialmente concluída',        text: "Análise de lacunas substancialmente concluída; a maioria das áreas de infraestrutura avaliadas." },
        { label: 'Totalmente concluída e reportada',  text: "Análise de lacunas totalmente concluída, documentada, validada e formalmente reportada." },
      ],
    },
  },

  // ── T12.2 ──
  'T12.2': {
    fr: {
      group: 'Services de Navigation Aérienne Sans Couture',
      title: "Tous les États soutiennent le Plan Directeur pour un Espace Aérien Sans Couture",
      statement: "Dans quelle mesure l'État a-t-il soutenu l'élaboration et la mise en œuvre du Plan Directeur pour un Espace Aérien Sans Couture, conformément à l'Objectif Révisé de Sécurité d'Abuja 12.2 (échéance : décembre 2026) ?",
      options: [
        { label: 'Aucune action',             text: "Aucune mesure pour s'engager, soutenir ou aligner les cadres nationaux avec le Plan Directeur." },
        { label: 'Engagement initial',        text: "Discussions préliminaires ou activités de sensibilisation menées." },
        { label: 'Développement partiel',     text: "Plan d'action national rédigé ou mesures techniques/opérationnelles initiales en cours." },
        { label: 'Mise en œuvre avancée',     text: "Progrès significatifs ; cadres nationaux largement alignés." },
        { label: 'Mise en œuvre complète',    text: "Plan Directeur pour un Espace Aérien Sans Couture pleinement intégré dans les systèmes nationaux." },
      ],
    },
    pt: {
      group: 'Serviços de Navegação Aérea Harmonizados',
      title: 'Todos os Estados apoiam o Plano Diretor para um Espaço Aéreo Harmonizado',
      statement: 'Em que medida o Estado apoiou o desenvolvimento e a implementação do Plano Diretor para um Espaço Aéreo Harmonizado, em conformidade com a Meta Revista de Segurança de Abuja 12.2 (prazo: dezembro de 2026)?',
      options: [
        { label: 'Nenhuma ação',             text: "Nenhuma medida para envolver, apoiar ou alinhar quadros nacionais com o Plano Diretor." },
        { label: 'Envolvimento inicial',     text: "Discussões preliminares ou atividades de sensibilização realizadas." },
        { label: 'Desenvolvimento parcial',  text: "Plano de ação nacional redigido ou medidas técnicas/operacionais iniciais em curso." },
        { label: 'Implementação avançada',   text: "Progresso significativo; quadros nacionais amplamente alinhados." },
        { label: 'Implementação completa',   text: "Plano Diretor para um Espaço Aéreo Harmonizado totalmente integrado nos sistemas nacionais." },
      ],
    },
  },

  // ── T12.3 ──
  'T12.3': {
    fr: {
      group: 'Services de Navigation Aérienne Sans Couture',
      title: "Tous les États assurent la fourniture de services de navigation aérienne harmonisés",
      statement: "Dans quelle mesure l'État a-t-il mis en œuvre des mesures pour assurer la fourniture de Services de Navigation Aérienne (SNA) harmonisés conformément aux normes OACI et accords régionaux, avec l'objectif de pleine conformité d'ici décembre 2028 ?",
      options: [
        { label: 'Aucune action',             text: "Aucun plan, cadre ou engagement national vers la fourniture harmonisée de SNA." },
        { label: 'Premières étapes',          text: "Politiques en projet ou consultations préliminaires, mais pas encore de mise en œuvre opérationnelle." },
        { label: 'Progrès modéré',            text: "Cadre national SNA établi, certaines mesures d'harmonisation mises en œuvre." },
        { label: 'Mise en œuvre avancée',     text: "La plupart des mesures d'harmonisation en place, systèmes largement interopérables." },
        { label: 'Conformité totale',         text: "SNA harmonisés pleinement opérationnels, interopérables au-delà des frontières régionales." },
      ],
    },
    pt: {
      group: 'Serviços de Navegação Aérea Harmonizados',
      title: 'Todos os Estados asseguram a prestação de serviços de navegação aérea harmonizados',
      statement: 'Em que medida o Estado implementou medidas para assegurar a prestação de Serviços de Navegação Aérea (SNA) harmonizados em conformidade com os padrões ICAO e acordos regionais, com o objetivo de plena conformidade até dezembro de 2028?',
      options: [
        { label: 'Nenhuma ação',             text: "Nenhum plano, quadro ou compromisso nacional em direção à prestação harmonizada de SNA." },
        { label: 'Primeiras etapas',         text: "Políticas em projeto ou consultas preliminares, mas ainda sem implementação operacional." },
        { label: 'Progresso moderado',       text: "Quadro nacional SNA estabelecido, algumas medidas de harmonização implementadas." },
        { label: 'Implementação avançada',   text: "A maioria das medidas de harmonização em vigor, sistemas amplamente interoperáveis." },
        { label: 'Conformidade total',       text: "SNA harmonizados totalmente operacionais, interoperáveis além das fronteiras regionais." },
      ],
    },
  },

  // ── T12.4 ──
  'T12.4': {
    fr: {
      group: 'Services de Navigation Aérienne Sans Couture',
      title: "Toutes les initiatives des CER et PSNA harmonisées d'ici le 31 décembre 2028",
      statement: "Dans quelle mesure l'État a-t-il veillé à ce que toutes les initiatives formulées par les Communautés Économiques Régionales (CER) et les Prestataires de Services de Navigation Aérienne (PSNA) de la région AFI soient harmonisées conformément à l'échéance du 31 décembre 2028 ?",
      options: [
        { label: 'Aucune action',              text: "Aucune action pour harmoniser les initiatives des CER et PSNA." },
        { label: 'Premières étapes',           text: "Premières étapes engagées, mais harmonisation non encore opérationnalisée." },
        { label: 'Harmonisation partielle',    text: "Certaines initiatives des CER et PSNA alignées, mais des lacunes subsistent." },
        { label: 'Majorité harmonisée',        text: "La plupart des initiatives sont harmonisées, avec quelques points résiduels mineurs." },
        { label: 'Harmonisation complète',     text: "Harmonisation complète réalisée ; toutes les initiatives des CER et PSNA de la région AFI sont alignées." },
      ],
    },
    pt: {
      group: 'Serviços de Navegação Aérea Harmonizados',
      title: 'Todas as iniciativas das CER e PSNA harmonizadas até 31 de dezembro de 2028',
      statement: 'Em que medida o Estado assegurou que todas as iniciativas formuladas pelas Comunidades Económicas Regionais (CER) e Prestadores de Serviços de Navegação Aérea (PSNA) na região AFI estão harmonizadas em conformidade com o prazo de 31 de dezembro de 2028?',
      options: [
        { label: 'Nenhuma ação',            text: "Nenhuma ação para harmonizar as iniciativas das CER e PSNA." },
        { label: 'Primeiras etapas',        text: "Primeiras etapas tomadas, mas harmonização ainda não operacionalizada." },
        { label: 'Harmonização parcial',    text: "Algumas iniciativas das CER e PSNA alinhadas, mas lacunas subsistem." },
        { label: 'Maioria harmonizada',     text: "A maioria das iniciativas está harmonizada, com apenas questões residuais menores." },
        { label: 'Harmonização completa',   text: "Harmonização completa alcançada; todas as iniciativas das CER e PSNA na região AFI estão alinhadas." },
      ],
    },
  },

  // ── T13.1 ──
  'T13.1': {
    fr: {
      group: 'Mise en Œuvre des ASBU',
      title: "Tous les États élaborent leur Plan ASBU National d'ici le 31 décembre 2026",
      statement: "Votre État a-t-il élaboré et formellement adopté un Plan National de Mise à Niveau des Systèmes d'Aviation (ASBU) conformément aux normes OACI, et quel est l'état actuel de sa mise en œuvre vers l'objectif de réalisation en 2036 ?",
      options: [
        { label: "Aucun Plan ASBU initié",              text: "Aucun Plan ASBU National n'a été initié ou documenté." },
        { label: 'Projet existant — Non adopté',        text: "Projet de Plan ASBU National existant mais non formellement adopté." },
        { label: 'Formellement adopté',                 text: "Plan ASBU National formellement adopté, avec premières étapes de mise en œuvre." },
        { label: 'En cours de mise en œuvre active',    text: "Plan ASBU National en cours de mise en œuvre active." },
        { label: 'Substantiellement complété',          text: "Plan ASBU National entièrement élaboré, adopté et mise en œuvre substantiellement complétée." },
      ],
    },
    pt: {
      group: 'Implementação dos ASBU',
      title: 'Todos os Estados desenvolvem o seu Plano ASBU Nacional até 31 de dezembro de 2026',
      statement: 'O seu Estado desenvolveu e adotou formalmente um Plano Nacional de Atualização dos Sistemas de Aviação (ASBU) em conformidade com os padrões ICAO, e qual é o estado atual da sua implementação em direção à meta de conclusão em 2036?',
      options: [
        { label: 'Nenhum Plano ASBU iniciado',         text: "Nenhum Plano ASBU Nacional foi iniciado ou documentado." },
        { label: 'Projeto existente — Não adotado',    text: "Projeto de Plano ASBU Nacional existente mas não formalmente adotado." },
        { label: 'Formalmente adotado',                text: "Plano ASBU Nacional formalmente adotado, com primeiras etapas de implementação." },
        { label: 'Em implementação ativa',             text: "Plano ASBU Nacional em implementação ativa." },
        { label: 'Substancialmente concluído',         text: "Plano ASBU Nacional totalmente desenvolvido, adotado e implementação substancialmente concluída." },
      ],
    },
  },

  // ── T13.2 ──
  'T13.2': {
    fr: {
      group: 'Mise en Œuvre des ASBU',
      title: "Tous les États mettent en œuvre les éléments ASBU Bloc 0 (B0) d'ici le 31 décembre 2025",
      statement: "Dans quelle mesure votre État a-t-il mis en œuvre les éléments ASBU Bloc 0 (B0) nationaux en alignement avec le Plan de Navigation Aérienne (PNA) régional, avec l'objectif de mise en œuvre complète d'ici le 31 décembre 2025 ?",
      options: [
        { label: 'Aucun élément B0 initié',    text: "Aucun élément ASBU B0 initié ou aligné avec le PNA régional." },
        { label: 'Premières étapes',           text: "Documents de planification ou adoption partielle des éléments ASBU B0." },
        { label: 'Progrès modéré',             text: "Plusieurs éléments ASBU B0 mis en œuvre, avec alignement partiel sur le PNA régional." },
        { label: 'Progrès significatif',       text: "La plupart des éléments ASBU B0 mis en œuvre et largement alignés sur le PNA régional." },
        { label: 'Mise en œuvre complète',     text: "Tous les éléments ASBU B0 sont opérationnels et pleinement alignés sur le PNA régional." },
      ],
    },
    pt: {
      group: 'Implementação dos ASBU',
      title: 'Todos os Estados implementam os elementos ASBU Bloco 0 (B0) até 31 de dezembro de 2025',
      statement: 'Em que medida o seu Estado implementou os elementos ASBU Bloco 0 (B0) nacionais em alinhamento com o Plano de Navegação Aérea (PNA) regional, com o objetivo de implementação completa até 31 de dezembro de 2025?',
      options: [
        { label: 'Nenhum elemento B0 iniciado', text: "Nenhum elemento ASBU B0 iniciado ou alinhado com o PNA regional." },
        { label: 'Primeiras etapas',            text: "Documentos de planeamento ou adoção parcial dos elementos ASBU B0." },
        { label: 'Progresso moderado',          text: "Vários elementos ASBU B0 implementados, com alinhamento parcial ao PNA regional." },
        { label: 'Progresso significativo',     text: "A maioria dos elementos ASBU B0 implementados e amplamente alinhados com o PNA regional." },
        { label: 'Implementação completa',      text: "Todos os elementos ASBU B0 operacionais e totalmente alinhados com o PNA regional." },
      ],
    },
  },

  // ── T13.3 ──
  'T13.3': {
    fr: {
      group: 'Mise en Œuvre des ASBU',
      title: "Tous les États mettent en œuvre les éléments ASBU Bloc 1 (B1) d'ici le 31 décembre 2028",
      statement: "Dans quelle mesure votre État a-t-il mis en œuvre les éléments ASBU Bloc 1 (B1) du Système d'Aviation en alignement avec le Plan de Navigation Aérienne (PNA) régional, avec l'objectif de mise en œuvre complète d'ici le 31 décembre 2028 ?",
      options: [
        { label: 'Aucune mise en œuvre B1',    text: "Éléments ASBU B1 non traités dans les plans nationaux." },
        { label: 'Premières étapes',           text: "Certains éléments identifiés dans la planification nationale mais mise en œuvre pratique limitée." },
        { label: 'Mise en œuvre partielle',    text: "Plusieurs éléments ASBU B1 opérationnels, mais des lacunes subsistent." },
        { label: 'Mise en œuvre avancée',      text: "La plupart des éléments ASBU B1 opérationnels et largement alignés sur le PNA régional." },
        { label: 'Mise en œuvre complète',     text: "Tous les éléments ASBU B1 opérationnels et pleinement alignés sur le PNA régional." },
      ],
    },
    pt: {
      group: 'Implementação dos ASBU',
      title: 'Todos os Estados implementam os elementos ASBU Bloco 1 (B1) até 31 de dezembro de 2028',
      statement: 'Em que medida o seu Estado implementou os elementos ASBU Bloco 1 (B1) do Sistema de Aviação em alinhamento com o Plano de Navegação Aérea (PNA) regional, com o objetivo de implementação completa até 31 de dezembro de 2028?',
      options: [
        { label: 'Nenhuma implementação B1', text: "Elementos ASBU B1 não abordados nos planos nacionais." },
        { label: 'Primeiras etapas',         text: "Alguns elementos identificados no planeamento nacional mas implementação prática limitada." },
        { label: 'Implementação parcial',    text: "Vários elementos ASBU B1 operacionais, mas lacunas subsistem." },
        { label: 'Implementação avançada',   text: "A maioria dos elementos ASBU B1 operacionais e amplamente alinhados com o PNA regional." },
        { label: 'Implementação completa',   text: "Todos os elementos ASBU B1 operacionais e totalmente alinhados com o PNA regional." },
      ],
    },
  },

  // ── T13.4 ──
  'T13.4': {
    fr: {
      group: 'Mise en Œuvre des ASBU',
      title: "Tous les États mettent en œuvre les éléments ASBU Bloc 2 (B2) d'ici le 31 décembre 2030",
      statement: "Dans quelle mesure l'État a-t-il mis en œuvre les éléments ASBU Bloc 2 (B2) en alignement avec le Plan de Navigation Aérienne (PNA) régional, avec l'objectif de mise en œuvre complète d'ici le 31 décembre 2030 ?",
      options: [
        { label: 'Aucun élément B2 initié',    text: "Aucun élément ASBU B2 initié ou planifié." },
        { label: 'Planification initiale',     text: "Planification initiale et mise en œuvre limitée des éléments ASBU B2 débutées." },
        { label: 'Mise en œuvre partielle',    text: "Plusieurs éléments ASBU B2 opérationnels, bien que des lacunes subsistent." },
        { label: 'Majorité mise en œuvre',     text: "Majorité des éléments ASBU B2 mis en œuvre et largement alignés." },
        { label: 'Mise en œuvre complète',     text: "Mise en œuvre complète de tous les éléments ASBU B2 réalisée." },
      ],
    },
    pt: {
      group: 'Implementação dos ASBU',
      title: 'Todos os Estados implementam os elementos ASBU Bloco 2 (B2) até 31 de dezembro de 2030',
      statement: 'Em que medida o Estado implementou os elementos ASBU Bloco 2 (B2) em alinhamento com o Plano de Navegação Aérea (PNA) regional, com o objetivo de implementação completa até 31 de dezembro de 2030?',
      options: [
        { label: 'Nenhum elemento B2 iniciado', text: "Nenhum elemento ASBU B2 iniciado ou planeado." },
        { label: 'Planeamento inicial',         text: "Planeamento inicial e implementação limitada dos elementos ASBU B2 iniciados." },
        { label: 'Implementação parcial',       text: "Vários elementos ASBU B2 operacionais, embora lacunas subsistam." },
        { label: 'Maioria implementada',        text: "Maioria dos elementos ASBU B2 implementados e amplamente alinhados." },
        { label: 'Implementação completa',      text: "Implementação completa de todos os elementos ASBU B2 realizada." },
      ],
    },
  },

  // ── T13.5 ──
  'T13.5': {
    fr: {
      group: 'Mise en Œuvre des ASBU',
      title: "Tous les États mettent en œuvre les modules ASBU Bloc 3 (B3) d'ici le 31 décembre 2036",
      statement: "Dans quelle mesure l'État a-t-il mis en œuvre les modules ASBU Bloc 3 (B3) de l'OACI en alignement avec le Plan de Navigation Aérienne (PNA) régional, avec l'objectif de mise en œuvre complète d'ici le 31 décembre 2036 ?",
      options: [
        { label: 'Aucune action',             text: "Aucune planification, politique ou première étape vers la mise en œuvre ASBU B3." },
        { label: 'Planification initiale',    text: "Feuille de route nationale rédigée ou alignement partiel avec le PNA régional identifié." },
        { label: 'Progrès modéré',            text: "Certains modules ASBU B3 mis en œuvre, avec intégration partielle dans les systèmes nationaux." },
        { label: 'Mise en œuvre avancée',     text: "Majorité des modules ASBU B3 opérationnels, alignés sur le PNA régional." },
        { label: 'Mise en œuvre complète',    text: "Tous les modules ASBU B3 opérationnels, pleinement alignés sur le PNA régional." },
      ],
    },
    pt: {
      group: 'Implementação dos ASBU',
      title: 'Todos os Estados implementam os módulos ASBU Bloco 3 (B3) até 31 de dezembro de 2036',
      statement: 'Em que medida o Estado implementou os módulos ASBU Bloco 3 (B3) da ICAO em alinhamento com o Plano de Navegação Aérea (PNA) regional, com o objetivo de implementação completa até 31 de dezembro de 2036?',
      options: [
        { label: 'Nenhuma ação',            text: "Nenhum planeamento, política ou primeira etapa em direção à implementação ASBU B3." },
        { label: 'Planeamento inicial',     text: "Roteiro nacional redigido ou alinhamento parcial com o PNA regional identificado." },
        { label: 'Progresso moderado',      text: "Alguns módulos ASBU B3 implementados, com integração parcial nos sistemas nacionais." },
        { label: 'Implementação avançada',  text: "Maioria dos módulos ASBU B3 operacionais, alinhados com o PNA regional." },
        { label: 'Implementação completa',  text: "Todos os módulos ASBU B3 operacionais, totalmente alinhados com o PNA regional." },
      ],
    },
  },

  // ── T14.1 ──
  'T14.1': {
    fr: {
      group: 'Réduction des Émissions de CO₂',
      title: "Les États africains élaborent et révisent les Plans d'Action CO₂ tous les 3 ans",
      statement: "L'État a-t-il élaboré, mis à jour ou révisé son Plan d'Action national pour la Réduction des Émissions de CO₂ au cours des trois dernières années, conformément aux orientations de l'OACI ?",
      options: [
        { label: "Aucun Plan d'Action",                    text: "Aucun Plan d'Action national n'a été élaboré, mis à jour ou révisé au cours des trois dernières années." },
        { label: 'Premières étapes',                       text: "Projet préparé, consultations initiées, mais Plan d'Action non encore finalisé." },
        { label: 'Élaboré mais non entièrement aligné',   text: "Plan d'Action élaboré ou mis à jour, mais pas entièrement aligné sur les orientations OACI." },
        { label: 'Élaboré, mis à jour et soumis',         text: "Plan d'Action élaboré, mis à jour et soumis." },
        { label: 'Pleinement conforme',                    text: "Plan d'Action entièrement élaboré, mis à jour/révisé au cours des trois dernières années, soumis à l'OACI." },
      ],
    },
    pt: {
      group: 'Redução das Emissões de CO₂',
      title: 'Estados africanos desenvolvem e reveem Planos de Ação CO₂ a cada 3 anos',
      statement: 'O Estado desenvolveu, atualizou ou reviu o seu Plano de Ação nacional para a Redução de Emissões de CO₂ nos últimos três anos, em conformidade com as orientações da ICAO?',
      options: [
        { label: 'Nenhum Plano de Ação',                    text: "Nenhum Plano de Ação nacional foi desenvolvido, atualizado ou revisto nos últimos três anos." },
        { label: 'Primeiras etapas',                        text: "Projeto preparado, consultas iniciadas, mas Plano de Ação ainda não finalizado." },
        { label: 'Desenvolvido mas não totalmente alinhado', text: "Plano de Ação desenvolvido ou atualizado, mas não totalmente alinhado com as orientações ICAO." },
        { label: 'Desenvolvido, atualizado e submetido',    text: "Plano de Ação desenvolvido, atualizado e submetido." },
        { label: 'Totalmente conforme',                     text: "Plano de Ação totalmente desenvolvido, atualizado/revisto nos últimos três anos, submetido à ICAO." },
      ],
    },
  },

  // ── T14.2 ──
  'T14.2': {
    fr: {
      group: 'Réduction des Émissions de CO₂',
      title: "Les États africains quantifient le potentiel de réduction CO₂ et mettent en œuvre des mesures tous les 3 ans",
      statement: "Le Plan d'Action national quantifie-t-il le potentiel de réduction de CO₂ et développe-t-il une feuille de route pour la mise en œuvre de mesures de réduction, avec des révisions tous les trois ans ?",
      options: [
        { label: 'Aucune quantification / Aucune feuille de route',    text: "Aucune quantification du potentiel de réduction de CO₂ ; aucune feuille de route ni mécanisme de révision." },
        { label: 'Quantifié une fois — Aucune feuille de route',       text: "Potentiel de réduction de CO₂ quantifié une fois, mais sans feuille de route ni cycle de révision établis." },
        { label: 'Quantifié — Feuille de route en projet',             text: "Potentiel de réduction de CO₂ quantifié au moins une fois ; une feuille de route en projet existe." },
        { label: 'Quantifié tous les 3 ans — Feuille de route partielle', text: "Potentiel de réduction CO₂ quantifié tous les 3 ans ; feuille de route élaborée et partiellement mise en œuvre." },
        { label: 'Conformité totale',                                   text: "Potentiel de réduction CO₂ quantifié tous les 3 ans ; feuille de route entièrement élaborée et mise en œuvre." },
      ],
    },
    pt: {
      group: 'Redução das Emissões de CO₂',
      title: 'Estados africanos quantificam o potencial de redução de CO₂ e implementam medidas a cada 3 anos',
      statement: 'O Plano de Ação do Estado quantifica o potencial de redução de CO₂ e desenvolve um roteiro para a implementação de medidas de redução, com revisões a cada três anos?',
      options: [
        { label: 'Sem quantificação / Sem roteiro',              text: "Nenhuma quantificação do potencial de redução de CO₂; nenhum roteiro ou mecanismo de revisão." },
        { label: 'Quantificado uma vez — Sem roteiro',           text: "Potencial de redução de CO₂ quantificado uma vez, mas sem roteiro ou ciclo de revisão estabelecidos." },
        { label: 'Quantificado — Roteiro em projeto',            text: "Potencial de redução de CO₂ quantificado pelo menos uma vez; um roteiro em projeto existe." },
        { label: 'Quantificado a cada 3 anos — Roteiro parcial', text: "Potencial de redução CO₂ quantificado a cada 3 anos; roteiro desenvolvido e parcialmente implementado." },
        { label: 'Conformidade total',                           text: "Potencial de redução CO₂ quantificado a cada 3 anos; roteiro totalmente desenvolvido e implementado." },
      ],
    },
  },

  // ── T15.1 ──
  'T15.1': {
    fr: {
      group: 'Examen par les Pairs des PSNA et Maturité SGS',
      title: "Tous les PSNA rejoignent le Programme africain d'Examen par les Pairs des PSNA d'ici le 31 décembre 2026",
      statement: "L'État a-t-il veillé à ce que tous les Prestataires de Services de Navigation Aérienne (PSNA) aient formellement rejoint et participent activement au Programme Africain d'Examen par les Pairs des PSNA, conformément à l'exigence d'obtention de la certification d'ici le 31 décembre 2026 ?",
      options: [
        { label: 'Aucun PSNA inscrit',              text: "Aucun PSNA n'a rejoint le Programme d'Examen par les Pairs." },
        { label: 'Engagement initial',              text: "Les PSNA ont exprimé leur intention ou soumis une documentation préliminaire, mais l'inscription formelle est incomplète." },
        { label: 'Mise en œuvre partielle',         text: "Au moins la moitié des PSNA ont formellement rejoint le Programme d'Examen par les Pairs." },
        { label: 'Mise en œuvre avancée',           text: "Majorité des PSNA inscrits et participant activement aux activités d'examen par les pairs." },
        { label: 'Mise en œuvre complète',          text: "Tous les PSNA ont rejoint et participent activement au Programme d'Examen par les Pairs." },
      ],
    },
    pt: {
      group: 'Revisão entre Pares dos PSNA e Maturidade do SGS',
      title: 'Todos os PSNA aderem ao Programa Africano de Revisão entre Pares dos PSNA até 31 de dezembro de 2026',
      statement: 'O Estado assegurou que todos os Prestadores de Serviços de Navegação Aérea (PSNA) aderiram formalmente e participam ativamente no Programa Africano de Revisão entre Pares dos PSNA, em conformidade com o requisito de obtenção de certificação até 31 de dezembro de 2026?',
      options: [
        { label: 'Nenhum PSNA aderiu',              text: "Nenhum PSNA aderiu ao Programa de Revisão entre Pares." },
        { label: 'Envolvimento inicial',            text: "Os PSNA expressaram intenção ou submeteram documentação preliminar, mas a adesão formal está incompleta." },
        { label: 'Implementação parcial',           text: "Pelo menos metade dos PSNA aderiu formalmente ao Programa de Revisão entre Pares." },
        { label: 'Implementação avançada',          text: "Maioria dos PSNA inscritos e a participar ativamente nas atividades de revisão entre pares." },
        { label: 'Implementação completa',          text: "Todos os PSNA aderiram e participam ativamente no Programa de Revisão entre Pares." },
      ],
    },
  },

  // ── T15.2 ──
  'T15.2': {
    fr: {
      group: 'Examen par les Pairs des PSNA et Maturité SGS',
      title: "Les PSNA participants atteignent le niveau de maturité SGS (50 % en 2026, 100 % en 2028)",
      statement: "Dans quelle mesure le Prestataire de Services de Navigation Aérienne (PSNA) a-t-il atteint la maturité du Système de Gestion de la Sécurité (SGS) conformément à l'Objectif 15.2 ?",
      options: [
        { label: 'Aucune maturité SGS',                    text: "Aucune maturité SGS atteinte ; la mise en œuvre n'a pas démarré." },
        { label: 'Premières étapes',                       text: "Documentation partielle ou processus fragmentés existent, mais SGS pas encore fonctionnel." },
        { label: 'SGS établi (Objectif 2026)',             text: "SGS établi et fonctionnel ; satisfait aux exigences minimales de maturité attendues d'ici décembre 2026." },
        { label: 'SGS bien intégré',                       text: "SGS bien intégré ; pratiques de gestion proactive de la sécurité en place." },
        { label: 'SGS pleinement mature (Objectif 2028)', text: "SGS pleinement mature ; complet, durable et en amélioration continue." },
      ],
    },
    pt: {
      group: 'Revisão entre Pares dos PSNA e Maturidade do SGS',
      title: 'PSNA participantes atingem o nível de maturidade SGS (50% em 2026, 100% em 2028)',
      statement: 'Em que medida o Prestador de Serviços de Navegação Aérea (PSNA) atingiu a maturidade do Sistema de Gestão da Segurança (SGS) em conformidade com a Meta 15.2?',
      options: [
        { label: 'Sem maturidade SGS',                    text: "Nenhuma maturidade SGS atingida; a implementação não iniciou." },
        { label: 'Primeiras etapas',                      text: "Documentação parcial ou processos fragmentados existem, mas SGS ainda não funcional." },
        { label: 'SGS estabelecido (Meta 2026)',          text: "SGS estabelecido e funcional; satisfaz os requisitos mínimos de maturidade esperados até dezembro de 2026." },
        { label: 'SGS bem integrado',                     text: "SGS bem integrado; práticas de gestão proativa de segurança em vigor." },
        { label: 'SGS totalmente maduro (Meta 2028)',     text: "SGS totalmente maduro; abrangente, sustentável e em melhoria contínua." },
      ],
    },
  },

  // ── T15.3 ──
  'T15.3': {
    fr: {
      group: 'Examen par les Pairs des PSNA et Maturité SGS',
      title: "Tous les PSNA obtiennent leur certification d'ici le 31 décembre 2036",
      statement: "Le Prestataire de Services de Navigation Aérienne (PSNA) a-t-il obtenu une certification formelle conformément aux normes OACI et aux exigences réglementaires nationales, dans le cadre de l'engagement d'atteindre une certification complète d'ici le 31 décembre 2036 ?",
      options: [
        { label: 'Aucun progrès',                          text: "Le PSNA n'a pas entamé le processus de certification." },
        { label: 'Premières étapes',                       text: "Cadre de certification ou activités préparatoires commencés." },
        { label: 'Processus en cours',                     text: "Processus de certification en cours ; conformité partielle atteinte." },
        { label: 'Progrès significatif',                   text: "Le PSNA a satisfait à la plupart des exigences de certification et est en phase finale d'approbation." },
        { label: 'Certification complète obtenue',        text: "Certification complète obtenue et formellement reconnue par l'autorité de réglementation nationale." },
      ],
    },
    pt: {
      group: 'Revisão entre Pares dos PSNA e Maturidade do SGS',
      title: 'Todos os PSNA obtêm certificação até 31 de dezembro de 2036',
      statement: 'O Prestador de Serviços de Navegação Aérea (PSNA) obteve certificação formal em conformidade com os padrões ICAO e requisitos regulatórios nacionais, como parte do compromisso de alcançar certificação completa até 31 de dezembro de 2036?',
      options: [
        { label: 'Sem progresso',                        text: "O PSNA não iniciou o processo de certificação." },
        { label: 'Primeiras etapas',                     text: "Quadro de certificação ou atividades preparatórias iniciados." },
        { label: 'Processo em curso',                    text: "Processo de certificação em curso; conformidade parcial alcançada." },
        { label: 'Progresso significativo',              text: "O PSNA satisfez a maioria dos requisitos de certificação e está na fase final de aprovação." },
        { label: 'Certificação completa obtida',        text: "Certificação completa obtida e formalmente reconhecida pela autoridade regulatória nacional." },
      ],
    },
  },
};

export function getLocalizedQuestion<T extends {
  id: string;
  group: string;
  title: string;
  statement: string;
  options: Array<{ pct: number; label: string; text: string }>;
}>(q: T, locale: string): T {
  if (locale === 'en') return q;
  const i18n = QUESTION_I18N[q.id]?.[locale as QLocale];
  if (!i18n) return q;
  return {
    ...q,
    group: i18n.group,
    title: i18n.title,
    statement: i18n.statement,
    options: q.options.map((opt, idx) => ({
      ...opt,
      label: i18n.options[idx]?.label ?? opt.label,
      text:  i18n.options[idx]?.text  ?? opt.text,
    })),
  };
}
