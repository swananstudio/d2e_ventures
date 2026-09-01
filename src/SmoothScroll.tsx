import { type ReactNode, useEffect } from "react";
import Lenis from "lenis";

type Props = {
    children: ReactNode;
};

const SmoothScroll = ({ children }: Props) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.3,
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 4),
        });

        let animationFrameId: number;

        const raf = (time: number) => {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        };

        animationFrameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animationFrameId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;