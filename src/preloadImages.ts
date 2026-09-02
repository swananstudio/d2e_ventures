const preloadImages = (
    images: string[]
) => {
    images.forEach((image) => {

        if (!image) return;

        const link = document.createElement("link");

        link.rel = "preload";
        link.as = "image";
        link.href = image;

        document.head.appendChild(link);
    });
};

export default preloadImages;