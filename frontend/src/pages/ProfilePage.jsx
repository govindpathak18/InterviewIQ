import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ProfilePage = () => {
  const [profile, setProfile] = useState({ fullName: 'Alex Morgan', headline: 'Frontend Developer', location: 'San Francisco' });

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-xl font-bold">Profile</h1>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input value={profile.fullName} onChange={(e) => setProfile((s) => ({ ...s, fullName: e.target.value }))} />
          <Input value={profile.headline} onChange={(e) => setProfile((s) => ({ ...s, headline: e.target.value }))} />
          <Input value={profile.location} onChange={(e) => setProfile((s) => ({ ...s, location: e.target.value }))} />
        </div>
        <Button className="mt-4">Save Profile</Button>
      </Card>

      <Card>
        <h2 className="font-semibold">Uploaded Resumes</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li className="rounded-lg border border-white/10 p-3">Frontend-Resume-v5.pdf</li>
          <li className="rounded-lg border border-white/10 p-3">Fullstack-Resume.pdf</li>
        </ul>
      </Card>
    </div>
  );
};
