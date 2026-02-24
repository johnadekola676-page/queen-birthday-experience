'use client';

import React, { useState, useEffect } from 'react';
import BackgroundParticles from '@/components/BackgroundParticles';
import Countdown from '@/components/Countdown';
import Landing from '@/components/Landing';
import MusicPlayer from '@/components/MusicPlayer';
import MemoryWall from '@/components/MemoryWall';
import VideoTheater from '@/components/VideoTheater';
import SurpriseSection from '@/components/SurpriseSection';
import ForeverMoment from '@/components/ForeverMoment';
import FinalScreen from '@/components/FinalScreen';
import { motion, AnimatePresence } from 'framer-motion';

type ScreenState = 'COUNTDOWN' | 'LANDING' | 'EXPERIENCE' | 'FINAL';

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>('COUNTDOWN');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Set target date to April 16 of the current or next year
  const getTargetDate = () => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 3, 16); // April is index 3
    if (now > target) {
      target.setFullYear(now.getFullYear() + 1);
    }
    return target;
  };

  const targetDate = getTargetDate();

  useEffect(() => {
    // If it's already April 16 or after, skip countdown
    if (new Date() >= targetDate) {
      setScreen('LANDING');
    }
  }, []);

  const handleCountdownComplete = () => {
    setScreen('LANDING');
  };

  const handleEnter = () => {
    setScreen('EXPERIENCE');
    setIsMusicPlaying(true);
  };

  const handleForeverComplete = () => {
    setScreen('FINAL');
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScreen('LANDING');
  };

  return (
    <main className="relative min-h-screen text-white selection:bg-gold selection:text-black">
      <BackgroundParticles />
      <MusicPlayer play={isMusicPlaying} />

      <AnimatePresence mode="wait">
        {screen === 'COUNTDOWN' && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1.5 }}
          >
            <Countdown targetDate={targetDate} onComplete={handleCountdownComplete} />
          </motion.div>
        )}

        {screen === 'LANDING' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5 }}
          >
            <Landing onEnter={handleEnter} />
          </motion.div>
        )}

        {screen === 'EXPERIENCE' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-50 pointer-events-none" />
            <MemoryWall />
            <VideoTheater />
            <SurpriseSection />
            <ForeverMoment onComplete={handleForeverComplete} />
          </motion.div>
        )}

        {screen === 'FINAL' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <FinalScreen onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
