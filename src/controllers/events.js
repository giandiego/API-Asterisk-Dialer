import { async } from "q";
import AMI from "../libs/ami";
import { getListEvents } from "./listenerEventsAMI";

// una función anónima
// (async () => {
//     while (true) {
//         await new Promise((res) => setTimeout(res, 1000));
//         // console.log("Hola mundo");
//         const channels = await getChannels();
//         // console.log("los canales son: ", channels);


//     }
// })();