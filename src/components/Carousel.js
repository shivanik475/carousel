import React, { useEffect, useState, useRef } from "react";

const Carousel = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const fetchData = async () => {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=15"
    );
    const jsonResponse = await response.json();
    setData(jsonResponse);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [currentIndex, data]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 3000); // change every 3s
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    startAutoPlay();
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };
  if (!data.length) return <p>Loading...</p>;

  const currentImage = data[currentIndex];

  return (
    <div
      className="container"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className="left-btn">
        <button onClick={handlePrev}> {"<"} </button>
      </div>
      <img
        className="carousel-image"
        src={currentImage.download_url}
        alt={currentImage.author}
      />
      <div className="right-btn">
        <button onClick={handleNext}> {">"} </button>
      </div>
      <div className="dots-container">
        {data.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
