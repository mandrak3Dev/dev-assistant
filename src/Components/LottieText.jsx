import React from "react";
import Lottie from "lottie-react";
import AnimationData from "../Assets/imgs/code.json";

const LottieText = () => {
  return (
    <div className="lottieText">
      <Lottie animationData={AnimationData} loop autoplay />
    </div>
  );
};

export default LottieText;
