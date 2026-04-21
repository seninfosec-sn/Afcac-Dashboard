export interface QuestionOption {
  pct: number;
  label: string;
  text: string;
}

export interface Question {
  id: string;
  group: string;
  deadline: string;
  title: string;
  statement: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  // ── GROUP 1: Safety Trend Targets ──
  {
    id: 'T1.1', group: 'Safety Trend Targets', deadline: 'Ongoing',
    title: 'States to Maintain a Decreasing Trend of Accident and Serious Incident Rate',
    statement: 'Has the State established mechanisms to monitor, analyze, and report on accident and serious incident occurrences, and confirms that the national accident/serious incident rate demonstrates a consistent decreasing trend over the past three years in alignment with the Revised Abuja Safety Targets Action Plan?',
    options: [
      { pct: 0,   label: 'Not Started',        text: 'Data unavailable or monitoring not yet established.' },
      { pct: 25,  label: 'Not Achieved',        text: 'No decreasing trend observed.' },
      { pct: 50,  label: 'Partially Achieved',  text: 'Decreasing trend observed but not consistently sustained.' },
      { pct: 75,  label: 'In Progress',         text: 'Monitoring systems established but decreasing trend not yet evident.' },
      { pct: 100, label: 'Fully Achieved',      text: 'Sustained decreasing trend observed over the past three years.' },
    ],
  },
  {
    id: 'T1.2', group: 'Safety Trend Targets', deadline: 'Ongoing',
    title: 'All States to Attain and Maintain a Continuous Reduction of Loss of Separation Occurrences by at Least 50%',
    statement: 'Has the State implemented monitoring and mitigation measures to reduce loss of separation occurrences, and confirms that national data demonstrates a continuous reduction trend of at least 50% in alignment with the Revised Abuja Safety Targets Action Plan?',
    options: [
      { pct: 0,   label: 'Not Applicable',      text: 'Data unavailable or monitoring not yet established.' },
      { pct: 25,  label: 'Not Achieved',         text: 'No reduction trend observed.' },
      { pct: 50,  label: 'In Progress',          text: 'Measures implemented but reduction not yet evident.' },
      { pct: 75,  label: 'Partially Achieved',   text: 'Reduction trend observed but not yet reaching 50%.' },
      { pct: 100, label: 'Fully Achieved',       text: 'Continuous reduction of ≥50% attained and sustained.' },
    ],
  },
  // ── GROUP 2: Safety Oversight ──
  {
    id: 'T2.1', group: 'Safety Oversight Enhancement', deadline: 'By 2027',
    title: 'All States Establish and Strengthen Autonomous Civil Aviation Authorities (CAA)',
    statement: 'Has the State established and strengthened an autonomous Civil Aviation Authority (CAA) with independent regulatory oversight, sustainable sources of funding, and adequate resources to effectively carry out safety oversight and regulation of the aviation industry?',
    options: [
      { pct: 0,   label: 'Not yet implemented',     text: 'No autonomous CAA has been established.' },
      { pct: 25,  label: 'Started Implementing',    text: 'Beginning — initial steps underway.' },
      { pct: 50,  label: 'Partially Implemented',   text: 'In progress — some elements in place.' },
      { pct: 75,  label: 'Advanced Implementation', text: 'CAA established but not yet fully autonomous or sustainable.' },
      { pct: 100, label: 'Fully Implemented',       text: 'Autonomous CAA fully established with independent oversight and sustainable funding.' },
    ],
  },
  {
    id: 'T2.2', group: 'Safety Oversight Enhancement', deadline: 'By 2030',
    title: "All States to Improve their Score for the Effective Implementation (EI) of the Critical Elements (CEs)",
    statement: "What is the current status of your State's Effective Implementation (EI) score for the Critical Elements (CEs) of the safety oversight system, with particular focus on priority Protocol Questions (PQs)? Target: 75% by 2025, 85% by 2026, 95% by 2030.",
    options: [
      { pct: 0,   label: 'EI Score 0–25%',   text: 'Critical elements largely not implemented.' },
      { pct: 25,  label: 'EI Score 26–50%',  text: 'Partial implementation of critical elements.' },
      { pct: 50,  label: 'EI Score 51–74%',  text: 'Moderate implementation — significant gaps remain.' },
      { pct: 75,  label: 'EI Score 75–84%',  text: 'Meeting 2025 target — advanced implementation.' },
      { pct: 100, label: 'EI Score 85–100%', text: 'Meeting or exceeding 2026/2030 targets — full implementation.' },
    ],
  },
  {
    id: 'T2.3', group: 'Safety Oversight Enhancement', deadline: 'By 2028',
    title: 'All States Establish and Strengthen Independent Aircraft Accident and Incident Investigation Organizations',
    statement: 'Has the State established and strengthened an independent aircraft accident and incident investigation organization/unit, with sustainable sources of funding and adequate resources, to effectively carry out investigations into aircraft accidents and serious incidents, with full implementation planned by 2028?',
    options: [
      { pct: 0,   label: 'Not Yet Implemented',        text: 'No independent investigation organization has been established; discussions or initial steps are underway.' },
      { pct: 25,  label: 'Planned for Implementation', text: 'Formal plans exist to establish the organization before 2028, but implementation has not yet started.' },
      { pct: 50,  label: 'Partially Implemented',      text: 'The organization exists but requires further strengthening — independence, funding, staffing not yet fully sustainable.' },
      { pct: 75,  label: 'Implemented',                text: 'The independent investigation organization is established but not yet fully sustainable.' },
      { pct: 100, label: 'Fully Implemented',          text: 'The independent investigation organization is established, operational, and sustainably funded.' },
    ],
  },
  {
    id: 'T2.4', group: 'Safety Oversight Enhancement', deadline: 'Ongoing',
    title: 'All States Establish and Strengthen Relevant Departments Supporting State Safety Functions',
    statement: 'Has the State established and/or strengthened relevant departments or units (e.g., Meteorological services, Radioactive Materials regulatory entities, Communications authorities) that directly support State Safety functions, with sustainable funding and adequate resources?',
    options: [
      { pct: 0,   label: 'Not Implemented',                           text: 'No relevant departments/units exist OR existing ones do not support State Safety functions.' },
      { pct: 25,  label: 'Initiated',                                 text: 'Some departments/units exist but are weak, fragmented, or lack clear mandates.' },
      { pct: 50,  label: 'Ongoing Implementation',                    text: 'Departments/units exist with defined mandates supporting State Safety functions. Funding available but not sustainable.' },
      { pct: 75,  label: 'Implemented',                               text: 'All relevant departments/units are established and functional with sustainable funding.' },
      { pct: 100, label: 'Fully Implemented, Sustained & Strengthened', text: 'Departments/units are fully operational, continuously strengthened, with secured sustainable funding and long-term planning.' },
    ],
  },
  // ── GROUP 3: State Safety Programme ──
  {
    id: 'T3.1', group: 'State Safety Programme (SSP)', deadline: 'Dec 2026',
    title: 'All States to Implement the Foundation of a State Safety Programme (SSP)',
    statement: 'Has the State established and implemented the foundational elements of a State Safety Programme (SSP), including designation of a responsible authority, development of an SSP framework aligned with ICAO Annex 19, and initiation of processes for safety risk management, assurance, and promotion?',
    options: [
      { pct: 0,   label: 'Not yet initiated',    text: 'No steps have been taken toward SSP foundation.' },
      { pct: 25,  label: 'Planning Stage',        text: 'SSP framework under development.' },
      { pct: 50,  label: 'Partially Implemented', text: 'Some SSP elements are in place.' },
      { pct: 75,  label: 'Implemented',           text: 'SSP foundation established and operational.' },
      { pct: 100, label: 'Fully Implemented',     text: 'SSP fully implemented, sustained and fully operational.' },
    ],
  },
  {
    id: 'T3.2', group: 'State Safety Programme (SSP)', deadline: 'Dec 2026',
    title: 'All States to Publish a National Aviation Safety Plan (NASP)',
    statement: 'Has the State developed, published, and formally communicated a National Aviation Safety Plan (NASP) in alignment with ICAO guidance, with publication completed by 31st December 2026?',
    options: [
      { pct: 0,   label: 'Not Developed',              text: 'NASP not yet developed or published.' },
      { pct: 25,  label: 'In Progress',                text: 'Draft NASP developed but not yet published.' },
      { pct: 50,  label: 'Published — Limited Comm.',  text: 'NASP published but not communicated to all stakeholders.' },
      { pct: 75,  label: 'Published — Partial Comm.',  text: 'NASP published and communicated to some stakeholders.' },
      { pct: 100, label: 'Fully Implemented',          text: 'NASP published and communicated to all stakeholders.' },
    ],
  },
  {
    id: 'T3.3', group: 'State Safety Programme (SSP)', deadline: '2028',
    title: 'All States to Work Towards an Effective SSP (Present by 2026, Effective by 2028)',
    statement: 'Has the State developed and implemented a State Safety Programme (SSP) in line with ICAO requirements, and is it progressing toward effectiveness per the Revised Abuja Safety Targets (A: by 2026 — Present; B: by 2028 — Present and Effective)?',
    options: [
      { pct: 0,   label: 'Not Initiated',            text: 'No SSP has been initiated.' },
      { pct: 25,  label: 'Framework Drafted',         text: 'SSP framework drafted but not yet formally adopted or implemented.' },
      { pct: 50,  label: 'Partially Implemented',     text: 'SSP formally established and partially implemented.' },
      { pct: 75,  label: 'Implemented (Monitoring)', text: 'SSP implemented with most components functional.' },
      { pct: 100, label: 'Fully Effective',           text: 'SSP fully implemented, effective, and aligned with ICAO requirements.' },
    ],
  },
  // ── GROUP 4: Assistance & RASP ──
  {
    id: 'T4.1', group: 'Assistance & Regional Safety Plans', deadline: 'Dec 2026',
    title: 'States Not Expecting to Meet Goals 2 and 3 by Dec 2026 to Seek Assistance',
    statement: 'If the State does not expect to meet Goals 2 and 3 by December 2026, has your State formally sought assistance to strengthen its safety oversight capabilities?',
    options: [
      { pct: 0,   label: 'No Recognition / No Assistance', text: 'No recognition of inability to meet Goals 2 and 3; no assistance sought.' },
      { pct: 25,  label: 'Acknowledged Challenges',        text: 'State has acknowledged challenges but has not yet initiated formal requests for assistance.' },
      { pct: 50,  label: 'Initial Requests Submitted',     text: 'State has submitted initial requests for assistance to AFCAC, ICAO, RSOOs or partners.' },
      { pct: 75,  label: 'Actively Seeking Assistance',   text: 'State has actively sought assistance, with ongoing support programs or partnerships established.' },
      { pct: 100, label: 'Fully Engaged',                  text: 'State has fully engaged with assistance mechanisms, implementing capacity-building measures.' },
    ],
  },
  {
    id: 'T4.2', group: 'Assistance & Regional Safety Plans', deadline: 'Dec 2026',
    title: 'Publish an Updated Regional Aviation Safety Plan (RASP) by End of 2026',
    statement: 'Has the State published an updated Regional Aviation Safety Plan (RASP) for RASG-AFI, RASG-MID, or EUR RASG by the end of 2026, ensuring alignment with the latest edition of the ICAO Global Aviation Safety Plan (GASP)?',
    options: [
      { pct: 0,   label: 'No Progress',               text: 'No progress initiated; no draft or planning activity toward updating the RASP.' },
      { pct: 25,  label: 'Initial Steps',              text: 'Draft outline prepared, stakeholder consultations started, but no formal draft completed.' },
      { pct: 50,  label: 'Draft Developed',            text: 'Draft RASP developed and circulated internally, but not yet finalized or published.' },
      { pct: 75,  label: 'Finalized — Not Published', text: 'RASP finalized and approved at regional level, but not yet officially published.' },
      { pct: 100, label: 'Published & Communicated',  text: 'Updated RASP fully published, aligned with the latest ICAO GASP.' },
    ],
  },
  // ── GROUP 5: Industry Safety Standards ──
  {
    id: 'T5.1', group: 'Industry Safety Standards', deadline: 'Ongoing',
    title: 'Maintain an Increasing Trend in Safety Information Sharing Networks',
    statement: 'To what extent has the State maintained an increasing trend in contributing safety information to regional and global safety information-sharing networks, in support of the development of NASPs and RASPs?',
    options: [
      { pct: 0,   label: 'No Contribution',           text: 'No contribution to safety information-sharing networks.' },
      { pct: 25,  label: 'Limited Contribution',      text: 'Occasional or ad-hoc sharing of safety information.' },
      { pct: 50,  label: 'Moderate Contribution',     text: 'Regular but incomplete sharing of safety information.' },
      { pct: 75,  label: 'Significant Contribution',  text: 'Consistent and structured sharing of safety information.' },
      { pct: 100, label: 'Full Contribution',         text: 'Sustained and increasing trend of safety information sharing.' },
    ],
  },
  {
    id: 'T5.2', group: 'Industry Safety Standards', deadline: 'Ongoing',
    title: 'Increase the Number of Service Providers Participating in ICAO-Recognized Industry Assessment Programmes (IOSA, ISSA, ISAGO)',
    statement: 'To what extent has your State increased the number of service providers (airlines, ground handlers, etc.) participating in ICAO-recognized industry assessment programmes such as IOSA, ISSA, ISAGO, or equivalent?',
    options: [
      { pct: 0,   label: 'Not Started',               text: 'No service providers are enrolled in ICAO-recognized industry assessment programmes.' },
      { pct: 25,  label: 'Initial Implementation',    text: 'A small proportion (up to one-quarter) of service providers are enrolled.' },
      { pct: 50,  label: 'Moderate Implementation',   text: 'About half of service providers are enrolled.' },
      { pct: 75,  label: 'Advanced Implementation',   text: 'A majority (three-quarters) of service providers are enrolled.' },
      { pct: 100, label: 'Fully Implemented',         text: 'All eligible service providers are enrolled.' },
    ],
  },
  {
    id: 'T5.3', group: 'Industry Safety Standards', deadline: 'Ongoing',
    title: "Eligible African Airlines to Attain Acceptable Standards through IATA IOSA/ISSA Program",
    statement: "To what extent have eligible African airlines under the State's oversight attained acceptable operational safety standards through the globally recognized IATA IOSA/ISSA program?",
    options: [
      { pct: 0,   label: 'No Registration',          text: 'No eligible airline has attained IOSA/ISSA registration.' },
      { pct: 25,  label: 'Preparing for Audit',       text: 'Some airlines are preparing for IOSA/ISSA audits but none have achieved registration.' },
      { pct: 50,  label: 'At Least One Registered',   text: 'At least one eligible airline has successfully attained IOSA/ISSA registration.' },
      { pct: 75,  label: 'Majority Registered',       text: 'Majority of eligible airlines have attained IOSA/ISSA registration.' },
      { pct: 100, label: 'All Registered & Sustained', text: 'All eligible airlines have attained IOSA/ISSA registration and are sustaining recurrent registration.' },
    ],
  },
  {
    id: 'T5.4', group: 'Industry Safety Standards', deadline: 'Ongoing',
    title: 'Eligible Ground Handling Service Providers (GSP) to Attain and Maintain IATA ISAGO Standards',
    statement: 'To what extent has the State ensured that eligible Ground Handling Service Providers (GSPs) attain and maintain acceptable operational safety standards through the globally recognized IATA ISAGO program?',
    options: [
      { pct: 0,   label: 'No GSPs Identified/Engaged', text: 'No eligible GSPs have been identified or engaged in ISAGO certification.' },
      { pct: 25,  label: 'Initial Steps',               text: 'Some GSPs identified, awareness created, but no certification achieved yet.' },
      { pct: 50,  label: 'Partial Implementation',      text: 'At least one eligible GSP certified under ISAGO, but coverage is limited.' },
      { pct: 75,  label: 'Majority Certified',          text: 'Majority of eligible GSPs certified and maintaining compliance.' },
      { pct: 100, label: 'Full Implementation',         text: 'All eligible GSPs certified under ISAGO, with continuous oversight.' },
    ],
  },
  // ── GROUP 6 & 7: Infrastructure ──
  {
    id: 'T6.1', group: 'Air Navigation & Aerodrome Infrastructure', deadline: 'Ongoing',
    title: 'Establish and Maintain an Increasing Trend of Air Navigation and Aerodrome Infrastructure Meeting ICAO Standards',
    statement: 'To what extent has the State established and maintained an increasing trend of air navigation infrastructure, interoperable systems, and aerodrome infrastructure that meet relevant ICAO Standards?',
    options: [
      { pct: 0,   label: 'No Implementation',          text: 'No evidence of implementation.' },
      { pct: 25,  label: 'Initial Steps',               text: 'Limited infrastructure upgrades or planning activities are underway.' },
      { pct: 50,  label: 'Moderate Implementation',    text: 'Some infrastructure and systems meet ICAO Standards, but coverage is partial.' },
      { pct: 75,  label: 'Significant Implementation', text: 'Most infrastructure and systems are ICAO-compliant.' },
      { pct: 100, label: 'Full Implementation',        text: 'All air navigation and aerodrome infrastructure meet ICAO Standards.' },
    ],
  },
  {
    id: 'T7.1', group: 'Air Navigation & Aerodrome Infrastructure', deadline: 'Dec 2026',
    title: 'All States to Identify Gaps in Existing International Aerodrome Infrastructure',
    statement: 'Has the State identified and documented gaps in existing international aerodrome infrastructure in line with ICAO standards and the Revised Abuja Safety Targets, with a clear plan for addressing them by 2026?',
    options: [
      { pct: 0,   label: 'No Action Taken',       text: 'No assessment or documentation of infrastructure gaps has been initiated.' },
      { pct: 25,  label: 'Preliminary Steps',      text: 'Some gaps have been informally identified, but no comprehensive assessment or documentation exists.' },
      { pct: 50,  label: 'Partial Progress',       text: 'A formal assessment has been conducted, but documentation is incomplete.' },
      { pct: 75,  label: 'Significant Progress',   text: 'Gaps are fully identified and documented, with draft action plans developed.' },
      { pct: 100, label: 'Full Compliance',        text: 'All gaps identified, documented, and integrated into a national action plan.' },
    ],
  },
  {
    id: 'T7.2', group: 'Air Navigation & Aerodrome Infrastructure', deadline: 'Dec 2026',
    title: 'All States to Identify Gaps in Existing Air Navigation Services (ANS) Infrastructure',
    statement: 'Has the State conducted a comprehensive assessment to identify gaps in existing air navigation services (ANS) infrastructure, and documented these findings in line with ICAO standards?',
    options: [
      { pct: 0,   label: 'No Assessment Initiated',           text: 'No evidence of gap identification in ANS infrastructure.' },
      { pct: 25,  label: 'Preliminary Steps',                 text: 'Planning or partial data collection underway, but no formal gap analysis completed.' },
      { pct: 50,  label: 'Partial Gap Analysis',             text: 'Gap analysis conducted for some ANS infrastructure elements, but incomplete.' },
      { pct: 75,  label: 'Comprehensive — Partial Alignment', text: 'Comprehensive gap analysis completed and documented, covering most ANS infrastructure areas.' },
      { pct: 100, label: 'Full Gap Analysis Completed',      text: 'Full gap analysis completed, documented, and validated.' },
    ],
  },
  // ── GROUP 8: Aerodrome Certification ──
  {
    id: 'T8', group: 'Aerodrome Certification', deadline: 'By 2030',
    title: 'All International Aerodromes to be Certified by End of 2030',
    statement: 'To what extent has your State achieved certification of all international aerodromes in line with the Revised Abuja Safety Target requiring completion by 2030?',
    options: [
      { pct: 0,   label: 'No Aerodrome Certified',    text: 'No international aerodrome certified.' },
      { pct: 25,  label: 'Less than 25% Certified',  text: 'Initial steps taken; less than one-quarter of international aerodromes certified.' },
      { pct: 50,  label: 'Half Certified',            text: 'Half of international aerodromes certified.' },
      { pct: 75,  label: 'Majority Certified',        text: 'Majority of international aerodromes certified; nearing full compliance.' },
      { pct: 100, label: 'All Certified',             text: 'All international aerodromes certified in accordance with ICAO requirements.' },
    ],
  },
  // ── GROUP 9: SAR ──
  {
    id: 'T9.1', group: 'Search and Rescue (SAR)', deadline: 'Dec 2028',
    title: 'All States to Establish an Effective and Operational Search and Rescue (SAR) Organization',
    statement: 'To what extent has the State established an effective and operational SAR organization including: (i) National SAR Coordination Committee, (ii) National SAR Plan, (iii) SAR Agreements with neighbouring States, (iv) Multi-agency SAR exercises, (v) Cooperative link to GADSS, (vi) National ELT database linked to COSPAS-SARSAT?',
    options: [
      { pct: 0,   label: 'No Action Taken',          text: 'No action taken on any of the SAR requirements.' },
      { pct: 25,  label: 'Initial Steps',             text: 'SAR Committee established OR SAR Plan drafted, but most requirements remain incomplete.' },
      { pct: 50,  label: 'Partial Implementation',   text: 'SAR Committee and Plan in place, some agreements initiated.' },
      { pct: 75,  label: 'Advanced Implementation',  text: 'SAR Committee, Plan, and agreements completed; initial SAR exercises conducted.' },
      { pct: 100, label: 'Full Compliance',          text: 'All SAR requirements completed, operational, and tested.' },
    ],
  },
  // ── GROUP 10: AIS to AIM ──
  {
    id: 'T10.1', group: 'AIS to AIM Transition', deadline: 'Dec 2026',
    title: 'All States to Develop and Implement National Action Plans for AIS to AIM Transition',
    statement: 'Has the State developed and implemented a national action plan for the transition from Aeronautical Information Services (AIS) to Aeronautical Information Management (AIM), including the effective implementation of Basic Building Blocks (BBBs) and the ASBU DAIM-B1 Elements, by December 2026?',
    options: [
      { pct: 0,   label: 'No Progress',               text: 'No national action plan developed; no implementation of BBBs or ASBU DAIM-B1 elements.' },
      { pct: 25,  label: 'Initial Progress',           text: 'Draft national action plan exists; limited or pilot implementation.' },
      { pct: 50,  label: 'Partial Implementation',    text: 'National action plan formally adopted; moderate implementation.' },
      { pct: 75,  label: 'Advanced Implementation',   text: 'National action plan operational; substantial implementation.' },
      { pct: 100, label: 'Full Implementation',       text: 'National action plan fully executed; complete and effective implementation.' },
    ],
  },
  {
    id: 'T10.2', group: 'AIS to AIM Transition', deadline: 'Dec 2026',
    title: 'Implementation of the National Action Plan in Accordance with ASBU Block 0 D-AIM',
    statement: 'Has the State developed and implemented a National Action Plan for the transition from AIS to AIM, in alignment with ASBU Block 0 D-AIM, and is it on track for completion by the end of 2026?',
    options: [
      { pct: 0,   label: 'No National Action Plan',              text: 'No National Action Plan has been developed.' },
      { pct: 25,  label: 'Draft Exists',                         text: 'Draft National Action Plan exists but has not been formally adopted.' },
      { pct: 50,  label: 'Adopted — Partial Implementation',    text: 'National Action Plan formally adopted; partial implementation underway.' },
      { pct: 75,  label: 'Well Advanced',                        text: 'National Action Plan implementation well advanced.' },
      { pct: 100, label: 'Fully Implemented',                    text: 'National Action Plan fully implemented in accordance with ASBU Block 0 D-AIM.' },
    ],
  },
  {
    id: 'T10.3', group: 'AIS to AIM Transition', deadline: 'Dec 2028',
    title: 'Develop a Central Aeronautical Database Program for Africa by End of 2028',
    statement: 'Has the State developed and initiated the implementation of a central Aeronautical Database program, aligned with continental harmonization objectives, to be operational by the end of 2028?',
    options: [
      { pct: 0,   label: 'No Action',                   text: 'No action taken; no plans or initiatives in place.' },
      { pct: 25,  label: 'Initial Planning',             text: 'Concept note or feasibility study developed, but no formal program launched.' },
      { pct: 50,  label: 'Program Design Completed',    text: 'Resources allocated and pilot activities initiated, but not yet operational.' },
      { pct: 75,  label: 'Partially Implemented',       text: 'Database program partially implemented; operational in limited scope.' },
      { pct: 100, label: 'Fully Operational',           text: 'Fully implemented and operational central Aeronautical Database program.' },
    ],
  },
  // ── GROUP 11: PBN ──
  {
    id: 'T11.1', group: 'Performance-Based Navigation (PBN)', deadline: 'Dec 2026',
    title: 'All States to Ensure 75% of Instrument Runways Have Implemented PBN Procedures by 31 December 2026',
    statement: 'To what extent has the State implemented Performance-Based Navigation (PBN) procedures on instrument runways, in line with the Abuja Safety Target requiring 75% implementation by 31 December 2026?',
    options: [
      { pct: 0,   label: '0% of Runways',           text: 'No instrument runways have implemented PBN procedures.' },
      { pct: 25,  label: 'Up to 25% of Runways',   text: 'PBN procedures implemented on up to 25% of instrument runways.' },
      { pct: 50,  label: 'Up to 50% of Runways',   text: 'PBN procedures implemented on up to 50% of instrument runways.' },
      { pct: 75,  label: '≥75% of Runways (Target)', text: 'PBN procedures implemented on at least 75% of instrument runways.' },
      { pct: 100, label: '100% of Runways',          text: 'PBN procedures implemented on all instrument runways.' },
    ],
  },
  {
    id: 'T11.2', group: 'Performance-Based Navigation (PBN)', deadline: 'Dec 2026',
    title: 'All States to Ensure 100% of Instrument Runways Have Implemented PBN Procedures',
    statement: 'Has the State ensured the implementation of Performance-Based Navigation (PBN) procedures on 100% of instrument runways, in line with the Revised Abuja Safety Target 11.2, to be achieved by 31 December 2026?',
    options: [
      { pct: 0,   label: '0% of Runways',   text: 'No instrument runways have implemented PBN procedures.' },
      { pct: 25,  label: '25% of Runways',  text: 'PBN procedures implemented on up to one-quarter of instrument runways.' },
      { pct: 50,  label: '50% of Runways',  text: 'PBN procedures implemented on half of instrument runways.' },
      { pct: 75,  label: '75% of Runways',  text: 'PBN procedures implemented on three-quarters of instrument runways.' },
      { pct: 100, label: '100% of Runways', text: 'PBN procedures implemented on all instrument runways.' },
    ],
  },
  // ── GROUP 12: Seamless ANS ──
  {
    id: 'T12.1', group: 'Seamless Air Navigation Services', deadline: 'Dec 2026',
    title: 'All States to Conduct an ANS Infrastructure Gap Analysis',
    statement: 'Has the State conducted a comprehensive ANS infrastructure gap analysis, in line with ICAO guidance, to identify deficiencies and requirements for the establishment of seamless Air Navigation Services in the AFI Region, with completion targeted by December 2026?',
    options: [
      { pct: 0,   label: 'No Action',                     text: 'No action initiated.' },
      { pct: 25,  label: 'Preliminary Steps',              text: 'Planning or partial data collection underway, but analysis not yet completed.' },
      { pct: 50,  label: 'Partially Conducted',           text: 'Some infrastructure areas assessed but not comprehensive.' },
      { pct: 75,  label: 'Substantially Completed',       text: 'Gap analysis substantially completed; most infrastructure areas assessed.' },
      { pct: 100, label: 'Fully Completed & Reported',   text: 'Gap analysis fully completed, documented, validated, and formally reported.' },
    ],
  },
  {
    id: 'T12.2', group: 'Seamless Air Navigation Services', deadline: 'Dec 2026',
    title: 'All States to Support the Development and Implementation of a Seamless Airspace Masterplan',
    statement: 'To what extent has the State supported the development and implementation of the Seamless Airspace Masterplan, in line with the Revised Abuja Safety Target 12.2 (deadline: December 2026)?',
    options: [
      { pct: 0,   label: 'No Action',               text: 'No steps taken to engage with, support, or align national frameworks with the Seamless Airspace Masterplan.' },
      { pct: 25,  label: 'Initial Engagement',      text: 'Preliminary discussions or awareness activities conducted.' },
      { pct: 50,  label: 'Partial Development',     text: 'National action plan drafted or initial technical/operational measures underway.' },
      { pct: 75,  label: 'Advanced Implementation', text: 'Significant progress made; national frameworks largely aligned.' },
      { pct: 100, label: 'Full Implementation',     text: 'Seamless Airspace Masterplan fully integrated into national systems.' },
    ],
  },
  {
    id: 'T12.3', group: 'Seamless Air Navigation Services', deadline: 'Dec 2028',
    title: 'All States to Ensure Provision of Harmonized Air Navigation Services',
    statement: 'To what extent has the State implemented measures to ensure the provision of harmonized Air Navigation Services (ANS) in line with ICAO standards and regional agreements, with the goal of full compliance by December 2028?',
    options: [
      { pct: 0,   label: 'No Action',              text: 'No national plan, framework, or commitment toward harmonized ANS provision.' },
      { pct: 25,  label: 'Initial Steps',           text: 'Draft policies or preliminary consultations exist, but no operational implementation yet.' },
      { pct: 50,  label: 'Moderate Progress',      text: 'National ANS framework established, some harmonization measures implemented.' },
      { pct: 75,  label: 'Advanced Implementation', text: 'Most harmonization measures in place, systems largely interoperable.' },
      { pct: 100, label: 'Full Compliance',         text: 'Harmonized ANS fully operational, interoperable across regional boundaries.' },
    ],
  },
  {
    id: 'T12.4', group: 'Seamless Air Navigation Services', deadline: 'Dec 2028',
    title: 'All Initiatives by RECs and ANSPs within the AFI Region to be Harmonized by 31 December 2028',
    statement: 'To what extent has the State ensured that all initiatives formulated by the Regional Economic Communities (RECs) and Air Navigation Service Providers (ANSPs) within the AFI Region are harmonized in line with the December 31, 2028 deadline?',
    options: [
      { pct: 0,   label: 'No Action',              text: 'No action has been taken to harmonize REC and ANSP initiatives.' },
      { pct: 25,  label: 'Initial Steps',           text: 'Initial steps taken, but harmonization is not yet operationalized.' },
      { pct: 50,  label: 'Partial Harmonization',  text: 'Some REC and ANSP initiatives are aligned, but gaps remain.' },
      { pct: 75,  label: 'Mostly Harmonized',      text: 'Most initiatives are harmonized, with only minor outstanding issues.' },
      { pct: 100, label: 'Full Harmonization',     text: 'Full harmonization achieved; all REC and ANSP initiatives within the AFI Region are aligned.' },
    ],
  },
  // ── GROUP 13: ASBU ──
  {
    id: 'T13.1', group: 'ASBU Implementation', deadline: 'Dec 2026',
    title: 'All States to Develop National ASBU Plan by 31 December 2026',
    statement: 'Has your State developed and formally adopted a National Aviation System Block Upgrade (ASBU) Plan in alignment with ICAO standards, and what is the current status of its implementation toward the 2036 completion target?',
    options: [
      { pct: 0,   label: 'No ASBU Plan Initiated',       text: 'No National ASBU Plan has been initiated or documented.' },
      { pct: 25,  label: 'Draft Exists — Not Adopted',   text: 'Draft National ASBU Plan exists but has not been formally adopted.' },
      { pct: 50,  label: 'Formally Adopted',             text: 'National ASBU Plan formally adopted, with initial implementation steps underway.' },
      { pct: 75,  label: 'Under Active Implementation', text: 'National ASBU Plan under active implementation.' },
      { pct: 100, label: 'Substantially Completed',     text: 'National ASBU Plan fully developed, adopted, and implementation substantially completed.' },
    ],
  },
  {
    id: 'T13.2', group: 'ASBU Implementation', deadline: 'Dec 2025',
    title: 'All States to Implement National ASBU Block 0 (B0) Elements by 31 December 2025',
    statement: 'To what extent has your State implemented the National ASBU Block 0 (B0) elements in alignment with the Regional Air Navigation Plan (ANP), with the goal of full implementation by 31 December 2025?',
    options: [
      { pct: 0,   label: 'No B0 Elements Initiated', text: 'No ASBU B0 elements have been initiated or aligned with the Regional ANP.' },
      { pct: 25,  label: 'Initial Steps',             text: 'Planning documents or partial adoption of ASBU B0 elements.' },
      { pct: 50,  label: 'Moderate Progress',        text: 'Several ASBU B0 elements implemented, with partial alignment to the Regional ANP.' },
      { pct: 75,  label: 'Significant Progress',     text: 'Most ASBU B0 elements implemented and largely aligned with the Regional ANP.' },
      { pct: 100, label: 'Full Implementation',      text: 'All ASBU B0 elements are operational and fully aligned with the Regional ANP.' },
    ],
  },
  {
    id: 'T13.3', group: 'ASBU Implementation', deadline: 'Dec 2028',
    title: 'All States to Implement ASBU Block 1 (B1) Elements by 31 December 2028',
    statement: 'To what extent has your State implemented the Aviation System Block Upgrade (ASBU) Block 1 (B1) elements in line with the Regional Air Navigation Plan (ANP), with the goal of full implementation by 31 December 2028?',
    options: [
      { pct: 0,   label: 'No B1 Implementation',   text: 'ASBU B1 elements not addressed in national plans.' },
      { pct: 25,  label: 'Initial Steps',           text: 'Some elements identified in national planning but limited practical implementation.' },
      { pct: 50,  label: 'Partial Implementation', text: 'Several ASBU B1 elements operational, but gaps remain.' },
      { pct: 75,  label: 'Advanced Implementation', text: 'Most ASBU B1 elements operational and largely aligned with the Regional ANP.' },
      { pct: 100, label: 'Full Implementation',    text: 'All ASBU B1 elements operational and fully aligned with the Regional ANP.' },
    ],
  },
  {
    id: 'T13.4', group: 'ASBU Implementation', deadline: 'Dec 2030',
    title: 'All States to Implement ASBU Block 2 (B2) Elements by 31 December 2030',
    statement: 'To what extent has the State implemented the ASBU Block 2 (B2) elements in alignment with the Regional Air Navigation Plan (ANP), with the goal of full implementation by 31 December 2030?',
    options: [
      { pct: 0,   label: 'No B2 Elements Initiated', text: 'No ASBU B2 elements have been initiated or planned.' },
      { pct: 25,  label: 'Initial Planning',          text: 'Initial planning and limited implementation of ASBU B2 elements have begun.' },
      { pct: 50,  label: 'Partial Implementation',   text: 'Several ASBU B2 elements are operational, though gaps remain.' },
      { pct: 75,  label: 'Majority Implemented',     text: 'Majority of ASBU B2 elements implemented and largely aligned.' },
      { pct: 100, label: 'Full Implementation',      text: 'Full implementation of all ASBU B2 elements completed.' },
    ],
  },
  {
    id: 'T13.5', group: 'ASBU Implementation', deadline: 'Dec 2036',
    title: 'All States to Implement ASBU Block 3 (B3) Modules by 31 December 2036',
    statement: 'To what extent has the State implemented the ICAO Aviation System Block Upgrade (ASBU) Block 3 (B3) Modules in alignment with the Regional Air Navigation Plan (ANP), with the goal of full implementation by 31 December 2036?',
    options: [
      { pct: 0,   label: 'No Action',              text: 'No planning, policy, or initial steps toward ASBU B3 implementation.' },
      { pct: 25,  label: 'Initial Planning',       text: 'National roadmap drafted or partial alignment with Regional ANP identified.' },
      { pct: 50,  label: 'Moderate Progress',      text: 'Some ASBU B3 modules implemented, with partial integration into national systems.' },
      { pct: 75,  label: 'Advanced Implementation', text: 'Majority of ASBU B3 modules operational, aligned with Regional ANP.' },
      { pct: 100, label: 'Full Implementation',    text: 'All ASBU B3 modules operational, fully aligned with Regional ANP.' },
    ],
  },
  // ── GROUP 14: CO₂ ──
  {
    id: 'T14.1', group: 'CO₂ Emissions Reduction', deadline: 'Dec 2026',
    title: 'African States to Develop, Update or Review State Action Plans for CO₂ Emissions Reduction Every 3 Years',
    statement: 'Has the State developed, updated, or reviewed its State Action Plan for CO₂ Emissions Reduction Activities within the last three years, in line with ICAO guidance?',
    options: [
      { pct: 0,   label: 'No Action Plan',                    text: 'No State Action Plan has been developed, updated, or reviewed in the last three years.' },
      { pct: 25,  label: 'Initial Steps',                     text: 'Draft prepared, consultations initiated, but the Action Plan is not yet finalized.' },
      { pct: 50,  label: 'Developed but Not Fully Aligned',  text: 'Action Plan has been developed or updated, but not fully aligned with ICAO guidance.' },
      { pct: 75,  label: 'Developed, Updated & Submitted',   text: 'Action Plan has been developed, updated, and submitted.' },
      { pct: 100, label: 'Fully Compliant',                   text: 'Action Plan fully developed, updated/reviewed within the last three years, submitted to ICAO.' },
    ],
  },
  {
    id: 'T14.2', group: 'CO₂ Emissions Reduction', deadline: 'From 2026',
    title: 'African States to Quantify CO₂ Reduction Potential and Implement Measures Every 3 Years',
    statement: 'Does the State Action Plan quantify CO₂ reduction potential and develop a roadmap for implementing CO₂ reduction measures, with reviews conducted every three years?',
    options: [
      { pct: 0,   label: 'No Quantification / No Roadmap',         text: 'No quantification of CO₂ reduction potential; no roadmap or review mechanism in place.' },
      { pct: 25,  label: 'Quantified Once — No Roadmap',           text: 'CO₂ reduction potential quantified once, but no established roadmap or review cycle.' },
      { pct: 50,  label: 'Quantified — Draft Roadmap',             text: 'CO₂ reduction potential quantified at least once; a draft roadmap exists.' },
      { pct: 75,  label: 'Quantified Every 3 Yrs — Partial Roadmap', text: 'CO₂ reduction potential quantified every 3 years; roadmap developed and partially implemented.' },
      { pct: 100, label: 'Full Compliance',                         text: 'CO₂ reduction potential quantified every 3 years; roadmap fully developed and implemented.' },
    ],
  },
  // ── GROUP 15: ANSP Peer Review ──
  {
    id: 'T15.1', group: 'ANSP Peer Review & SMS Maturity', deadline: 'Dec 2026',
    title: 'All ANSPs to Join the African ANSP Peer Review Programme by 31 December 2026',
    statement: 'Has the State ensured that all Air Navigation Service Providers (ANSPs) have formally joined and are actively participating in the African ANSP Peer Review Programme, in line with the requirement to achieve certification by 31 December 2026?',
    options: [
      { pct: 0,   label: 'No ANSP Joined',           text: 'No ANSP has joined the Peer Review Program.' },
      { pct: 25,  label: 'Initial Engagement',       text: 'ANSP(s) have expressed intent or submitted preliminary documentation, but formal enrolment is incomplete.' },
      { pct: 50,  label: 'Partial Implementation',  text: 'At least half of ANSPs have formally joined the Peer Review Programme.' },
      { pct: 75,  label: 'Advanced Implementation', text: 'Majority of ANSPs are enrolled and actively participating in peer review activities.' },
      { pct: 100, label: 'Full Implementation',     text: 'All ANSPs have joined and are actively participating in the Peer Review Programme.' },
    ],
  },
  {
    id: 'T15.2', group: 'ANSP Peer Review & SMS Maturity', deadline: 'Dec 2028',
    title: 'Participating ANSPs to Reach SMS Maturity Level (50% by 2026, 100% by 2028)',
    statement: 'To what extent has the Air Navigation Service Provider (ANSP) achieved SMS (Safety Management System) maturity in line with Target 15.2?',
    options: [
      { pct: 0,   label: 'No SMS Maturity',                    text: 'No SMS maturity achieved; implementation has not started.' },
      { pct: 25,  label: 'Initial Steps',                      text: 'Partial documentation or fragmented processes exist, but SMS is not yet functional.' },
      { pct: 50,  label: 'SMS Established (2026 Target)',      text: 'SMS is established and functional; meets minimum maturity requirements expected by December 2026.' },
      { pct: 75,  label: 'SMS Well-Integrated',               text: 'SMS is well-integrated; proactive safety management practices are in place.' },
      { pct: 100, label: 'SMS Fully Matured (2028 Target)',   text: 'SMS fully matured; comprehensive, sustainable, and continuously improved.' },
    ],
  },
  {
    id: 'T15.3', group: 'ANSP Peer Review & SMS Maturity', deadline: 'Dec 2036',
    title: 'All ANSPs to Attain Certification by 31 December 2036',
    statement: 'Has the Air Navigation Service Provider (ANSP) attained formal certification in accordance with ICAO standards and national regulatory requirements, as part of the commitment to achieve full certification by 31 December 2036?',
    options: [
      { pct: 0,   label: 'No Progress',                   text: 'ANSP has not begun certification process.' },
      { pct: 25,  label: 'Initial Steps',                  text: 'Certification framework or preparatory activities have commenced.' },
      { pct: 50,  label: 'Process Underway',              text: 'Certification process is underway; partial compliance achieved.' },
      { pct: 75,  label: 'Significant Progress',          text: 'ANSP has met most certification requirements and is in final stages of approval.' },
      { pct: 100, label: 'Full Certification Attained',  text: 'Full certification attained and formally recognized by the national regulatory authority.' },
    ],
  },
];

export const AFRICAN_STATES = [
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Cameroon',
  'Cape Verde','Central African Republic','Chad','Comoros','Congo',
  "Côte d'Ivoire",'DRC','Djibouti','Egypt','Equatorial Guinea',
  'Eritrea','Eswatini','Ethiopia','Gabon','Gambia','Ghana','Guinea',
  'Guinea-Bissau','Kenya','Lesotho','Liberia','Libya','Madagascar',
  'Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique',
  'Namibia','Niger','Nigeria','Rwanda','São Tomé and Príncipe',
  'Senegal','Sierra Leone','Somalia','South Africa','South Sudan',
  'Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe',
];
