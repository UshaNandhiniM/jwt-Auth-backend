import nodemailer from "nodemailer";
import dotenv from "dotenv";
import shortid from "shortid";
dotenv.config();
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.PASSMAIL,
    pass: process.env.PASSKEY,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const sendPasswordResetEmail = async (userMail, userID) => {
  const shorturl = `https://${shortid.generate()}/passwordreset`;
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL, // sender address
      to: userMail, // list of receivers
      subject: "Password Reset Request", // Subject line
      html: `Dear ${userMail},
We have received a request to reset the password for your account associated with the ID ${userID}.
If you did not request a password reset, please ignore this email. Your password will remain unchanged.
To reset your password, please click the link to redirect : <a href=https://jwt-auth-frontend.netlify.app/resetpassword/${userID}>${shorturl}</>`, // html body
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export default sendPasswordResetEmail;
