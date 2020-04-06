const request=require('request')


const forecast=function(latitud,longitud,callback){
  const url='https://api.darksky.net/forecast/adea1b5a81c238a9a2b9c833071a6dca/'+latitud+','+longitud+'?units=si'
  request({url:url,json:true},
    (error,{body})=>{
    if(error){
      callback("No es posible obtener el clima")
    }else if(body.error) {
      callback("No se pudo obtener el clima con las coordenadas indicadas")
    }else{
      climaActual=body.currently
      callback(undefined,{
        'temperatura':climaActual.temperature,
        'probabilidadLluvia':climaActual.precipProbability
      })
    }
  })
}


module.exports=forecast
