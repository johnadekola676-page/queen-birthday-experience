'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingProps {
    onEnter: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnter }) => {
    const [step, setStep] = useState(0);
    const texts = ["On April 16...", "The world changed.", "A Queen was born."];

    useEffect(() => {
        if (step < texts.length) {
            const timer = setTimeout(() => {
                setStep(prev => prev + 1);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [step, texts.length]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative bg-black overflow-hidden px-6">
            <div className="z-10 text-center">
                <AnimatePresence mode="wait">
                    {step < texts.length ? (
                        <motion.h1
                            key={texts[step]}
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="font-serif text-4xl md:text-7xl text-white tracking-widest leading-loose"
                        >
                            {texts[step]}
                        </motion.h1>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="font-serif text-5xl md:text-8xl text-gold-gradient mb-12 gold-glow">
                                Azeez Olaitan Rodiat
                            </h1>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onEnter}
                                className="px-12 py-5 bg-gold text-black font-serif text-xl rounded-full tracking-widest uppercase transition-all flex items-center gap-3 active:bg-gold-light"
                            >
                                👑 Enter Her Kingdom
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Landing;
