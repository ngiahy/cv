/* =====================================================================
   CV DATA — this is the ONLY file you need to edit to update your CV.
   ---------------------------------------------------------------------
   • Text between quotes "..." can be changed freely.
   • Lists are written between [ ... ], items separated by commas.
   • Leave a value empty ("" or []) and that item / whole section is
     hidden automatically — nothing else needs to change.
   • Keep commas and quotes exactly as they are. If the page goes blank
     after an edit, a comma or a quote is probably missing.
   • Lines starting with // are comments and are ignored.
   ===================================================================== */
window.CV_DATA = {

  /* ---------- Identity ---------- */
  name: "Nguyen Gia Hy",
  initials: "GH",
  title: "Funded Trader · Aspiring Fund Manager",
  tagline: "Financial-markets practitioner with a medical-science background, now preparing for the Master of Finance (MFin) at Massey University on the path to becoming a professional fund manager.",
  location: "Viet Nam",
  photo: "assets/avatar.jpg",          // square photo; if the file is missing, initials are shown instead
  lastUpdated: "September 2026",
  siteUrl: "https://ngiahy.github.io/cv/",      // public address; printed at the end of the PDF
  pdfFile: "assets/Nguyen-Gia-Hy-CV.pdf",      // static PDF served by the Download button (rebuild: python tools/build.py). Leave "" to use the browser print dialog instead

  /* ---------- Contact ---------- */
  contact: {
    email: "hya4csltt@gmail.com",
    phone: "+84 901 030 636",
    phoneHref: "+84901030636",         // digits only, used for the tap-to-call link
    github: "https://github.com/ngiahy",
    linkedin: "",                      // e.g. "https://www.linkedin.com/in/your-name"
    website: ""                        // e.g. "https://your-site.com"
  },

  /* ---------- "At a glance" cards under the hero ---------- */
  highlights: [
    "Doctor of Preventive Medicine (2022)",
    "Funded trader with FTMO & The5ers",
    "Venture research & DeFi community",
    "Self-built trading & fintech tools"
  ],

  /* ---------- About me (one string per paragraph) ---------- */
  about: [
    "I am a preventive-medicine graduate who now manages funded trading accounts for FTMO and The5ers, working every day under strict daily-loss and drawdown limits. Medical training at Can Tho University of Medicine and Pharmacy gave me a foundation in evidence-based, quantitative thinking; venture research and DeFi community work then drew me into financial markets, where I have since built a verified track record of consistent, risk-controlled trading.",
    "My ambition is to become a professional fund manager. Trading under proprietary-firm rules has taught me discipline, risk control and consistency; what I need next is a rigorous, internationally recognised academic grounding in investments, corporate finance and risk management, which is why I am applying to the Master of Finance at Massey University."
  ],

  objective: {
    label: "Why Massey",
    heading: "Master of Finance (MFin) — Massey University",
    text: "An internationally recognised finance qualification, a global professional network and the chance to grow as a global citizen: the foundation for a fund-management career that reaches beyond Viet Nam."
  },

  /* ---------- Education (most recent first) ----------
     Optional "image" / "thumb": a picture of the diploma cover shown on the card and
     opened full-size when clicked. Leave both "" for a text-only card. */
  education: [
    {
      degree: "Doctor of Preventive Medicine",
      school: "Can Tho University of Medicine and Pharmacy",
      location: "Can Tho, Viet Nam",
      period: "2016 – 2022",
      type: "Medical degree",
      badge: "",
      details: [
        "Full-time medical degree covering clinical medicine, epidemiology, biostatistics and public health; degree conferred July 2022.",
        "Developed a rigorous, evidence-based and quantitative approach to problem solving that I now apply to financial analysis."
      ],
      image: "assets/education/ctump-doctor-degree-cover.jpg",
      thumb: "assets/education/ctump-doctor-degree-cover-thumb.jpg",
      imageCaption: "Doctor's degree — Can Tho University of Medicine and Pharmacy (cover)"
    },
    {
      degree: "Business Administration — Professional Training",
      school: "PR Coaching Joint Stock Company",
      location: "Viet Nam",
      period: "2024 – 2025",
      type: "Course certificate",
      badge: "",
      details: [
        "Practical training in business administration: strategy, operations, marketing and financial fundamentals.",
        "Course certificate awarded November 2024."
      ],
      image: "assets/education/pr-coaching-certificate-cover.jpg",
      thumb: "assets/education/pr-coaching-certificate-cover-thumb.jpg",
      imageCaption: "Business Administration course certificate — PR Coaching JSC (cover)"
    }
  ],

  /* ---------- Experience (most recent first) ---------- */
  experience: [
    {
      role: "Funded Trader (Proprietary Trading Accounts)",
      company: "FTMO · The5ers",
      location: "Remote",
      period: "2025 – Present",
      type: "Proprietary trading",
      badge: "Current",
      details: [
        "Manage funded proprietary-trading accounts under strict risk parameters, including daily-loss and maximum-drawdown limits.",
        "Follow a systematic risk-management process: pre-defined risk per trade, position sizing, trade journaling and regular performance reviews.",
        "Track record: FTMO Prime Trader status and Silver-tier overall rewards of USD 19,684 (April 2026); The5ers cumulative payouts of USD 9,533 (December 2025).",
        "Research, test and refine trading strategies, supported by Python-based analysis."
      ]
    },
    {
      role: "Researcher",
      company: "BlackMamba Venture",
      location: "Remote",
      period: "2024",
      type: "Venture research",
      badge: "",
      details: [
        "Researched and evaluated early-stage blockchain and fintech projects, covering tokenomics, team, market size and competitive landscape.",
        "Produced concise research reports to support investment decisions."
      ]
    },
    {
      role: "Ambassador",
      company: "Roseon Finance",
      location: "Remote",
      period: "2023",
      type: "DeFi · Community",
      badge: "",
      details: [
        "Represented Roseon Finance to the Vietnamese community: introduced the product, answered user questions and relayed feedback to the team.",
        "Created educational content on DeFi and digital-asset fundamentals to help new users get started safely."
      ]
    }
  ],

  /* ---------- Skills (icon: "chart" | "code" | "users" | "heart" | "tag") ---------- */
  skills: [
    {
      group: "Finance",
      icon: "chart",
      items: [
        "Financial analysis",
        "Technical analysis",
        "Risk & money management",
        "Position sizing & drawdown control",
        "Trade journaling & performance review",
        "Statistics & biostatistics"
      ]
    },
    {
      group: "Technology",
      icon: "code",
      items: [
        "Python",
        "Blockchain & DeFi",
        "Trading automation (MQL5)"
      ]
    },
    {
      group: "Soft skills",
      icon: "users",
      items: [
        "Self-directed learning",
        "Discipline & emotional control",
        "Analytical thinking",
        "Adaptability"
      ]
    }
  ],

  /* ---------- Projects & Portfolio ----------
     Optional per project: "period" (year or range), "status" (small badge next to the name),
     "image" / "thumb" (picture shown on the card and opened full-size when clicked), "link" (button).
     "featured: true" turns a project with a picture into a wide card (picture left, text right). */
  projectsIntro: "A selection of tools I have built to solve real problems in finance, trading and tax compliance.",
  projects: [
    {
      name: "SoloTax",
      featured: true,
      period: "2026",
      status: "In development",
      description: "Mobile app that helps Vietnamese freelancers work out which tax category they fall into, estimate what they owe and follow a step-by-step compliance checklist, driven by a rule-based engine that models the current tax rules.",
      tech: ["React Native", "Expo", "TypeScript", "Rule-based engine"],
      image: "assets/projects/solotax-app-preview.jpg",
      thumb: "assets/projects/solotax-app-preview-thumb.jpg",
      imageAlt: "SoloTax app preview: welcome screen, income-source questionnaire and tax-estimate result",
      link: "",                        // e.g. "https://github.com/ngiahy/solotax"
      linkLabel: "View project"
    },
    {
      name: "MT5 Trade Copier & Risk Dashboard",
      period: "2025 – 2026",
      status: "In daily use",
      description: "Master/slave trade copier for MetaTrader 5 with a web dashboard, built around risk control: every copied trade is sized from a pre-defined risk per account rather than a fixed lot, stop-loss and take-profit levels stay synchronised across all accounts, and the dashboard tracks results, drawdown and trade statistics across accounts and strategies to support disciplined, data-driven reviews.",
      tech: ["MQL5", "Python", "TypeScript", "MetaTrader 5"],
      image: "assets/projects/mt5-trade-copier-architecture.jpg",
      thumb: "assets/projects/mt5-trade-copier-architecture-thumb.jpg",
      imageAlt: "Architecture diagram: dashboard, master EA, shared signal folder, slave EAs with risk engine and broker execution",
      link: "",
      linkLabel: "View project"
    },
    {
      name: "Funding-Rate Arbitrage Scanner",
      period: "2024",
      status: "Completed",
      description: "Browser-based tool that scans perpetual-futures funding rates across crypto exchanges and highlights potential funding-rate arbitrage opportunities.",
      tech: ["JavaScript", "Exchange APIs", "Crypto derivatives"],
      image: "assets/projects/funding-rate-scanner-architecture.jpg",
      thumb: "assets/projects/funding-rate-scanner-architecture-thumb.jpg",
      imageAlt: "Architecture diagram: exchange APIs, fetch layer, normalisation, cross-venue comparison, ranked table, filters and calculator",
      link: "",
      linkLabel: "View project"
    },
    {
      name: "Tax Intelligence Pipeline",
      period: "2026",
      status: "In use",
      description: "Local system of three services that collects tax news from RSS and web sources, analyses policy changes and builds a traceable repository of legal documents to feed SoloTax.",
      tech: ["Data pipeline", "SQLite", "HTTP services", "Web scraping"],
      image: "assets/projects/tax-intelligence-pipeline-architecture.jpg",
      thumb: "assets/projects/tax-intelligence-pipeline-architecture-thumb.jpg",
      imageAlt: "Architecture diagram: news sources and official documents feeding Collector, Analyzer and Legal module, human review, then SoloTax",
      link: "",
      linkLabel: "View project"
    }
  ],

  /* ---------- Certifications & Tests ----------
     Leave the list empty [] to hide the section. Items with the same "group"
     are shown together under that heading, in the order they first appear.
     Example: { group: "Tests", name: "IELTS Academic", issuer: "British Council", year: "2026", score: "Overall 7.0", link: "" }
  */
  certifications: [
    /* Trading credentials */
    /* "image" = full-size picture opened in the viewer, "thumb" = small preview on the card. Leave both "" for a text-only card.
       Add imageStyle: "link" to keep the card text-only and show a "View certificate" button instead of a preview. */
    { group: "Trading credentials", name: "FTMO Prime Trader", issuer: "FTMO", year: "Apr 2026", score: "Prime Trader status awarded", link: "",
      image: "assets/certs/ftmo-prime-trader.jpg", thumb: "assets/certs/ftmo-prime-trader-thumb.jpg" },
    { group: "Trading credentials", name: "FTMO Overall Rewards — Silver Tier", issuer: "FTMO", year: "Apr 2026", score: "USD 19,684 in cumulative rewards", link: "",
      image: "assets/certs/ftmo-overall-rewards-silver.jpg", thumb: "assets/certs/ftmo-overall-rewards-silver-thumb.jpg" },
    { group: "Trading credentials", name: "OANDA Prop Trader Assessment", issuer: "OANDA Assessments Ltd", year: "Jan 2026", score: "Passed", link: "",
      image: "assets/certs/oanda-prop-trader-assessment.jpg", thumb: "assets/certs/oanda-prop-trader-assessment-thumb.jpg" },
    { group: "Trading credentials", name: "The5ers Total Payouts", issuer: "The5ers", year: "Dec 2025", score: "USD 9,533 in cumulative payouts", link: "",
      image: "assets/certs/the5ers-total-payouts.jpg", thumb: "assets/certs/the5ers-total-payouts-thumb.jpg" },
    { group: "Trading credentials", name: "The5ers Funded Trader Certificate", issuer: "The5ers", year: "Nov 2025", score: "Officially funded after meeting the programme's risk parameters", link: "",
      image: "assets/certs/the5ers-funded-certificate.jpg", thumb: "assets/certs/the5ers-funded-certificate-thumb.jpg" },
    { group: "Trading credentials", name: "FTMO Challenge & Verification", issuer: "FTMO", year: "Jun 2025", score: "Passed both evaluation phases", link: "",
      image: "assets/certs/ftmo-challenge-verification.jpg", thumb: "assets/certs/ftmo-challenge-verification-thumb.jpg" },

    /* Courses & languages */
    { group: "Courses & languages", name: "Chinese Language Course — HSK 1 equivalent", issuer: "Can Tho Chinese Language Centre", year: "Nov 2023", score: "Grade: Excellent (9.0 / 10)", link: "",
      image: "assets/certs/chinese-course-hsk1-2023.jpg", imageStyle: "link" },

    /* Awards & activities */
    { group: "Awards & activities", name: "Best Speaker Award", issuer: "Cantho Leader Toastmasters · Toastmasters International", year: "Aug 2018", score: "", link: "",
      image: "assets/certs/toastmasters-best-speaker-2018.jpg", imageStyle: "link" },
    { group: "Awards & activities", name: "Regional Youth Forum 2018 — Certificate of Completion", issuer: "Center for Sustainable Development Studies (CSDS) · Irish Aid", year: "Sep 2018", score: "", link: "",
      image: "assets/certs/regional-youth-forum-2018.jpg", imageStyle: "link" },
    { group: "Awards & activities", name: "Encouragement Award — Student Scientific Research Ideas Competition 2018", issuer: "Youth Union, Can Tho University of Medicine and Pharmacy", year: "Jan 2018", score: "", link: "",
      image: "assets/certs/research-ideas-encouragement-award-2018.jpg", imageStyle: "link" }
  ],

  /* ---------- Languages (shown in the Contact section) ---------- */
  languages: [
    { name: "Vietnamese", level: "Native" },
    { name: "English", level: "Conversational" },
    { name: "Chinese (Mandarin)", level: "Elementary · HSK 1 equivalent" }
  ]
};
