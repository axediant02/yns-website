---
name: yns-shadcn-ui
description: "Create or refine YNS frontend UI with existing shadcn primitives, semantic design tokens, reusable form/layout compositions, accessibility, and responsive behavior. Use for component and styling work; excludes framework migrations and backend changes."
---

# YNS shadcn UI

Read the affected frontend's `AGENTS.md`. For CMS work, read `docs/design-system.md`; retain Geist and the approved semantic palette. For public website work, preserve its established visual direction.

- Inspect existing `components/ui` primitives and nearby compositions before creating UI.
- Reuse primitives and compose wrappers in common/forms/layout or feature folders. Keep CLI-generated files in `components/ui` unmodified.
- When an approved task needs a missing primitive, generate it with the shadcn CLI using the repository's configured package manager. On this Windows workspace use `npx.cmd shadcn@latest add <component>` when PowerShell blocks the script wrapper.
- Install/update dependencies through their package manager/CLI, preserving lockfiles and repository approval policy. Do not copy library internals or hand-edit a manifest to imitate installation.
- Keep field labels, icons, spacing, focus treatment, disabled/busy states, and feedback consistent. Reuse field/password compositions where appropriate; give icon-only controls meaningful names.
- Use semantic tokens and Tailwind utilities. Keep custom CSS for tokens, animation, or styles not clearly expressed by utilities; avoid introducing an alternate palette or font.
- Preserve mobile usability, whole-word wrapping, keyboard access, both CMS themes, and reduced-motion behavior. Reserve layout space for changing text when needed.
- Keep UI components presentation-focused; call hooks/services for substantive behavior and remote state.
- Static UI copy may be named feature content. Community facts, media, roles, and API shapes require repository evidence.

Verify affected interactions and checks; visually inspect representative sizes/themes using an available browser tool. If the browser is unavailable, state that limitation instead of claiming a visual pass.
