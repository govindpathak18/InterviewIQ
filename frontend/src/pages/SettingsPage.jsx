import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 p-3">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-sm text-slate-400">Current: {theme}</p>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>Toggle Theme</Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold">Account</h2>
        <p className="mt-2 text-sm text-slate-400">Delete account is UI-only demo.</p>
        <Button variant="danger" className="mt-3" onClick={() => setOpen(true)}>Delete Account</Button>
      </Card>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Delete account?">
        <p className="text-sm text-slate-300">This action is permanent in a real app. Here it only closes the modal.</p>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setOpen(false)}>Confirm Delete</Button>
        </div>
      </Modal>
    </div>
  );
};
