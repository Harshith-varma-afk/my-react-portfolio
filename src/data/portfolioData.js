import React from 'react';
import {
    Code,
    Cpu,
    Database,
    Globe,
    Briefcase,
    BarChart3,
} from 'lucide-react';

/**
 * Navbar / download link for the résumé in `public/resume.pdf`.
 * Bump REV after each PDF upload so browsers don’t reuse a stale cached file.
 */
const RESUME_CACHE_KEY = '20260223-a';
export const resumePdfHref = `${process.env.PUBLIC_URL}/resume.pdf?v=${RESUME_CACHE_KEY}`;

export const projectsData = [
    {
        id: 1,
        image: `${process.env.PUBLIC_URL}/ner.png`,
        title: 'Token-Efficient Long-Context Summarization via Hierarchical Attention Distillation',
        description:
            'Fine-tuned Mistral-7B with LoRA (rank=16) on 18K PubMed scientific abstracts using a custom hierarchical summarization objective—cutting token cost by ~63% versus full-context inference with minimal ROUGE-L degradation.',
        tags: ['LLMS', 'SYSTEMS', 'INFERENCE'],
        bulletsLeft: [
            'LoRA(rank=16) on 18K PubMed abstracts + hierarchical distill objective (~63% token savings vs full context)',
            'Sliding-window chunk encoding + cross-chunk attention for 32K-token docs on a single A100 (no truncation seams)',
            'Rigorous eval vs PEGASUS-X/LongT5 (ROUGE, BERTScore) + human coherence study (n=42 raters)',
        ],
        bulletsRight: [
            'Strong automated metrics with top human-rated coherence versus baselines',
            'Open-sourced training pipeline, configs, weights on Hugging Face Hub',
            'End-to-end reproducibility guide: dataset filters, LoRA setup, evaluation harness',
        ],
        metrics: [
            { label: 'CONTEXT WINDOW', value: '32K TOKENS' },
            { label: 'TOKEN COST ↓', value: '~63%' },
            { label: 'LoRA RANK', value: '16' },
        ],
        link: null,
    },
    {
        id: 2,
        image: `${process.env.PUBLIC_URL}/ner1.png`,
        title: 'Multimodal Dietary Assessment: Visual Food Recognition with Portion-Aware Caloric Estimation',
        description:
            'Two-stage vision pipeline pairing YOLOv8-L detection (mAP@0.5: 0.82) with SAM segmentation on 5,400 custom meal images; calibrated 2D-to-volume heuristics to fix a 15% bias on calorie-dense foods, plus a Streamlit longitudinal macro dashboard piloted with UAB students.',
        tags: ['VISION', 'MULTIMODAL', 'NUTRITION'],
        bulletsLeft: [
            'YOLOv8-L detectors tuned for cluttered trays plus SAM masks for silhouette-based portion proxies',
            'USDA-aligned validation surfaced a 15% calorie bias on dense foods (nuts, cheese); diameter calibration fixes rolled into inference',
            'Streamlit dashboards with longitudinal macro trends + automated deficiency tagging for cohort reviews',
        ],
        bulletsRight: [
            '5.4K in-house labeled meal captures spanning dining-hall captures and controlled lighting shots',
            'Three-week usability pilot with 18 UAB volunteers (89% self-reported satisfaction on macro tracking workflows)',
            'Modular ONNX export paths for eventual mobile edge deployment experimentation',
        ],
        metrics: [
            { label: 'mAP@0.5 (DET)', value: '0.82' },
            { label: 'CUSTOM IMAGES', value: '~5.4K' },
            { label: 'VOLUNTEERS (PILOT)', value: '18' },
        ],
        link: 'https://github.com/Harshith-varma-afk/foodvision',
    },
    {
        id: 3,
        image: `${process.env.PUBLIC_URL}/ner2.png`,
        title: 'CDC Diabetes Health Indicators: Multi-Model BRFSS Classification with SMOTENC, PCA & Hyperparameter Search',
        description:
            'Final-course case study forecasting diabetes progression from the CDC Diabetes Health Indicators dataset—253k+ BRFSS-derived records and 21 risk-factor attributes. Models separate healthy vs combined at-risk cohorts and pre-diabetic vs diabetic subgroups against severe class imbalance, using SMOTENC, z-score normalization, PCA (95% variance), and imbalance-aware scoring (precision, recall, F1).',
        tags: ['DIABETES ML', 'IMBALANCE', 'HYPERPARAM SEARCH'],
        bulletsLeft: [
            'EDA (correlation heatmaps, histograms, class pie charts) surfaced extreme healthy-skew motivating SMOTENC for mixed categorical + numeric features.',
            'Mean imputation, column-wise scaling/one-hot via ColumnTransformer, PCA dimensionality reduction, and randomized stratified splits at 100k / 150k scales for repeatable train/test harnesses.',
            'Logistic regression + grid search on C, penalty (L1/L2), solver; MLP twin hidden layers with neuron sweep {10,15,25} and log-uniform L2 strength; RF RandomizedSearchCV with RepeatedStratifiedKFold plus balanced weights; Kernel SVM RBF with stratified ≤10k subsamples for tractable CV.',
        ],
        bulletsRight: [
            'Structured two binary formulations from the Diabetes_012 labels to reflect clinical screening vs progression signals while isolating scarce pre-diabetic positives.',
            'Nonlinear models dominated linear baselines though at higher compute budgets; logistic regression peaked ~81–82% accuracy on healthy-vs-at-risk with faster iteration for ablations.',
            'MLP topped many runs (~84–85% on screening task) while RF showed high specificity but brittle sensitivity on diabetics (~5–8%), underscoring trade-offs between nominal accuracy and minority recall.',
        ],
        metrics: [
            { label: 'BRFSS RECORDS', value: '~253.7K' },
            { label: 'PCA VARIANCE CAP', value: '95%' },
            { label: 'MLP (TASK 1 ACC.)', value: '~84–85%' },
        ],
        link: 'https://github.com/Harshith-varma-afk/ML-in-Diabetes',
    },
    {
        id: 4,
        image: `${process.env.PUBLIC_URL}/ner3.png`,
        title: 'CHATDB — AI-Powered Database & Document Intelligence (RAG)',
        description:
            'Triple Streamlit workspace combining natural-language→SQL against MySQL, AI-guided CSV ingestion with automatic typing, and conversational PDF analysis. LangChain stitches few-shot retrieval (Chroma) for resilient SQL grounding, PyMySQL/SQLAlchemy execution, recursive chunking plus FAISS for document RAG, and optional PaLM/Google GenAI backends alongside OpenAI.',
        tags: ['RAG', 'LANGCHAIN', 'TEXT-TO-SQL'],
        bulletsLeft: [
            'ChatDB (`main.py`): few-shot semantic example selection via Chroma + OpenAI embeddings, formatted table responses, CSV export of query results—all without writing SQL manually.',
            'CSV importer (`cs2.py`): upload → inferred schema/date parsing → MySQL inserts through Streamlit, reducing manual DDL for ad-hoc spreadsheets.',
            'PDF assistant (`script.py`): chunked ingestion (PyPDF2 + RecursiveCharacterTextSplitter), conversational memory retrieval chain, OpenAI embeddings, FAISS vector search for citation-style QA.',
        ],
        bulletsRight: [
            '`lang.py` / `few_shot.py`: curated mysql templates paired with similarity-selected exemplars so the LLM inherits organization-specific join patterns safely.',
            'Environment-driven secrets (dotenv), SQLAlchemy connection pooling primitives, plus documented MySQL bootstrap for HR-style demo datasets.',
            'Ship-ready developer docs in-repo for dependency matrix, GPT-3.5-turbo prompts, PaLM integrations, security cautions (.env hygiene, validating generated SQL before writes).',
        ],
        metrics: [
            { label: 'STREAMLIT SURFACES', value: '3' },
            { label: 'VECTOR STORES', value: 'FAISS · Chroma' },
            { label: 'SQL + DOCS', value: 'Unified stack' },
        ],
        link: 'https://github.com/Harshith-varma-afk/Rag_proj',
    },
];

