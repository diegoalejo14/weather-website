const request=require('request')

const geocode=(ciudad,callback)=>{
  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(ciudad)+'.json?access_token=pk.eyJ1IjoiYWxlam9vbCIsImEiOiJjazhmcDYwMnQwNWhxM2VvNDlxOTdpbnlmIn0.51j91wvJ-fpVZNWoXLhePw&limit=1'
  request({url,json:true},(error,{body})=>{
    if(error){
      callback('No es posible conectarse a la aplicacion de mapas')
    }else if(body.features.length===0){
      callback('No existe una ciudad '+ciudad)
    }else{
      ciudad=body.features[0]
      latitud=ciudad.center[1]
      longitud=ciudad.center[0]
      callback(undefined,{
        latitud,
        longitud,
        'ciudad':ciudad.place_name
      })
    }
  })
}

module.exports=geocode
