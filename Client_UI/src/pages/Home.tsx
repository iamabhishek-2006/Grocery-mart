import React from "react";
import Layout from "../components/Layout";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
import img4 from "../assets/img4.jpg"
import img5 from "../assets/img5.jpg"

const Home = () => {
  const images=[img1, img2, img3,img4,img5];
  return (
    <Layout>
      {/* <div className="bg-red-900 h-110 max-w-6xl mx-auto overflow-hidden mt-5">
        <img src={images[2]} alt="img" className="h-full w-full" />
      </div> */}
    </Layout>
  );
};

export default Home;
