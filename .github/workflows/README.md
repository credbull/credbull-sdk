# Github Actions

## Running Actions Locally

### Pre-requisite

1. Install act https://nektosact.com/installation/index.html
2. Jobs should be run from root folder (.././/)

### List Jobs

List jobs, with optional "--container-architecture" flag for Mac m chips

```bash
act --list --container-architecture linux/amd64
```

### Run Github Actions jobs

```bash
act -W .github/workflows/credbull.yml --secret-file packages/credbull/.env.github --container-architecture linux/amd64
```
