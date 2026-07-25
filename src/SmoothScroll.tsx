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
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;