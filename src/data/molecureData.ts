import { Product, BlogPost, ResearchArticle, FAQItem, HeroContent, ScienceContent, AboutContent, ContactContent, MediaAsset, SiteContent } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "glutathione-support",
    name: "Liposomal Glutathione & Ergothioneine Synergy",
    tagline: "Endogenous enzyme cofactor supporting deep mitochondrial protection & longevity",
    price: 59,
    rating: 4.9,
    reviewsCount: 203,
    category: "defense",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400",
    bgGradient: "from-emerald-500/20 to-teal-500/10",
    benefits: [
      "Protects mitochondria damage from free radicals",
      "Restores cellular Glutathione (GSH) antioxidant defense",
      "Combats inflammaging and premature cellular tissue decay",
      "Supports blood-brain barrier and healthy pulmonary response"
    ],
    ingredients: [
      { name: "Setria® L-Glutathione (Reduced)", dose: "250 mg", form: "Clinically-backed tripeptide", function: "Direct intracellular antioxidant replenishment" },
      { name: "Liposomal Ergothioneine (Catalog: CDLNPF24-008-L)", dose: "15 mg", form: "Mitochondrial-targeted antioxidant", function: "Protects complex IV respiration and cell structures" },
      { name: "N-Acetyl-L-Cysteine (NAC)", dose: "300 mg", form: "Amino acid", function: "Rate-limiting precursor for endogenous glutathione synthesis" },
      { name: "Selenium (as L-Selenomethionine)", dose: "100 mcg", form: "Organic chelate", function: "Essential cofactor for selenium-dependent GPX1, GPX2, and GPX3 enzymes" }
    ],
    scientificExplanation: "GSH depletion is a fundamental risk factor for chronic diseases like obstructive pulmonary disease, atherosclerosis (ischemic heart disease, stroke), and cancer. Because glutathione peroxidases (GPX1-3) are selenium-dependent enzymes, their function is further modified by individual genetic variation. This formula delivers both glutathione (GSH) precursors and selenomethionine cofactors to counteract persistent damaging inflammation, inflammaging, and early (premature) inflammaging associated with lack of adequate antioxidant defenses.",
    suggestedUse: "Take 1 capsule daily on an empty stomach or as directed by your healthcare professional.",
    warnings: "Do not use if taking immunosuppressant medications without medical advice.",
    features: ["Liposome System", "Catalog: CDLNPF24-008-L", "Anti-Inflammaging"],
    subscriptionDiscount: 15,
    faqs: [
      { q: "Why is Selenium included in a Glutathione supplement?", a: "Glutathione Peroxidase (GPX) enzymes are selenium-dependent. Without adequate selenium, your body cannot synthesize or activate GPX to neutralize peroxides, regardless of how much glutathione is present." },
      { q: "What role does GSH depletion play in inflammaging?", a: "GSH depletion plays a central role in inflammatory diseases and COVID-19. Restoring antioxidant defenses helps counteract cell and tissue damage caused by excessive oxidative stress in younger individuals." }
    ]
  },
  {
    id: "curcumin-support",
    name: "Clipos™ Nanoliposomal Curcumin & Resveratrol",
    tagline: "Genetically-optimized anti-inflammatory and neurological pathway modulator",
    price: 49,
    rating: 4.8,
    reviewsCount: 114,
    category: "cellular",
    image: "/src/assets/images/curcumin_resveratrol_clipos_1788471069017.jpg",
    bgGradient: "from-amber-500/20 to-orange-500/10",
    benefits: [
      "Targets inflammatory markers CRP, TNF-a, IL-6, and STAT4",
      "Modulates neurological PGC1a/FNDC5/BDNF pathway to support mood",
      "Formulated with Astragaloside IV for high-precision cellular aging defense",
      "Reverses stress and corticosterone levels to support hippocampal BDNF"
    ],
    ingredients: [
      { name: "Clipos™ Nanoliposomal Curcumin (Catalog: CDPR-0005)", dose: "400 mg", form: "Nanoliposomal complex", function: "Suppresses active inflammatory cytokines and gene transcription" },
      { name: "Clipos™ Nanoliposomal Resveratrol (Catalog: CDPR-0001)", dose: "100 mg", form: "Liposomal suspension", function: "Activates Sirtuin pathways and cellular defense" },
      { name: "Astragaloside IV (Cat. No: X23-04-XQ1082)", dose: "50 mg", form: "Purified extract", function: "Supports healthy cell replication and telomere protection" }
    ],
    scientificExplanation: "This formula is engineered to suppress inflammatory markers like CRP, TNF-a, IL-6, STAT4, TRAF1/C5, and PTPN22, which are heavily involved in autoinflammatory conditions like arthritis (affecting 10% of the population in developing countries). Furthermore, curcumin modulates the PGC1a/FNDC5/BDNF pathway, reversing depression and pseudodementia by reducing corticosterone levels and increasing hippocampal brain-derived neurotrophic factor (BDNF).",
    suggestedUse: "Take 1 capsule twice daily with meals to maintain continuous circulating plasma levels.",
    warnings: "Consult a physician before use if you are pregnant, nursing, or taking blood thinners.",
    features: ["Nanoliposomal Carrier", "Catalog: CDPR-0005", "Neurological Support"],
    subscriptionDiscount: 15,
    faqs: [
      { q: "What is Astragaloside IV (Cat. No: X23-04-XQ1082)?", a: "It is an ultra-pure natural compound extracted from Astragalus membranaceus that has been clinically studied for telomere protection, healthy cell division, and cellular longevity." },
      { q: "How does Curcumin support neurological pathways?", a: "Curcumin found in Zingiberaceae plants has antidepressant-like effects by modulating the PGC1a/FNDC5/BDNF pathway, restoring dopamine, serotonin (5-HT), and hippocampal BDNF." }
    ]
  },
  {
    id: "luteolin-support",
    name: "Clipos™ Nanoliposomal Luteolin & PEA (Leoleolin)",
    tagline: "Advanced neuroprotective, anti-anxiety, and neuroinflammation barrier formula",
    price: 54,
    rating: 4.9,
    reviewsCount: 167,
    category: "defense",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400",
    bgGradient: "from-purple-500/20 to-fuchsia-500/10",
    benefits: [
      "Suppresses neuroinflammation in brain tissues and neural pathways",
      "Provides natural anti-anxiety, anti-inflammatory, and neuroprotective synergy",
      "Selective COX-2 inhibitor that reduces IL-1b, TNF-a, and IL-6",
      "Reduces cancer marker p-AKT/mTOR and inhibits tumor MMP-2/9 expression"
    ],
    ingredients: [
      { name: "Luteolin (3',4',5,7-tetrahydroxy flavone)", dose: "150 mg", form: "Highly purified flavone", function: "Selective COX-2 inhibitor, blocks neuroinflammation in brain tissue" },
      { name: "PEA (Palmitoylethanolamide)", dose: "300 mg", form: "Liposomal lipid", function: "Anticipates neuropathic stress and regulates neuroprotective cellular responses" },
      { name: "Clipos™ Nanoliposomal Ferulic Acid (Catalog: CDPR-0014)", dose: "100 mg", form: "Lipid-matrix carrier", function: "Protects lipids from peroxidation and reduces neurodegenerative damage" }
    ],
    scientificExplanation: "Luteolin selective inhibits cyclooxygenase-2 (COX-2) in inflammatory responses, and downregulates MyD88 and TLR4, counteracting sepsis and chronic pancreatitis. It suppresses neuroinflammation—a critical risk factor in brain trauma, infection, and age-related neurodegenerative diseases (AD, PD, HD, ALS)—by blocking LPS-induced release of TNF-a, IL-6, and NO. It also suppresses breast cancer tumor proliferation by reducing p-AKT and mTOR.",
    suggestedUse: "Take 1 capsule in the morning and 1 capsule in the evening, ideally with food.",
    warnings: "Ensure adequate hydration. Consult a physician if you have a diagnosed neuroinflammatory condition.",
    features: ["Neuroprotective", "Catalog: CDPR-0014", "Anti-Anxiety PEA"],
    subscriptionDiscount: 15,
    faqs: [
      { q: "What neuroinflammatory conditions does Luteolin support?", a: "Research has evaluated Luteolin across conditions like Multiple Sclerosis, Bipolar Disorder, Autoimmune Encephalitis, Transverse Myelitis, Optic Neuritis, and Depression by reducing inflammatory cytokines." },
      { q: "Why is PEA (Palmitoylethanolamide) included?", a: "PEA is a synergistic lipid that modulates neuroinflammation and neuropathic discomfort, reinforcing Luteolin's neuroprotective benefits and supporting anxiety relief." }
    ]
  },
  {
    id: "tanshinone-support",
    name: "Tanshinone IIA & CoQ10 Vascular Shield",
    tagline: "Bioinformatics-verified cellular apoptosis and cardioprotective catalyst",
    price: 48,
    rating: 4.7,
    reviewsCount: 89,
    category: "cellular",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400",
    bgGradient: "from-blue-500/20 to-indigo-500/10",
    benefits: [
      "Inhibits breast tumor cells (MCF-7 & MDA-MB-231) and promotes apoptosis",
      "Protects heart and nervous tissue from vascular system injury",
      "High-bioavailability compound with strong binding to Heme Oxygenase 1",
      "Supports treatments for hypertension, atherosclerosis, and glioma"
    ],
    ingredients: [
      { name: "Tanshinone IIA (from Radix Salvia miltiorrhiza)", dose: "180 mg", form: "Lipophilic extract", function: "Binds to heme oxygenase 1 and secreted phosphoprotein 1, protecting vessels" },
      { name: "Clipos™ Nanoliposomal Alpha Lipoic Acid (Catalog: CDPR-0006)", dose: "150 mg", form: "Universal antioxidant Recycler", function: "Recycles both Vitamin C and Glutathione at a cellular level" },
      { name: "Coenzyme Q10 (Ubiquinol)", dose: "100 mg", form: "Bioactive Ubiquinol", function: "Protects mitochondria and supports left ventricular hypertrophy recovery" }
    ],
    scientificExplanation: "Tanshinone IIA is one of the most abundant fat-soluble components isolated from Salvia miltiorrhiza (Dan Shen). Bioinformatics and molecular docking show that Tanshinone IIA exhibits good binding activity with vascular injury-related proteins, heme oxygenase 1, and secreted phosphoprotein 1. Furthermore, clinical trials indicate Tanshinones effectively inhibit the proliferation of breast cancer cells while promoting cellular apoptosis.",
    suggestedUse: "Take 1 capsule in the morning with breakfast to support daily cardiovascular and vascular cellular health.",
    warnings: "Consult a healthcare professional if you are taking cardiovascular drugs or antiplatelet medications.",
    features: ["Vascular System Support", "Catalog: CDPR-0006", "Apoptosis Initiator"],
    subscriptionDiscount: 15,
    faqs: [
      { q: "What is the oral bioavailability and drug-likeness of Tanshinone IIA?", a: "According to the TCMSP database, Tanshinone IIA has an oral bioavailability value of 49.89% and a drug-likeness value of 0.4, indicating highly effective physiological assimilation." },
      { q: "How does it protect blood vessels?", a: "By targeting pathways enriched in steroid hormone biosynthesis and cell cycle, molecular docking verifies that it protects vascular endothelial cells from inflammatory and oxidative collapse." }
    ]
  },
  {
    id: "nmn-support",
    name: "Liposomal NMN & Sirtuin Activator",
    tagline: "Next-generation NAD+ cellular energy replenishment and mitochondrial catalyst",
    price: 64,
    rating: 4.8,
    reviewsCount: 142,
    category: "mitochondrial",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=400",
    bgGradient: "from-red-500/20 to-rose-500/10",
    benefits: [
      "Replenishes intracellular NAD+ pools to support mitochondrial integrity",
      "Activates SIRT1-9 sirtuins to regulate oxidative phosphorylation",
      "Helps reverse mitochondrial deficits and balance protein acetylation",
      "Protects cells from metabolic catastrophe caused by epigenetic mutations"
    ],
    ingredients: [
      { name: "Liposomal NMN (Catalog: CDLNPF24-039-L)", dose: "300 mg", form: "Stabilized nucleotide", function: "Direct intracellular precursor for NAD+ coenzyme synthesis" },
      { name: "Sirtuins Activator Matrix", dose: "150 mg", form: "Natural extract blend", function: "Upregulates SIRT1-9 sirtuins to restore metabolic balance" },
      { name: "PQQ (Pyrroloquinoline Quinone)", dose: "10 mg", form: "Disodium salt", function: "Stimulates mitochondrial biogenesis and mitophagy" }
    ],
    scientificExplanation: "Mitochondrial dysfunction contributes to developmental disorders and epilepsy. Epigenetic research shows that the balance of protein acetylation in mitochondria is a critical factor in protecting cells from metabolic catastrophe. The MOF-KANSL complex acetylates COX17, an essential complex IV protein in oxidative phosphorylation. This formula combines Liposomal NMN (Catalog: CDLNPF24-039-L) with sirtuin regulators to support healthy acetylation, reverse respiratory defects in fibroblasts, and maintain cellular metabolism.",
    suggestedUse: "Take 1 softgel daily with a meal containing healthy fats for optimal absorption.",
    warnings: "Do not exceed the suggested serving size unless advised by a practitioner.",
    features: ["NAD+ Precursor", "Catalog: CDLNPF24-039-L", "Sirtuin Regulator"],
    subscriptionDiscount: 15,
    faqs: [
      { q: "What is the relationship between MOF mutations and COX17?", a: "Mutations in the MOF gene exhibit mitochondrial defects. COX17 is an important target of MOF-mediated acetylation, which stimulates complex IV function vital for producing energy through oxidative phosphorylation." },
      { q: "Can this help reverse aging mitochondrial decline?", a: "Yes, by maintaining the balance of protein acetylation and restoring cellular NAD+ levels, it promotes sustainable energy production and protects against metabolic catastrophe." }
    ]
  },
  {
    id: "personalized-wellness-pack",
    name: "Dec0ded AI Bespoke Personalized Pack",
    tagline: "Prescription-grade plant compound packs tailored to your genomic sequence",
    price: 89,
    rating: 5.0,
    reviewsCount: 341,
    category: "personalized",
    image: "https://images.unsplash.com/photo-1555633514-abcee6ab92e1?auto=format&fit=crop&q=80&w=400",
    bgGradient: "from-emerald-500/20 to-blue-500/10",
    benefits: [
      "Custom formulated by Dec0ded, the world's first AI functional genomics software",
      "Sequences DNA targets and matches with therapeutic plant-based compounds",
      "Compensates for MnSOD rs4880, GPX, and SLC23A1 transport polymorphisms",
      "Addresses complex genetic markers like psychiatric TRANK1 and SCZ risk factors"
    ],
    ingredients: [
      { name: "Bespoke Nanoliposomal Co-modulators", dose: "Varies", form: "Optimized carrier", function: "Compensates for individual enzymatic variations and transport barriers" },
      { name: "Targeted Endogenous Enzyme Activators", dose: "Varies", form: "Active chelate", function: "Fuels MnSOD, GPX, and CAT intracellular synthesis and transport" },
      { name: "Specific Nutrient Transporter Support", dose: "Varies", form: "Micellar suspension", function: "Leverages secondary passive absorption pathways to bypass genetic blocks" }
    ],
    scientificExplanation: "Over 90% of health conditions have a genetic component. This bespoke daily pack is powered by Dec0ded, the world's first Functional Genomics Clinic software. Developed over 7 years using multiple interoperable Neural Network models, it sequences your DNA and matches your genetic profile (including complex markers like the TRANK1 rs9834970 Bipolar risk locus and the TENM4 missense mutation) with precise molecules from the NutriGenDB database to prevent or attenuate disease from its source.",
    suggestedUse: "Take 1 personalized pack daily in the morning with a meal and water.",
    warnings: "Custom formulations vary based on assessment results. Carefully read custom package labels for specific alerts.",
    features: ["7-Year ML Model", "Interoperable with NutriGenDB", "DNA-Level Precision"],
    subscriptionDiscount: 20,
    faqs: [
      { q: "What is Dec0ded?", a: "Dec0ded is the software that powers MoleCure's Functional Genomics Clinic. It integrates machine learning to eliminate bias, assess recent scientific literature, and select the optimal therapeutic compounds based on individual genomic profiles." },
      { q: "How does it handle genes like TRANK1 or TENM4?", a: "If your genomic profile displays risk variants in TRANK1 (neuroinflammation, blood-brain barrier impairment) or TENM4 (altered learning/sleep, neural circuit issues), the Dec0ded engine elevates active cofactors like Curcumin and Leuteolin to support healthy blood-brain barrier integrity and neuroprotection." }
    ]
  }
];

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: "mnsod-val16ala",
    title: "Nutrigenetics and Modulation of Oxidative Stress: MnSOD Val16Ala Polymorphism",
    summary: "An investigation of how individual genetic variation in endogenous antioxidant defense systems affects oxidative stress and related chronic disease development, and how diet modifies this relationship.",
    findings: "Manganese Superoxide Dismutase (MnSOD) is the sole SOD isoform essential for life. Its precursor is synthesized in the cytosol before being transported into the mitochondria where the active homotetramer neutralizes free radicals produced during respiration. The common Val16Ala (rs4880) polymorphism alters the targeting sequence, impairing transport. In a clinical case-control study, carriers of the C allele (Alanine) showed a 57.3% reduced risk of cervical intraepithelial neoplasia (CIN1) only when paired with above-median dietary serum levels of antioxidants (beta-carotene, lycopene, and tocopherols). This provides conclusive evidence of gene-diet interaction where diet modifies genetic risk.",
    geneInvolved: "MnSOD (SOD2)",
    biomarkers: ["8-OHdG (Oxidative DNA damage)", "F2-Isoprostanes", "Serum beta-carotene"],
    dietaryFactor: "Carotenoids (Beta-carotene, Lycopene), Vitamin E",
    clinicalReference: "Karger Archives of Nutrition and Metabolism, Vol. 60, Suppl 3",
    citation: "Sokolov et al., 2023; PMC9811786"
  },
  {
    id: "luteolin-pathway",
    title: "Luteolin: Selective COX-2 Inhibition, Anti-Inflammatory, and Neuroprotective Action",
    summary: "An analysis of the molecular mechanisms of the dietary flavone Luteolin in blocking neuroinflammation, tumor cell proliferation, and protecting organs.",
    findings: "Luteolin selective inhibits cyclooxygenase-2 (COX-2) in inflammatory responses and suppresses carrageenan-induced paw edema. It suppresses key inflammatory cytokines IL-1b, TNF-a, and IL-6, and downregulates the MyD88 and TLR4 pathways, counteracting sepsis. In breast cancer (MCF-7), Luteolin reduces p-AKT and mTOR, increasing the occupancy of H3K27ac and H3K56ac in the MMP-2 and MMP-9 promoter regions, which inhibits MMP expression and tumor cell proliferation. In brain tissue, Luteolin counteracts neuroinflammation by suppressing LPS-induced release of TNF-a, IL-6, and NO, and blocks NF-kappa B and AP-1 activation, regulating signaling pathways in neurodegenerative diseases (AD, PD, HD, ALS).",
    geneInvolved: "COX-2, MyD88, mTOR, MMP-2, MMP-9",
    biomarkers: ["TNF-alpha", "IL-1b", "IL-6", "iNOS", "H3K27ac"],
    dietaryFactor: "Luteolin, Palmitoylethanolamide (PEA)",
    clinicalReference: "PMC9117704 - Molecular Targets of Luteolin",
    citation: "NIH PMC9117704 Luteolin Study"
  },
  {
    id: "mof-cox17-acetylation",
    title: "COX17 Acetylation via MOF–KANSL Complex Promotes Mitochondrial Integrity",
    summary: "Analyzing how mutations in the epigenetic regulator MOF lead to mitochondrial defects and how COX17 acetylation restores complex IV oxidative phosphorylation.",
    findings: "Epigenetic balance of protein acetylation in mitochondria is a critical factor in protecting cells from metabolic catastrophe. Mitochondrial dysfunction is known to contribute to developmental delay, intellectual disability, and epilepsy. This study shows that COX17 is a key target of MOF-mediated acetylation, which is essential for assembling complex IV in the energy-production process of oxidative phosphorylation. Acetylation of COX17 stimulates its function, promoting mitochondrial integrity. Loss of acetylation impairs it, but respiratory defects in patient-derived fibroblasts were partially reversed using mitochondrial-targeted MOF, demonstrating an unprecedented gain of function.",
    geneInvolved: "MOF (KAT8), COX17",
    biomarkers: ["Complex IV Respiration Rate", "Epigenetic Acetylation Index"],
    dietaryFactor: "NAD+ Precursors, Liposomal Alpha Lipoic Acid",
    clinicalReference: "Nature Metabolism, Vol. 5",
    citation: "Guhathakurta et al., 2023; Doi: 10.1038/s42255-023-00904-w"
  },
  {
    id: "trank1-bipolar-neuroinflammation",
    title: "TRANK1 Gut Microbiota Interactions and Schizophrenia TENM4 Mutations",
    summary: "Investigating the genetic loci TRANK1 rs9834970 associated with Bipolar Disorder neuroinflammation, and TENM4 mutations in Schizophrenia.",
    findings: "A GWAS of 41,917 patients identified rs9834970 in the TRANK1 gene as a top-ten risk factor for Bipolar Disorder (BD). BD patients express higher serum TRANK1 mRNA. Gut microbiota directly impacts TRANK1: mice receiving fecal transplants from BD patients showed elevated hippocampal and prefrontal TRANK1 mRNA associated with increased inflammatory cytokines. Type 1 interferon induces TRANK1, which impairs blood-brain barrier (BBB) integrity, allowing inflammatory mediators to enter the brain. Additionally, missense mutations in the TENM4 gene contribute to schizophrenia (SCZ), impairing learning ability, sleep, and neural plasticity through altered ATPase activity and impaired neural circuits.",
    geneInvolved: "TRANK1, TENM4, MAD1L1",
    biomarkers: ["TRANK1 mRNA levels", "Blood-brain barrier permeability", "Inflammatory Cytokines"],
    dietaryFactor: "Curcumin, Leuteolin",
    clinicalReference: "Psychiatric GWAS Consortium; Genome Function Laboratory Research",
    citation: "Findlay et al., Francis Crick Institute Research"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "understanding-oxidative-stress",
    title: "Understanding Oxidative Stress: The Invisible Battle Inside Your Cells",
    slug: "understanding-oxidative-stress",
    excerpt: "What is oxidative stress, what causes it, and how does your body fight back? Let's break down the complex science of free radicals and cellular defense.",
    content: "Our cells are constantly engaged in an invisible chemical battle. Every time we breathe, eat, or exercise, our mitochondria consume oxygen to produce ATP, the cellular currency of energy. However, during aerobic metabolism, a small fraction of oxygen 'leaks' out of the mitochondrial electron transport chain. This leads to the creation of highly reactive molecules called free radicals, specifically reactive oxygen species (ROS).\n\nWhen ROS accumulate in excess, they participate in redox reactions that strip electrons from vital macromolecules—including cell membranes, proteins, and DNA. This imbalance between the production of reactive species and the body's ability to neutralize them is what scientists call **Oxidative Stress**.\n\n### The Endogenous and Exogenous Shield\nFortunately, humans have evolved a highly complex, multi-layered shield to maintain redox homeostasis. This shield is divided into two parts:\n1. **Endogenous Enzymes**: These are internal biological catalysts synthesized inside our cells, such as Superoxide Dismutase (SOD), Glutathione Peroxidase (GPX), and Catalase (CAT). They work as a continuous, high-speed defense line to convert ROS into harmless water.\n2. **Exogenous Antioxidants**: These are dietary molecules we must acquire through foods or supplements, including Vitamin C, Vitamin E, and carotenoids (like beta-carotene and lycopene). They act as direct 'scavengers,' traveling through fluids and lipid membranes to donate electrons to free radicals, neutralizing them before they can strike our DNA.\n\n### Why Your Genetics Dictate Your Defense\nNo two individuals have the exact same antioxidant capacity. Emerging research in the field of **nutrigenetics** shows that tiny, single-letter variations in our DNA (Single Nucleotide Polymorphisms, or SNPs) significantly alter the structure and speed of our defense systems. For instance, a common variation in the *MnSOD* gene impairs the delivery of the enzyme to the mitochondria, leaving these critical energy centers vulnerable. By understanding your unique genetic blueprints, you can feed your body the precise nutrients it needs to reinforce its defenses.",
    category: "Cellular Health",
    readTime: "5 min read",
    date: "July 8, 2026",
    author: "Dr. Evelyn Vance, Chief Scientific Officer",
    image: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "decoded-software-ai-clinic",
    title: "How Dec0ded Software is Eliminating Bias and Redefining Functional Genomics",
    slug: "decoded-software-ai-clinic",
    excerpt: "Discover the world's first AI-powered functional genomics clinic powered by MoleCure's proprietary neural network software models.",
    content: "For the first time in the history of healthcare, advanced artificial intelligence is being utilized to bypass the cognitive errors, diagnostic delays, and systematic biases that plague traditional healthcare delivery models.\n\nOur proprietary software, **Dec0ded**, is the result of a 7-year collaborative initiative consisting of data scientists and industry-led experts in Diagnostics, Evolutionary Medicine, Functional Medicine, and Nutrigenomics. By designing multiple Neural Network Machine Learning Models that work interoperably with vast datasets of genetic data (including the Interoperable NutriGenDB Database), Dec0ded allows patients to receive optimal clinical care in a fraction of the time.\n\n### Bypassing Human Limitations\nTraditional clinical decision-making is often limited by a physician's available time and subconscious biases. Dec0ded excels in three critical domains where humans fail:\n1. **Removing Biases**: Dec0ded treats the disease, not a patient's perceived worth. It operates entirely free from prejudices related to economic class, race, disability, or intellect, delivering equitable, high-precision recommendations.\n2. **Vast Data Synthesis**: Unlike humans, who make decisions using limited, static information, Dec0ded continuously synthesizes the most recently published medical research, toxicology reports, and clinical trials to select the best therapeutic compounds.\n3. **Continuous Learning**: Dec0ded incorporates a closed-loop patient feedback model (our PRO Patient Reported Model), actively learning from real-world product efficacy to continually refine and optimize its predictive accuracy.\n\nThrough this revolutionary software, MoleCure is transforming how the world diagnoses and treats chronic diseases—providing safe, affordable, and evidence-based personalized medicine directly from your genomic sequence.",
    category: "Formulation Science",
    readTime: "8 min read",
    date: "July 12, 2026",
    author: "Danielle Stella, Lead AI Bioinformatics Engineer",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "gsh-depletion-inflammaging",
    title: "The Silent Threat of GSH Depletion: Combating Inflammaging and Mitochondrial Decay",
    slug: "gsh-depletion-inflammaging",
    excerpt: "Explore the critical role of Glutathione Peroxidase in neutralising free radicals and protecting cellular structures from premature inflammaging.",
    content: "When we are young, our cells maintain an energetic, highly coordinated defense system. But as we age, our intracellular reserves of the body's master antioxidant—Glutathione (GSH)—begin to decline. This phenomenon, known as **GSH depletion**, plays a central role in chronic inflammatory diseases, COPD, atherosclerosis, and immune dysfunction.\n\n### Understanding the Inflammaging Loop\nInflammaging refers to the chronic, low-grade, sterile inflammation that develops during aging. When free radicals leak from the mitochondria, they cause progressive molecular damage to cell membranes and nuclear DNA. Under normal conditions, selenium-dependent **Glutathione Peroxidase (GPX)** enzymes quickly neutralize these free radicals into harmless water.\n\nHowever, when GSH is depleted:\n- Free radicals trigger transcription factors like NF-kB, initiating a cascade of inflammatory cytokines (TNF-a, IL-1b, IL-6).\n- This systemic inflammation causes further mitochondrial damage, creating a vicious cycle of accelerated tissue decay and energy loss.\n- This cycle impairs blood-brain barrier integrity and cellular signaling, raising the susceptibility to neurodegenerative conditions like Alzheimer's and Parkinson's.\n\n### Bypassing the Transport Bottlenecks\nFortunately, clinical research shows that we can actively restore our antioxidant defenses. Because standard oral glutathione isolates have poor bioavailability and are easily broken down in the stomach, Molecure utilizes an advanced **Liposomal Glutathione** carrier system. By wrapping reduced L-glutathione in a protective lipid-matrix, it bypasses digestive bottlenecks and enters target cells via passive diffusion. Paired with N-acetyl-cysteine (NAC) and selenium cofactors, it directly fuels the GPX enzyme family, stopping the inflammaging loop at its source.",
    category: "Cellular Health",
    readTime: "6 min read",
    date: "June 29, 2026",
    author: "Dr. Evelyn Vance, Chief Scientific Officer",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "q1",
    question: "What is the science behind Dec0ded and MoleCure's Functional Genomics Clinic?",
    answer: "Dec0ded is our proprietary AI software. Developed over 7 years using multiple interoperable Neural Network models, it sequences DNA and matches your genetic profile with therapeutic plant-based compounds from the NutriGenDB database. This provides the world's first Functional Genomics Clinic, delivering evidence-based medicine that bypasses human cognitive errors and biases.",
    category: "science"
  },
  {
    id: "q2",
    question: "What causes GSH depletion, and why is it a fundamental risk factor?",
    answer: "GSH (Glutathione) depletion occurs due to aging, chronic oxidative stress, and infections like SARS-CoV-2. It is a fundamental risk factor for chronic obstructive pulmonary disease, atherosclerosis, and stroke. Restoring GSH levels counteracts persistent damaging inflammation and early (premature) inflammaging associated with tissue damage.",
    category: "science"
  },
  {
    id: "q3",
    question: "How do conventional treatments compare to MoleCure's plant-based cofactors?",
    answer: "Conventional medicine manages autoinflammatory conditions using NSAIDs and high-dose corticosteroids, which can cause severe side-effects like fluid retention, gastrointestinal bleeding, glucose intolerance, liver toxicity, and adrenal suppression. MoleCure utilizes highly bioavailable, nanoliposomal plant cofactors (like Curcumin and Luteolin) to support natural inflammatory pathways safely.",
    category: "supplements"
  },
  {
    id: "q4",
    question: "What are Catalog codes (like CDLNPF24-008-L or CDPR-0005) on the products?",
    answer: "These are clinical catalog numbers from our NutriGenDB database representing spectrometry-verified, GMP-compliant Liposome and Nanoliposome carriers. These delivery systems encapsulate raw cofactors in lipid matrices to bypass intestinal transport bottlenecks and maximize target cell exposure.",
    category: "supplements"
  },
  {
    id: "q5",
    question: "What are the mitochondrial acetylation and MOF mutations?",
    answer: "Mutations in the MOF gene exhibit severe mitochondrial defects. Epstein research shows that COX17 is an important target of MOF-mediated acetylation, which stimulates complex IV function vital for energy production. Our formulas support sirtuins (SIRT1-9) to promote acetylation integrity and protect cells from metabolic catastrophe.",
    category: "science"
  }
];

