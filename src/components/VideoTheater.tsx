'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const VideoTheater = () => {
    const [videos, setVideos] = useState<string[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/media')
            .then(res => res.json())
            .then(data => {
                if (data.videos) setVideos(data.videos);
            });
    }, []);

    if (videos.length === 0) return null;

    return (
        <section className="py-24 px-6 relative z-10 bg-black/40">
            <h2 className="font-serif text-4xl md:text-6xl text-center text-gold mb-16 tracking-widest">
                Moments That Live Forever
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {videos.map((vid, index) => (
                    <motion.div
                        key={vid}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-video rounded-3xl overflow-hidden border border-gold/20 shadow-2xl gold-glow-hover cursor-pointer group"
                        onClick={() => setSelectedVideo(`/videos/${vid}`)}
                    >
                        <video
                            src={`/videos/${vid}`}
                            muted
                            loop
                            onMouseOver={e => (e.target as HTMLVideoElement).play()}
                            onMouseOut={e => (e.target as HTMLVideoElement).pause()}
                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-black">
                                <Play size={32} fill="currentColor" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                    >
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-8 right-8 text-gold hover:text-white transition-colors"
                        >
                            <X size={40} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full max-w-5xl aspect-video"
                        >
                            <video
                                src={selectedVideo}
                                controls
                                autoPlay
                                className="w-full h-full rounded-lg border-2 border-gold/40 shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default VideoTheater;
