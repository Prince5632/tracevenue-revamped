import { useState, useEffect } from "react";
import Login from "../components/Login";

/**
 * Login Page - Ultra Modern Premium Design
 * Full-screen, edge-to-edge, distinctive design
 */
const LoginPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80",
      title: "Find Your Perfect Venue",
      subtitle: "500+ verified venues across Tricity",
    },
    {
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80",
      title: "Premium Catering",
      subtitle: "Curated menus for every celebration",
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&q=80",
      title: "Memorable Events",
      subtitle: "From intimate gatherings to grand celebrations",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Full Background Image */}
      {sliderImages.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-out ${i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          style={{ backgroundImage: `url(${slide.url})` }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex">
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:flex w-[55%] h-full flex-col justify-between p-12 xl:p-16 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Tracevenue
            </span>
          </div>

          {/* Main Title */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              500+ Venues Available
            </div>

            <h1 className="text-5xl xl:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
              {sliderImages[currentSlide].title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={
                    i === sliderImages[currentSlide].title.split(" ").length - 1
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              {sliderImages[currentSlide].subtitle}
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[
                { value: "500+", label: "Venues" },
                { value: "50K+", label: "Customers" },
                { value: "4.9★", label: "Rating" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-3">
            {sliderImages.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide
                  ? "w-12 bg-gradient-to-r from-orange-400 to-red-400"
                  : "w-6 bg-white/30 hover:bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-[45%] h-full flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Tracevenue
              </span>
            </div>

            <Login />

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
