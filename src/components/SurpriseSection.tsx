'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const SurpriseSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 15px rgba(212, 175, 55, 0.8))" }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-8 z-40 w-16 h-16 glass rounded-full flex items-center justify-center text-gold gold-glow animate-float active:scale-95 transition-all"
            >
                <Heart fill="currentColor" size={32} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-black/98 flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="max-w-2xl text-center space-y-8"
                        >
                            {[
                                "If I had to choose again...",
                                "I would still choose you.",
                                "In every lifetime.",
                                "In every universe.",
                                "You are my answered prayer."
                            ].map((text, i) => (
                                <motion.p
                                    key={text}
                                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 1.5, delay: i * 2 + 1 }}
                                    className={`${i === 4 ? 'text-gold-light text-3xl md:text-5xl font-serif gold-glow' : 'text-white/80 text-xl md:text-3xl font-light'}`}
                                >
                                    {text}
                                </motion.p>
                            ))}

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 12 }}
                                onClick={() => setIsOpen(false)}
                                className="mt-12 text-gold-dark hover:text-gold transition-colors underline underline-offset-8 tracking-widest uppercase text-sm"
                            >
                                Close My Heart
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SurpriseSection;
