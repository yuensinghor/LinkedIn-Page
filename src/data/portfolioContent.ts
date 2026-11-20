export type SiteLanguage = 'en' | 'de';
export type IntroLanguage = 'en' | 'de' | 'zh' | 'yue' | 'ms';
export type ProjectId = 'home-inventory' | 'cantonese-voice';

/**
 * Edit this config object later to drop in your real name, email, and social links.
 */
export const SITE_CONFIG = {
  namePlaceholder: '[Your Name]',
  emailPlaceholder: 'you@example.com',
  githubUrl: 'https://github.com/your-handle',
  linkedinUrl: 'https://linkedin.com/in/your-handle',
};

export interface IntroTabItem {
  id: IntroLanguage;
  tabLabel: string;
  languageName: string;
  placeholderText: string;
}

export const INTRO_TABS: IntroTabItem[] = [
  {
    id: 'en',
    tabLabel: 'EN',
    languageName: 'English',
    placeholderText:
      '[EN Intro Placeholder: 2–3 sentences about who I am, what kind of applied AI & home automation systems I like to tinker with, and what motivates my hobby builds.]',
  },
  {
    id: 'de',
    tabLabel: 'DE',
    languageName: 'Deutsch',
    placeholderText:
      '[DE Intro Platzhalter: 2–3 kurze Sätze darüber, wer ich bin, welche praktischen KI- und Smart-Home-Projekte ich baue und was mich an angewandter Automatisierung reizt.]',
  },
  {
    id: 'zh',
    tabLabel: '中文',
    languageName: '普通话 / Mandarin',
    placeholderText:
      '[中文简介占位符：用两到三句话介绍我是谁、平时喜欢做什么样的实用型 AI 与智能家居小项目，以及我关注多语言语音交互的原因。]',
  },
  {
    id: 'yue',
    tabLabel: '粵語',
    languageName: '廣東話 / Cantonese',
    placeholderText:
      '[粵語簡介佔位符：用兩三句自然口語介紹返我係邊個、平時點解會整啲屋企用嘅 AI 同語音自動化小工具，同埋點解想令智能家居聽得明廣東話溝英文講嘢。]',
  },
  {
    id: 'ms',
    tabLabel: 'BM',
    languageName: 'Bahasa Malaysia',
    placeholderText:
      '[Pemegang Tempat Intro BM: 2–3 ayat ringkas tentang siapa saya, projek hobi AI gunaan dan automasi rumah yang saya bina, serta minat saya dalam AI berbilang bahasa.]',
  },
];

export interface SystemFlowNode {
  id: string;
  step: string;
  label: string;
  detail: string;
}

export interface DepthCard {
  index: string;
  title: string;
  points: string[];
}

export interface ProjectCaseStudy {
  id: ProjectId;
  index: string;
  title: string;
  statusTag: string;
  summary: string;
  wireframeLabel: string;
  wireframeSublabel: string;
  wireframeRatio: string;
  layer1: {
    storyEyebrow: string;
    heroCaption: string;
    beforeTitle: string;
    beforePoints: string[];
    afterTitle: string;
    afterPoints: string[];
    exampleTitle: string;
    exampleSubtitle: string;
    spokenLabel: string;
    spokenUtterance: string;
    responseLabel: string;
    systemOutcome: string;
    exampleNote: string;
  };
  layer2: {
    flowTitle: string;
    flowCaption: string;
    flowNodes: SystemFlowNode[];
    cards: DepthCard[];
  };
}

export interface TimelineNode {
  id: string;
  period: string;
  state: 'past' | 'now' | 'next';
  stateLabel: string;
  title: string;
  description: string;
}

