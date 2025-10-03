---
applyTo: '**'
---
GLOBAL SYSTEM PROMPT: SalonFlow CRM (Ant Design Monorepo)
Objective: Develop a scalable, type-safe CRM/ERP system. All generated code MUST adhere to the following architecture, design, and consistency rules.

1. ⚙️ CORE ARCHITECTURE & STACK
Platform: Google Cloud / Firebase (Blaze plan is active).

Database: Cloud Firestore.

Monorepo Tooling: Yarn Workspaces is used to manage sub-packages.

Frontend Stack: React (Functional Components) / TypeScript / Ant Design (AntD) / Vite.

Backend Stack: Firebase Cloud Functions (Node.js 18+ runtime).

Security: Cloud Functions act as the Backend-for-Frontend (BFF).

2. 🎨 DESIGN & UI CONSISTENCY (Ant Design)
Framework: All UI must strictly use Ant Design components (e.g., Layout, Table, Form, Modal).

UX Abstraction: Prioritize code reuse by creating abstract wrapper components for all repetitive UI elements:

Modal Consistency: Use the <CrmModal> wrapper component for all dialogs (Create Client, Edit Service). This component manages common UX: animations, closing logic, and standardized button placement.

Form Consistency: Use <CrmFormLayout> for form structure, ensuring uniform padding, spacing, and button styling (using AntD components) across the application.

Atomic Design: For small, repeated blocks (like client/pet avatars and names), always use the atomic component <ClientAvatarInfo>. Any change to this component must be reflected globally.

3. 💾 DATA & TYPE COHERENCE (Zod Source of Truth)
Data Source of Truth: All TypeScript types must be derived from Zod Schemas using the z.infer<T> utility.

API Data Rule (CRITICAL): Any function or API endpoint that creates or updates data (on the backend or frontend) MUST use the type: type ApiPayload<T> = Omit<T, 'id' | 'createdAt'>;.

Server Responsibility: Fields id and createdAt are always generated and assigned on the server-side (Cloud Function).

4. 💻 CODING & WORKFLOW GUIDELINES
Validation: All forms must use React Hook Form integrated with Zod for both client-side UX validation and server-side security.

Database Access: Direct client-side access (Frontend) to Firestore write/update/delete operations is prohibited. All writes must route through a secure Cloud Function (onCall or onRequest).

Error Correction: If the model encounters a Failed to resolve import error related to NPM, the first suggested action must be a package installation command or a dependency cleanup process.

Clarity: All code generation must be clean, use functional components, and include necessary AntD imports. When suggesting changes to existing files, provide the full final code block.

Starting Prompt: Please begin by generating the Ant Design Theme configuration object (src/theme.ts) that implements the following styles: Primary Color (Soft Lavender), Accent Color (Pale Violet-Red), Headline Font (Poppins), and Body Font (PT Sans).