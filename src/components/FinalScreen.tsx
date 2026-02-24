'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FinalScreen = ({ onReplay }: { onReplay: () => void }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-center p-6 relative overflow-hidden">
            {/* Background Fireworks (Lighter version) */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [0, 1.5, 1.2],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8
                        }}
                        style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 60 + 10}%`
                        }}
                        className="absolute w-32 h-32 rounded-full border border-gold/50 flex items-center justify-center"
                    >
                        <div className="w-1 h-1 bg-gold rounded-full shadow-[0_0_40px_20px_#D4AF37]" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
                className="z-10"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-gold text-8xl md:text-9xl mb-12 drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]"
                >
                    👑
                </motion.div>

                <h2 className="font-serif text-3xl md:text-6xl text-white mb-6 tracking-wide">
                    A Queen was born on April 16.
                </h2>
                <p className="font-serif text-xl md:text-3xl text-gold-light italic mb-16 max-w-2xl mx-auto">
                    &quot;And the world has been brighter ever since.&quot;
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReplay}
                    className="px-12 py-5 bg-transparent border-2 border-gold text-gold rounded-full font-serif text-xl tracking-widest uppercase hover:bg-gold/10 transition-all flex items-center gap-3 active:scale-95"
                >
                    💛 Replay Our Story
                </motion.button>
            </motion.div>
        </div>
    );
};

export default FinalScreen;
