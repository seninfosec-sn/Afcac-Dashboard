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

    // Country Report Card
    reportSection: "Download Country Report",
    reportDownload: "Download My Report",
    reportGenerating: "Generating…",
    reportExcelDesc: "Multi-sheet Excel: KPIs · Targets · Actions",
    reportPdfDesc: "Formatted PDF report with all sections",
    reportPeriodLabel: "Report Period",
    reportCountryLabel: "Country",
    reportAllCountries: "All Countries (Aggregate)",

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
    qFormLabel: "Safety Questionnaire",
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

    // Admin tabs
    adminTabKpisTitle: "KPI Management",
    adminTabTargetsTitle: "Targets Management",
    adminTabActionsTitle: "Actions Management",
    adminTabCountriesTitle: "Countries Management",
    adminTabUsersTitle: "Users Management",
    adminTabSessionsTitle: "Sessions Management",

    // Admin intro texts
    adminIntroKpis: "Manage key performance indicators displayed on the dashboard.",
    adminIntroTargets: "Manage the {n} safety targets across {g} groups.",
    adminIntroActions: "Manage action plans for all countries.",
    adminIntroCountries: "Manage country data and focal points.",
    adminIntroUsers: "Manage the {n} admin user accounts.",
    adminIntroSessions: "View and manage active sessions.",

    // Admin misc
    adminActionsDetailTitle: "Action Details",
    adminDeadline: "Deadline",
    adminTargetsSingular: "target",
    adminTargetsPlural: "targets",
    adminTrendPlaceholder: "Trend label…",
    adminSaveError: "Save error",
    adminSaveSuccess: "✓ Dashboard updated successfully",
    adminTargetsAnswered: "{n} / {total} targets filled",
    adminActiveTab: "Active tab:",
    adminCancel: "← Cancel",
    adminSave: "💾 Save changes",
    adminSaving: "Saving…",
    adminUpdaterTitle: "👤 Declarant Identity",
    adminUpdaterSub: "Information about the person submitting the update",
    adminFullName: "Full name",
    adminFullNamePlaceholder: "Ex: Jean-Pierre Ndoye",
    adminCountryRepresented: "Country represented",
    adminSelectCountry: "— Select a country —",

    // Score options
    scoreOpt0:   "a)   0% — Not Started / Not Applicable",
    scoreOpt25:  "b)  25% — Partially Initiated",
    scoreOpt50:  "c)  50% — In Progress / Partially Achieved",
    scoreOpt75:  "d)  75% — Advanced / On Track",
    scoreOpt100: "e) 100% — Fully Achieved",

    // Score descriptions
    scoreDesc0:   "Not started",
    scoreDesc25:  "Initiated but not finalized",
    scoreDesc50:  "Partially implemented, gaps remain",
    scoreDesc75:  "Advanced implementation, some issues pending",
    scoreDesc100: "Fully implemented and operational",
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

    // Country Report Card
    reportSection: "Télécharger le Rapport Pays",
    reportDownload: "Télécharger Mon Rapport",
    reportGenerating: "Génération…",
    reportExcelDesc: "Excel multi-feuilles : KPI · Objectifs · Actions",
    reportPdfDesc: "Rapport PDF formaté avec toutes les sections",
    reportPeriodLabel: "Période du rapport",
    reportCountryLabel: "Pays",
    reportAllCountries: "Tous les pays (Agrégat)",

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
    qFormLabel: "Questionnaire de Sécurité",
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

    // Admin tabs
    adminTabKpisTitle: "Gestion des KPI",
    adminTabTargetsTitle: "Gestion des Objectifs",
    adminTabActionsTitle: "Gestion des Actions",
    adminTabCountriesTitle: "Gestion des Pays",
    adminTabUsersTitle: "Gestion des Utilisateurs",
    adminTabSessionsTitle: "Gestion des Sessions",

    // Admin intro texts
    adminIntroKpis: "Gérez les indicateurs clés de performance affichés sur le tableau de bord.",
    adminIntroTargets: "Gérez les {n} objectifs de sécurité répartis en {g} groupes.",
    adminIntroActions: "Gérez les plans d'action pour tous les pays.",
    adminIntroCountries: "Gérez les données des pays et points focaux.",
    adminIntroUsers: "Gérez les {n} comptes utilisateurs administrateurs.",
    adminIntroSessions: "Visualisez et gérez les sessions actives.",

    // Admin misc
    adminActionsDetailTitle: "Détails de l'Action",
    adminDeadline: "Échéance",
    adminTargetsSingular: "objectif",
    adminTargetsPlural: "objectifs",
    adminTrendPlaceholder: "Libellé de tendance…",
    adminSaveError: "Erreur de sauvegarde",
    adminSaveSuccess: "✓ Tableau de bord mis à jour avec succès",
    adminTargetsAnswered: "{n} / {total} cibles renseignées",
    adminActiveTab: "Onglet actif :",
    adminCancel: "← Annuler",
    adminSave: "💾 Enregistrer les modifications",
    adminSaving: "Enregistrement…",
    adminUpdaterTitle: "👤 Identité du Déclarant",
    adminUpdaterSub: "Informations de la personne effectuant la mise à jour",
    adminFullName: "Nom complet",
    adminFullNamePlaceholder: "Ex : Jean-Pierre Ndoye",
    adminCountryRepresented: "Pays représenté",
    adminSelectCountry: "— Sélectionner un pays —",

    // Score options
    scoreOpt0:   "a)   0% — Non démarré / Non applicable",
    scoreOpt25:  "b)  25% — Partiellement initié",
    scoreOpt50:  "c)  50% — En cours / Partiellement atteint",
    scoreOpt75:  "d)  75% — Avancé / En bonne voie",
    scoreOpt100: "e) 100% — Pleinement atteint",

    // Score descriptions
    scoreDesc0:   "Non démarré",
    scoreDesc25:  "Initié mais non finalisé",
    scoreDesc50:  "Partiellement implémenté, des lacunes subsistent",
    scoreDesc75:  "Implémentation avancée, quelques points en suspens",
    scoreDesc100: "Pleinement implémenté et opérationnel",
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

    // Country Report Card
    reportSection: "Baixar Relatório do País",
    reportDownload: "Baixar Meu Relatório",
    reportGenerating: "A gerar…",
    reportExcelDesc: "Excel multi-folhas: KPI · Metas · Ações",
    reportPdfDesc: "Relatório PDF formatado com todas as secções",
    reportPeriodLabel: "Período do relatório",
    reportCountryLabel: "País",
    reportAllCountries: "Todos os países (Agregado)",

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
    qFormLabel: "Questionário de Segurança",
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

    // Admin tabs
    adminTabKpisTitle: "Gestão de KPIs",
    adminTabTargetsTitle: "Gestão de Metas",
    adminTabActionsTitle: "Gestão de Ações",
    adminTabCountriesTitle: "Gestão de Países",
    adminTabUsersTitle: "Gestão de Utilizadores",
    adminTabSessionsTitle: "Gestão de Sessões",

    // Admin intro texts
    adminIntroKpis: "Gerencie os indicadores chave de desempenho exibidos no painel.",
    adminIntroTargets: "Gerencie as {n} metas de segurança em {g} grupos.",
    adminIntroActions: "Gerencie os planos de ação para todos os países.",
    adminIntroCountries: "Gerencie os dados dos países e pontos focais.",
    adminIntroUsers: "Gerencie as {n} contas de utilizadores administradores.",
    adminIntroSessions: "Visualize e gerencie as sessões ativas.",

    // Admin misc
    adminActionsDetailTitle: "Detalhes da Ação",
    adminDeadline: "Prazo",
    adminTargetsSingular: "meta",
    adminTargetsPlural: "metas",
    adminTrendPlaceholder: "Rótulo de tendência…",
    adminSaveError: "Erro ao guardar",
    adminSaveSuccess: "✓ Painel atualizado com sucesso",
    adminTargetsAnswered: "{n} / {total} metas preenchidas",
    adminActiveTab: "Separador ativo:",
    adminCancel: "← Cancelar",
    adminSave: "💾 Guardar alterações",
    adminSaving: "A guardar…",
    adminUpdaterTitle: "👤 Identidade do Declarante",
    adminUpdaterSub: "Informações da pessoa que efectua a actualização",
    adminFullName: "Nome completo",
    adminFullNamePlaceholder: "Ex: Jean-Pierre Ndoye",
    adminCountryRepresented: "País representado",
    adminSelectCountry: "— Selecionar um país —",

    // Score options
    scoreOpt0:   "a)   0% — Não iniciado / Não aplicável",
    scoreOpt25:  "b)  25% — Parcialmente iniciado",
    scoreOpt50:  "c)  50% — Em curso / Parcialmente atingido",
    scoreOpt75:  "d)  75% — Avançado / Em boa via",
    scoreOpt100: "e) 100% — Totalmente atingido",

    // Score descriptions
    scoreDesc0:   "Não iniciado",
    scoreDesc25:  "Iniciado mas não finalizado",
    scoreDesc50:  "Parcialmente implementado, lacunas subsistem",
    scoreDesc75:  "Implementação avançada, alguns pontos pendentes",
    scoreDesc100: "Totalmente implementado e operacional",
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