export const DEFAULT_HERO: HeroContent = {
  badgeText: "Breakthrough: Nutrigenomics-Driven Supplementation",
  headline: "Science Meets",
  headlineGradient: "Personalized Nutrition",
  subheadline: "Evidence-based nutritional solutions designed to support your body's natural antioxidant defense. Optimize cellular longevity based on your genetic biomarkers.",
  videoUrl: "https://sf5jobmydr0lqlek.public.blob.vercel-storage.com/Molecure_commercial_science_well%E2%80%A6_202607120156.mp4",
  shopButtonText: "Shop Personalized Packs",
  scienceButtonText: "Learn the Science",
  geneticEquationTitle: "Why Generic Vitamins Fail Your Antioxidant Defenses",
  geneticEquationText1: "Studies show that common polymorphisms (like MnSOD Val16Ala rs4880) restrict enzyme entry into mitochondrial space, leaving cell DNA vulnerable to oxidative decay. Regular supplements can't target these transport limitations.",
  geneticEquationText2: "Molecure delivers precise, bioavailable manganese and selenium chelates suspended in active lipid matrices, utilizing secondary pathways to bypass genetic bottlenecks.",
  stats: [
    { label: "Bioavailability", value: "99.8%", desc: "Nanoliposomal encapsulation" },
    { label: "Genomic Profiles", value: "15,000+", desc: "Sequenced & matched" },
    { label: "Clinical Reference", value: "7 Years", desc: "Machine learning datasets" }
  ]
};

