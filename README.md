# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite.

---

## ESlint + airbnb(with typescript) + prettier + husky + lint-staged

Everything in working state, ready to use

<details>
  <summary>See the *bug*</summary>
  I couldn't figure out how to not include this rule
  `vite` should be in devDep. but eslint tells, that it needs to be in regular Dependencies

> So this works just fine

```cjs
rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['vite.config.ts'],
        optionalDependencies: ['vite.config.ts'],
        peerDependencies: ['vite.config.ts'],
      },
    ],
  },
```

</details>

## Prepare husky

[🐶 get started page](https://typicode.github.io/husky/get-started.html)

### First

Creates .husky folder

```bash
  npx husky init
```

### Second

_Prepare_ husky files

```bash
  npm run prepare
```

### Third

Create file `pre-commit` inside folder `.husky`

```bash
  touch .husky/pre-commit
```

### Finaly

Add `npx lint-staged` inside file `pre-commit`

**Try to Commit**
