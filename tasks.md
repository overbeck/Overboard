# Overboard — Task Backlog

Tasks are worked top-to-bottom. The topmost unchecked item is the next task.
After completing a task, check it and move it to the Done section.
Append newly discovered tasks to the Pending list.

---

## Pending

- [ ] Add a command palette (Cmd+K) that lets you jump to any page or system by typing — use a modal overlay with fuzzy search across page names and system names
- [ ] Add copy-to-clipboard button on part numbers in the Parts page — small icon button that appears on hover next to the part number
- [ ] Add proper empty states to all search/filter pages (Systems, Parts, Knowledge, Repos) — show a centred message with the search term when no results match
- [ ] Add a CSV export button to the Parts page that downloads the full BOM as a spreadsheet-ready file
- [ ] Add target date fields to Strategy goals — each goal gets an optional due date shown as a subtle monospace label; overdue dates shown in amber
- [ ] Add a compact/expanded toggle to Strategy phase cards — collapsed shows only the phase header and progress bar, expanded shows goals
- [ ] Add multi-tag filtering to the Knowledge page — allow selecting more than one tag at a time with AND logic
- [ ] Add a "recently updated" sort option to the Repos page alongside the existing display
- [ ] Add a global activity feed page at `/activity` showing the full activity log with filtering by type and system — link it from the Dashboard "Recent Activity" header
- [ ] Add version badge to Schematics cards showing the version field more prominently
- [ ] Add a Manibus system to `src/data/systems.ts` — status `in-development`, accent `pink` (use a new distinct accent colour), description based on it being a gestural performance instrument, realistic tech stack (IMU sensors, BLE, C/C++, custom PCB)
- [ ] Improve mobile layout — the sidebar should collapse to a bottom nav bar on screens below 768px wide, with icons only
- [ ] Add a print-friendly CSS stylesheet for the Strategy page so it can be printed or saved as PDF cleanly
- [ ] Add keyboard shortcuts indicator to the sidebar footer — small tooltip or label showing available shortcuts
- [ ] Add a summary metrics banner to the Dashboard showing total schematic count, total step file count, and repo language breakdown as a small horizontal strip

---

## Done

<!-- Completed tasks move here with [x] -->
