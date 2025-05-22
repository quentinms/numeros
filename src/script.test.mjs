import { toWrittenForm } from './script.mjs';

// $ node script.test.mjs
console.log('Testing toWrittenForm...');
console.assert(toWrittenForm(0) === 'zero', 'Test failed: 0 should be "zero"');
console.assert(toWrittenForm(1) === 'um', 'Test failed: 1 should be "um"');
console.assert(toWrittenForm(2) === 'dois', 'Test failed: 2 should be "dois"');
console.assert(toWrittenForm(3) === 'três', 'Test failed: 3 should be "três"');
console.assert(toWrittenForm(16) === 'dezasseis', 'Test failed: 16 should be "dezasseis"');
console.assert(toWrittenForm(100) === 'cem', 'Test failed: 100 should be "cem"');
console.assert(toWrittenForm(101) === 'cento e um', 'Test failed: 101 should be "cento e um"');
console.assert(toWrittenForm(200) === 'duzentos', 'Test failed: 200 should be "duzentos"');
console.assert(toWrittenForm(1000) === 'mil', 'Test failed: 1000 should be "mil"');
console.log('Test completed successfully!');
