const nodemailer = require('nodemailer')
// Paso 1
function enviar(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodemailerADL2@gmail.com',
            pass: 'desafiolatam',
        },
    })
    let mailOptions = {
        from: 'nodemailerADL2@gmail.com',
        to,
        subject,
        text,
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err)
        if (data) console.log(data)
    })
}
// Paso 2
module.exports = enviar