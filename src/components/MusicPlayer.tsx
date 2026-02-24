'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
    play: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ play }) => {
    const [songs, setSongs] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [muted, setMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        fetch('/api/media')
            .then(res => res.json())
            .then(data => {
                if (data.music && data.music.length > 0) {
                    setSongs(data.music.map((s: string) => `/music/${s}`));
                }
            });
    }, []);

    useEffect(() => {
        if (play && audioRef.current && songs.length > 0) {
            audioRef.current.play().catch(e => console.log("Audio play failed, user interaction needed", e));
        }
    }, [play, songs, currentIndex]);

    const handleEnded = () => {
        if (songs.length > 1) {
            setCurrentIndex((prev) => (prev + 1) % songs.length);
        }
    };

    if (songs.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio
                ref={audioRef}
                src={songs[currentIndex]}
                onEnded={handleEnded}
                muted={muted}
                loop={songs.length === 1}
            />
            <button
                onClick={() => setMuted(!muted)}
                className="w-12 h-12 glass rounded-full flex items-center justify-center border-gold/30 hover:border-gold/60 transition-colors text-gold"
            >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
        </div>
    );
};

export default MusicPlayer;
