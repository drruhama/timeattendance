'use client'

import { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const tick = () => setTime(new Date());

        // Update the clock every second
        const intervalId = setInterval(tick, 1000);

        // Cleanup on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '2em', textAlign: 'center', marginTop: '20%' }}>
            {`${hours}:${minutes}:${seconds}`}
        </div>
    );
};

export default Clock;
