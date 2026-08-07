import { Box, Flex, type BoxProps } from "@chakra-ui/react";
import { Children, type ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps extends BoxProps {
    children: ReactNode;
    baseColor?: string;
    revealColor?: string;
}

const TextReveal = ({
    children,
    baseColor = "#5A5A5A",
    revealColor = "#000000",
    ...props
}: TextRevealProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const layers = wrapperRef.current.querySelectorAll<HTMLElement>(
            ".text-reveal-layer"
        );

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top 75%",
                end: `+=${layers.length * 300}`,
                scrub: true,
            },
        });

        layers.forEach((layer) => {
            tl.fromTo(
                layer,
                {
                    width: "0%",
                },
                {
                    width: "100%",
                    duration: 2,
                    ease: "none",
                }
            );
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const childArray = Children.toArray(children);

    return (
        <Box
            ref={wrapperRef}
            {...props}
        >
            {childArray.map((child, index) => (
                <Box
                    key={index}
                    position="relative"
                    w="fit-content"
                >
                    {/* Base */}
                    <Box color={baseColor}>
                        {child}
                    </Box>

                    {/* Reveal */}
                    <Box
                        className="text-reveal-layer"
                        position="absolute"
                        top={0}
                        left={0}
                        w="0%"
                        h="100%"
                        overflow="hidden"
                        pointerEvents="none"
                    >
                        <Flex
                            color={revealColor}
                            minW="max-content"
                            // gap={5}
                        >
                            {child}
                        </Flex>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default TextReveal;