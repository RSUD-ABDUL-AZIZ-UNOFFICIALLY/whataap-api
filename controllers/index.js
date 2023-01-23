const { phoneNumberFormatter } = require('../helpers/formatter');

const client = require('../controllers/whataap');
const checkRegisteredNumber = async function (number) {
    const isRegistered = await client.isRegisteredUser(number);
    return isRegistered;
}
module.exports = {
    send: async (req, res) => {
        let data = req.body;
        let noHp = phoneNumberFormatter(data.telp);
        let pesan = data.message.toString();
        try {
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
            return res.status(500).json({
                status: false,
                message: error,
                data: noHp
            });
        }
    },
    sated: async (req, res) => {
    }
};
