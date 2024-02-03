import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TaskBoard from "./components/task/TaskBoard";

function App() {
  return (
    <>
      <div>
        <Header />
        <HeroSection />
        <TaskBoard />
        <Footer />
      </div>
    </>
  );
}

export default App;
