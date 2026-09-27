const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('finora.html', 'utf8');
const scripts = [...html.matchAll(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]);
const context = {
  console, Date, Math, Set, Map, Number, String, Object, Array, Intl, Papa: {},
  React: { useState(){}, useEffect(){}, useReducer(){}, useContext(){}, useCallback(){},
    useMemo(){}, useRef(){}, createContext(){} },
};
vm.createContext(context);

// The first three Babel blocks contain the data and deterministic analysis layer
// and intentionally have no JSX, so they can be exercised without a browser.
scripts.slice(0, 3).forEach(source => vm.runInContext(source, context));

const transactions = [
  { id:'1', date:'2026-09-05', description:'Coffee', merchant:'Cafe', amount:220, type:'debit', category:'Food', context:'Client meeting' },
  { id:'2', date:'2026-09-06', description:'Coffee', merchant:'Cafe', amount:180, type:'debit', category:'Food' },
  { id:'3', date:'2026-09-12', description:'Coffee', merchant:'Cafe', amount:240, type:'debit', category:'Food' },
  { id:'4', date:'2026-09-13', description:'Large purchase', merchant:'Shop', amount:2400, type:'debit', category:'Shopping' },
  { id:'5', date:'2026-09-14', description:'Salary', merchant:'Employer', amount:50000, type:'credit', category:'Income' },
];

const analysis = context.analyzeBehavior(transactions);
assert.strictEqual(analysis.transactionCount, 4);
assert.strictEqual(analysis.contextCount, 1);
assert.ok(analysis.indicators.some(indicator => indicator.id === 'small-purchase-frequency'));
assert.ok(analysis.indicators.some(indicator => indicator.id === 'context-coverage'));
assert.ok(Array.isArray(analysis.actions));
assert.match(analysis.summary, /Most recorded debit spend is in/);

assert.strictEqual(context.sanitizeTransactionContext('  note '.repeat(100)).length, 240);
assert.strictEqual(context.sanitizeTransactionContext(null), '');
assert.strictEqual(context.classifyIntent('What spending patterns do you see?')[0].intent, 'behavioral_patterns');

console.log('Behavioral spending insight tests passed.');
