const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const SECRET = process.env.PAYSTACK_SECRET;
app.post('/transfer', async (req,res)=>{
 try{
  const {account_number,bank_code,amount,name}=req.body;
  const r1=await fetch('https://api.paystack.co/transferrecipient',{method:'POST',headers:{Authorization:`Bearer ${SECRET}`,'Content-Type':'application/json'},body:JSON.stringify({type:'nuban',name,account_number,bank_code,currency:'NGN'})}).then(r=>r.json());
  if(!r1.status) return res.json(r1);
  const r2=await fetch('https://api.paystack.co/transfer',{method:'POST',headers:{Authorization:`Bearer ${SECRET}`,'Content-Type':'application/json'},body:JSON.stringify({source:'balance',amount:amount*100,recipient:r1.data.recipient_code,reason:'EscobarBet'})}).then(r=>r.json());
  res.json(r2);
 }catch(e){res.json({error:e.message})}
});
app.get('/',(req,res)=>res.send('Escobar Backend Live'));
app.listen(process.env.PORT||10000);
