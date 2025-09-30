const nodeMailer = require("nodemailer");

module.exports.sendEmail = async (message) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "gresitimbadiya@gmail.com",
            pass: "xnadwjivnmqifjzp",
        },
    })

    let res = await transporter.sendMail(message);
    return res;
}