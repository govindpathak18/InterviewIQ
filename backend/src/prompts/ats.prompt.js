const buildAtsPrompt = ({ resumeText, jdText }) => {
  return `You are an ATS resume optimization assistant.

Generate an ATS-friendly, single-page resume in clean HTML that can be converted to PDF with Puppeteer.

Rules:
- Return ONLY valid HTML (no markdown, no JSON, no explanations).
- Use semantic HTML with inline CSS inside a <style> tag.
- Keep layout professional and printable on A4/Letter.
- Include sections: Header, Summary, Skills, Experience, Projects, Education.
- Use bullet points with measurable impact where possible.
- Tailor wording and keywords to the job description while staying truthful.

CURRENT RESUME:
${resumeText}

TARGET JOB DESCRIPTION:
${jdText}`;
};

module.exports = {
  buildAtsPrompt,
};
