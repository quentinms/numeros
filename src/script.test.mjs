import { toWrittenForm } from './script.mjs';
import { strict as assert } from 'node:assert';

// $ node script.test.mjs
console.log('Testing toWrittenForm...');
assert.strictEqual(toWrittenForm(0), 'zero', 'Test failed: 0 should be "zero"');
assert.strictEqual(toWrittenForm(1), 'um', 'Test failed: 1 should be "um"');
assert.strictEqual(toWrittenForm(2), 'dois', 'Test failed: 2 should be "dois"');
assert.strictEqual(toWrittenForm(3), 'três', 'Test failed: 3 should be "três"');
assert.strictEqual(toWrittenForm(16), 'dezasseis', 'Test failed: 16 should be "dezasseis"');
assert.strictEqual(toWrittenForm(100), 'cem', 'Test failed: 100 should be "cem"');
assert.strictEqual(toWrittenForm(101), 'cento e um', 'Test failed: 101 should be "cento e um"');
assert.strictEqual(toWrittenForm(200), 'duzentos', 'Test failed: 200 should be "duzentos"');
assert.strictEqual(toWrittenForm(1000), 'mil', 'Test failed: 1000 should be "mil"');
console.log('Tests completed successfully!');
