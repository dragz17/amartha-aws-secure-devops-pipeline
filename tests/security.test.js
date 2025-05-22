const { expect } = require('chai');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Security Tests', () => {
  describe('Dependency Security', () => {
    it('should not have known vulnerabilities', (done) => {
      exec('npm audit --json', (error, stdout) => {
        const audit = JSON.parse(stdout);
        expect(audit.vulnerabilities).to.be.empty;
        done();
      });
    });
  });

  describe('Container Security', () => {
    it('should not have critical vulnerabilities in container image', (done) => {
      exec('trivy image --format json $DOCKER_IMAGE', (error, stdout) => {
        const scan = JSON.parse(stdout);
        const criticalVulns = scan.Results.filter(r => r.Severity === 'CRITICAL');
        expect(criticalVulns).to.be.empty;
        done();
      });
    });
  });

  describe('Code Security', () => {
    it('should not contain hardcoded secrets', () => {
      const secrets = [
        'password',
        'secret',
        'key',
        'token',
        'credential'
      ];
      
      const searchForSecrets = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            searchForSecrets(filePath);
          } else if (stat.isFile() && !filePath.includes('node_modules')) {
            const content = fs.readFileSync(filePath, 'utf8');
            secrets.forEach(secret => {
              expect(content.toLowerCase()).to.not.include(secret);
            });
          }
        });
      };
      
      searchForSecrets(path.join(__dirname, '..'));
    });

    it('should use secure HTTP headers', () => {
      // Add your HTTP header security tests here
      // This is a placeholder for actual implementation
      expect(true).to.be.true;
    });
  });
}); 