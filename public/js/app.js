console.log('Javascript cargado')

/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
  response.json().then((data)=>{
    console.log(data)
  })
})*/




const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

const mensaje1=document.querySelector('#message-1')
mensaje1.textContent='From Javascript'
const mensaje2=document.querySelector('#message-1')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  mensaje2.textContent='Cargando'
  const ciudad=search.value;
  fetch('/weather?ciudad='+ciudad).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        mensaje2.textContent=data.error
      }else{
        mensaje2.textContent='En '+data.ciudad+' la temperatura es de '+data.forecastData.temperatura
//        console.log(data.ciudad)
// console.log(data.forecastData)
      }
    })
  })
  console.log(ciudad);
});
