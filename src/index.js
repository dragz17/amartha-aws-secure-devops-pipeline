console.log('Hello World!');

// Function that uses eval - should be flagged by SAST
function executeCode(codeString) {
  eval(codeString);
}

// Example of a regex that might be flagged for optimization or potential ReDoS (simple case)
const insecureRegex = /^(a+)+$/;

// Example of a hardcoded placeholder secret (more secrets detection, but sometimes flagged)
const API_KEY = "sk_test_abcdef12345";

// Example usage (for demonstration, not meant to be called in production)
// executeCode("console.log('This is from eval')");
// insecureRegex.test("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaax");
// console.log(API_KEY);
