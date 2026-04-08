import { motion } from 'framer-motion';
import { ArrowRight, Bot, FileSearch, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageWrapper } from '../components/layout/PageWrapper';

const features = [
  { title: 'AI Mock Interviews', icon: Bot, text: 'Practice realistic role-based interview rounds with dynamic feedback.' },
  { title: 'Resume Analyzer', icon: FileSearch, text: 'Get ATS scoring, keyword gaps, and personalized resume suggestions.' },
  { title: 'Skill Gap Detection', icon: Target, text: 'Discover what skills you are missing for your target role.' },
  { title: 'ATS Resume Generator', icon: Sparkles, text: 'Generate optimized ATS-friendly resume drafts in minutes.' },
];

export const HomePage = () => (
  <PageWrapper>
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-aurora p-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
        <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Crack Interviews with <span className="neo-gradient-text">AI Precision</span></h1>
        <p className="mt-5 text-lg text-slate-300">InterviewIQ helps you prepare smarter with AI mock interviews, resume analysis, and personalized roadmaps.</p>
        <Link to="/register" className="mt-7 inline-flex">
          <Button className="px-6 py-3">Get Started <ArrowRight className="h-4 w-4" /></Button>
        </Link>
      </motion.div>
    </section>

    <section className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <motion.div key={feature.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
            <Card>
              <Icon className="h-5 w-5 text-cyan-300" />
              <h3 className="mt-3 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{feature.text}</p>
            </Card>
          </motion.div>
        );
      })}
    </section>

    <section className="mt-14 grid gap-5 md:grid-cols-3">
      {['Upload your resume', 'Generate AI interview plan', 'Practice + improve with insights'].map((step, index) => (
        <Card key={step}>
          <p className="text-cyan-300">Step {index + 1}</p>
          <h3 className="mt-2 font-semibold">{step}</h3>
        </Card>
      ))}
    </section>

    <section className="mt-14 grid gap-5 md:grid-cols-3">
      {['“I got 2x better at storytelling.”', '“My ATS score jumped from 45 to 81.”', '“Best mock interview product I used.”'].map((quote) => (
        <Card key={quote}><p className="text-sm text-slate-300">{quote}</p></Card>
      ))}
    </section>

    <section className="mt-14 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-8 text-center">
      <h2 className="text-2xl font-bold">Ready to land your dream role?</h2>
      <p className="mt-2 text-slate-300">Build confidence with data-backed AI coaching.</p>
      <Link to="/register" className="mt-5 inline-block"><Button>Start Free Trial</Button></Link>
    </section>
  </PageWrapper>
);
