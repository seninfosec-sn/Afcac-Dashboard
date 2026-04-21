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

    // Questionnaire form
    qFormTitle: "AFCAC — Revised Abuja Safety Targets",
    qFormSub: "AFCAC · State Safety Questionnaire",
    qCompletion: "Completion",
    qSummary: "📋 Summary",
    qSubmit: "✔ Submit",
    qStateLabel: "State / Country",
    qSelectState: "— Select State —",
    qAnswered: "Answered",
    qRemaining: "Remaining",
    qAddComment: "💬 Add comment / observation",
    qCommentPlaceholder: "Optional: describe challenges, context, or supporting evidence...",
    qClearAll: "↺ Clear All",
    qReviewSummary: "📋 Review Summary",
    qSubmitDashboard: "✔ Submit to Dashboard",
    qSelectLevel: "— Select level of implementation —",
    qClearedMsg: "All answers cleared",
    qSelectStateFirst: "Please select a State first",
    qUnansweredMsg: "question(s) not yet answered. Submit anyway?",
    qClearConfirm: "Clear all answers for this form?",
    qSubmittedMsg: "Questionnaire submitted — JSON exported ✓",
    qExportJSON: "⬇ Export JSON",
    qExportCSV: "⬇ Export CSV",
    qClose: "✕ Close",
    qAvgScore: "Avg. Score",
    qSummaryTitle: "📋 Summary",
    qIntroText: "This questionnaire covers {total} targets across safety oversight, State Safety Programmes, infrastructure, air navigation, and environmental objectives. For each question, select the option that best describes your State's current level of implementation. Each option is scored from 0% (Not Started) to 100% (Fully Achieved).",
    qColHash: "#",
    qColTarget: "Target",
    qColScore: "Score",
    qColStatus: "Status",
    qColComments: "Comments",
    qQuestions: "question",
    qQuestionsPlural: "questions",
    qFormLabel: "Form",

    // Admin score options (targets dropdown)
    scoreOpt0:   "a)   0% — Not Started / Not Applicable",
    scoreOpt25:  "b)  25% — Partially Initiated",
    scoreOpt50:  "c)  50% — In Progress / Partially Achieved",
    scoreOpt75:  "d)  75% — Advanced / On Track",
    scoreOpt100: "e) 100% — Fully Achieved",
    scoreDesc0:   "Not Started",
    scoreDesc25:  "Initiated but not finalized",
    scoreDesc50:  "Partially implemented, gaps remain",
    scoreDesc75:  "Advanced implementation, some issues pending",
    scoreDesc100: "Fully implemented and operational",
    adminDeadline: "🗓 Deadline:",
    adminTargetsSingular: "target",
    adminTargetsPlural:   "targets",
    adminTabKpisTitle:      "📊 KPI Overview — Global Indicators",
    adminTabTargetsTitle:   "🎯 AFCAC — Revised Abuja Safety Targets · Progress Update",
    adminTabActionsTitle:   "📋 Action Plan — Status by Country",
    adminTabCountriesTitle: "🌍 Country Data — Actions Breakdown",
    adminTabUsersTitle:     "🔑 State Access — Focal Points Credentials",
    adminTabSessionsTitle:  "🟢 Connected Users — Real-time Monitoring",
    adminIntroKpis:       "Edit the global key performance indicators shown on the main dashboard in the Executive Summary section.",
    adminIntroTargets:    "This form covers {n} AFCAC safety targets across {g} groups. For each target, select the progress percentage from 0% (Not Started) to 100% (Fully Achieved). Responses will update the target grid on the dashboard.",
    adminIntroActions:    "Update the status of each action by country. This data feeds the detail table and the Africa map on the main dashboard.",
    adminIntroCountries:  "Edit aggregated country data: budget, total actions, and status breakdown. These values feed the country breakdown table.",
    adminIntroUsers:      "List of {n} focal points — one per AFCAC member state. These credentials allow each national representative to access the update form.",
    adminIntroSessions:   "View connected users in real-time: login time, location (country/city) and IP address. Auto-refresh every 30 seconds.",
    adminActionsDetailTitle: "📌 Action Plan — Detail by Country",
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

    // Questionnaire form
    qFormTitle: "AFCAC — Objectifs Révisés de Sécurité d'Abuja",
    qFormSub: "AFCAC · Questionnaire de Sécurité des États",
    qCompletion: "Complétion",
    qSummary: "📋 Résumé",
    qSubmit: "✔ Soumettre",
    qStateLabel: "État / Pays",
    qSelectState: "— Sélectionner un État —",
    qAnswered: "Répondues",
    qRemaining: "Restantes",
    qAddComment: "💬 Ajouter un commentaire / observation",
    qCommentPlaceholder: "Optionnel : décrivez les défis, le contexte ou les preuves à l'appui...",
    qClearAll: "↺ Tout effacer",
    qReviewSummary: "📋 Voir le résumé",
    qSubmitDashboard: "✔ Soumettre au tableau de bord",
    qSelectLevel: "— Sélectionner le niveau de mise en œuvre —",
    qClearedMsg: "Toutes les réponses ont été effacées",
    qSelectStateFirst: "Veuillez d'abord sélectionner un État",
    qUnansweredMsg: "question(s) sans réponse. Soumettre quand même ?",
    qClearConfirm: "Effacer toutes les réponses de ce formulaire ?",
    qSubmittedMsg: "Questionnaire soumis — JSON exporté ✓",
    qExportJSON: "⬇ Exporter JSON",
    qExportCSV: "⬇ Exporter CSV",
    qClose: "✕ Fermer",
    qAvgScore: "Score moy.",
    qSummaryTitle: "📋 Résumé",
    qIntroText: "Ce questionnaire couvre {total} objectifs relatifs à la supervision de la sécurité, aux programmes nationaux de sécurité, aux infrastructures, à la navigation aérienne et aux objectifs environnementaux. Pour chaque question, sélectionnez l'option qui décrit le mieux le niveau actuel de mise en œuvre de votre État. Chaque option est notée de 0 % (Non commencé) à 100 % (Pleinement atteint).",
    qColHash: "#",
    qColTarget: "Objectif",
    qColScore: "Score",
    qColStatus: "Statut",
    qColComments: "Commentaires",
    qQuestions: "question",
    qQuestionsPlural: "questions",
    qFormLabel: "Formulaire",

    // Admin score options (targets dropdown)
    scoreOpt0:   "a)   0% — Non démarré / Non applicable",
    scoreOpt25:  "b)  25% — Partiellement initié",
    scoreOpt50:  "c)  50% — En cours / Partiellement atteint",
    scoreOpt75:  "d)  75% — Avancé / En bonne voie",
    scoreOpt100: "e) 100% — Pleinement atteint",
    scoreDesc0:   "Non démarré",
    scoreDesc25:  "Initié mais non finalisé",
    scoreDesc50:  "Partiellement implémenté, des lacunes subsistent",
    scoreDesc75:  "Implémentation avancée, quelques points en suspens",
    scoreDesc100: "Pleinement implémenté et opérationnel",
    adminDeadline: "🗓 Échéance :",
    adminTargetsSingular: "cible",
    adminTargetsPlural:   "cibles",
    adminTabKpisTitle:      "📊 KPI — Indicateurs Globaux",
    adminTabTargetsTitle:   "🎯 AFCAC — Objectifs Révisés de Sécurité · Mise à Jour des Progrès",
    adminTabActionsTitle:   "📋 Plan d'Actions — Statut par Pays",
    adminTabCountriesTitle: "🌍 Données Pays — Répartition des Actions",
    adminTabUsersTitle:     "🔑 Accès États — Identifiants des Points Focaux",
    adminTabSessionsTitle:  "🟢 Utilisateurs Connectés — Surveillance en Temps Réel",
    adminIntroKpis:       "Modifiez les indicateurs clés de performance globaux du dashboard affichés dans la section Executive Summary.",
    adminIntroTargets:    "Ce formulaire couvre {n} cibles AFCAC de sécurité réparties en {g} groupes. Pour chaque cible, sélectionnez le pourcentage de progression de 0% (Non démarré) à 100% (Pleinement atteint). Les réponses mettront à jour la grille des cibles sur le dashboard.",
    adminIntroActions:    "Mettez à jour le statut de chaque action par pays. Ces données alimentent le tableau de détail et la carte Afrique sur le dashboard principal.",
    adminIntroCountries:  "Modifiez les données agrégées par pays : budget, actions totales, et répartition des statuts. Ces valeurs alimentent le tableau de ventilation pays.",
    adminIntroUsers:      "Liste des {n} points focaux — un par état membre AFCAC. Ces identifiants permettent à chaque représentant national d'accéder au formulaire de mise à jour.",
    adminIntroSessions:   "Visualisez en temps réel les utilisateurs connectés : heure de connexion, localisation (pays/ville) et adresse IP. Rafraîchissement automatique toutes les 30 secondes.",
    adminActionsDetailTitle: "📌 Plan d'Actions — Détail par Pays",
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

    // Questionnaire form
    qFormTitle: "AFCAC — Metas Revistas de Segurança de Abuja",
    qFormSub: "AFCAC · Questionário de Segurança dos Estados",
    qCompletion: "Conclusão",
    qSummary: "📋 Resumo",
    qSubmit: "✔ Submeter",
    qStateLabel: "Estado / País",
    qSelectState: "— Selecionar Estado —",
    qAnswered: "Respondidas",
    qRemaining: "Restantes",
    qAddComment: "💬 Adicionar comentário / observação",
    qCommentPlaceholder: "Opcional: descreva desafios, contexto ou evidências de apoio...",
    qClearAll: "↺ Limpar Tudo",
    qReviewSummary: "📋 Rever Resumo",
    qSubmitDashboard: "✔ Submeter ao Painel",
    qSelectLevel: "— Selecionar nível de implementação —",
    qClearedMsg: "Todas as respostas foram eliminadas",
    qSelectStateFirst: "Por favor, selecione primeiro um Estado",
    qUnansweredMsg: "pergunta(s) ainda não respondidas. Submeter mesmo assim?",
    qClearConfirm: "Limpar todas as respostas deste formulário?",
    qSubmittedMsg: "Questionário submetido — JSON exportado ✓",
    qExportJSON: "⬇ Exportar JSON",
    qExportCSV: "⬇ Exportar CSV",
    qClose: "✕ Fechar",
    qAvgScore: "Pont. Méd.",
    qSummaryTitle: "📋 Resumo",
    qIntroText: "Este questionário abrange {total} metas relativas à supervisão de segurança, Programas Nacionais de Segurança, infraestruturas, navegação aérea e objetivos ambientais. Para cada pergunta, selecione a opção que melhor descreve o nível atual de implementação do seu Estado. Cada opção é pontuada de 0% (Não Iniciado) a 100% (Totalmente Atingido).",
    qColHash: "#",
    qColTarget: "Meta",
    qColScore: "Pontuação",
    qColStatus: "Estado",
    qColComments: "Comentários",
    qQuestions: "pergunta",
    qQuestionsPlural: "perguntas",
    qFormLabel: "Formulário",

    // Admin score options (targets dropdown)
    scoreOpt0:   "a)   0% — Não iniciado / Não aplicável",
    scoreOpt25:  "b)  25% — Parcialmente iniciado",
    scoreOpt50:  "c)  50% — Em curso / Parcialmente atingido",
    scoreOpt75:  "d)  75% — Avançado / Em boa via",
    scoreOpt100: "e) 100% — Totalmente atingido",
    scoreDesc0:   "Não iniciado",
    scoreDesc25:  "Iniciado mas não finalizado",
    scoreDesc50:  "Parcialmente implementado, lacunas subsistem",
    scoreDesc75:  "Implementação avançada, alguns pontos pendentes",
    scoreDesc100: "Totalmente implementado e operacional",
    adminDeadline: "🗓 Prazo:",
    adminTargetsSingular: "meta",
    adminTargetsPlural:   "metas",
    adminTabKpisTitle:      "📊 KPI — Indicadores Globais",
    adminTabTargetsTitle:   "🎯 AFCAC — Metas Revistas de Segurança · Atualização de Progresso",
    adminTabActionsTitle:   "📋 Plano de Ações — Estado por País",
    adminTabCountriesTitle: "🌍 Dados por País — Distribuição das Ações",
    adminTabUsersTitle:     "🔑 Acesso dos Estados — Credenciais dos Pontos Focais",
    adminTabSessionsTitle:  "🟢 Utilizadores Conectados — Monitorização em Tempo Real",
    adminIntroKpis:       "Edite os indicadores-chave de desempenho globais apresentados no painel na secção Executive Summary.",
    adminIntroTargets:    "Este formulário abrange {n} metas de segurança AFCAC distribuídas em {g} grupos. Para cada meta, selecione a percentagem de progresso de 0% (Não iniciado) a 100% (Totalmente atingido). As respostas irão atualizar a grelha de metas no painel.",
    adminIntroActions:    "Atualize o estado de cada ação por país. Estes dados alimentam a tabela de detalhe e o mapa de África no painel principal.",
    adminIntroCountries:  "Edite os dados agregados por país: orçamento, ações totais e distribuição de estados. Estes valores alimentam a tabela de distribuição por país.",
    adminIntroUsers:      "Lista de {n} pontos focais — um por estado membro da AFCAC. Estas credenciais permitem a cada representante nacional aceder ao formulário de atualização.",
    adminIntroSessions:   "Visualize em tempo real os utilizadores conectados: hora de ligação, localização (país/cidade) e endereço IP. Atualização automática a cada 30 segundos.",
    adminActionsDetailTitle: "📌 Plano de Ações — Detalhe por País",
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
