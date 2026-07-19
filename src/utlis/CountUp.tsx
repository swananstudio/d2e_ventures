import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type CountUpProps = {
    end: number;
    duration?: number;
    suffix?: string;
    decimals?: number;
};

const CountUp = ({
    end,
    duration = 5000,
    suffix = "",
    decimals = 0,
}: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);

    const inView = useInView(ref, {
        once: true,
        amount: 0.5,
    });

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        let frame: number;

        const startTime = performance.now();

        const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);

            const current = progress * end;

            setCount(current);

            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, [inView, end, duration]);

    return (
        <span ref={ref}>
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
};

export default CountUp;