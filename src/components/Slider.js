import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import saree1 from "../assests/saree1.jpg";
import saree2 from "../assests/saree2.jpg";
const sliders = [
  "https://img.freepik.com/premium-vector/marathi-woman-wearing-traditional-dress-sitting-pose_1302-22783.jpg?size=626&ext=jpg",
  saree1,
  saree2,
];

export const Slider = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSelectedImage((selectedImage) =>
        selectedImage < 2 ? selectedImage + 1 : 0
      );
    }, 6000);
  }, []);
  return (
    <div className="slider-container">
      <Link to="/product">
        <img
          src={sliders[selectedImage]}
          alt={`banner${selectedImage + 1}`}
          style={styles.img}
        />
      </Link>
    </div>
  );
};

const styles = {
  img: {
    width: "1000px",
    height: "700px",
    margin: "50px",

   
    objectPosition: "center",
    position: "relative",
    zIndex: 1,
  },
};
