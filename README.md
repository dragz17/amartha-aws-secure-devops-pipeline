# Amartha DevSecOps Pipeline

This repository contains a DevSecOps pipeline implementation that integrates security tools and best practices into the CI/CD process for Node.js web applications.

## Features

- Automated security scanning in CI/CD pipeline
- Static code analysis (SonarCloud)
- Dependency vulnerability checking (OWASP Dependency-Check)
- Container security scanning (Trivy)
- Security unit tests
- Configurable security thresholds
- Automated notifications (Slack)

## Prerequisites

- Node.js 18 or higher
- Docker (Colima/Docker Desktop)
- Bitbucket account
- SonarCloud account

## Required Environment Variables

```bash
# SonarCloud
SONAR_HOST_URL=https://sonarcloud.io
SONAR_TOKEN=your_sonarcloud_token

# Docker
DOCKER_IMAGE=your_docker_image_name

# Notifications
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://bitbucket.org/your-org/amartha-devsecops-sample.git
   cd amartha-devsecops-sample
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure security settings:
   - Edit `config/security-config.json` to customize security thresholds and notifications
   - Update `.gitignore` and `.dockerignore` to exclude sensitive files

4. Set up Bitbucket Pipeline:
   - Enable Bitbucket Pipelines in your repository settings
   - Add required environment variables in repository settings

## Security Tools Integration

### Static Code Analysis
- SonarCloud for code quality and security
- ESLint with security plugins

### Dependency Checking
- OWASP Dependency-Check

### Container Security
- Trivy for container scanning
- Docker best practices

## Pipeline Stages

1. **Security Scan**
   - Static code analysis (SonarCloud)
   - Dependency check (OWASP Dependency-Check)
   - Container scan (Trivy)
   - Security unit tests

2. **Build**
   - Docker image build
   - Application build

## Security Configuration

The security configuration can be customized in `config/security-config.json`:

- Vulnerability thresholds
- Excluded paths and vulnerabilities
- Notification settings
- Container security options
- Dependency check settings
- Static analysis configuration

## Running Security Tests

```bash
# Run all security tests
npm run test:security
```

## Notifications

The pipeline sends notifications for:
- Critical vulnerabilities
- High severity issues
- Failed security checks

## Contributing

1. Create a feature branch
2. Make your changes
3. Run security tests
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.