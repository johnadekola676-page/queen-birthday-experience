'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ForeverMoment = ({ onComplete }: { onComplete: () => void }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(onComplete, 5000);
    };

    return (
        <section className="min-h-screen relative flex items-center justify-center overflow-hidden py-24">
            <div className="z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    <h2 className="font-serif text-4xl md:text-7xl text-white mb-16 tracking-widest">
                        Will you stay mine forever?
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <motion.button
                            whileHover={{ scale: 1.1, boxShadow: "0 0 30px #D4AF37" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleClick}
                            className="px-10 py-4 bg-gold text-black rounded-full font-serif text-lg tracking-widest uppercase transition-all"
                        >
                            💛 Yes, Always
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, boxShadow: "0 0 30px #D4AF37" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleClick}
                            className="px-10 py-4 border-2 border-gold text-gold rounded-full font-serif text-lg tracking-widest uppercase transition-all"
                        >
                            😌 Of Course
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {clicked && (
                    <>
                        {/* Simple Fireworks / Hearts representation */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                                animate={{
                                    opacity: 0,
                                    scale: Math.random() * 2 + 1,
                                    x: (Math.random() - 0.5) * 800,
                                    y: (Math.random() - 0.7) * 800
                                }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="absolute text-gold text-4xl pointer-events-none"
                            >
                                {i % 2 === 0 ? '✨' : '❤️'}
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 2 }}
                            className="absolute inset-0 bg-gold/10 pointer-events-none"
                        />
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ForeverMoment;
