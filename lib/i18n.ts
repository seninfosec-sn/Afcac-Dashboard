export type Locale = "en" | "fr" | "pt";

export const LOCALES: Locale[] = ["en", "fr", "pt"];

export const translations = {
  en: {
    // Header
    dashboardTitle: "AFCAC Revised Abuja Safety Targets",
    dashboardSub: "Revised Abuja Safety Targets Monitoring and Reporting Dashboard",
    live: "Live",
    signIn: "🔐 Sign In",
    adminLogin: "Admin Login",
    admin: "⚙ Admin",
    logOut: "⏻ Log Out",
    disconnect: "Disconnect",

    // Section labels
    execSummary: "Executive Summary",
    statusOverview: "Status Overview",
    geoOverview: "Geographic & Status Overview",
    countryBreakdown: "Action Plan Country Breakdown",
    questProgress: "AFCAC Safety Targets — Questionnaire Progress",

    // Footer
    footerTitle: "Revised Abuja Safety Targets Dashboard",
    lastUpdated: "Last updated",
    footerSource: "Data source: AFCAC Safety Unit via Countries Focal Point · © AFCAC",

    // KPI labels
    totalCountries: "Total Countries",
    totalActions: "Total Actions",
    pctCompleted: "% Completed",
    pctInProgress: "% In Progress",
    avgDuration: "Avg Duration (wks)",
    expertsPlanned: "Experts Planned",
    monthsAvg: "● 3.5 months avg.",
    afcacExperts: "● AFCAC Experts",

    // Top Experts
    topExpert: "Top Expert — Updates",
    updates: "upd",
    noUpdates: "● No updates",
    hoursAgo: "h ago",
    daysAgo: "d ago",

    // Status labels
    completed: "Completed",
    inProgress: "In Progress",
    delayed: "Delayed",
    onHold: "On Hold",
    notStarted: "Not Started",

    // StatusBar
    statusDistribution: "Continental Status Distribution",
    actions: "Actions",
    detailedDist: "Detailed Distribution",
    aboutIndicator: "About this indicator",
    statusBarDesc: "This chart shows the global distribution of action statuses across all actions under the AFCAC Revised Abuja Safety Targets (RAST). Each segment corresponds to a progress category:",
    completedDesc: "— Target fully achieved (100%)",
    inProgressDesc: "— Implementation underway",
    delayedDesc: "— Behind the planned schedule",
    onHoldDesc: "— Action temporarily suspended",
    notStartedDesc: "— Action not yet initiated",
    statusSource: "Source: AFCAC Safety Unit via Countries Focal Point · Data updated by national focal points.",

    // StatusDonut
    statusDistTitle: "Status Distribution",

    // ActionTable
    actionPlanDetail: "Action Plan — Detail",
    rows: "rows",
    hideTargets: "Hide targets",
    seeTargets: "See 15 targets",
    abujaTargets: "Abuja Safety Targets",
    colCountry: "Country",
    colTargetId: "Target ID",
    colSection: "Section",
    colStatus: "Status",
    colStart: "Start",
    colEnd: "End",
    colId: "ID",
    colTarget: "Target",
    colGroup: "Group",
    colProgress: "Progress",
    colDeadline: "Deadline",

    // BreakdownTable
    actionPlanBreakdown: "Action Plan Country Breakdown",
    countries: "Countries",
    colTotalActions: "Total Actions",
    colPctCompleted: "% Completed",
    colPctInProgress: "% In Progress",
    colResponsible: "Responsible",
    colProgressVisual: "Progress Visual",

    // TargetGrid
    targetAchievement: "AFCAC / Abuja Safety Targets — Achievement Progress",
    continentalScore: "Continental Score",
    colHash: "#",
    colSub: "Sub",
    colScore: "Score",
    continentalAvg: "Continental Average — All 15 Targets",
    targets: "target",
    targetsPlural: "targets",

    // AfricaMap
    africaMap: "Africa — Action Status Map",
    targetsLabel: "Targets:",
    noData: "No data",

    // ExportButtons
    downloadExcel: "Download Excel",
    downloadPdf: "Download PDF",

    // Login
    loginTitle: "AFCAC Dashboard",
    loginSub: "Secure Access · Login",
    labelUsername: "Username",
    labelPassword: "Password",
    placeholderUsername: "your.username",
    signingIn: "Authenticating…",
    backToDashboard: "← Back to Dashboard",
    adminAccounts: "Admin accounts:",
    loginFailed: "Login failed",
    networkError: "Network error — please try again",

    // Admin panel
    adminPanelSub: "AFCAC Dashboard · Real-time Data · Revised Abuja Safety Targets",
    tabActions: "Actions",
    tabCountries: "Countries",
    tabTargets: "Targets",
    tabExperts: "Experts",
    tabUsers: "Users",
    tabSessions: "Sessions",
    dashboard: "Dashboard",

    // Language switcher
    language: "Language",
  },

  fr: {
    // Header
    dashboardTitle: "AFCAC Objectifs de Sécurité Révisés d'Abuja",
    dashboardSub: "Tableau de Bord de Suivi et de Reporting des Objectifs de Sécurité Révisés d'Abuja",
    live: "En direct",
    signIn: "🔐 Se connecter",
    adminLogin: "Connexion Admin",
    admin: "⚙ Admin",
    logOut: "⏻ Déconnexion",
    disconnect: "Déconnecter",

    // Section labels
    execSummary: "Résumé Exécutif",
    statusOverview: "Vue d'Ensemble des Statuts",
    geoOverview: "Vue Géographique & Statuts",
    countryBreakdown: "Plan d'Action par Pays",
    questProgress: "Objectifs de Sécurité AFCAC — Progression du Questionnaire",

    // Footer
    footerTitle: "Tableau de Bord des Objectifs de Sécurité Révisés d'Abuja",
    lastUpdated: "Dernière mise à jour",
    footerSource: "Source : Unité de Sécurité AFCAC via Points Focaux des Pays · © AFCAC",

    // KPI labels
    totalCountries: "Total Pays",
    totalActions: "Total Actions",
    pctCompleted: "% Terminé",
    pctInProgress: "% En cours",
    avgDuration: "Durée moy. (sem.)",
    expertsPlanned: "Experts Prévus",
    monthsAvg: "● Moy. 3.5 mois",
    afcacExperts: "● Experts AFCAC",

    // Top Experts
    topExpert: "Top Expert — Mises à Jour",
    updates: "màj",
    noUpdates: "● Aucune mise à jour",
    hoursAgo: "h",
    daysAgo: "j",

    // Status labels
    completed: "Terminé",
    inProgress: "En cours",
    delayed: "En retard",
    onHold: "En pause",
    notStarted: "Non démarré",

    // StatusBar
    statusDistribution: "Répartition Continentale des Statuts",
    actions: "Actions",
    detailedDist: "Répartition Détaillée",
    aboutIndicator: "À propos de cet indicateur",
    statusBarDesc: "Ce graphique représente la répartition globale des statuts de l'ensemble des actions engagées dans le cadre des Objectifs de Sécurité Révisés d'Abuja (RAST) de l'AFCAC. Chaque segment correspond à une catégorie de progression :",
    completedDesc: "— Cible pleinement atteinte (100%)",
    inProgressDesc: "— Mise en œuvre en cours",
    delayedDesc: "— Retard par rapport au calendrier prévu",
    onHoldDesc: "— Action suspendue temporairement",
    notStartedDesc: "— Action non encore initiée",
    statusSource: "Source : Unité de Sécurité AFCAC via Points Focaux des Pays · Données mises à jour par les points focaux nationaux.",

    // StatusDonut
    statusDistTitle: "Répartition des Statuts",

    // ActionTable
    actionPlanDetail: "Plan d'Action — Détail",
    rows: "lignes",
    hideTargets: "Masquer les targets",
    seeTargets: "Voir les 15 targets",
    abujaTargets: "Objectifs de Sécurité d'Abuja",
    colCountry: "Pays",
    colTargetId: "ID Objectif",
    colSection: "Section",
    colStatus: "Statut",
    colStart: "Début",
    colEnd: "Fin",
    colId: "ID",
    colTarget: "Objectif",
    colGroup: "Groupe",
    colProgress: "Progression",
    colDeadline: "Échéance",

    // BreakdownTable
    actionPlanBreakdown: "Plan d'Action par Pays",
    countries: "Pays",
    colTotalActions: "Total Actions",
    colPctCompleted: "% Terminé",
    colPctInProgress: "% En cours",
    colResponsible: "Responsable",
    colProgressVisual: "Visuel Progression",

    // TargetGrid
    targetAchievement: "AFCAC / Objectifs d'Abuja — Progression",
    continentalScore: "Score Continental",
    colHash: "#",
    colSub: "Sous",
    colScore: "Score",
    continentalAvg: "Moyenne Continentale — 15 Objectifs",
    targets: "objectif",
    targetsPlural: "objectifs",

    // AfricaMap
    africaMap: "Afrique — Carte des Statuts",
    targetsLabel: "Objectifs :",
    noData: "Pas de données",

    // ExportButtons
    downloadExcel: "Télécharger Excel",
    downloadPdf: "Télécharger PDF",

    // Login
    loginTitle: "AFCAC Dashboard",
    loginSub: "Accès Sécurisé · Connexion",
    labelUsername: "Identifiant",
    labelPassword: "Mot de passe",
    placeholderUsername: "votre.identifiant",
    signingIn: "Connexion en cours…",
    backToDashboard: "← Retour au tableau de bord",
    adminAccounts: "Comptes admin :",
    loginFailed: "Échec de connexion",
    networkError: "Erreur réseau — veuillez réessayer",

    // Admin panel
    adminPanelSub: "AFCAC Dashboard · Données en temps réel · Révisées Abuja Safety Targets",
    tabActions: "Actions",
    tabCountries: "Pays",
    tabTargets: "Objectifs",
    tabExperts: "Experts",
    tabUsers: "Utilisateurs",
    tabSessions: "Sessions",
    dashboard: "Tableau de bord",

    // Language switcher
    language: "Langue",
  },

  pt: {
    // Header
    dashboardTitle: "AFCAC Metas de Segurança Revistas de Abuja",
    dashboardSub: "Painel de Monitorização e Relatórios das Metas de Segurança Revistas de Abuja",
    live: "Ao vivo",
    signIn: "🔐 Entrar",
    adminLogin: "Login Admin",
    admin: "⚙ Admin",
    logOut: "⏻ Sair",
    disconnect: "Desconectar",

    // Section labels
    execSummary: "Resumo Executivo",
    statusOverview: "Visão Geral do Status",
    geoOverview: "Visão Geográfica & Status",
    countryBreakdown: "Plano de Ação por País",
    questProgress: "Metas de Segurança AFCAC — Progresso do Questionário",

    // Footer
    footerTitle: "Painel das Metas de Segurança Revistas de Abuja",
    lastUpdated: "Última atualização",
    footerSource: "Fonte: Unidade de Segurança AFCAC via Pontos Focais dos Países · © AFCAC",

    // KPI labels
    totalCountries: "Total de Países",
    totalActions: "Total de Ações",
    pctCompleted: "% Concluído",
    pctInProgress: "% Em Progresso",
    avgDuration: "Duração Méd. (sem.)",
    expertsPlanned: "Especialistas Previstos",
    monthsAvg: "● Méd. 3,5 meses",
    afcacExperts: "● Especialistas AFCAC",

    // Top Experts
    topExpert: "Top Especialista — Atualizações",
    updates: "atu",
    noUpdates: "● Nenhuma atualização",
    hoursAgo: "h atrás",
    daysAgo: "d atrás",

    // Status labels
    completed: "Concluído",
    inProgress: "Em Progresso",
    delayed: "Atrasado",
    onHold: "Em Espera",
    notStarted: "Não Iniciado",

    // StatusBar
    statusDistribution: "Distribuição Continental de Status",
    actions: "Ações",
    detailedDist: "Distribuição Detalhada",
    aboutIndicator: "Sobre este indicador",
    statusBarDesc: "Este gráfico representa a distribuição global dos status de todas as ações no âmbito das Metas de Segurança Revistas de Abuja (RAST) da AFCAC. Cada segmento corresponde a uma categoria de progresso:",
    completedDesc: "— Meta totalmente atingida (100%)",
    inProgressDesc: "— Implementação em curso",
    delayedDesc: "— Atraso em relação ao calendário previsto",
    onHoldDesc: "— Ação temporariamente suspensa",
    notStartedDesc: "— Ação ainda não iniciada",
    statusSource: "Fonte: Unidade de Segurança AFCAC via Pontos Focais dos Países · Dados atualizados pelos pontos focais nacionais.",

    // StatusDonut
    statusDistTitle: "Distribuição de Status",

    // ActionTable
    actionPlanDetail: "Plano de Ação — Detalhe",
    rows: "linhas",
    hideTargets: "Ocultar metas",
    seeTargets: "Ver 15 metas",
    abujaTargets: "Metas de Segurança de Abuja",
    colCountry: "País",
    colTargetId: "ID da Meta",
    colSection: "Seção",
    colStatus: "Status",
    colStart: "Início",
    colEnd: "Fim",
    colId: "ID",
    colTarget: "Meta",
    colGroup: "Grupo",
    colProgress: "Progresso",
    colDeadline: "Prazo",

    // BreakdownTable
    actionPlanBreakdown: "Plano de Ação por País",
    countries: "Países",
    colTotalActions: "Total de Ações",
    colPctCompleted: "% Concluído",
    colPctInProgress: "% Em Progresso",
    colResponsible: "Responsável",
    colProgressVisual: "Visual do Progresso",

    // TargetGrid
    targetAchievement: "AFCAC / Metas de Abuja — Progresso",
    continentalScore: "Pontuação Continental",
    colHash: "#",
    colSub: "Sub",
    colScore: "Pontuação",
    continentalAvg: "Média Continental — 15 Metas",
    targets: "meta",
    targetsPlural: "metas",

    // AfricaMap
    africaMap: "África — Mapa de Status",
    targetsLabel: "Metas:",
    noData: "Sem dados",

    // ExportButtons
    downloadExcel: "Baixar Excel",
    downloadPdf: "Baixar PDF",

    // Login
    loginTitle: "AFCAC Dashboard",
    loginSub: "Acesso Seguro · Login",
    labelUsername: "Utilizador",
    labelPassword: "Palavra-passe",
    placeholderUsername: "seu.utilizador",
    signingIn: "A autenticar…",
    backToDashboard: "← Voltar ao painel",
    adminAccounts: "Contas admin:",
    loginFailed: "Falha no login",
    networkError: "Erro de rede — tente novamente",

    // Admin panel
    adminPanelSub: "AFCAC Dashboard · Dados em tempo real · Metas de Segurança Revistas de Abuja",
    tabActions: "Ações",
    tabCountries: "Países",
    tabTargets: "Metas",
    tabExperts: "Especialistas",
    tabUsers: "Utilizadores",
    tabSessions: "Sessões",
    dashboard: "Painel",

    // Language switcher
    language: "Idioma",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] ?? translations["en"][key] ?? key;
}

export function getStatusLabel(locale: Locale, status: string): string {
  const map: Record<string, TranslationKey> = {
    Completed: "completed",
    "In Progress": "inProgress",
    Delayed: "delayed",
    "On Hold": "onHold",
    "Not Started": "notStarted",
  };
  const key = map[status];
  return key ? t(locale, key) : status;
}
