import React from 'react';
import { Code, Cpu, Database, Globe, Briefcase } from 'lucide-react';

export const projectsData = [
    {
        id: 1,
        image: "https://placehold.co/400x200/0f172a/60a5fa?text=LLM+Summarization",
        title: "Token-Efficient Long-Context Summarization via Hierarchical Attention",
        description: "Fine-tuned Mistral-7B with LoRA on 18K scientific abstracts. Implemented sliding-window chunked encoding with cross-chunk attention bridging, enabling 32K-token document summarization on a single A100 GPU without truncation artifacts. Open-sourced training pipeline and deployed as a Docker container in Azure ML."
    },
    {
        id: 2,
        image: "https://placehold.co/400x200/0f172a/60a5fa?text=Visual+Food+Recognition",
        title: "Multimodal Dietary Assessment: Visual Food Recognition",
        description: "Built a two-stage inference pipeline orchestrating YOLOv8-L detection and SAM segmentation for scalable food recognition. Derived volumetric caloric estimates from 2D silhouette area, correcting a 15% systematic bias. Designed a macro-tracking dashboard in Power BI."
    },
    {
        id: 3,
        image: "https://placehold.co/400x200/0f172a/60a5fa?text=SCARF+Pre-training",
        title: "Contrastive Self-Supervised Pre-training for Health Data",
        description: "Pre-trained a tabular encoder using SCARF-style contrastive learning on 95K unlabeled EHR records, fine-tuned on 4,200 samples for diabetes risk classification. Outperformed fully-supervised baselines by 4.1% AUC and applied SMOTENC for mixed-type feature oversampling."
    }
];

export const skillsData = [
    {
        category: "Languages",
        items: ["Python", "SQL", "R", "Bash", "NumPy", "Pandas", "SciPy"],
        levels: [95, 90, 80, 75, 90, 95, 85],
        icon: <Code className="w-5 h-5" />
    },
    {
        category: "ML & Deep Learning",
        items: ["PyTorch", "TensorFlow/Keras", "Scikit-learn", "XGBoost", "LightGBM", "Hugging Face Transformers", "LoRA/PEFT"],
        levels: [90, 85, 90, 85, 85, 90, 80],
        icon: <Cpu className="w-5 h-5" />
    },
    {
        category: "LLM & Agentic AI",
        items: ["LangChain", "LlamaIndex", "OpenAI/Anthropic APIs", "LangSmith", "FAISS", "RAG Pipelines", "Multi-Agent"],
        levels: [95, 85, 90, 85, 90, 95, 90],
        icon: <Database className="w-5 h-5" />
    },
    {
        category: "Computer Vision",
        items: ["YOLOv8", "SAM (Segment Anything Model)", "OpenCV", "torchvision", "Image Segmentation Pipeline"],
        levels: [85, 80, 90, 85, 80],
        icon: <Globe className="w-5 h-5" />
    },
    {
        category: "NLP",
        items: ["BERT", "BioMedBERT", "Instructor-XL", "Intent Detection", "Text Classification", "ROUGE", "BERTScore"],
        levels: [90, 85, 85, 95, 90, 85, 85],
        icon: <Code className="w-5 h-5" />
    },
    {
        category: "MLOps & Cloud",
        items: ["Docker", "AWS / Azure ML", "Evidently AI", "MLflow", "GitHub Actions", "CI/CD", "Azure Security Patterns"],
        levels: [85, 85, 80, 85, 90, 85, 80],
        icon: <Briefcase className="w-5 h-5" />
    }
];

export const certificationsData = [
    {
        id: 1,
        title: "Introduction to Blockchain",
        issuer: "Issued by TCS",
        description: "Comprehensive introduction to blockchain technology, distributed ledger systems, smart contracts.",
        link: "#"
    },
    {
        id: 2,
        title: "Python Data Structures: Stacks, Queues, Deques",
        issuer: "Issued by LinkedIn Learning",
        description: "Advanced training in Python data structures and related algorithms.",
        link: "#"
    },
    {
        id: 3,
        title: "Flipkart Grid 4.0 Software Development Challenge",
        issuer: "Issued by Unstop",
        description: "Participated in Flipkart's national-level software development challenge.",
        link: "#"
    }
];

export const experienceData = [
    {
        id: 1,
        role: "AI/ML Engineer Intern",
        company: "AriesView",
        location: "Remote - Boston, USA",
        period: "Sep 2025 – Jan 2026",
        highlights: [
            "Architected a production-grade RAG pipeline using LangChain, FAISS, and OpenAI Ada-002 embeddings within an LLMOps framework, improving retrieval precision by 38%.",
            "Designed and benchmarked a hybrid chunking strategy (semantic + fixed-size) with metadata-aware re-ranking, reducing hallucination rate by 22%.",
            "Built an OCR-to-LLM extraction pipeline using Tesseract + GPT-4 achieving 97% field-level extraction accuracy.",
            "Deployed model monitoring via Evidently AI and integrated Azure patterns to track embedding drift and SLA adherence."
        ]
    },
    {
        id: 2,
        role: "ML Data Analyst Intern",
        company: "UAB Athletics Department",
        location: "Birmingham, USA",
        period: "Sep 2025 – Jan 2026",
        highlights: [
            "Engineered athlete biometric and training-load features, consolidating 12 disparate data sources into a unified analytics warehouse.",
            "Trained a gradient-boosted ensemble (XGBoost + LightGBM) to forecast next-day fatigue levels, achieving RMSE of 0.71.",
            "Built a time-series attendance prediction model using LSTM networks (PyTorch), reducing unexcused missed sessions by 12%.",
            "Developed interactive Power BI dashboards surfacing per-athlete Z-score outliers and recovery readiness indices."
        ]
    },
    {
        id: 3,
        role: "Graduate Researcher - Agentic AI",
        company: "University of Alabama at Birmingham",
        location: "Birmingham, USA",
        period: "May 2025 – Aug 2025",
        highlights: [
            "Designed a multi-agent post-discharge support system using LangChain’s agent framework and GPT-4 Turbo.",
            "Fine-tuned a BioMedBERT intent classifier on 4,200 patient utterances achieving 91% F1, replacing a brittle rule-based router.",
            "Implemented a LangSmith tracing pipeline to capture agent reasoning traces, enabling systematic failure mode analysis that improved contextual answer accuracy by 30%.",
            "Authored and presented research findings to faculty committee on system architecture and clinical pilot deployment."
        ]
    }
];

export const dynamicTexts = [
    "AI/ML Engineer Intern @ AriesView",
    "MS Data Science Student @ UAB",
    "Graduate Researcher - Agentic AI",
    "LLM Pipeline Developer",
    "RAG Systems Architect",
    "MLOps Practitioner",
    "Computer Vision Specialist",
    "Data Analytics Intern @ UAB",
    "Deep Learning Enthusiast"
];

export const statsData = [
    { label: "AI/ML Projects", value: 4, suffix: "+" },
    { label: "Certifications", value: 4, suffix: "" },
    { label: "Internships", value: 2, suffix: "" },
    { label: "GPA", value: 3.77, suffix: "/4.0" }
];
