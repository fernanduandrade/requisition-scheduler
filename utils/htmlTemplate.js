const htmlTemplate = (name, hour) => {
    return `
        <!DOCTYPE html>
        <html lang="pt">
            <body style="background-color: #ffffff;"font-family: 'Lato', sans-serif; font-weight: 400;">
            <p style="color: #3D2C8D; font-size: 18px;">Olá ${name}</p>
            <p>Você tem uma sessão de tatuagem marcada às <strong>${hour}</strong> de hoje 😁!!</p>
           
            <p>Qualquer dúvida me manda uma menssagem no whatapp <a style="text-decoration:none; color: #128C7E;" href="https://api.whatsapp.com/send?phone=+5586810798737"><strong>clicando aqui<a/></strong> e até logo 😉.</p>
            <img src="cid:https://tenor.com/view/michael-scott-wink-yes-%E0%A4%86%E0%A4%81%E0%A4%96-%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A4%A8%E0%A4%BE-gif-5795910"/></p>
            </body>
        </html>
    `
};

export default htmlTemplate;