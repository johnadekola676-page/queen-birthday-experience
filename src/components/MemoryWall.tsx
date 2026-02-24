'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const messages = [
    "In your eyes, I found my home.",
    "Every smile of yours is a blessing.",
    "To the woman who owns my heart.",
    "You are the most beautiful queen in the world.",
    "Forever isn't long enough with you.",
    "My greatest adventure is loving you.",
    "Apeke Mhi — My everything.",
    "To many more years of magic together."
];

const MemoryWall = () => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/media')
            .then(res => res.json())
            .then(data => {
                if (data.images) setImages(data.images);
            });
    }, []);

    return (
        <section className="py-24 px-6 relative z-10">
            <h2 className="font-serif text-4xl md:text-6xl text-center text-gold mb-16 tracking-widest">
                Our Favorite Memories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 max-w-7xl mx-auto">
                {images.map((img, index) => (
                    <PolaroidCard key={img} src={`/images/${img}`} index={index} onOpen={() => setSelectedImage(`/images/${img}`)} />
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-8 right-8 text-gold hover:text-white transition-colors"
                        >
                            <X size={40} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative max-w-5xl max-h-[80vh] w-full h-full"
                        >
                            <img
                                src={selectedImage}
                                alt="Memory"
                                className="w-full h-full object-contain rounded-lg border-2 border-gold/20 shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const PolaroidCard = ({ src, index, onOpen }: { src: string; index: number; onOpen: () => void }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const rotation = (index % 3 - 1) * (Math.random() * 5 + 2);
    const message = messages[index % messages.length];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ rotate: rotation }}
            className="relative group perspective-1000"
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="w-full h-[400px] relative preserve-3d"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white p-4 pb-12 shadow-xl border border-gray-200">
                    <div className="relative w-full h-full overflow-hidden mb-3">
                        <img src={src} alt="Memory" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <p className="font-serif text-gray-800 text-center tracking-wide italic whitespace-nowrap overflow-hidden text-ellipsis">
                        Our Favorite Memory
                    </p>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden bg-royal-dark text-white p-8 flex flex-col items-center justify-center text-center shadow-2xl border-2 border-gold/30"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <p className="font-serif text-2xl text-gold-light italic">
                        &quot;{message}&quot;
                    </p>
                    <button
                        onClick={(e) => { e.stopPropagation(); onOpen(); }}
                        className="mt-8 p-3 glass rounded-full text-gold hover:scale-110 transition-transform"
                    >
                        <Maximize2 size={24} />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MemoryWall;
