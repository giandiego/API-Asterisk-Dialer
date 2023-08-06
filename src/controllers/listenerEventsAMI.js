export const getListEvents = async (AMI, actionId, lastEvent) => {
    let result = [];

    console.log("actionId => ", actionId);
    console.log("lastEvent => ", lastEvent);

    let promise = new Promise((resolve, reject) => {
        let listener = AMI.on("managerevent", f);

        function f(evt) {
            // console.log("evt => ", evt);
            if (evt.actionid === actionId) {
                if (evt.event === lastEvent) {
                    listener.removeListener("managerevent", f);
                    resolve(result);
                } else {
                    result.push(evt);
                }
            }
        }
    });

    return await promise;
};