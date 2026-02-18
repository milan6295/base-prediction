import { Frog, Button } from 'frog';
import { handle } from 'frog/vercel';

export const app = new Frog({
basePath: '/api',
title: 'Base Predict',
});

app.frame('/', (c) => {
return c.res({
image: (
<div style={{ color: 'white', display: 'flex', flexDirection: 'column', fontSize: 60, background: 'linear-gradient(to right, #0052ff, #00a3ff)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
<p>Will ETH hit $4000 this month?</p>
<div style={{ display: 'flex', gap: '20px', fontSize: 30 }}>
<span>Market ID: 0</span>
</div>
</div>
),
intents: [
<Button.Transaction target="/vote/yes">Bet YES (0.001 ETH)</Button.Transaction>,
<Button.Transaction target="/vote/no">Bet NO (0.001 ETH)</Button.Transaction>,
],
});
});

app.transaction('/vote/:side', (c) => {
const side = c.req.param('side');
const isYes = side === 'yes';

return c.res({
chainId: 'eip155:8453',
method: 'eth_sendTransaction',
params: {
abi: [
{
"inputs": [
{ "internalType": "uint256", "name": "_marketId", "type": "uint256" },
{ "internalType": "bool", "name": "_vote", "type": "bool" }
],
"name": "vote",
"outputs": [],
"stateMutability": "payable",
"type": "function"
}
],
to: '0xB4085493f432B86DfE830Fed7CD94F05008671Db',
value: '1000000000000000',
},
});
});

export const GET = handle(app);
export const POST = handle(app);
