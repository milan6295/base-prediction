import { Frog, Button } from 'frog';
import { handle } from 'frog/vercel';

export const app = new Frog({
basePath: '/api',
title: 'Base Predict',
});

app.frame('/', (c) => {
return c.res({
image: 'https://emerald-glaring-marlin-155.mythic.be/api/og?title=Base%20Predict&description=Will%20ETH%20hit%20$4000?',
intents: [
<Button.Transaction target="/vote/yes">Bet YES (0.001 ETH)</Button.Transaction>,
<Button.Transaction target="/vote/no">Bet NO (0.001 ETH)</Button.Transaction>,
],
});
});

app.transaction('/vote/:side', (c) => {
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
