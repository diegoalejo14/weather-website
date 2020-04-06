const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app=express()
const port=process.env.PORT|| 3000

const viewPaths=path.join(__dirname,'../templates/views')
const partialPaths=path.join(__dirname,'../templates/partial')
hbs.registerPartials(partialPaths)

const directorioPublico=path.join(__dirname,'../public/')
app.use(express.static(directorioPublico))

app.set('view engine','hbs')
app.set('views',viewPaths)

app.get('',(req,res)=>{
  res.render('index',{
    titulo:'Weather App',
    nombre:'Alejandro'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    titulo:'Acerca de',
    nombre:'Alejandro'
  })
})


app.get('/help',(req,res)=>{
  res.render('help',{
    titulo:'Ayuda',
    nombre:'Alejandro'
  })
})


app.get('/productos',(req,res)=>{
  if(!req.query.search){
    res.send({
      error:'Por favor ingrese el valor de busqueda'
    })
  }else{
    console.log(req.query.search)
      res.send({
        productos:[]
      })
  }
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    titulo:'404',
    nombre:'Alejandro O',
    errorMessage:'Página de ayuda no encontrada'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.ciudad){
    res.send({
      error:'Por favor ingrese la ciudad de la que desea conocer el clima'
    })
  }else{
      geocode(req.query.ciudad,(error,{latitud,longitud,ciudad}={})=>{
        if(error){
          res.send({error})
        }
        forecast(latitud,longitud,(error,forecastData)=>{
          if(error){
            res.send({error})
          }
          res.send({
              ciudad,
              forecastData,
              direccion:req.query.ciudad
            })
        })

      })
  }


})

app.get('*',(req,res)=>{
  res.render('404',{
    titulo:'404',
    nombre:'Alejandro O',
    errorMessage:'Página no encontrada'

  })
})



app.listen(port,()=>{
  console.log('El servidor se esta iniciando por el puerto'+port)
})
