# 📖 Development Guide

This document describes the development workflow for this project.

## 🌿 Git Workflow

### Branch Strategy

```
main
  └─ develop
      ├─ feature/todo-crud
      ├─ feature/user-auth
      └─ feature/database-integration
```

### Branch Naming Convention

- `feature/*` - New features (e.g., `feature/add-statistics`)
- `fix/*` - Bug fixes (e.g., `fix/todo-deletion-error`)
- `docs/*` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/*` - Code refactoring (e.g., `refactor/api-structure`)

## 📝 Commit Message Convention

Use clear, descriptive commit messages:

```bash
# Format
<type>: <short description>

# Examples
feat: Add user authentication with JWT
fix: Fix todo deletion not working
docs: Update API documentation
style: Format code with prettier
refactor: Restructure API endpoints
test: Add unit tests for todo service
chore: Update dependencies
```

### Commit Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, no code change)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Build, config, dependencies

## 🚀 Development Workflow

### 1. Start New Feature

```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. Make Changes

```bash
# Make your changes
# Test thoroughly

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Add your feature description"
```

### 3. Push and Create Pull Request

```bash
# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Request code review (if team project)
```

### 4. Merge to Develop

```bash
# After approval, merge to develop
git checkout develop
git merge feature/your-feature-name

# Or use GitHub's merge button
```

### 5. Deploy to Main

```bash
# When ready for production
git checkout main
git merge develop
git push origin main
```

## 🔄 Regular Tasks

### Update Dependencies

```bash
# Backend
cd backend
pip list --outdated
pip install -U <package-name>

# Frontend
cd frontend
npm outdated
npm update
```

### Run Tests

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

### Check Code Quality

```bash
# Backend
cd backend
flake8 .
black .

# Frontend
cd frontend
npm run lint
npm run type-check
```

## 📦 Release Process

### 1. Version Bump

```bash
# Update version in:
# - package.json
# - backend/main.py (if applicable)
# - README.md

git commit -m "chore: Bump version to 1.1.0"
```

### 2. Create Release Branch

```bash
git checkout -b release/1.1.0
# Final testing
# Fix any issues
```

### 3. Merge to Main

```bash
git checkout main
git merge release/1.1.0
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin main --tags
```

### 4. Merge Back to Develop

```bash
git checkout develop
git merge release/1.1.0
git push origin develop
```

## 🐛 Hotfix Process

For critical bugs in production:

```bash
# Create hotfix from main
git checkout main
git checkout -b hotfix/critical-bug-fix

# Fix the bug
git commit -m "fix: Fix critical bug description"

# Merge to main
git checkout main
git merge hotfix/critical-bug-fix
git tag -a v1.0.1 -m "Hotfix version 1.0.1"

# Merge to develop
git checkout develop
git merge hotfix/critical-bug-fix

# Push
git push origin main develop --tags
```

## 🎯 Best Practices

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Comments explain "why", not "what"
- [ ] Tests are added/updated
- [ ] Documentation is updated
- [ ] No console.log or debug code
- [ ] Error handling is proper
- [ ] Performance is acceptable

### Before Committing

```bash
# 1. Format code
npm run lint:fix  # Frontend
black .          # Backend

# 2. Run tests
npm test         # Frontend
pytest           # Backend

# 3. Build successfully
npm run build    # Frontend
docker-compose build  # Full stack

# 4. Review changes
git diff
git status

# 5. Commit
git add .
git commit -m "feat: Your descriptive message"
```

## 🤖 Working with AI

### Recommended Approach

1. **Start Small**: Build features incrementally
2. **Understand Code**: Read and understand AI-generated code
3. **Test Thoroughly**: Always test AI-generated code
4. **Commit Often**: Commit working code frequently
5. **Document**: Add comments explaining complex logic

### Example Workflow

```bash
# 1. Create feature branch
git checkout -b feature/add-search

# 2. Ask AI to implement search functionality
# 3. Review and test the code
# 4. Make adjustments if needed
# 5. Commit

git add .
git commit -m "feat: Add search functionality for todos"

# 6. Continue with enhancements
git commit -m "feat: Add search filters and sorting"
```

## 📚 Resources

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

Happy coding! 🚀


