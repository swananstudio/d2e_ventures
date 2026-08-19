import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel } from "swiper/modules"

import "swiper/css"

import PortfolioProject2 from "../components/portfolio/PortfolioProject2"
import PortfolioHeroSection2 from "../components/portfolio/PortfolioHeroSection2"

const Portfolio = () => {
    useEffect(() => {
        const prevOverflow = document.body.style.overflow
        const prevHeight = document.body.style.height

        document.body.style.overflow = "hidden"
        document.body.style.height = "100%"

        return () => {
            document.body.style.overflow = prevOverflow
            document.body.style.height = prevHeight
        }
    }, [])

    return (
        <Swiper
            direction="vertical"
            slidesPerView={1}
            spaceBetween={0}
            speed={600}
            resistanceRatio={0.6}
            mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 1,
                thresholdDelta: 20,
            }}
            modules={[Mousewheel]}
            className="swiper2"
        >
            <SwiperSlide>
                <PortfolioHeroSection2 />
            </SwiperSlide>

            <SwiperSlide>
                <PortfolioProject2 />
            </SwiperSlide>
        </Swiper>
    )
}

export default Portfolio