import React, { useEffect, useRef } from 'react';
import './GalaxySky.css';

const GalaxySky = () => {
    const gradientRef = useRef(null);
    const starsRef = useRef(null);
    const twinklingRef = useRef(null);
    const cloudsRef = useRef(null);

    useEffect(() => {
        const colors = [
            [62, 35, 255],
            [60, 255, 60],
            [255, 35, 98],
            [45, 175, 230],
            [255, 0, 255],
            [255, 128, 0]
        ];

        const colorIndices = [0, 1, 2, 3];
        let step = 0;
        const gradientSpeed = 0.002;

        const updateGradient = () => {
            if (!gradientRef.current) return;

            const c0_0 = colors[colorIndices[0]];
            const c0_1 = colors[colorIndices[1]];
            const c1_0 = colors[colorIndices[2]];
            const c1_1 = colors[colorIndices[3]];

            const istep = 1 - step;
            const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
            const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
            const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
            const color1 = `rgb(${r1},${g1},${b1})`;

            const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
            const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
            const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
            const color2 = `rgb(${r2},${g2},${b2})`;

            gradientRef.current.style.background = `linear-gradient(to right, ${color1}, ${color2})`;

            step += gradientSpeed;
            if (step >= 1) {
                step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];

                colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            }
        };

        const generateStars = () => {
            const galaxyElement = document.querySelector('.galaxy');
            if (!galaxyElement) return;

            let iterator = 0;

            while (iterator <= 100) {
                const xposition = Math.random();
                const yposition = Math.random();
                const starType = Math.floor((Math.random() * 3) + 1);
                const position = {
                    x: galaxyElement.offsetWidth * xposition,
                    y: galaxyElement.offsetHeight * yposition,
                };

                const starElement = document.createElement('div');
                starElement.className = `star star-type${starType}`;
                galaxyElement.appendChild(starElement);

                starElement.style.top = `${position.y}px`;
                starElement.style.left = `${position.x}px`;

                iterator++;
            }
        };

        const updateHeight = () => {
            if (!starsRef.current || !twinklingRef.current || !cloudsRef.current) return;

            const htmlHeight = window.getComputedStyle(document.documentElement).height;
            starsRef.current.style.height = htmlHeight;
            twinklingRef.current.style.height = htmlHeight;
            cloudsRef.current.style.height = htmlHeight;
        };

        updateHeight();

        const resizeHandler = () => {
            updateHeight();
        };

        const mutationObserver = new MutationObserver(() => {
            updateHeight();
        });

        const observerConfig = { attributes: true, childList: true, subtree: true };
        mutationObserver.observe(document.body, observerConfig);

        window.addEventListener('resize', resizeHandler);

        updateGradient();
        const gradientInterval = setInterval(updateGradient, 10);

        generateStars();



        return () => {
            clearInterval(gradientInterval);
            mutationObserver.disconnect();
            window.removeEventListener('resize', resizeHandler);
        }
    }, []);

    return (
        <div>
            <div className="stars" ref={starsRef}></div>
            <div className="twinkling" ref={twinklingRef}></div>
            <div className="clouds" ref={cloudsRef}></div>
        </div>
    );
};

export default GalaxySky;
