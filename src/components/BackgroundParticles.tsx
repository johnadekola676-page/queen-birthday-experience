'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
    id: number;
    left: string;
    duration: string;
    delay: string;
    size: string;
    opacity: number;
}

const BackgroundParticles = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const particleCount = 50;
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}vw`,
            duration: `${Math.random() * 10 + 5}s`,
            delay: `${Math.random() * 5}s`,
            size: `${Math.random() * 4 + 2}px`,
            opacity: Math.random() * 0.5 + 0.3,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        '--duration': p.duration,
                        animationDelay: p.delay,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
};

export default BackgroundParticles;
