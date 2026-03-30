const buildResetPasswordEmail = ({ fullName, resetLink }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2>Reset your password</h2>
      <p>Hi ${fullName || "there"},</p>
      <p>We received a request to reset your InterviewIQ password.</p>
      <p>
        <a
          href="${resetLink}"
          style="display:inline-block;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:6px;"
        >
          Reset Password
        </a>
      </p>
      <p>If you did not request this, you can safely ignore this email.</p>
      <p>This link will expire soon for security reasons.</p>
    </div>
  `;
};

module.exports = {
  buildResetPasswordEmail,
};