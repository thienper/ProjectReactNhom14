import { useEffect, useState } from "react";
import slideShow1 from "../assets/images/SlideShow1.png";
import slideShow2 from "../assets/images/SlideShow2.png";
import slideShow3 from "../assets/images/SlideShow3.png";
import "./SlideShow.css";

function SlideShow() {
    const images = [slideShow1, slideShow2, slideShow3];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState("next");

    useEffect(() => {
        const interval = setInterval(() => nextSlide("next"), 4000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = (dir) => {
        setDirection(dir);
        setCurrentIndex((prevIndex) =>
            dir === "next"
                ? (prevIndex + 1) % images.length
                : (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <div className="slideshow-container">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    className={`mySlides 
                        ${index === currentIndex ? "active" : ""} 
                        ${direction === "next" && index === (currentIndex + 1) % images.length ? "next" : ""} 
                        ${direction === "prev" && index === (currentIndex - 1 + images.length) % images.length ? "prev" : ""}
                    `}
                    alt={`Slide ${index + 1}`}
                />
            ))}

            <button className="prev-button" onClick={() => nextSlide("prev")}>&#10094;</button>
            <button className="next-button" onClick={() => nextSlide("next")}>&#10095;</button>

            <div className="dots-container">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default SlideShow;
