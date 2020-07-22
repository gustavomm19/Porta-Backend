const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: "gmail",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_CONTACT, // generated ethereal user
        pass: process.env.PASS_CONTACT // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    contactanos: async (_,message) => {
        // send mail with defined transport object
        const messageOption = {
            from: `${message.from}`, // sender address
            to: `${process.env.EMAIL_CONTACT}`, // list of receivers
            subject: `${message.subject}`, // Subject line
            html: `<p> De: ${message.name} </p>
                <p> Cuenta de usuario: ${message.from} </p>  
                <p> Rol: ${message.role} </p>  
                <h3> ${message.subject} </h3>
                <p> ${message.text} </p>` // html body
        };

        const { messageId } = await transporter.sendMail(messageOption);
        if (messageId) return true;
        return false;

        //  console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    },
    approvedRequest: async (_,message) => {
        // send mail with defined transport object
        const messageOption = {
            from: `${process.env.EMAIL_CONTACT}`, // sender address
            to: `${message.to}`, // list of receivers
            subject: `Solicitud de trabajo con Porta`, // Subject line
            html: `<p> Felicidades ${message.name}! Tu solicitud para trabajar con nosotros ha sido aprovada.</p> 
                  <p> El equipo de Porta se honra en darte la bienvenida, esperamos que trabajes honrosamente y cumpliendo las políticas de la empresa. </p>
                  <p> Buena suerte! </p>
                  <p> Ingresa aquí para comenzar con tu trabajo https://porta-hasta-tu-puerta.web.app/driver/maprep </p>` // html body
        };

        const { messageId } = await transporter.sendMail(messageOption);
        if (messageId) return true;
        return false;
    },
    rejectedRequest: async (_,message) => {
        // send mail with defined transport object
        const messageOption = {
            from: `${process.env.EMAIL_CONTACT}`, // sender address
            to: `${message.to}`, // receiver
            subject: `Solicitud de trabajo con Porta`, // Subject line
            html: `<p>Estimado usuario, lamentamos informarle que su solicitud para trabajar con Porta ha sido rechazada debido a resultados de nuestras auditorías internas </p> 
                  <p>Siéntase libre de presentarnos otra solicitud de trabajo en el futuro. Hasta pronto.</p>` // html body
        };

        const { messageId } = await transporter.sendMail(messageOption);
        if (messageId) return true;
        return false;
    }
};
