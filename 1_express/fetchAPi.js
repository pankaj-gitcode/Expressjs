const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, (req, res)=>console.log(`PORT Listening oon: ${PORT}`));

const fetchAPI = async ()=>{
    const response = await fetch(`https://fakerapi.it/api/v1/persons`);
    const res = await response.json();
    console.log(res.data)
    // document.getElementsByTagName('p')[0].innerText = JSON.stringify(res);
    return JSON.stringify(res.data);
}

console.log(typeof fetchAPI())
const apiData = fetchAPI();
console.log(typeof apiData, 'FETCHAPI:',apiData);

app.get('/fethAPI',async (req, res)=>{

    const apiData = await fetchAPI();
    const withputSlashdata = JSON.parse(apiData);
    const finalData = JSON.stringify(withputSlashdata);

    fetchAPI? res.status(200).json({msg:  `${finalData}`}) : res.status(404).json({msg: 'Some Error'})
    
} )

// document.getElementsByTagName('p')[0].innerHTML = `${JSON.stringify(apiData)}`;