/** Curated stacks only — percentages removed in UI */
export const skillsData = [
    {
        category: 'Languages',
        items: ['Python', 'SQL', 'R', 'NumPy · Pandas'],
        icon: <Code className="w-5 h-5" />,
    },
    {
        category: 'ML · DL',
        items: ['PyTorch', 'scikit-learn', 'XGBoost / LightGBM', 'Hugging Face · LoRA'],
        icon: <Cpu className="w-5 h-5" />,
    },
    {
        category: 'LLM · RAG',
        items: ['LangChain', 'LlamaIndex', 'OpenAI · Anthropic', 'FAISS · Chroma'],
        icon: <Database className="w-5 h-5" />,
    },
    {
        category: 'Vision · NLP',
        items: ['YOLOv8', 'SAM', 'OpenCV', 'BERT / encoder models'],
        icon: <Globe className="w-5 h-5" />,
    },
    {
        category: 'MLOps · cloud',
        items: ['Docker', 'AWS · SageMaker', 'GitHub Actions', 'Evidently · MLflow'],
        icon: <Briefcase className="w-5 h-5" />,
    },
    {
        category: 'Data · Viz',
        items: ['PostgreSQL', 'Power BI · Tableau', 'Streamlit', 'EDA pipelines'],
        icon: <BarChart3 className="w-5 h-5" />,
    },
];

