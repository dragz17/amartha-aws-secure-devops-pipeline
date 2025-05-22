import { expect } from 'chai';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load security configuration
const securityConfigPath = path.join(__dirname, '../config/security-config.json');
const securityConfig = JSON.parse(fs.readFileSync(securityConfigPath, 'utf8')).security;

const exclusionPaths = securityConfig.exclusions.paths.map(p => path.join(__dirname, '../', p).replace(/\/\*\*$/, '')); // Convert glob to simple path prefix

const isExcluded = (filePath) => {
  return exclusionPaths.some(excludedPath => filePath.startsWith(excludedPath));
};

describe('Security Tests', () => {
  describe('Dependency Security', () => {
    it('should not have known vulnerabilities', (done) => {
      exec('npm audit --json', (error, stdout) => {
        if (error) {
          try {
            const audit = JSON.parse(stdout);
            console.error("npm audit found vulnerabilities:");
            console.error(stdout);
            expect(audit.vulnerabilities).to.be.empty;
            done(new Error('npm audit found vulnerabilities'));
          } catch (parseError) {
            console.error("Failed to parse npm audit JSON output:", parseError);
            console.error("npm audit raw output:", stdout);
            done(parseError);
          }
        } else {
          console.log("npm audit found no vulnerabilities.");
          done();
        }
      });
    });
  });

  describe('Code Security', () => {
    it('should not use eval()', () => {
      const searchForEval = (dir) => {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);

          if (isExcluded(filePath)) {
            return; // Skip excluded paths
          }

          if (stat.isDirectory()) {
            searchForEval(filePath);
          } else if (stat.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.mjs') || filePath.endsWith('.ts'))) {
            const content = fs.readFileSync(filePath, 'utf8');
            // Basic check for eval( - might miss complex cases
            expect(content).to.not.include('eval(');
          }
        });
      };

      // Scan the source directory
      searchForEval(path.join(__dirname, '../src'));
    });

    it('should not use insecure timers with strings', () => {
      const searchForInsecureTimers = (dir) => {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);

          if (isExcluded(filePath)) {
            return; // Skip excluded paths
          }

          if (stat.isDirectory()) {
            searchForInsecureTimers(filePath);
          } else if (stat.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.mjs') || filePath.endsWith('.ts'))) {
            const content = fs.readFileSync(filePath, 'utf8');
            // Check for setTimeout or setInterval used with a string argument
            // e.g., setTimeout(\'alert(1)\', 100);
            expect(content).to.not.match(/(setTimeout|setInterval)\\s*\\(\\s*[\'\"\`])/); // Corrected regex escaping
          }
        });
      };

      // Scan the source directory
      searchForInsecureTimers(path.join(__dirname, '../src'));
    });

    // Add other specific code security checks here in the future if needed
  });
}); 