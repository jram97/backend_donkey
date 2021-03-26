//var api_key = process.env.mg_api_key;
//var domain = process.env.mg_domain;
//var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

const updateTypeString = (value) => {
    if (typeof value === 'number') {
        return `${value}`;
    } else {
        return `'${value}'`
    }
}

exports.serviceResponse = (status, data) => {
    return {
        status,
        data,
    }
}

exports.response = (ok = true, msg, data = null) => {
    return {
        ok,
        msg,
        data,
    }
}

exports.updateFormat = (keys, values) => {
    var toUpdate = "";
    var i, valid = 0;

    for (i = 0; i < keys.length; i++) {
        if (values[i] != undefined) {
            if (valid > 0) {
                toUpdate += `, ${keys[i]} = ${updateTypeString(values[i])}`;
            } else {
                toUpdate += `${keys[i]} = ${updateTypeString(values[i])}`;
            }
            valid++;
        }
    }

    return {
        valid,
        toUpdate
    }
}

/*exports.sendEmailActivateAccount = (email,nombre,usuario) => {
    var data = {
        from: 'no-replay@fintbank.com',
        to: email,
        subject: 'Activar cuenta en Fintbank',
        html: `<p>Estimado/a ${nombre}: <p>
        <p>Bienvenido a Fintbank, para empezar a aprovechar los beneficios de la aplicacion, debes activar tu cuenta entrando al siguiente enlace:<p>
        <p>${process.env.url}/user/activate/${usuario}<p>`
    };

    mailgun.messages().send(data, function (error, body) {
        if (error) {
            console.log("Error",error);
            return { status: false, msg: error }
        }
        console.log("Body",body);
        return { status: true }
    });
}*/