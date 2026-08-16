# Portfolio Intake Workflow

This repository is maintained as two connected systems:

- **Nocturne** (`index.html`) — private-ish study workflow / roadmap UI.
- **Professional Portfolio** (`portfolio.html`) — recruiter-readable evidence from real work.

## Default workflow when Gabriel sends new material

Gabriel may send any combination of:

- university lab reports;
- project reports / presentations;
- source code;
- photos or screenshots;
- wiring / CAD / PLC files;
- notes about what he personally did;
- certifications or course completion evidence.

The maintainer should then:

1. **Read the evidence first.** Do not write a case study from memory or from a project title alone.
2. **Separate team context from individual contribution.** If the project was collaborative, say so. If Gabriel personally owned a subsystem, codebase or integration task, state that precisely.
3. **Classify the work:**
   - Practice / lab — focused technical exercise.
   - Project — multi-part build with meaningful integration.
   - Flagship case study — strong, well-evidenced work suitable for recruiter attention.
4. **Extract verified technical facts:** hardware, protocols, software, architecture, parameters, algorithms, test results and troubleshooting.
5. **Do not invent metrics.** Targets, expected values and proposed methodology are not the same as measured results.
6. **Sanitize public material.** Avoid student ID numbers, passwords, API keys, private network details that add no professional value, and unrelated personal information.
7. **Create/update a Markdown source case study** under `portfolio/projects/` or `portfolio/practices/`.
8. **Add relevant source code** under `projects/<project-name>/` when useful. If code is improved, preserve the distinction between the submitted/original implementation and a later portfolio refactor.
9. **Update `data/portfolio.js`** so the professional portfolio reflects verified work.
10. **Update Nocturne project status** when appropriate so study and portfolio state stay aligned.
11. **Add architecture diagrams/assets** when they make the system easier to understand.
12. **Record future upgrades separately** from verified achievements.

## Evidence language

Use labels such as:

- `Verified from report`
- `Verified from source code`
- `Self-reported contribution`
- `Team project`
- `Solo implementation`
- `Planned future extension`

This keeps the portfolio credible without underselling real work.

## Code review policy

When improving old student code:

- do not silently replace history;
- document what the original implementation already did well;
- create a separate refactored/public version when appropriate;
- explain engineering improvements;
- do not claim improved performance unless it was actually benchmarked;
- prefer configuration, logging, error handling, testability and maintainability improvements before unnecessary rewrites.

## Career positioning

Prioritize evidence that reinforces the long-term profile:

**Mechatronics → Industrial Automation / Embedded Systems → OT, Product or Cyber-Physical Security**

Useful evidence includes PLCs, industrial protocols, networking, embedded programming, electronics, computer vision, Linux, Python/C/C++, troubleshooting, telemetry, hardware/software integration and secure-system thinking.
