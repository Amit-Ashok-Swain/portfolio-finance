import { createSlice } from "@reduxjs/toolkit";

import profileImg from "../assets/profile.jpeg";
import deepvidImg from "../assets/deepvid.webp";
import omniledgerImg from "../assets/omniledger-cover.svg";
import pulsemetricsImg from "../assets/pulsemetrics-cover.svg";
import optiflowImg from "../assets/optiflow-cover.svg";
import fintrackImg from "../assets/fintrack-cover.svg";

/*
  Amit Ashok Swain — Multi-Disciplinary Portfolio Data
  The Convergence of Finance, Technology, Data, and Product Leadership
*/

const initialState = {
  profile: {
    name: "Amit Ashok Swain",
    roles: [
      "Head of Finance Operations",
      "Sr. Engineering Project Manager",
      "Financial Engineer & Data Scientist",
      "0→1 AI & Systems Architect",
    ],
    tagline:
      "Driving product excellence, financial governance, data engineering, and 0→1 execution.",
    about:
      "Multi-disciplinary Finance Operations and Technical Product/Engineering leader with 6+ years of experience across full-cycle accounting, financial engineering, software architecture, data pipelines, and large-scale project execution. Proven track record managing full-cycle finance operations (invoicing, AP/AR, reconciliations, P&L/MIS, GST/TDS, month-end closes), leading 40+ concurrent technology workstreams, driving agile sprints, and engineering automated data-driven systems. Candidate for MSc in Financial Engineering (WorldQuant University) with a B.E. in Computer Engineering from University of Mumbai.",
    avatar: profileImg,
    location: "Navi Mumbai, Maharashtra | Global / Remote",
    socials: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/amit-ashok-s-a510b9b9/",
      },
      { name: "GitHub", url: "https://github.com/Amit-Ashok-Swain" },
      { name: "Substack", url: "https://substack.com/@amitashokswain7" },
    ],
  },

  skills: [
    "Full-Cycle Accounting",
    "P&L & Balance Sheet",
    "Cash Flow Forecasting",
    "Working Capital Optimization",
    "GST & ITC 3-Way Reconciliation",
    "Java & Spring Boot",
    "Python & FastAPI",
    "Financial Engineering",
    "Power Query Multi-Source ETL",
    "Advanced Excel (SUMIFS / XLOOKUP)",
    "Agile, Scrum & JIRA",
    "Product Management & PRDs",
    "Internal Controls & Maker-Checker",
    "5-Day Month-End Close SOP",
    "AWS EC2 & Docker",
    "Data Science & Machine Learning",
  ],

  techMatrix: [
    {
      category: "Finance & Accounting",
      items: [
        "P&L, Balance Sheet & Cash Flow Integrity",
        "General Ledger & 0-Variance Trial Balance",
        "AP & AR Sub-ledger Management & Ageing",
        "Bank Reconciliation Statements (BRS)",
        "5-Day Month-End Closing SOPs",
        "Working Capital & Liquidity Optimization",
        "13-Week Direct/Indirect Cash Forecasting",
        "Corporate Finance Foundations",
      ],
    },
    {
      category: "Software & Cloud Engineering",
      items: [
        "Java, Spring Boot, Hibernate, JPA Microservices",
        "Python, FastAPI, Django, Node.js, Express",
        "System Architecture (HLD/LLD), OOP & Clean Code",
        "AWS (EC2, S3), Docker Containers, CI/CD Actions",
        "RESTful APIs, WebSockets, Postman Testing",
        "Algorithms & Database Engineering (600+ Solved)",
        "JavaScript, MERN Stack, React & Vite",
      ],
    },
    {
      category: "Data Science & Financial Engineering",
      items: [
        "MSc in Financial Engineering Graduate Candidate",
        "Power Query Multi-Source Data ETL & Pipelines",
        "Advanced Excel Modeling (SUMIFS, XLOOKUP, Dynamic Arrays)",
        "Python (Pandas, NumPy) & Statistical Modeling",
        "SQL Query Optimization & Data Normalization",
        "Automated Discrepancy & Anomaly Detection",
        "Executive Dashboards, Scorecards & Telemetry",
      ],
    },
    {
      category: "Product & Operations Leadership",
      items: [
        "Agile, Scrum, Kanban, Sprint Planning, JIRA",
        "Product Discovery, PRD Formulation, MoSCoW",
        "40+ Concurrent Multi-Stakeholder Workstreams Managed",
        "Lean Project Management (LeanPM® Yellow Belt Certified)",
        "Process Re-Engineering (+57% Speed, -87% Errors)",
        "Veeva Vault PromoMats & Workfront Workflows",
        "Cross-Functional Leadership (Engg, Finance, Design)",
      ],
    },
    {
      category: "Statutory Taxation & Compliance",
      items: [
        "GSTR-1 Outward & GSTR-3B Tax Return Filing",
        "GSTR-2B vs Purchase Register 3-Way ITC Matching",
        "Section 17(5) Blocked Credit Governance",
        "TDS Compliance (194C, 194J, 194Q) & Audit Defense",
        "E-Invoicing & E-Way Bill Integration",
        "Statutory Audit & Tax Scrutiny Support",
      ],
    },
    {
      category: "Internal Controls & Governance",
      items: [
        "Segregation of Duties (SoD) Frameworks",
        "Maker-Checker Multi-Tier Approval Matrices",
        "Preventive Cash & Asset Release Authorization",
        "Surprise Physical Stock & Cash Audits",
        "Anti-Fraud Exception Telemetry",
        "Tamper-Proof Digital Audit Logging",
      ],
    },
  ],

  certifications: [
    {
      title: "MSc in Financial Engineering (Candidate)",
      issuer: "WorldQuant University",
      issued: "Current",
      credentialId: "WQU-MFE-2026",
      skills: ["Financial Engineering", "Quantitative Analysis", "Risk Modeling", "Advanced Econometrics"],
    },
    {
      title: "Corporate Finance Foundations",
      issuer: "NASBA",
      issued: "Verified",
      skills: ["Corporate Finance", "Capital Budgeting", "Working Capital Management", "Financial Analysis"],
    },
    {
      title: "Corporate Finance Foundations",
      issuer: "LinkedIn Learning",
      issued: "Verified",
      skills: ["Financial Statements", "P&L Analysis", "Cash Flow Valuation"],
    },
    {
      title: "IBM AI Product Management Professional",
      issuer: "IBM",
      issued: "Verified",
      skills: ["AI Automation", "Process Governance", "Data Analytics"],
    },
    {
      title: "Lean Project Management (LeanPM®) Yellow Belt",
      issuer: "LeanPM",
      issued: "Verified",
      skills: ["Root Cause Analysis", "Waste Elimination", "Process Optimization", "SOP Development"],
    },
    {
      title: "Management Consulting Professional",
      issuer: "Emory University",
      issued: "Verified",
      skills: ["Strategic Management", "Financial Diagnosis", "Executive Communication"],
    },
    {
      title: "HackerRank Software Engineer Certified & LeetCode (600+ Solved)",
      issuer: "HackerRank / LeetCode",
      issued: "Verified",
      skills: ["Algorithms", "SQL / Database Queries", "Python", "Data Automation"],
    },
  ],

  trajectory: [
    {
      type: "experience",
      year: "Nov 2024 - Present",
      title: "Sr. Engineering Project Manager & Operations Lead",
      institution: "Persist Ventures (Los Angeles, CA, USA - Remote)",
      description:
        "Manage 40+ concurrent in-house, Web3, AI, automation, and client projects. Direct end-to-end resource allocation, project budgeting, delivery governance, and cross-functional engineering teams, leveraging AI and automation to streamline financial and operational workflows.",
    },
    {
      type: "experience",
      year: "Feb 2023 - Dec 2024",
      title: "Digital Project Manager",
      institution: "GSK (GlaxoSmithKline PLC) — Mumbai, India",
      description:
        "Led global digital campaigns for commercial brands (Nucala, Arexvy, Shingrix). Improved project timelines by 100% and reduced approval turnaround by 35% using JIRA, Veeva Vault PromoMats, and structured quality-control governance.",
    },
    {
      type: "experience",
      year: "Aug 2021 - Jan 2023",
      title: "Finance Operations Manager",
      institution: "Teleperformance Global Services Pvt Ltd — Thane, Maharashtra",
      description:
        "Managed comprehensive full-cycle finance operations: Invoicing, billing, AP/AR, bank reconciliations, payments, collections, P&L/MIS reporting, payroll operations, audit support, and GST/TDS compliance. Led finance team driving process improvements that boosted operational efficiency by 57% and slashed errors by 87%.",
    },
    {
      type: "experience",
      year: "Dec 2019 - Jul 2021",
      title: "Customer Support Officer",
      institution: "Lester Infoservices Pvt Ltd — Turbhe, Maharashtra",
      description:
        "Managed high-volume customer accounts, dispute resolution, multi-channel technical support, and strict SLA compliance.",
    },
    {
      type: "education",
      year: "Current",
      title: "MSc in Financial Engineering",
      institution: "WorldQuant University",
      description:
        "Rigorous quantitative graduate curriculum covering mathematical finance, corporate risk modeling, automated data pipelines, and econometric valuation.",
    },
    {
      type: "education",
      year: "May 2022",
      title: "Bachelor of Engineering (B.E.) in Computer Engineering",
      institution: "MGM College of Engineering & Technology, University of Mumbai",
      description:
        "Graduated with strong technical grounding in software engineering, database design, algorithms, and analytical modeling. 1st Rank in Maharashtra State Level Chess Games (2015) and solved 600+ DSA/SQL questions across LeetCode and HackerRank.",
    },
  ],

  projects: [
    {
      id: 1,
      slug: "omniledger-ai",
      title: "OmniLedger AI",
      tagline: "Enterprise Financial Consolidation & Multi-Entity Reconciliation Engine",
      role: "Finance Operations & Systems Architect",
      timeline: "Enterprise Financial Suite",
      metrics: [
        { label: "Ledger Reconciliation", value: "99.98%" },
        { label: "Month-End Close", value: "5-Day Calendar" },
        { label: "Multi-Entity Nodes", value: "45+ Synced" },
        { label: "Variance Margin", value: "0.00%" },
      ],
      techStack: [
        "Corporate Finance",
        "Power Query ETL",
        "Python Automation",
        "Multi-Entity P&L",
        "Trial Balance Consolidation",
      ],
      description:
        "An enterprise-grade financial consolidation and reconciliation architecture engineered to unify multi-entity ledgers, automate month-end closing schedules, and produce real-time executive P&L and working capital scorecards.",
      challenge:
        "Corporate accounting teams struggle with fragmented multi-entity transaction spreadsheets, manual data entry errors, delayed GST reconciliation, and lack of real-time visibility into working capital.",
      solution:
        "Engineered an automated Power Query and financial modeling framework featuring structured ledger normalization, nested SUMIFS/INDEX-MATCH cross-validation, automated audit trails, and executive variance dashboards.",
      architectureHighlights: [
        "Multi-entity transaction normalization and uniform chart of accounts mapping",
        "Automated commercial scheme and warranty claim reconciliation with zero-variance margin",
        "Consolidated group financial statements (P&L, Balance Sheet, Cash Flow)",
        "Executive KPI summary views with real-time variance alerting",
      ],
      color: "bg-slate-900",
      border: "border-emerald-500/50",
      image: omniledgerImg,
      link: "https://omniledger-ai.vercel.app",
      codeSnippet: `-- Automated Multi-Entity Financial Consolidation:
=SUMIFS(Ledger!$E:$E, Ledger!$B:$B, ">="&$B$2, Ledger!$B:$B, "<="&$B$3, Ledger!$D:$D, "Revenue")
Net Working Capital = Current Assets - Current Liabilities
Gross Operating Margin = (Gross Profit / Total Revenue) * 100
>> Multi-Entity Ledger Status: 100% RECONCILED (0 Exceptions)`,
    },
    {
      id: 2,
      slug: "deepvid-ai",
      title: "DeepVid.ai",
      tagline: "Viral AI Content Platform & Scalable GPU Microservices",
      role: "Lead Engineering PM & System Architect",
      timeline: "6 Months (0→1 Launch)",
      metrics: [
        { label: "Active Creators", value: "150K+" },
        { label: "Generation Latency", value: "<1.8s" },
        { label: "Uptime SLA", value: "99.98%" },
        { label: "Videos Generated", value: "2.4M+" },
      ],
      techStack: [
        "AI Transformers",
        "WebSockets",
        "Node.js",
        "Python FastAPI",
        "Docker",
        "AWS EC2",
        "MySQL",
      ],
      description:
        "A leading generative platform empowering independent producers and creators to synthesize professional-quality viral videos, comedy scripts, and multi-track audio in real time.",
      challenge:
        "Creators faced hours of friction rendering multi-modal video scenes with inconsistent frame coherence, high latency queues, and expensive GPU overhead.",
      solution:
        "Architected an event-driven microservices pipeline with WebSocket multiplexing, GPU dynamic VRAM pooling, and automated model weight caching, cutting inference costs by 45%.",
      architectureHighlights: [
        "Bi-directional WebSocket streaming for instant preview generation",
        "Asynchronous task queue with Celery & Redis for GPU cluster orchestration",
        "Dynamic rate limiting and token bucket load balancing on AWS EC2",
        "Automated video stitching and watermark injection pipeline",
      ],
      color: "bg-slate-900",
      border: "border-orange-500/50",
      image: deepvidImg,
      link: "https://deepvid.ai/",
      codeSnippet: `POST /api/v1/generate-video
{
  "prompt": "Cinematic 4k high-velocity financial analytics render",
  "model": "deepvid-omni-v2",
  "resolution": "1080p",
  "webhooks": ["https://client.com/hook"]
}
>> 200 OK
>> INITIALIZING GPU CLUSTER [Node 0x4A]...`,
    },
    {
      id: 3,
      slug: "pulsemetrics-kpi",
      title: "PulseMetrics Finance",
      tagline: "Executive Financial KPI Cockpit & 13-Week Cash Flow Forecasting Engine",
      role: "Head of Accounts & Reporting Lead",
      timeline: "Strategic MIS Suite",
      metrics: [
        { label: "Cash Conversion Cycle", value: "24 Days" },
        { label: "Decision Refresh", value: "<1.0s" },
        { label: "Forecast Accuracy", value: "96.8%" },
        { label: "Tax Compliance", value: "100%" },
      ],
      techStack: [
        "13-Week Cash Forecasting",
        "Working Capital Analytics",
        "EBITDA Bridge Modeling",
        "Power Query",
        "Advanced Excel Modeling",
      ],
      description:
        "An executive financial analytics command center providing leadership with instant visibility into liquidity runway, Cash Conversion Cycle dynamics, business contribution margins, and rolling 90-day cash flow projections.",
      challenge:
        "Executive leadership lacks forward-looking cash flow visibility, relying on delayed historical accounting reports, leading to surprise cash shortages during major supplier settlements and payroll cycles.",
      solution:
        "Designed an integrated dynamic cash forecasting model ingesting collection schedules, disbursement lags, vendor milestones, and statutory tax dues to project daily cash balances 13 weeks ahead.",
      architectureHighlights: [
        "13-week rolling cash-flow forecasting linking pipeline to bank realizations",
        "Real-time Cash Conversion Cycle (CCC = DIO + DSO - DPO) scenario analyzer",
        "Entity-wise contribution margin and fixed vs variable cost variance tracking",
        "Early warning trigger system for credit line and overdraft limit monitoring",
      ],
      color: "bg-slate-900",
      border: "border-amber-500/50",
      image: pulsemetricsImg,
      link: "https://pulsemetrics-kpi.vercel.app",
      codeSnippet: `// 13-Week Cash Forecasting Engine (Liquidity Formula):
Opening Cash + Projected Collections + Financier Disbursements + Service Cash Inflow 
- (Supplier Payments + Vendor Invoices + Payroll + Statutory GST/TDS + Bank Interest)
= Net Projected Liquidity Position
>> Liquidity Alert Status: HEALTHY • 0 Breach Events Projected (90-Day Window)`,
    },
    {
      id: 4,
      slug: "optiflow-erp",
      title: "OptiFlow Controls",
      tagline: "Internal Control, Approval Matrix & Anti-Fraud Governance Architecture",
      role: "Finance Operations & Governance Lead",
      timeline: "Governance Platform",
      metrics: [
        { label: "Billing Error Rate", value: "-87%" },
        { label: "Release Authorization", value: "100% Dual-Auth" },
        { label: "Audit Traceability", value: "100% Coverage" },
        { label: "Approval Cycle", value: "4x Accelerated" },
      ],
      techStack: [
        "Segregation of Duties (SoD)",
        "Approval Matrix Engineering",
        "Anti-Fraud Frameworks",
        "Risk Governance",
        "Audit Trail Logging",
      ],
      description:
        "A robust internal control and anti-fraud governance system designed to prevent revenue leakages, enforce segregation of duties, and ensure tamper-proof audit trails across multi-unit commercial operations.",
      challenge:
        "High-volume commercial businesses suffer from cash leakages, unauthorized discounts, product delivery before bank payment confirmation, and un-tracked inventory shrinkage.",
      solution:
        "Engineered strict preventive and detective controls: single-point cashier accountability, dual-key dispatch authorization, tiered discount approval limits, and daily exception reconciliation against bank credits.",
      architectureHighlights: [
        "Dual-authorization dispatch release linked to confirmed bank credit or financier DO",
        "Tiered discount and credit note approval matrix (Executive → GM → MD)",
        "Daily cashier cash balance physical verification with safe logs",
        "End-to-end digital audit logging of every journal entry, credit note, and cancellation",
      ],
      color: "bg-slate-900",
      border: "border-purple-500/50",
      image: optiflowImg,
      link: "https://optiflow-erp.vercel.app",
      codeSnippet: `GOVERNANCE & GATE-PASS VALIDATION DIRECTIVE:
Step 01 // Customer Payment Verification: Down Payment (Cash/POS) + Financier DO Validated
Step 02 // Invoice Clearance: Ex-showroom / Base Invoice + Statutory Taxes + Add-ons Reconciled
Step 03 // Maker-Checker Authorization: Accounts Maker Signature + GM Approval Token
Step 04 // Security Gate-Pass Generation: Asset Identification QR Code Emitted
[Status] ASSET RELEASE AUTHORIZED • 100% Audit Coverage`,
    },
    {
      id: 5,
      slug: "fintrack-pro",
      title: "FinTrack Gateway",
      tagline: "Corporate Invoicing, E-Way Bill & GST / ITC 3-Way Reconciliation Portal",
      role: "Finance Systems Architect",
      timeline: "Tax & Billing Suite",
      metrics: [
        { label: "ITC Match Accuracy", value: "99.98%" },
        { label: "E-Invoice Generation", value: "<15 Seconds" },
        { label: "Blocked ITC Filter", value: "Sec 17(5) Compliant" },
        { label: "Vendor Notice Gen", value: "1-Click Automated" },
      ],
      techStack: [
        "GST Compliance (GSTR-1/3B/2B)",
        "Automated 3-Way ITC Matching",
        "E-Invoicing & E-Way Bills",
        "TDS (194C/J/Q)",
        "Tax Audit Defense",
      ],
      description:
        "An advanced taxation and statutory compliance portal automating GSTR-2B vs Purchase Register 3-way reconciliation, multi-tier GST billing, e-way bill generation, and vendor ITC discrepancy communications.",
      challenge:
        "Corporations lose substantial funds in un-claimed Input Tax Credit due to vendor non-filing, timing differences, duplicate billing, and complex rate classifications.",
      solution:
        "Developed an automated reconciliation pipeline classifying inward invoices into Exact Match, Timing Difference, Rate Mismatch, and Missing in 2B, while instantly flagging ineligible credits under Section 17(5).",
      architectureHighlights: [
        "Automated GSTR-2B vs Purchase Register 3-way matching with fuzzy invoice search",
        "Multi-tier GST tax categorization and tax payment ledger reconciliation",
        "Automated Section 17(5) blocked credit detection and segregation",
        "One-click automated email notices to defaulting vendors before monthly filing deadlines",
      ],
      color: "bg-slate-900",
      border: "border-pink-500/50",
      image: fintrackImg,
      link: "https://fintrack-pro-umber-omega.vercel.app",
      codeSnippet: `GST / ITC 3-WAY RECONCILIATION ENGINE:
Inward Invoices Tested: 320 records | GSTR-2B Stream: 318 records
• Exact Matches: 312 invoices (₹48,50,000 ITC Reclaimed)
• Timing Differences: 4 invoices (₹62,000 ITC deferred to next month)
• Ineligible Sec 17(5) Blocked: 2 invoices (₹18,000 blocked & separated)
• Defaulting Vendor Discrepancies: 2 invoices (₹35,000 notice dispatched)
[Result] 100% ITC RECOVERED • 0 Statutory Penalty Exposure`,
    },
  ],

  contact: {
    email: "amitashokswain@gmail.com",
    phone: "+91-8369083160",
    location: "Navi Mumbai, Maharashtra, India",
    linkedin: "https://www.linkedin.com/in/amit-ashok-s-a510b9b9/",
  },
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
});

export default portfolioSlice.reducer;
