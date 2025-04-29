import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Mic, 
  Video, 
  Play, 
  FileVideo, 
  Brain, 
  ChevronRight, 
  ArrowLeft, 
  Zap, 
  Award, 
  BarChart3, 
  Info, 
  Star 
} from 'lucide-react';

// Import assets
import videoAI from './assets/Videoai.mp4';
import videoTennis from './assets/videotennis.mp4';
import clusterGif from './assets/cluster.gif';

// Add CSS animations
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blob {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }
    
    @keyframes gradient-x {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .animate-blob {
      animation: blob 7s infinite;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    
    .animate-gradient-x {
      background-size: 200% 200%;
      animation: gradient-x 15s ease infinite;
    }
  `;
  document.head.appendChild(style);
};

export default function ResearchShowcase() {
  // State management
  const [activeProject, setActiveProject] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Add animation styles on mount
  useEffect(() => {
    addAnimationStyles();
  }, []);

  // Loading effect on initial render
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsAnimating(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  // Navigation handlers
  const handleProjectClick = (project) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveProject(project);
      setShowVideoPlayer(false);
      setCurrentDemo(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleDemoClick = (demo) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDemo(demo);
      setShowVideoPlayer(true);
      setIsAnimating(false);
    }, 300);
  };

  const resetView = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveProject(null);
      setShowVideoPlayer(false);
      setCurrentDemo(null);
      setIsAnimating(false);
    }, 300);
  };

  // Demo data for each project
  const objectTrackingDemos = [
    { 
      id: 1, 
      title: "Soccer Player Tracking", 
      description: "AI tracking of player movements and distance covered during a match",
      media: videoAI,
      type: "video",
      stats: {
        accuracy: 95,
        speed: 80,
        implementation: 85
      },
      features: ["Movement Analysis", "Distance Calculation", "Performance Metrics"]
    },
    { 
      id: 2, 
      title: "Tennis Ball Trajectory", 
      description: "Real-time ball tracking and speed analysis in tennis matches",
      media: videoTennis,
      type: "video",
      stats: {
        accuracy: 92,
        speed: 90,
        implementation: 75
      },
      features: ["Speed Measurement", "Trajectory Prediction", "Spin Analysis"]
    },
  ];

  const lipReaderDemos = [
    { 
      id: 1, 
      title: "Pixel Clustering Demo", 
      description: "Visualization of the pixel clustering algorithm for lip detection",
      media: clusterGif,
      type: "image",
      stats: {
        accuracy: 88,
        speed: 75,
        implementation: 80
      },
      features: ["Edge Detection", "Facial Recognition", "Speech Pattern Analysis"]
    },
    { 
      id: 2, 
      title: "Real-time Speech Analysis", 
      description: "Converting lip movements to text with neural networks",
      media: clusterGif,
      type: "image",
      stats: {
        accuracy: 82,
        speed: 70,
        implementation: 90
      },
      features: ["Text Generation", "Language Processing", "Emotion Detection"]
    },
  ];

  // Project data
  const projects = [
    {
      id: "object-tracking",
      title: "Sports Object Tracking AI",
      icon: <Activity size={48} className="text-blue-500" />,
      description: "Advanced machine learning system that tracks players and balls in sports videos, calculating movement patterns and distances covered.",
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
      demos: objectTrackingDemos,
      technologies: ["TensorFlow", "OpenCV", "PyTorch"],
      keyFeature: "Real-time object detection at 30fps"
    },
    {
      id: "lip-reader",
      title: "AI Lip Reader Detection",
      icon: <Mic size={48} className="text-green-500" />,
      description: "Cutting-edge lip reading AI that uses pixel clustering to detect and interpret speech from video with high accuracy.",
      color: "bg-gradient-to-br from-green-500 to-teal-600",
      demos: lipReaderDemos,
      technologies: ["CNN", "RNN", "LSTM Networks"],
      keyFeature: "85% accuracy in noisy environments"
    }
  ];

  // Loading screen
  if (loadingProgress < 100 || isAnimating) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          ML Research Showcase
        </div>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <div className="mt-4 text-gray-400">Loading amazing AI demos...</div>
      </div>
    );
  }

  // Render the main UI
  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-4 md:p-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-40 sm:w-64 h-40 sm:h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-48 sm:w-80 h-48 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-44 sm:w-72 h-44 sm:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with animated text */}
      <header className="mb-4 sm:mb-6 md:mb-8 text-center relative z-10 p-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
          ML Research Showcase
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2">
          Explore cutting-edge machine learning applications in computer vision and audio processing
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 relative z-10">
        {/* Project Selection Screen */}
        {!activeProject && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className={`${project.color} rounded-xl p-1 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                    <div className="p-3 bg-gray-700 rounded-lg mb-3 sm:mb-0 mx-auto sm:mx-0">
                      {project.icon}
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold sm:ml-4 text-center sm:text-left">
                      {project.title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                    {project.description}
                  </p>
                  
                  {/* Tech tags */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Key feature highlight */}
                  <div className="mb-4 sm:mb-6 flex items-center justify-center sm:justify-start">
                    <Zap size={16} className="text-yellow-400 mr-2" />
                    <span className="text-yellow-400 text-xs sm:text-sm">{project.keyFeature}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <Brain size={18} className="text-gray-400 mr-2" />
                      <span className="text-gray-400 text-sm">ML Powered</span>
                    </div>
                    <div className="flex items-center text-blue-400 group">
                      <span className="text-sm sm:text-base">Explore</span>
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Player Screen */}
        {activeProject && showVideoPlayer && (
          <div className="bg-gray-800 rounded-xl p-3 sm:p-4 md:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
              <button 
                onClick={() => setShowVideoPlayer(false)} 
                className="flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors bg-gray-700 px-3 py-2 rounded-lg w-full sm:w-auto"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span className="text-sm sm:text-base">Back to demos</span>
              </button>
              <button 
                onClick={resetView} 
                className="flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors bg-gray-700 px-3 py-2 rounded-lg w-full sm:w-auto"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span className="text-sm sm:text-base">Main menu</span>
              </button>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-center sm:text-left">
              {currentDemo.title}
            </h2>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base text-center sm:text-left">
              {currentDemo.description}
            </p>
            
            {/* Media display */}
            <div className="bg-black rounded-lg overflow-hidden aspect-video mb-6 sm:mb-8 flex items-center justify-center shadow-xl border border-gray-700">
              {currentDemo.type === "video" ? (
                <video 
                  src={currentDemo.media} 
                  controls 
                  className="w-full h-full" 
                  poster="/api/placeholder/640/360"
                  autoPlay
                  loop
                />
              ) : (
                <img 
                  src={currentDemo.media} 
                  alt={currentDemo.title} 
                  className="max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-contain"
                />
              )}
            </div>
            
            {/* Performance metrics */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center sm:text-left">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* Accuracy metric */}
                <div className="bg-gray-700 rounded-lg p-3 sm:p-4 text-center">
                  <div className="w-full flex justify-center">
                    <div className="relative">
                      <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                        <circle 
                          className="text-gray-600" 
                          strokeWidth="6" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="30" 
                          cx="35" 
                          cy="35"
                        />
                        <circle 
                          className="text-blue-500" 
                          strokeWidth="6" 
                          strokeDasharray={188.4} 
                          strokeDashoffset={188.4 - (188.4 * currentDemo.stats.accuracy) / 100} 
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="30" 
                          cx="35" 
                          cy="35" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold">{currentDemo.stats.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-blue-400 text-sm sm:text-base">Accuracy</p>
                </div>
                
                {/* Speed metric */}
                <div className="bg-gray-700 rounded-lg p-3 sm:p-4 text-center">
                  <div className="w-full flex justify-center">
                    <div className="relative">
                      <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                        <circle 
                          className="text-gray-600" 
                          strokeWidth="6" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="30" 
                          cx="35" 
                          cy="35" 
                        />
                        <circle 
                          className="text-green-500" 
                          strokeWidth="6" 
                          strokeDasharray={188.4} 
                          strokeDashoffset={188.4 - (188.4 * currentDemo.stats.speed) / 100} 
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="30" 
                          cx="35" 
                          cy="35" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold">{currentDemo.stats.speed}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-green-400 text-sm sm:text-base">Processing Speed</p>
                </div>
                
                {/* Implementation metric */}
                <div className="bg-gray-700 rounded-lg p-3 sm:p-4 text-center">
                  <div className="w-full flex justify-center">
                    <div className="relative">
                      <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                        <circle 
                          className="text-gray-600" 
                          strokeWidth="6" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="30" 
                          cx="35" 
                          cy="35" 
                        />
                        <circle 
                          className="text-purple-500" 
                          strokeWidth="6" 
                          strokeDasharray={188.4} 
                          strokeDashoffset={188.4 - (188.4 * currentDemo.stats.implementation) / 100} 
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="30" 
                          cx="35" 
                          cy="35" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold">{currentDemo.stats.implementation}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-purple-400 text-sm sm:text-base">Implementation</p>
                </div>
              </div>
            </div>
            
            {/* Information cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Technology Stack */}
              <div className="bg-gray-700 rounded-lg p-4 sm:p-6 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-3 sm:mb-4">
                  <BarChart3 size={20} className="text-blue-400 mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-semibold">Technology Stack</h3>
                </div>
                <ul className="text-gray-300 space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400 mr-2 sm:mr-3"></div>
                    Neural Networks
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400 mr-2 sm:mr-3"></div>
                    Computer Vision
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400 mr-2 sm:mr-3"></div>
                    Real-time Processing
                  </li>
                </ul>
              </div>
              
              {/* Key Features */}
              <div className="bg-gray-700 rounded-lg p-4 sm:p-6 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Award size={20} className="text-green-400 mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-semibold">Key Features</h3>
                </div>
                <ul className="text-gray-300 space-y-2 sm:space-y-3 text-sm sm:text-base">
                  {currentDemo.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 mr-2 sm:mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Applications */}
              <div className="bg-gray-700 rounded-lg p-4 sm:p-6 transform transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Info size={20} className="text-purple-400 mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-semibold">Applications</h3>
                </div>
                <ul className="text-gray-300 space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-400 mr-2 sm:mr-3"></div>
                    Sports Analytics
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-400 mr-2 sm:mr-3"></div>
                    Performance Tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-400 mr-2 sm:mr-3"></div>
                    Training Optimization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Demo Selection Screen */}
        {activeProject && !showVideoPlayer && (
          <div className="bg-gray-800 rounded-xl p-4 md:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <button 
                onClick={resetView} 
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors bg-gray-700 px-3 py-2 rounded-lg mb-4 md:mb-0"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to projects
              </button>
              <h2 className="text-2xl md:text-3xl font-bold">{activeProject.title}</h2>
              <div className="hidden md:block w-24"></div> {/* Empty div for centering on larger screens */}
            </div>
            
            <div className="relative mb-12">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-700 transform -translate-y-1/2"></div>
              <div className="relative flex justify-center">
                <div className="bg-gray-800 px-6 py-2 rounded-full border border-gray-700">
                  <p className="text-gray-300 text-center max-w-3xl">{activeProject.description}</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center flex items-center justify-center">
              <Play size={20} className="text-blue-400 mr-3" />
              <span>Available Demos</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProject.demos.map((demo) => (
                <div 
                  key={demo.id}
                  className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  onClick={() => handleDemoClick(demo)}
                >
                  <div className="h-40 bg-gray-600 relative">
                    {demo.type === "video" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileVideo size={48} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={demo.media} 
                          alt={demo.title} 
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video size={48} className="text-gray-200 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-16"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">{demo.title}</h4>
                      <Star size={16} className="text-yellow-400" />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{demo.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {demo.type === "video" ? "Video Demo" : "Interactive Demo"}
                      </span>
                      <div className="flex items-center text-blue-400 text-sm">
                        <span>View</span>
                        <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-8 sm:mt-12 md:mt-16 text-center text-gray-500 relative z-10">
        <div className="flex items-center justify-center mb-2">
          <div className="w-6 sm:w-8 h-1 rounded-full bg-blue-500 mx-1"></div>
          <div className="w-2 h-1 rounded-full bg-purple-500 mx-1"></div>
          <div className="w-2 h-1 rounded-full bg-pink-500 mx-1"></div>
        </div>
        <p className="text-xs sm:text-sm">© 2025 Advanced ML Research • Interactive Showcase</p>
      </footer>
    </div>
  );
}