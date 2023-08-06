import { getListEvents } from "./listenerEventsAMI";

//obtener todos los canales de asterisk

export const getChannels = async (AMI) => {
    return new Promise((resolve) => {
        AMI.action({ Action: "CoreShowChannels", }, async function (err, response) {
            if (!err) {
                // console.log("Se envió el action CoreShowChannels : ",response);
                let listChannels = await getListEvents(AMI, response.actionid, "CoreShowChannelsComplete");

                // console.log("listChannels => ", listChannels);


                resolve(listChannels);
            } else {
                console.log(err);
                resolve([]);
            }

        })
    })
}