import { useState } from "react";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80";

export default function AuthHeroImage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="auth-hero-wrap">
      {!loaded && <div className="image-skeleton" />}
      <img
        src={HERO_IMAGE_URL}
        alt="Interview preparation workspace"
        className={`auth-hero-image ${loaded ? "is-loaded" : ""}`}
        onLoad={() => setLoaded(true)}
        loading="eager"
      />
      <div className="auth-hero-overlay" />
      <div className="auth-hero-copy">
        <h2>Build interview confidence with AI.</h2>
        <p>Generate tailored interview packs, ATS resumes, and prep plans.</p>
      </div>
    </div>
  );
}
