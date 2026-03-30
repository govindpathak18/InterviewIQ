const buildEmailVerificationEmail = ({ fullName, verifyLink }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2>Verify your email</h2>
      <p>Hi ${fullName || "there"},</p>
      <p>Welcome to InterviewIQ. Please verify your email address to activate all features.</p>
      <p>
        <a
          href="${verifyLink}"
          style="display:inline-block;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:6px;"
        >
          Verify Email
        </a>
      </p>
      <p>If you did not create this account, you can ignore this email.</p>
    </div>
  `;
};

module.exports = {
  buildEmailVerificationEmail,
};