import DevelopmentStage from "../components/services/DevelopmentStage"
import ClientTrust from "../components/services/ClientTrust"
import DevelopmentSolutions from "../components/services/DevelopmentSolutions"
import ServicesHeroSection from "../components/services/ServicesHeroSection"
import Footer from "../layout/Footer"
import { useSEO } from "../custom/useSEO"

const Services = () => {
    useSEO({
        title: "Our Services | Architecture, Interiors, Plotting & Turnkey Homes",
        description: "Architecture, interior design, plotting, landscape, premium villas & turnkey execution - all under one roof at D2E Ventures.",
        canonical: "https://www.d2eventures.com/services",
    });
    return (
        <>
            <ServicesHeroSection />
            <DevelopmentSolutions />
            <ClientTrust />
            <DevelopmentStage />
            <Footer />
        </>
    )
}

export default Services