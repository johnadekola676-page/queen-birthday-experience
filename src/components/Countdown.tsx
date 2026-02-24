'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
    targetDate: Date;
    onComplete: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();
            if (difference <= 0) {
                onComplete();
                return null;
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Initial check
        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    if (!timeLeft) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-black relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="z-10"
            >
                <h2 className="font-serif text-3xl md:text-5xl text-gold mb-12 tracking-widest uppercase">
                    The Queen’s Day Arrives In…
                </h2>

                <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
                    {Object.entries(timeLeft).map(([label, value]) => (
                        <div key={label} className="flex flex-col items-center min-w-[80px]">
                            <div className="glass w-20 h-20 md:w-32 md:h-32 flex items-center justify-center rounded-xl border-gold/30 gold-glow mb-2">
                                <span className="font-serif text-4xl md:text-6xl text-white">
                                    {String(value).padStart(2, '0')}
                                </span>
                            </div>
                            <span className="text-gold-light text-xs md:text-sm uppercase tracking-widest">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Countdown;