export interface SiteCopy {
  nav: {
    projects: string;
    howIBuild: string;
    journey: string;
  };
  hero: {
    photoLabel: string;
    photoSublabel: string;
    statusPill: string;
    headline: string;
    subline: string;
    primaryCta: string;
    secondaryCta: string;
    copiedEmailLabel: string;
  };
  introCard: {
    title: string;
    hint: string;
  };
  builds: {
    sectionIndex: string;
    sectionTitle: string;
    sectionSub: string;
    readCaseStudy: string;
  };
  howIBuild: {
    sectionIndex: string;
    sectionTitle: string;
    sectionSub: string;
    leftColumnTitle: string;
    leftBullets: string[];
    rightColumnTitle: string;
    rightBullets: string[];
  };
  journey: {
    sectionIndex: string;
    sectionTitle: string;
    sectionSub: string;
    items: TimelineNode[];
  };
  footer: {
    availabilityLine: string;
    emailLabel: string;
    githubLabel: string;
    linkedinLabel: string;
    legalLabel: string;
    legalModalTitle: string;
    legalModalBody: string[];
    closeLabel: string;
  };
  caseStudyUi: {
    backToHome: string;
    jumpToTechnical: string;
    layer1Label: string;
    dividerLabel: string;
    layer2Label: string;
  };
  projects: Record<ProjectId, ProjectCaseStudy>;
}

