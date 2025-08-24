# Observable Plot Learning Examples

This repository contains multiple sample projects demonstrating Observable Plot features.

## Project Structure

```
observable-experiments/
├── package.json          # Shared dependencies
├── node_modules/         # Shared node_modules
├── dev-watcher.js        # Auto-run script
├── test01/              # Basic scatter plot
│   ├── main.mjs
│   ├── styles.css
│   └── penguins.csv
├── test02/              # (Future project)
└── test03/              # (Future project)
```

## Setup

1. **Install dependencies once** (in the root directory):
   ```bash
   npm install
   ```

2. **Run individual projects**:
   ```bash
   # Run test01
   npm run start:test01
   
   # Run test02
   npm run start:test02
   ```

## Development with Auto-Reload

### Option 1: Watch All Projects (Recommended)
```bash
npm run watch
# or
npm run dev:all
```

This will:
- Watch all project directories (test01, test02, test03)
- Automatically detect which project changed
- Run the appropriate `main.mjs` file
- Show which project is currently running

### Option 2: Watch Individual Projects
```bash
# Watch only test01
npm run dev:test01

# Watch only test02
npm run dev:test02
```

## Adding New Projects

1. Create a new directory (e.g., `test04/`)
2. Add your `main.mjs` file
3. Update `dev-watcher.js` to include the new project name
4. Update `package.json` scripts if needed

## Benefits of This Setup

- **Shared dependencies**: Only one `node_modules` folder
- **Auto-detection**: Automatically runs the right project when files change
- **Easy management**: All projects in one place
- **Learning friendly**: Easy to compare different examples

## File Types Watched

- `.mjs` - Main JavaScript files
- `.js` - JavaScript files
- `.csv` - Data files
- `.html` - HTML templates
- `.css` - Stylesheets
