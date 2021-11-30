const enviar = require('./mailer')
const url = require('url')
const http = require('http')
const fs = require('fs')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

http
    .createServer(function (req, res) {
        let { correos, asunto, contenido } = url.parse(req.url, true).query
        if (req.url == '/') {
            res.setHeader('content-type', 'text/html')
            fs.readFile('index.html', 'utf8', (err, data) => {
                res.end(data)
            })
        }

        if (req.url.startsWith('/mailing')) {


            let Dolar
            let Euro
            let Uf
            let Utm
            // Paso 3
            async function getData() {

                // Paso 4
                let { data } = await
                    axios.get('https://mindicador.cl/api')

                // Paso 5
                Dolar = data.dolar.valor
                Euro = data.euro.valor
                Uf = data.uf.valor
                Utm = data.utm.valor
            }

            getData().then(() => {

                contenido +=
                    `Hola! Los indicadores economicos del dia de hoy son los siguientes:
                \nEl valor del Dolar el dia de hoy es: ${Dolar}
                 \nEl valor del Euro dia de hoy es: ${Euro}
                 \nEl valor de la UF el dia de hoy es: ${Uf}
                 \nEl valor de la UTM el dia de hoy es: ${Utm} 
                `

                console.log(`El valor del dolar el dia de hoy es: ${Dolar}`)
                return correos, asunto, contenido

            })

                .then(() => {
                    if (correos !== '' && asunto !== '' && contenido !== '' && correos.includes(',')) {
                        enviar(correos.split(','), asunto, contenido)
                        // console.log('El correo fue enviado con exito')
                        res.write('El correo fue enviado con exito')
                        res.end()


                        let id = uuidv4();

                        fs.writeFile(`correos/correo_id_${id}`, `Correos:${correos}\n\nAsunto: ${asunto}\n\nContenido:\n${contenido}`, 'utf8', () => {
                            console.log(`Archivo para el correo_id_${id} creado con éxito!`);
                        })


                    }
                    else {

                        res.write('Faltan campos por llenar o solo ingreso un correo')
                        res.end()

                    }


                })
        }
    })
    .listen(3000, () => { console.log('Escuchando puerto 3000') })