export const PORTFOLIO_COPY: Record<SiteLanguage, SiteCopy> = {
  en: {
    nav: {
      projects: 'Projects',
      howIBuild: 'How I Build',
      journey: 'Journey',
    },
    hero: {
      photoLabel: '[Photo of Me · 1:1]',
      photoSublabel: 'Square portrait placeholder',
      statusPill: '[Status: Currently building voice & home AI tools]',
      headline: '[Plain Headline Placeholder: Practical AI hobby builds for everyday home workflows.]',
      subline:
        '[Short Sub-line Placeholder: Exploring multilingual voice interfaces, local-first automation, and honest human-in-the-loop tooling.]',
      primaryCta: 'See my builds',
      secondaryCta: 'Get in touch',
      copiedEmailLabel: 'Email copied',
    },
    introCard: {
      title: 'Introduce myself',
      hint: 'Switch language for this bio block',
    },
    builds: {
      sectionIndex: '01',
      sectionTitle: 'Selected Builds',
      sectionSub: '[Short section intro placeholder: Two focused personal builds with plain stories and technical breakdowns.]',
      readCaseStudy: 'Read case study →',
    },
    howIBuild: {
      sectionIndex: '02',
      sectionTitle: 'How I Build',
      sectionSub: '[Short comparison placeholder: Clear boundary between AI-assisted execution and human engineering ownership.]',
      leftColumnTitle: 'What AI tools handle',
      leftBullets: [
        '[Placeholder bullet 01: Boilerplate scaffolding, repetitive transforms, and first-pass transcription/parsing.]',
        '[Placeholder bullet 02: Rapidly prototyping edge-case inputs and summarizing noisy logs.]',
        '[Placeholder bullet 03: Generating test fixtures and multilingual utterance variations.]',
      ],
      rightColumnTitle: 'What I own & decide',
      rightBullets: [
        '[Placeholder bullet 01: System architecture, hardware boundaries, and local vs. API privacy tradeoffs.]',
        '[Placeholder bullet 02: Failure-mode handling, deterministic routing rules, and fallback safety.]',
        '[Placeholder bullet 03: Final UX judgment, real-world hardware testing, and knowing when not to use an LLM.]',
      ],
    },
    journey: {
      sectionIndex: '03',
      sectionTitle: 'Connecting Dots',
      sectionSub: '[Timeline placeholder: Where past foundations lead into current builds and what comes next.]',
      items: [
        {
          id: 'past-1',
          period: '[Past · Step 01]',
          state: 'past',
          stateLabel: 'Past',
          title: '[Past Milestone Placeholder: Foundations & Curiosity]',
          description: '[Short placeholder: Early work, technical background, or foundational experience.]',
        },
        {
          id: 'past-2',
          period: '[Past · Step 02]',
          state: 'past',
          stateLabel: 'Past',
          title: '[Past Milestone Placeholder: First Automation & Hardware Tinkering]',
          description: '[Short placeholder: Transition from scripts into real physical home setups.]',
        },
        {
          id: 'now',
          period: '[Now]',
          state: 'now',
          stateLabel: 'Now',
          title: '[Now Placeholder: Building Cantonese Voice & Home Inventory AI Tools]',
          description:
            '[Short placeholder: Iterating on multilingual speech pipelines, Home Assistant routing, and practical household utilities.]',
        },
        {
          id: 'next',
          period: '[Next]',
          state: 'next',
          stateLabel: 'Next',
          title: '[Next Placeholder: Applied AI, Automation & Multilingual Voice Roles]',
          description:
            '[Short placeholder: Taking these practical engineering habits into a collaborative product or applied AI team.]',
        },
      ],
    },
    footer: {
      availabilityLine: 'Open to opportunities in Applied AI, Automation & Multilingual/Voice AI',
      emailLabel: 'Email',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      legalLabel: 'Impressum / Privacy',
      legalModalTitle: 'Impressum / Privacy [Placeholder]',
      legalModalBody: [
        '[Impressum Placeholder: Insert your full name, contact address, and email as required for your region.]',
        '[Privacy Placeholder: State whether any analytics, cookies, or external embeds are used. This structural draft uses zero tracking cookies and stores no user data.]',
      ],
      closeLabel: 'Close',
    },
    caseStudyUi: {
      backToHome: '← Back to home',
      jumpToTechnical: 'Jump to Under the hood ↓',
      layer1Label: 'Layer 1 — Plain Story',
      dividerLabel: '● UNDER THE HOOD ●',
      layer2Label: 'Layer 2 — Technical Depth',
    },
    projects: {
      'home-inventory': {
        id: 'home-inventory',
        index: '01',
        title: 'Home Inventory',
        statusTag: '[Status: Working Prototype]',
        summary: '[One-liner placeholder: A quiet, structured way to catalog household items and find where things live without spreadsheet friction.]',
        wireframeLabel: '[Home Inventory UI / Photo Placeholder · 16:10]',
        wireframeSublabel: 'Item list + quick search + storage location wireframe slot',
        wireframeRatio: '16:10',
        layer1: {
          storyEyebrow: 'Plain Story · Build 01',
          heroCaption: '[Screenshot placeholder: Clean overview of rooms, storage boxes, and searchable item entries.]',
          beforeTitle: 'Before',
          beforePoints: [
            '[Before placeholder 01: Buying duplicates because items are hidden in unmarked storage bins.]',
            '[Before placeholder 02: Manual spreadsheets get abandoned after two weekends.]',
            '[Before placeholder 03: Hard to search across languages or informal item nicknames.]',
          ],
          afterTitle: 'After',
          afterPoints: [
            '[After placeholder 01: Quick capture flow turns messy notes or photos into structured entries.]',
            '[After placeholder 02: Instant lookup by room, box label, or everyday phrasing.]',
            '[After placeholder 03: Stays calm, local-first, and easy for everyone at home to use.]',
          ],
          exampleTitle: 'Real Cantonese Example',
          exampleSubtitle: '[Placeholder: Mixed Cantonese + English household item query]',
          spokenLabel: 'Query / Input',
          spokenUtterance: '"[Placeholder: 嗰條 USB-C hub 放咗喺邊個箱？]"',
          responseLabel: 'Lookup Output',
          systemOutcome: '[Placeholder: Matched "USB-C Hub" → Storage Box B2 · Study Shelf · Last updated placeholder]',
          exampleNote:
            '[Context placeholder: Shows how colloquial Cantonese phrasing plus English hardware terms resolve to the exact item record.]',
        },
        layer2: {
          flowTitle: 'System Flow',
          flowCaption: '[Placeholder: End-to-end flow from quick capture input to structured lookup.]',
          flowNodes: [
            {
              id: 'input',
              step: '01',
              label: 'Quick Input / Photo',
              detail: '[Text note or snapshot]',
            },
            {
              id: 'parser',
              step: '02',
              label: 'AI Item Parser',
              detail: '[Extract name, tags, location]',
            },
            {
              id: 'schema',
              step: '03',
              label: 'Schema Validation',
              detail: '[Normalize room & bin ID]',
            },
            {
              id: 'store',
              step: '04',
              label: 'Local Store & Index',
              detail: '[Structured persistence]',
            },
            {
              id: 'ui',
              step: '05',
              label: 'Search & Lookup UI',
              detail: '[Fast bilingual retrieval]',
            },
          ],
          cards: [
            {
              index: '01',
              title: 'Key Decisions & Tradeoffs',
              points: [
                '[Tradeoff placeholder 01: Structured schema validation over free-form LLM answers for search reliability.]',
                '[Tradeoff placeholder 02: Simple local-first storage chosen over heavy cloud sync complexity.]',
              ],
            },
            {
              index: '02',
              title: 'AI vs. Human Split',
              points: [
                '[AI role placeholder: Extracts candidate item attributes and bilingual synonyms from messy input.]',
                '[Human role placeholder: Owns taxonomy rules, confirmation edits, and storage hierarchy.]',
              ],
            },
            {
              index: '03',
              title: 'What Went Wrong & How I Tested It',
              points: [
                '[Failure placeholder: Mixed-language item names initially split into duplicate records.]',
                '[Testing placeholder: Tested against a real fixture list of household cables, tools, and seasonal items.]',
              ],
            },
            {
              index: '04',
              title: "What's Next",
              points: [
                '[Next placeholder 01: Printable QR/label workflow for physical storage bins.]',
                '[Next placeholder 02: Optional voice lookup bridge from the home assistant setup.]',
              ],
            },
          ],
        },
      },
      'cantonese-voice': {
        id: 'cantonese-voice',
        index: '02',
        title: 'Cantonese Voice Home Assistant',
        statusTag: '[Status: Active Hardware Build]',
        summary:
          '[One-liner placeholder: Spoken Cantonese + English device commands routed via ReSpeaker, Home Assistant, Shelly relays, and DeepSeek API.]',
        wireframeLabel: '[Hardware & UI Placeholder · ReSpeaker + Home Assistant + Shelly + DeepSeek API]',
        wireframeSublabel: 'Desk mic hardware + Home Assistant state view wireframe slot',
        wireframeRatio: '16:10',
        layer1: {
          storyEyebrow: 'Plain Story · Build 02',
          heroCaption:
            '[Photo placeholder: ReSpeaker microphone array on desk alongside Shelly relay module and Home Assistant dashboard.]',
          beforeTitle: 'Before',
          beforePoints: [
            '[Before placeholder 01: Off-the-shelf voice assistants fail on natural Cantonese code-switching with English device names.]',
            '[Before placeholder 02: Family members fall back to phone apps or wall switches instead of voice.]',
            '[Before placeholder 03: Cloud assistants feel opaque and awkward for quick local room actions.]',
          ],
          afterTitle: 'After',
          afterPoints: [
            '[After placeholder 01: Speak naturally in Cantonese mixed with English device labels.]',
            '[After placeholder 02: Predictable routing triggers real Shelly switches via Home Assistant.]',
            '[After placeholder 03: Short, natural voice confirmation plays back in the room.]',
          ],
          exampleTitle: 'Real Cantonese Example',
          exampleSubtitle: '[Placeholder: Spoken Cantonese + English device name interaction]',
          spokenLabel: 'Spoken Input',
          spokenUtterance: '"[Placeholder: 幫我開咗客廳盞 Desk Lamp，順便睇下 AC 熄咗未。]"',
          responseLabel: 'Assistant Action & Reply',
          systemOutcome:
            '[Placeholder: Intent routed → Shelly light.desk_lamp ON + climate.ac status checked → TTS reply in Cantonese]',
          exampleNote:
            '[Context placeholder: Demonstrates code-switching between Cantonese verbs/particles and English Home Assistant entity names.]',
        },
        layer2: {
          flowTitle: 'System Flow',
          flowCaption: '[Placeholder: Audio capture through transcription, intent routing, device execution, and spoken reply.]',
          flowNodes: [
            {
              id: 'mic',
              step: '01',
              label: 'ReSpeaker Mic',
              detail: '[Wake word & audio capture]',
            },
            {
              id: 'stt',
              step: '02',
              label: 'Cantonese STT',
              detail: '[Speech-to-text + code-switch]',
            },
            {
              id: 'router',
              step: '03',
              label: 'Intent / Router',
              detail: '[Entity match & guardrails]',
            },
            {
              id: 'core',
              step: '04',
              label: 'DeepSeek API / Home Assistant',
              detail: '[Reasoning & state bridge]',
            },
            {
              id: 'act',
              step: '05',
              label: 'Shelly & TTS',
              detail: '[Relay trigger + voice reply]',
            },
          ],
          cards: [
            {
              index: '01',
              title: 'Key Decisions & Tradeoffs',
              points: [
                '[Tradeoff placeholder 01: Constrained Home Assistant intent whitelist vs. open-ended tool calling for latency & safety.]',
                '[Tradeoff placeholder 02: DeepSeek API reasoning paired with local Shelly control for cost/accuracy balance.]',
              ],
            },
            {
              index: '02',
              title: 'AI vs. Human Split',
              points: [
                '[AI role placeholder: Handles noisy Cantonese+English transcript normalization and intent extraction.]',
                '[Human role placeholder: Defines allowed entity map, confirmation thresholds, and hardware fail-safes.]',
              ],
            },
            {
              index: '03',
              title: 'What Went Wrong & How I Tested It',
              points: [
                '[Failure placeholder: Homophone drift in Cantonese STT occasionally mapped to the wrong room switch.]',
                '[Testing placeholder: Built a replay harness of real spoken test phrases against mock and live Home Assistant endpoints.]',
              ],
            },
            {
              index: '04',
              title: "What's Next",
              points: [
                '[Next placeholder 01: Reduce end-to-end turn latency between wake word and Shelly actuation.]',
                '[Next placeholder 02: Expand multi-room audio feedback and clearer error phrasing.]',
              ],
            },
          ],
        },
      },
    },
  },
  de: {
    nav: {
      projects: 'Projekte',
      howIBuild: 'Arbeitsweise',
      journey: 'Werdegang',
    },
    hero: {
      photoLabel: '[Foto von mir · 1:1]',
      photoSublabel: 'Quadratischer Porträt-Platzhalter',
      statusPill: '[Status: Entwickle aktuell Sprach- & Smart-Home-KI-Tools]',
      headline: '[Überschrift-Platzhalter: Pragmatische KI-Hobbyprojekte für reale Alltagsabläufe.]',
      subline:
        '[Untertitel-Platzhalter: Fokus auf mehrsprachige Sprachschnittstellen, lokale Automatisierung und klare Kontrolle durch den Menschen.]',
      primaryCta: 'Projekte ansehen',
      secondaryCta: 'Kontakt aufnehmen',
      copiedEmailLabel: 'E-Mail kopiert',
    },
    introCard: {
      title: 'Kurz über mich',
      hint: 'Sprache nur für diesen Block wechseln',
    },
    builds: {
      sectionIndex: '01',
      sectionTitle: 'Ausgewählte Projekte',
      sectionSub: '[Abschnitt-Platzhalter: Zwei fokussierte Eigenentwicklungen mit verständlicher Story und technischem Deep-Dive.]',
      readCaseStudy: 'Fallstudie lesen →',
    },
    howIBuild: {
      sectionIndex: '02',
      sectionTitle: 'Wie ich baue',
      sectionSub: '[Vergleich-Platzhalter: Klare Trennung zwischen KI-Unterstützung und eigener Engineering-Verantwortung.]',
      leftColumnTitle: 'Was KI-Tools übernehmen',
      leftBullets: [
        '[Platzhalter 01: Grundgerüste, wiederkehrende Transformationen und erste Transkriptions-/Parsing-Schritte.]',
        '[Platzhalter 02: Schnelles Durchspielen von Grenzfällen und Zusammenfassen unruhiger Logs.]',
        '[Platzhalter 03: Generieren von Testdaten und mehrsprachigen Beispielsätzen.]',
      ],
      rightColumnTitle: 'Was ich selbst entscheide',
      rightBullets: [
        '[Platzhalter 01: Systemarchitektur, Hardware-Grenzen sowie Abwägung zwischen lokalem Betrieb und API.]',
        '[Platzhalter 02: Fehlerbehandlung, deterministische Routing-Regeln und Sicherheits-Fallbacks.]',
        '[Platzhalter 03: Finale UX-Qualität, echte Hardware-Tests und die Entscheidung, wann kein LLM nötig ist.]',
      ],
    },
    journey: {
      sectionIndex: '03',
      sectionTitle: 'Verbindungslinien',
      sectionSub: '[Zeitstrahl-Platzhalter: Wie frühere Stationen zu aktuellen Projekten und den nächsten Zielen führen.]',
      items: [
        {
          id: 'past-1',
          period: '[Vergangenheit · Schritt 01]',
          state: 'past',
          stateLabel: 'Früher',
          title: '[Meilenstein-Platzhalter: Grundlagen & Neugier]',
          description: '[Kurzer Platzhalter: Frühere Erfahrungen, technischer Hintergrund oder Einstieg.]',
        },
        {
          id: 'past-2',
          period: '[Vergangenheit · Schritt 02]',
          state: 'past',
          stateLabel: 'Früher',
          title: '[Meilenstein-Platzhalter: Erste Automatisierungen & Hardware]',
          description: '[Kurzer Platzhalter: Übergang von kleinen Skripten zu physischen Smart-Home-Setups.]',
        },
        {
          id: 'now',
          period: '[Jetzt]',
          state: 'now',
          stateLabel: 'Jetzt',
          title: '[Jetzt-Platzhalter: Kantonesische Sprachsteuerung & Home-Inventory-Tools]',
          description:
            '[Kurzer Platzhalter: Arbeit an mehrsprachigen Speech-Pipelines, Home-Assistant-Routing und praktischen Alltagstools.]',
        },
        {
          id: 'next',
          period: '[Als Nächstes]',
          state: 'next',
          stateLabel: 'Nächstes',
          title: '[Zukunft-Platzhalter: Angewandte KI, Automatisierung & Voice AI]',
          description:
            '[Kurzer Platzhalter: Diese praxisnahe Bauweise in ein Produkt- oder Applied-AI-Team einbringen.]',
        },
      ],
    },
    footer: {
      availabilityLine: 'Offen für Rollen in Applied AI, Automatisierung & Multilingual/Voice AI',
      emailLabel: 'E-Mail',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      legalLabel: 'Impressum / Datenschutz',
      legalModalTitle: 'Impressum / Datenschutz [Platzhalter]',
      legalModalBody: [
        '[Impressum-Platzhalter: Hier Namen, ladungsfähige Anschrift und E-Mail-Adresse gemäß gesetzlichen Vorgaben eintragen.]',
        '[Datenschutz-Platzhalter: Hinweis zu verwendeten Diensten. Dieser Entwurf setzt keine Tracking-Cookies und speichert keine Nutzerdaten.]',
      ],
      closeLabel: 'Schließen',
    },
    caseStudyUi: {
      backToHome: '← Zurück zur Startseite',
      jumpToTechnical: 'Direkt zu Under the hood ↓',
      layer1Label: 'Ebene 1 — Klare Story',
      dividerLabel: '● UNDER THE HOOD ●',
      layer2Label: 'Ebene 2 — Technische Tiefe',
    },
    projects: {
      'home-inventory': {
        id: 'home-inventory',
        index: '01',
        title: 'Home Inventory',
        statusTag: '[Status: Funktionsfähiger Prototyp]',
        summary: '[Einzeiler-Platzhalter: Ruhiges, strukturiertes Haushaltsinventar zum schnellen Wiederfinden von Gegenständen ohne Tabellen-Chaos.]',
        wireframeLabel: '[Home Inventory UI / Foto-Platzhalter · 16:10]',
        wireframeSublabel: 'Artikelliste + Schnellsuche + Lagerort-Wireframe',
        wireframeRatio: '16:10',
        layer1: {
          storyEyebrow: 'Klare Story · Projekt 01',
          heroCaption: '[Screenshot-Platzhalter: Übersicht über Räume, Aufbewahrungsboxen und durchsuchbare Einträge.]',
          beforeTitle: 'Vorher',
          beforePoints: [
            '[Vorher-Platzhalter 01: Doppelkäufe, weil Dinge in unbeschrifteten Kisten verschwinden.]',
            '[Vorher-Platzhalter 02: Manuelle Tabellen werden nach zwei Wochenenden nicht mehr gepflegt.]',
            '[Vorher-Platzhalter 03: Schwierige Suche über verschiedene Sprachen oder Spitznamen hinweg.]',
          ],
          afterTitle: 'Nachher',
          afterPoints: [
            '[Nachher-Platzhalter 01: Schneller Erfassungsflow wandelt Notizen oder Fotos in saubere Einträge um.]',
            '[Nachher-Platzhalter 02: Sofortiges Finden nach Raum, Box-Label oder Alltagssprache.]',
            '[Nachher-Platzhalter 03: Bleibt schlicht, lokal nutzbar und für den gesamten Haushalt zugänglich.]',
          ],
          exampleTitle: 'Reales Kantonesisch-Beispiel',
          exampleSubtitle: '[Platzhalter: Gemischte Kantonesisch + Englisch Suchanfrage]',
          spokenLabel: 'Anfrage / Eingabe',
          spokenUtterance: '"[Platzhalter: 嗰條 USB-C hub 放咗喺邊個箱？]"',
          responseLabel: 'Suchergebnis',
          systemOutcome: '[Platzhalter: Treffer "USB-C Hub" → Box B2 · Arbeitszimmer-Regal · Letztes Update]',
          exampleNote:
            '[Kontext-Platzhalter: Zeigt, wie umgangssprachliches Kantonesisch mit englischen Technikbegriffen direkt zum passenden Eintrag führt.]',
        },
        layer2: {
          flowTitle: 'Systemfluss',
          flowCaption: '[Platzhalter: Durchgängiger Ablauf von der schnellen Erfassung bis zur strukturierten Suche.]',
          flowNodes: [
            {
              id: 'input',
              step: '01',
              label: 'Kurzeingabe / Foto',
              detail: '[Notiz oder Schnappschuss]',
            },
            {
              id: 'parser',
              step: '02',
              label: 'KI-Item-Parser',
              detail: '[Name, Tags, Ort extrahieren]',
            },
            {
              id: 'schema',
              step: '03',
              label: 'Schema-Validierung',
              detail: '[Raum- & Box-ID normieren]',
            },
            {
              id: 'store',
              step: '04',
              label: 'Lokaler Speicher & Index',
              detail: '[Strukturierte Ablage]',
            },
            {
              id: 'ui',
              step: '05',
              label: 'Suche & Lookup-UI',
              detail: '[Schnelle zweisprachige Suche]',
            },
          ],
          cards: [
            {
              index: '01',
              title: 'Wichtige Entscheidungen & Tradeoffs',
              points: [
                '[Tradeoff-Platzhalter 01: Feste Schema-Validierung statt freier LLM-Antworten für verlässliche Suchtreffer.]',
                '[Tradeoff-Platzhalter 02: Einfache lokale Speicherung statt komplexer Cloud-Synchronisation.]',
              ],
            },
            {
              index: '02',
              title: 'KI vs. Mensch Aufteilung',
              points: [
                '[KI-Rolle Platzhalter: Extrahiert Attribute und mehrsprachige Synonyme aus unstrukturierten Eingaben.]',
                '[Mensch-Rolle Platzhalter: Bestimmt Taxonomie, Korrekturen und physische Box-Logik.]',
              ],
            },
            {
              index: '03',
              title: 'Was schiefging & wie ich getestet habe',
              points: [
                '[Fehler-Platzhalter: Gemischtsprachige Namen erzeugten anfangs doppelte Einträge.]',
                '[Test-Platzhalter: Gegen eine reale Testliste aus Kabeln, Werkzeug und Saisonartikeln geprüft.]',
              ],
            },
            {
              index: '04',
              title: 'Wie es weitergeht',
              points: [
                '[Nächstes-Platzhalter 01: Druckbare QR-Etiketten für physische Boxen.]',
                '[Nächstes-Platzhalter 02: Optionale Sprachabfrage über das Home-Assistant-Setup.]',
              ],
            },
          ],
        },
      },
      'cantonese-voice': {
        id: 'cantonese-voice',
        index: '02',
        title: 'Cantonese Voice Home Assistant',
        statusTag: '[Status: Aktives Hardware-Projekt]',
        summary:
          '[Einzeiler-Platzhalter: Gesprochene Kantonesisch-+Englisch-Befehle über ReSpeaker, Home Assistant, Shelly-Relais und DeepSeek API.]',
        wireframeLabel: '[Hardware- & UI-Platzhalter · ReSpeaker + Home Assistant + Shelly + DeepSeek API]',
        wireframeSublabel: 'Tischmikrofon-Hardware + Home-Assistant-Statusansicht',
        wireframeRatio: '16:10',
        layer1: {
          storyEyebrow: 'Klare Story · Projekt 02',
          heroCaption:
            '[Foto-Platzhalter: ReSpeaker-Mikrofonarray auf dem Schreibtisch neben Shelly-Modul und Home-Assistant-Dashboard.]',
          beforeTitle: 'Vorher',
          beforePoints: [
            '[Vorher-Platzhalter 01: Standard-Sprachassistenten scheitern an natürlichem Kantonesisch mit englischen Gerätenamen.]',
            '[Vorher-Platzhalter 02: Im Alltag greift man doch wieder zur Smartphone-App oder zum Wandschalter.]',
            '[Vorher-Platzhalter 03: Cloud-Assistenten wirken für schnelle lokale Raumaktionen träge und intransparent.]',
          ],
          afterTitle: 'Nachher',
          afterPoints: [
            '[Nachher-Platzhalter 01: Natürliches Sprechen auf Kantonesisch gemischt mit englischen Gerätenamen.]',
            '[Nachher-Platzhalter 02: Vorhersagbares Routing schaltet echte Shelly-Aktoren über Home Assistant.]',
            '[Nachher-Platzhalter 03: Kurze, natürliche Sprachbestätigung direkt im Raum.]',
          ],
          exampleTitle: 'Reales Kantonesisch-Beispiel',
          exampleSubtitle: '[Platzhalter: Gesprochenes Kantonesisch + englischer Gerätename]',
          spokenLabel: 'Gesprochene Eingabe',
          spokenUtterance: '"[Platzhalter: 幫我開咗客廳盞 Desk Lamp，順便睇下 AC 熄咗未。]"',
          responseLabel: 'Aktion & Antwort',
          systemOutcome:
            '[Platzhalter: Intent geroutet → Shelly light.desk_lamp EIN + climate.ac geprüft → Kantonesische TTS-Antwort]',
          exampleNote:
            '[Kontext-Platzhalter: Zeigt das Code-Switching zwischen kantonesischen Verben und englischen Home-Assistant-Gerätenamen.]',
        },
        layer2: {
          flowTitle: 'Systemfluss',
          flowCaption: '[Platzhalter: Audioaufnahme über Transkription, Intent-Routing, Gerätesteuerung bis zur Sprachantwort.]',
          flowNodes: [
            {
              id: 'mic',
              step: '01',
              label: 'ReSpeaker Mic',
              detail: '[Wake-Word & Audioaufnahme]',
            },
            {
              id: 'stt',
              step: '02',
              label: 'Cantonese STT',
              detail: '[Spracherkennung + Code-Switch]',
            },
            {
              id: 'router',
              step: '03',
              label: 'Intent / Router',
              detail: '[Entity-Abgleich & Guardrails]',
            },
            {
              id: 'core',
              step: '04',
              label: 'DeepSeek API / Home Assistant',
              detail: '[Interpretation & State-Bridge]',
            },
            {
              id: 'act',
              step: '05',
              label: 'Shelly & TTS',
              detail: '[Schaltaktor + Sprachausgabe]',
            },
          ],
          cards: [
            {
              index: '01',
              title: 'Wichtige Entscheidungen & Tradeoffs',
              points: [
                '[Tradeoff-Platzhalter 01: Begrenzte Home-Assistant-Whitelist statt freiem Tool-Calling für Latenz und Sicherheit.]',
                '[Tradeoff-Platzhalter 02: DeepSeek API kombiniert mit lokaler Shelly-Steuerung für gutes Preis-Leistungs-Verhältnis.]',
              ],
            },
            {
              index: '02',
              title: 'KI vs. Mensch Aufteilung',
              points: [
                '[KI-Rolle Platzhalter: Normalisiert gemischte Kantonesisch+Englisch-Transkripte und erkennt Intents.]',
                '[Mensch-Rolle Platzhalter: Definiert erlaubte Entitäten, Bestätigungsregeln und Hardware-Sicherheitsgrenzen.]',
              ],
            },
            {
              index: '03',
              title: 'Was schiefging & wie ich getestet habe',
              points: [
                '[Fehler-Platzhalter: Ähnlich klingende kantonesische Silben führten anfangs zum falschen Raumschalter.]',
                '[Test-Platzhalter: Replay-Testsuite mit echten Sprachaufnahmen gegen Mock- und Live-Home-Assistant-Endpunkte.]',
              ],
            },
            {
              index: '04',
              title: 'Wie es weitergeht',
              points: [
                '[Nächstes-Platzhalter 01: Ende-zu-Ende-Latenz zwischen Wake-Word und Shelly-Reaktion verkürzen.]',
                '[Nächstes-Platzhalter 02: Mehrraum-Audiofeedback und klarere Fehleransagen ergänzen.]',
              ],
            },
          ],
        },
      },
    },
  },
};
