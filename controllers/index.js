const { phoneNumberFormatter } = require('../helpers/formatter');

const {client} = require('../controllers/whataap');
const checkRegisteredNumber = async function (number) {
    const isRegistered = await client.isRegisteredUser(number);
    return isRegistered;
}
module.exports = {
    send: async (req, res) => {
        let data = req.body;
        try {
            if (data.message == undefined || data.telp == undefined ) {
                return res.status(400).json({
                    status: false,
                    message: 'message and telp is required',
                });
                
            }
            let pesan = data.message.toString();
            let noHp = phoneNumberFormatter(data.telp);
            const isRegistered = await checkRegisteredNumber(noHp);
            console.log(isRegistered);
            if (isRegistered) {
                console.log('WHATSAPP WEB => User registered');
                let send = await client.sendMessage(noHp, pesan);

                return res.status(200).json({
                    status: true,
                    message: 'whatsapp send',
                    data: noHp,
                    pesan: send
                });
            } else {
                console.log('WHATSAPP WEB => User not registered');
                return res.status(400).json({
                    status: false,
                    message: 'User not registered',
                    data: noHp
                });
            }
           
        } catch (error) {
            console.log(error);
            client.initialize();
            return res.status(400).json({
                status: false,
                message: 'whatsapp failed send',
            });
        }
    },
    state: async (req, res) => {
        let state = await client.getBatteryStatus();
        return res.status(200).json({
            status: true,
            message: 'whatsapp reset state',
            data: state
        });
    }
};