export const DEFAULT_SCIENCE: ScienceContent = {
  badge: "CLINICAL DATA & VALIDATION",
  title: "The Molecular Mechanics of Cellular Longevity",
  subtitle: "Explore how genetic variants (SNPs) alter endogenous antioxidant enzyme synthesis and how targeted dietary cofactors restore mitochondrial redox balance.",
  heroNotice: "Genotype-directed nutrigenomic dosing restores cellular equilibrium.",
  simulationTitle: "Interactive MnSOD Transport Simulator",
  simulationDescription: "Adjust dietary antioxidant cofactors to observe mitochondrial oxidative stress response across distinct genotypes."
};

export const DEFAULT_ABOUT: AboutContent = {
  badge: "WHO WE ARE",
  title: "Our Story & Scientific Philosophy",
  story: "Molecure was founded to bridge the gap between breakthrough cellular research and daily nutritional habits. We build products designed to support your body's natural antioxidant defense at the DNA level.",
  nutrigenomicsTitle: "Nutrigenomics Explained Simply",
  nutrigenomicsExplanation: "Think of your DNA as a massive, highly detailed blueprint for a fortress. This fortress has a natural defensive guard—a network of enzymes (like SOD and GPX) synthesized inside your cells that act as sentries, continuously neutralizing free radicals that leak from metabolic powerhouses. Nutrigenomics uses targeted nutrients to reinforce those exact sentries or open alternative doorways.",
  mission: "To eliminate generic trial-and-error wellness through clinical genomics and AI-driven precision therapeutics.",
  vision: "A future where every human's daily nutrition is tailored to their unique DNA sequence and metabolic bottlenecks.",
  team: [
    {
      id: "member-1",
      name: "Dr. Evelyn Vance, Ph.D.",
      role: "Chief Scientific Officer & Co-Founder",
      bio: "18+ years of postdoctoral research in mitochondrial biology, redox biochemistry, and cellular senescence at Cambridge & Stanford.",
      image: "https://images.unsplash.com/photo-1594824813576-92931d8e1c66?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "member-2",
      name: "Danielle Stella, M.S.",
      role: "Lead AI Bioinformatics Engineer",
      bio: "Specializes in neural network architecture for genomics clinics, having led the Dec0ded 7-year machine learning development.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "member-3",
      name: "Marcus Thorne, Pharm.D.",
      role: "Director of Liposomal Formulations",
      bio: "Pioneered nanoliposomal drug delivery kinetics and GMP encapsulation protocols for unstable plant polyphenols.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
    }
  ]
};

