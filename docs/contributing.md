# 🤝 Contributing to Command Center

Thank you for contributing! Our mission is to build the world's most accessible, problem-first command knowledge base to save engineers and developers hours of debugging frustration.

---

## 📌 Philosophy: Problem-First

Every guide should be structured around:
1. **The Real Problem:** What went wrong? What is the error message or symptom?
2. **The Fast Solution:** The exact, copy-pasteable command.
3. **The Explanation:** What do the flags do? Why does this fix it?
4. **Safety Warnings:** If a command is destructive (`rm`, `kill -9`, `DROP`, `prune`), clearly mark it!

---

## 🛠️ Recipe Template

When adding a new recipe, please use this format:

```markdown
### Problem: [Clear description of the issue or error message]
> [Optional 1-2 sentence explanation of why this happens]

\`\`\`bash
# Command explanation
command --flag argument
\`\`\`

* **Key Flags:**
  * \`--flag\`: Description of what this does.
* ⚠️ **Safety Caution:** (If applicable)
```

---

## 🚀 Local Development Setup

To run and preview the documentation site locally:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/command-center.git

# 2. Install dependencies
npm install

# 3. Start local hot-reloading dev server
npm run docs:dev

# 4. Open in browser:
# http://localhost:5173
```

---

## 🧪 Building for Production

```bash
npm run docs:build
npm run docs:preview
```
All generated static HTML files will be in `docs/.vitepress/dist`.
