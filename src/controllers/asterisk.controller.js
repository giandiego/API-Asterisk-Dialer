import AMI from "../libs/ami.js";
import { getChannels } from './channels.js'

// Función para verificar si una IP está en la lista negra
function isIPBlocked(ip) {
  // Definir el arreglo de IPs prohibidas
  // const blockedIPs = ["::ffff:181.66.164.254", "10.0.0.1"];
  const blockedIPs = ["10.0.0.1"];
  return blockedIPs.includes(ip);
}

export const OriginateCall = async (req, res) => {
  try {

    const ipAddress = req.socket.remoteAddress;

    console.log("IP Address => ", ipAddress);

    if (isIPBlocked(ipAddress)) {
      console.log("IP Address is blocked");
      return res.status(500).json({
        success: false,
        message: "Acceso denegado.",
      });
    } else {
      console.log("Tienes permisos para llamar, continuemos ==>>")
    }

    const s = req.body,
      i = s.Data;

    const variables = {
      ringtime: i.ringtime,
      CallerID: "999999999",
      "CHANNEL(accountcode)": i.code,
      other: i.other,
      Nombre: i.nombre,
    }

    let DataAMI = {
      Action: "Originate",
      Channel: "Local/" + i.phone + "@DIALER/n",// Local/123456789@DIALER/n
      // Channel: "PJSIP/" + i.phone,
      Context: "test-manager",
      Exten: "s",
      Priority: 1,
      CallerID: `${i.nombre} <123456789>`,
      Async: "false",
      Variable: variables,
    }

    // console.log(DataAMI);

    //Ejemplo de bucle para muchas llamadas:
    // let count = 0;
    // while(count < 10){
    //   console.log("Bucle");
    //   var action = ActionAMI(DataAMI);
    //   count++;
    //   console.log("count => ",count);
    // }

    // Realizar la acción originate para hacer la llamada
    const action = await ActionAMI(DataAMI);

    console.log("El action es: ", action);

    return res.json({ success: true, message: action });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something goes wrong retrieving the StatusApiBase",
    });
  }
};

export const GetCoreShowChannels = async (req, res) => {
  try {

    let canales = await getChannels(AMI);

    return res.json({ success: true, message: canales });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something goes wrong retrieving the StatusApiBase",
    });
  }
};

export const BulkCalls = async (req, res) => {
  try {
    const s = req.body,
      i = s.leads;

    //Enviamos los leads
    SendCalls(i);

    return res.json({ success: true, message: "enviando los leads" });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something goes wrong retrieving the StatusApiBase",
    });
  }
};

async function SendCalls(leads) {

  const i = leads;

  //vamos a recorrer los leads:
  for (let index = 0; index < i.length; index++) {
    const lead = i[index];
    console.log("Vamos a llamar al número: ", lead.phone);
    const variables = {
      ringtime: lead.ringtime,
      CallerID: "999999999",
      "CHANNEL(accountcode)": lead.code,
      other: lead.other,
      Nombre: lead.nombre,
    }

    let DataAMI = {
      Action: "Originate",
      Channel: "Local/" + lead.phone + "@DIALER/n",// Local/123456789@DIALER/n
      // Channel: "PJSIP/" + i.phone,
      Context: "test-manager",
      Exten: "s",
      Priority: 1,
      CallerID: `${lead.nombre} <123456789>`,
      Async: "false",
      Variable: variables,
    }

    // Realizar la acción originate para hacer la llamada
    const action = /*await*/ ActionAMI(DataAMI);
    // console.log("El action es: ", action);
    
  }
}


async function ActionAMI(DataAMI) {
  return new Promise((resolve) => {
    AMI.action(DataAMI, function (err, response) {
      err
        ? (console.error('Error al realizar la llamada:', err.message), resolve(response))
        : (console.log("AMI RETORNÓ : ", response), resolve(response));
    });
  });
}

//await: Pausar la ejecución de código hasta que la operación asíncrona se complete.
// await ActionAMI(DataAMI);
//Promesas: