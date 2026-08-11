import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TransitHero from "./components/TransitHero";
import ScrollFrames from "./components/ScrollFrames";
import TransitGallery from "./components/TransitGallery";

function App() {
  return (
    <>
      <Header />
      <main>
        <TransitHero />
        <ScrollFrames />
        <TransitGallery />
      </main>
      <Footer />
    </>
  );
}

export default App;
