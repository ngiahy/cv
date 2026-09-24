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
    "Graduate in Preventive Medicine",
    "Funded trader with FTMO & The5ers",
    "Venture research & DeFi community",
    "Self-built trading & fintech tools"
  ],

  /* ---------- About me (one string per paragraph) ---------- */
  about: [
    "I am a lifelong learner who is constantly seeking out new knowledge and testing the limits of what I can do. I graduated in Preventive Medicine from Can Tho University of Medicine and Pharmacy, where I built a strong foundation in quantitative, evidence-based thinking. I have since channelled that same rigour into financial markets, moving from venture research and DeFi community work to managing funded trading accounts with FTMO and The5ers.",
    "My ambition is to become a professional fund manager. Trading under strict proprietary-firm risk rules has taught me discipline, risk control and consistency. The Master of Finance at Massey University is the essential next step: it will give me the rigorous academic grounding in investments, corporate finance and risk management that a professional fund manager needs."
  ],

  objective: {
    label: "Objective",
    heading: "Master of Finance (MFin) — Massey University",
    text: "To combine hands-on trading and risk-management experience with a rigorous academic foundation in finance, and to build a career as a professional fund manager."
  },

  /* ---------- Education (most recent first) ---------- */
  education: [
    {
      degree: "Doctor of Preventive Medicine",
      school: "Can Tho University of Medicine and Pharmacy",
      location: "Can Tho, Viet Nam",
      period: "",                      // e.g. "2014 – 2020"
      type: "Medical degree",
      badge: "",
      details: [
        "Full-time medical degree covering clinical medicine, epidemiology, biostatistics and public health.",
        "Developed a rigorous, evidence-based and quantitative approach to problem solving that I now apply to financial analysis."
      ]
    },
    {
      degree: "Business Administration — Professional Training",
      school: "PR Coaching Joint Stock Company",
      location: "Viet Nam",
      period: "",
      type: "Professional training",
      badge: "",
      details: [
        "Practical training in business administration: strategy, operations, marketing and financial fundamentals."
      ]
    },
    {
      degree: "Fund & Risk Management — Proprietary-Trading Programmes",
      school: "FTMO · The5ers · OANDA",
      location: "Online",
      period: "",
      type: "Trader education",
      badge: "",
      details: [
        "Structured education in capital allocation, position sizing, drawdown control and trading psychology, applied under the strict risk rules of proprietary-trading firms."
      ]
    }
  ],

  /* ---------- Experience (most recent first) ---------- */
  experience: [
    {
      role: "Funded Trader — Prop-Firm Account Manager",
      company: "FTMO · The5ers",
      location: "Remote",
      period: "Present",               // e.g. "2024 – Present"
      type: "Proprietary trading",
      badge: "Current",
      details: [
        "Manage funded proprietary-trading accounts under strict risk parameters, including daily-loss and maximum-drawdown limits.",
        "Follow a systematic risk-management process: pre-defined risk per trade, position sizing, trade journaling and regular performance reviews.",
        "Research, test and refine trading strategies, supported by Python and Excel analysis."
      ]
    },
    {
      role: "Ambassador",
      company: "Roseon Finance",
      location: "Remote",
      period: "",
      type: "DeFi · Community",
      badge: "",
      details: [
        "Represented Roseon Finance to the Vietnamese community: introduced the product, answered user questions and relayed feedback to the team.",
        "Created educational content on DeFi and digital-asset fundamentals to help new users get started safely."
      ]
    },
    {
      role: "Researcher",
      company: "BlackMamba Venture",
      location: "Remote",
      period: "",
      type: "Venture research",
      badge: "",
      details: [
        "Researched and evaluated early-stage blockchain and fintech projects, covering tokenomics, team, market size and competitive landscape.",
        "Produced concise research reports to support investment decisions."
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
        "Risk & money management"
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

  /* ---------- Projects & Portfolio ---------- */
  projectsIntro: "A selection of tools I have built to solve real problems in finance, trading and tax compliance.",
  projects: [
    {
      name: "SoloTax",
      description: "Mobile app that helps Vietnamese freelancers classify their tax obligations, estimate what they owe and follow a compliance checklist, driven by a rule-based engine that models the current tax rules.",
      tech: ["React Native", "Expo", "TypeScript", "Rule-based engine"],
      link: "",                        // e.g. "https://github.com/ngiahy/solotax"
      linkLabel: "View project"
    },
    {
      name: "Tax Intelligence Pipeline",
      description: "Local system of three services that collects tax news from RSS and web sources, analyses policy changes and builds a traceable repository of legal documents to feed SoloTax.",
      tech: ["Data pipeline", "SQLite", "HTTP services", "Web scraping"],
      link: "",
      linkLabel: "View project"
    },
    {
      name: "MT5 Trade Copier & Dashboard",
      description: "Master/slave trade copier for MetaTrader 5 with a web dashboard: low-latency order replication across accounts, risk-based lot sizing and synchronised stop-loss / take-profit management.",
      tech: ["MQL5", "Python", "MetaTrader 5"],
      link: "",
      linkLabel: "View project"
    },
    {
      name: "Trading Performance Dashboard",
      description: "Web dashboard for reviewing trading performance and statistics across accounts and strategies, built to support disciplined, data-driven performance reviews.",
      tech: ["TypeScript", "Vite", "Data visualisation"],
      link: "",
      linkLabel: "View project"
    },
    {
      name: "Funding-Rate Arbitrage Scanner",
      description: "Browser-based tool that scans perpetual-futures funding rates across crypto exchanges and highlights potential funding-rate arbitrage opportunities.",
      tech: ["JavaScript", "Exchange APIs", "Crypto derivatives"],
      link: "",
      linkLabel: "View project"
    }
  ],

  /* ---------- Certifications & Tests ----------
     Leave the list empty [] to hide the section. Example entries:
     { name: "IELTS Academic", issuer: "British Council", year: "2026", score: "Overall 7.0 (L 7.5 · R 7.0 · W 6.5 · S 7.0)", link: "" },
     { name: "CFA Level I", issuer: "CFA Institute", year: "2025", score: "Passed", link: "" }
  */
  certifications: [],

  /* ---------- Languages (shown in the Contact section) ----------
     Example: { name: "Vietnamese", level: "Native" }, { name: "English", level: "Professional working proficiency" }
  */
  languages: []
};
