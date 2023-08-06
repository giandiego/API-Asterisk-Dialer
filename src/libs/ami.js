import config from '../config';
import AsteriskManager  from 'asterisk-manager';

//Conectando al asterisk manager
const AMI = new AsteriskManager(config.amiPort,config.amiHost,config.amiUser,config.amiPass,true);

//Si la conexión falla intentar conectar nuevamente cada 10 segundos.
AMI.keepConnected();

// console.log(AMI);

// AMI.on("managerevent", (event) => {
//     console.log(event);
// })

export default AMI;