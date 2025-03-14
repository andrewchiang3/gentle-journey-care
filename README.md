# Gentle Journey Care: Virtual Rural Healthcare Clinic for Ferry County, Washington

## Table of Contents
* Project Overview
* Location & Healthcare Focus
* Prototype Features
* Tech Stack
* How to Run
* User Research & Feedback
* LLM Prompt Library
* Go-to-Market Strategy
* Business Model
* Legal & Compliance Considerations
* Alignment with State Health Agencies

## Project Overview
This project is part of the **Scaling Rural Healthcare with AI and LLMs** initiative at the **University of Washington**. The goal is to develop a **virtual healthcare** clinic leveraging AI and Large Language Models (LLMs) to improve access to medical services in **rural Washington**.

## Location & Healthcare Focus
* Rural Area: Ferry County, Washington
* Target Healthcare Issue: Pediatrics
* User Groups: Rural patients, healthcare providers, community health workers

## Prototype Features
* EHR aggregation for risk assessment
* AI decision support with data-driven metrics
* Dynamic patient discharge summary generation
* Providing at-home care recommendations for families

## Tech Stack
* React - The core JavaScript library for building user interfaces
* TypeScript - For type-safe JavaScript development
* Vite - For fast build tool and development server
* Tailwind CSS 
* shadcn/ui - A collection of reusable UI components built with Radix UI
* Recharts - For data visualizations


**How to Run**

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## User Research & Feedback
We conducted user research sessions with patient volunteers and rural healthcare providers to refine our prototype. Key feedback includes:
* Friendly medical terminology for patients
* Clear and explicit instructions for user input
* Clarity of AI/LLM use in provider workflow

## LLM Prompt Library
This project utilized Large Language Models (LLMs) and AI-generated prompts for user research, prototype development, and hypothesis validation. Below is a library of key prompts used:

## Prompts for User Research
* "What are the biggest challenges rural healthcare providers face in Ferry County when delivering pediatric services?"
* "How do rural patients prefer to interact with AI-powered healthcare tools?"
* "Generate a structured interview guide to assess the needs of rural healthcare providers in Ferry County."

## Prompts for Lovable Prototype Development
* "Design a warm and inviting interface that families trust when encountering this prototype"
* "Alter the terminology used throughout the prototype to cater to Ferry County by simplifying the medical terms"
* "Generate AI risk assessments based on EHR aggregation to support providers in decision making"

### How We Used These Prompts:
* Fine-tuned LLM-generated insights to match real-world provider & patient needs
* Iterated on prototype designs based on AI-assisted workflow and provider feedback
* Validated hypothesis through simulation of prototype in Ferry County

## Go-to-Market Strategy

### Total Addressable Market

Ferry County Population Total: 7,543

Total population ages 0-17: ~1,290 (17.1%)

Total providers in Ferry County: ~11 (0.14%)

Households: 3,138 (U.S. Census Bureau, 2019-2023)

Broadband Access: 2,413 Households (76.9%)

## Acquisition

### Supply-Side Strategy:
* **Provider Mapping**
  * Census primary care providers in Ferry County
  * Identify pediatric providers and assess technology adoption
* **Documentation**
  * Rural-specific implementation guides with workflow integration
  * Feature decision trees and comparable case studies
* **Financial Viability**
  * RCAC Community Facilities Loan Program for development costs
  * Rural Facilities Capital Grants Partnership Fund
  * Funding opportunities such as the Rural Facilities Capital Grants Partnership Fund, supported by organizations like Empire Health Foundation, can provide one-time capital for infrastructure and technology investments

### Demand-Side Strategy:
* **Community Engagement**
  * Partner with local pediatric providers for direct referrals to our prototype
  * Collaborate with Northeast Tri County Health District Republic office to inform community of technological interventions for pediatrics
* **Marketing**
  * Develop Facebook campaigns (primary rural social platform)
  * Informational materials at community organized events
* **School-based outreach**
  * Organize information sessions and demonstrations for Republic School District
  * Partner with school nurses referring to our prototype

### Network:
* **Strategic Partnerships/Relationship-Focused Implementation**
  * Engage with community organizers for healthcare coordination insights
  * Develop value-driven partnerships with local clinics demonstrating mutual benefits
  * Establish locally-relevant success metrics
  * Connect with Ferry County Child Advocate Program

## Business Model
### Integrated Pediatric Care Solution

Our pediatric care solution integrates directly into existing Ferry County clinics through an embedded model:**

### Funding Approach
* Secure nonprofit grants for prototype development
* Prioritize funding for core AI/LLM capabilities
* Focus on EHR aggregation functionality

### Deployment Model
* Embed within existing healthcare entities
* Leverage established provider-patient relationships
* Enhance current workflows without disruption

### Dual-Value Proposition
* Provider solution: Enhance diagnostic capabilities with AI-driven risk assessments
* Family solution: Extend care delivery into patients' homes

## Legal & Compliance Considerations
This virtual clinic is designed to comply with state and local healthcare regulations to ensure ethical and legal operation. 

### Key considerations:
* HIPAA Compliance – All patient data is handled according to HIPAA (Health Insurance Portability and Accountability Act) regulations.
* Ferry County Health Charity Care Policy
    * Full charity care for families ≤ 200% FPL
    * Sliding scale discount for 200%-300% FPL
* Security & Privacy - PHI, HITECH, My Health My Data Act
    * Obtain clear user consent for data collection
    * Implement strong security: encryption, MFA, audits
    * Transparent privacy policies
* WLAD, ACA, & non-discrimination Laws
    * High-quality care for all families, regardless of income or background
    * Language access for non-English families
* Parental Consent & Guardian Access - Mature Minor Doctrine
    * Minors manage records if mature; guardians oversee younger children
    * Clearly communicate privacy rights to minors

## Alignment with State Health Agencies
# Healthcare Stakeholder Integration

| Organization | Role & Contribution | App Integration |
|-------------|---------------------|----------------|
| Ferry County Public Health (FCPH) | Manages disease control, maternal & child health, environmental health | Connect with stakeholders, integrate public health data (outbreaks, vaccinations, maternal health) |
| Northeast WA ACH | Supports Medicaid & social determinants of health | Provide pediatric health education (development, mental health, vaccination, preventive care) |
| WA State Dept. of Health | Funding, training, policy enforcement | Secure funding, set telehealth & vaccination guidelines, develop training for providers & residents |

## Prototype Readiness
This prototype is currently conceptual, and requires backend LLM integration. This prototype was designed with the Med42-v2-70B in mind.
#### Key performance metrics:
* Med42-v2-70B outperforms GPT-4.0 in most of the MCQA tasks.
* Med42-v2-70B achieves a MedQA zero-shot performance of 79.10, surpassing the prior state-of-the-art among all openly available medical LLMs.
* Med42-v2-70B sits at the top of the Clinical Elo Rating Leaderboard.

Implementing the Med42 70B model for pediatric healthcare in Ferry County would involve substantial upfront hardware investments and ongoing operational costs

| Category | Cost Estimate | Notes |
|----------|---------------|-------|
| Initial Hardware | $65,000 - $75,000 | 2x NVIDIA A100 80GB GPUs, server, storage, cooling |
| Annual Operations | $14,050 - 22,550 | Power, maintenance, hybrid cloud |
| Personnel | $60,000 - $220,000 | IT support + optional engineers |
| Mobile Prototype | $5,000 - $10,000 (first year) | Development and deployment |

#### Key Considerations
1. Data Security: HIPAA compliance requires encrypted storage and access controls, potentially adding ~$10,000–$20,000 for audits and infrastructure.
2. Scalability: If usage grows, adding GPUs or cloud capacity could increase costs by 30–50%.
3. Energy Efficiency: Renewable energy or off-peak scheduling could reduce electricity expenses.

For a small-scale deployment in Ferry County, the first-year total cost would likely be up to ~$164,050-$377,550 depending on personnel and prototype scope. Long-term savings from automation and improved care could offset these investments

## Contributors

* Andrew Chiang
* Ximing Sun