export const DEFAULT_CONTACT: ContactContent = {
  badge: "CONNECT WITH US",
  title: "Consult Our Science Team",
  subtitle: "Have questions about your genetic markers or formulation cofactors? Reach out to our scientific advisory board for assistance.",
  address: "Biotech Innovation Campus, Tower 4, Suite 800",
  cityStateZip: "South San Francisco, CA 94080",
  phone: "+1 (800) 592-GENE",
  email: "scientific-affairs@molecure.com",
  hours: "Monday – Friday: 8:00 AM – 6:00 PM PST",
  labNotice: "Clinical consultations and genomic pack reviews are conducted by certified bioinformatics advisors."
};

export const DEFAULT_MEDIA: MediaAsset[] = [
  {
    id: "media-1",
    title: "Molecure Biotech Caduceus Logo",
    url: "https://sf5jobmydr0lqlek.public.blob.vercel-storage.com/Upscale_logo_quality_enhance_2K_202607132201.jpeg",
    category: "general",
    createdAt: "2026-07-13"
  },
  {
    id: "media-2",
    title: "Clipos Curcumin & Resveratrol Commercial Photo",
    url: "/src/assets/images/curcumin_resveratrol_clipos_1788471069017.jpg",
    category: "product",
    createdAt: "2026-09-03"
  },
  {
    id: "media-3",
    title: "Glutathione Liposomal Supplement",
    url: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400",
    category: "product",
    createdAt: "2026-07-01"
  },
  {
    id: "media-4",
    title: "Luteolin Neuroprotective Vial",
    url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400",
    category: "product",
    createdAt: "2026-07-01"
  },
  {
    id: "media-5",
    title: "Tanshinone CoQ10 Vascular Shield",
    url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400",
    category: "product",
    createdAt: "2026-07-01"
  },
  {
    id: "media-6",
    title: "Liposomal NMN Catalyst",
    url: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=400",
    category: "product",
    createdAt: "2026-07-01"
  },
  {
    id: "media-7",
    title: "Dec0ded Bespoke Pack",
    url: "https://images.unsplash.com/photo-1555633514-abcee6ab92e1?auto=format&fit=crop&q=80&w=400",
    category: "product",
    createdAt: "2026-07-01"
  }
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  products: PRODUCTS,
  articles: RESEARCH_ARTICLES,
  posts: BLOG_POSTS,
  faqs: FAQ_ITEMS,
  hero: DEFAULT_HERO,
  science: DEFAULT_SCIENCE,
  about: DEFAULT_ABOUT,
  contact: DEFAULT_CONTACT,
  media: DEFAULT_MEDIA
};
