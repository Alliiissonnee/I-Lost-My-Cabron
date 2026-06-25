const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Fonction pour le mdp oublié
async function sendResetEmail(toEmail, resetToken) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
        from: `"I lost my Cabron" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Réinitialisation de votre mode de passe",
        html: `
<p>Vous avez demandé une réinitialisation de mot de passe.</p>
<p>Cliquez sur ce lien pour choisir un nouveau mot de passe (valable 1 heure): </p>
<a href="${resetLink}">${resetLink}</a>
<p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
 `
    });

}
module.exports = sendResetEmail;