#!/bin/bash

# Exit on error
set -e

echo "🔧 Installing security tools..."

# Install SonarQube Scanner
if ! command -v sonar-scanner &> /dev/null; then
    echo "📥 Installing SonarQube Scanner..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install sonar-scanner
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip
        unzip sonar-scanner-cli-4.8.0.2856-linux.zip
        sudo mv sonar-scanner-4.8.0.2856-linux /opt/sonar-scanner
        echo 'export PATH=$PATH:/opt/sonar-scanner/bin' >> ~/.bashrc
        source ~/.bashrc
    fi
fi

# Install OWASP Dependency-Check
if ! command -v dependency-check &> /dev/null; then
    echo "📥 Installing OWASP Dependency-Check..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install dependency-check
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        wget https://github.com/jeremylong/DependencyCheck/releases/download/v8.4.0/dependency-check-8.4.0-release.zip
        unzip dependency-check-8.4.0-release.zip
        sudo mv dependency-check /opt/
        echo 'export PATH=$PATH:/opt/dependency-check/bin' >> ~/.bashrc
        source ~/.bashrc
    fi
fi

# Install Trivy
if ! command -v trivy &> /dev/null; then
    echo "📥 Installing Trivy..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install aquasecurity/trivy/trivy
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
    fi
fi

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "📥 Installing Docker..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install --cask docker
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
    fi
fi

echo "✅ All tools installed successfully!"
echo "🔍 You can now run ./scripts/local-security-scan.sh" 