/** Graduate programs — matches résumé education section */
export const educationData = [
    {
        id: 1,
        degree: 'M.S., Data Science',
        school: 'University of Alabama at Birmingham (UAB)',
        location: 'Birmingham, Alabama, USA',
        period: '2024 — Present',
        highlights: [
            'GPA 3.66 / 4.0',
            'Coursework: Deep Learning, Natural Language Processing, Probabilistic Machine Learning, and related statistical learning electives',
            'Hands-on coursework and semester projects spanning RAG, computer vision, and large-scale tabular modeling (see Projects)',
        ],
    },
];

export const experienceData = [
    {
        id: 1,
        role: 'AI/ML Engineer Intern',
        company: 'AriesView',
        location: 'Remote — Boston, USA',
        period: 'Sep 2025 – Jan 2026',
        highlights: [
            'Production RAG stack with LangChain, FAISS, and OpenAI Ada-002 embeddings on 50K+ financial docs—+38% retrieval precision versus BM25 baselines.',
            'Hybrid semantic + fixed-size chunking plus metadata-aware re-ranking trimmed hallucinations by ~22% on curated QA benchmarks.',
            'OCR→LLM (Tesseract + GPT-4) pipeline converted unstructured investor memos to JSON schemas at 97% field-level accuracy on held-out evaluations.',
            'Embedding A/B studies (Ada-002 vs Instructor-XL vs BGE-large) yielded ~40% end-to-end latency savings without sacrificing NDCG@10 quality.',
            'Evidently AI monitoring surfaced embedding drift and answer regressions live, powering proactive retrains across a multi-month production SLA.',
        ],
    },
    {
        id: 2,
        role: 'ML Data Analyst Intern',
        company: 'UAB Athletics Department',
        location: 'Birmingham, USA',
        period: 'Sep 2025 – Jan 2026',
        highlights: [
            'Consolidated 12 athlete data streams via Python (Pandas, SciPy) and PostgreSQL into a warehouse ready for boosted models and dashboards.',
            'XGBoost + LightGBM ensemble predicting next-day fatigue (session RPE, sleep, HRV) reached RMSE 0.71 on a Borg 5-point holdout.',
            'PyTorch LSTM attendance forecasting cut unexcused absences ~12% in one semester with 48-hour coach alerts.',
            'Power BI views for training monotony, Z-score outliers, and recovery readiness drove weekly coaching periodization cycles.',
        ],
    },
    {
        id: 3,
        role: 'AI/ML Engineer',
        company: 'Inspira AI Innovations Pvt. Ltd.',
        location: 'Remote — Haryana, India',
        period: 'Aug 2023 – Jul 2024',
        highlights: [
            'Fine-tuned a domain-specific astrology LLM on curated classical corpora spanning multiple Sanskrit treatises.',
            'Implemented RAG to keep responses grounded while exposing tool-call interfaces for calculators and APIs.',
            'Maintained ingestion + QA tooling for multilingual training mixtures prior to multimodal rollout.',
            'Shipped conversational text and streaming voice UX layers for analyst-grade user sessions.',
        ],
    },
];

export const dynamicTexts = [
    'AI/ML Engineer Intern @ AriesView',
    'ML Data Analyst Intern @ UAB Athletics',
    'AI/ML Engineer @ Inspira AI Innovations',
    'MS Data Science @ UAB',
    'LLM Systems & Agentic AI',
    'Production RAG on 50K+ finance docs',
    'MLOps & scalable inference',
    'CHATDB · LangChain RAG · NL-SQL over MySQL',
];

export const statsData = [
    { label: 'Portfolio projects', value: 4, suffix: '+' },
    { label: 'ML / AI roles', value: 3, suffix: '' },
    { label: 'RAG corpus scale', value: 50, suffix: 'K+' },
    { label: 'GPA', value: 3.66, suffix: '/4.0' },
];
