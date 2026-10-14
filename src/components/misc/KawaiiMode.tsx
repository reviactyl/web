'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

export default function KawaiiMode() {
    const [active, setActive] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const expiryTimer = useRef<number | undefined>(undefined);

    const deactivate = useCallback(() => {
        window.clearTimeout(expiryTimer.current);
        document.documentElement.removeAttribute('data-kawaii');
        document.documentElement.removeAttribute('data-kawaii-expires');
        setActive(false);
        audioRef.current?.pause();
        if (audioRef.current) audioRef.current.currentTime = 0;
    }, []);

    const activate = () => {
        const root = document.documentElement;
        root.dataset.kawaii = 'true';
        setActive(true);
        // call play
        void audioRef.current?.play().catch(() => {});
        window.clearTimeout(expiryTimer.current);
        expiryTimer.current = window.setTimeout(deactivate, 10 * 60 * 1000);
    };

    return (
        <>
            <button
                type="button"
                aria-label={active ? 'Kawaii Mode is active. Deactivate Kawaii Mode.' : 'Activate Kawaii Mode for ten minutes'}
                aria-pressed={active}
                onClick={event => {
                    event.preventDefault();
                    if (active) deactivate();
                    else activate();
                }}
                className="kawaii-mode-link mt-2 inline-flex min-h-6 cursor-pointer items-center gap-1.5 rounded-sm border-0 bg-transparent p-0 text-[10px] tracking-[0.12em] text-gray-500 transition-colors hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
            >
                <Image src="/kawaii/logo_art.png" alt="" aria-hidden width={100} height={50} style={{ width: '100px', height: 'auto' }} className="opacity-70" />
            </button>
            <audio ref={audioRef} src="/kawaii/music.mp3" loop preload="auto" aria-hidden="true" />
        </>
    );
}
