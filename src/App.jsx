import React, { useState } from 'react';
import { Activity, Mic, Video, Play, FileVideo, Brain, ChevronRight } from 'lucide-react';

// Import your media assets
// Adjust these paths if your assets are in a different location
import videoAI from './assets/Videoai.mp4';
import videoTennis from './assets/videotennis.mp4';
import clusterGif from './assets/cluster.gif';

export default function ResearchShowcase() {
  const [activeProject, setActiveProject] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(null);

  const handleProjectClick = (project) => {
    setActiveProject(project);
    setShowVideoPlayer(false);
    setCurrentDemo(null);
  };

  const handleDemoClick = (demo) => {
    setCurrentDemo(demo);
    setShowVideoPlayer(true);
  };

  const resetView = () => {
    setActiveProject(null);
    setShowVideoPlayer(false);
    setCurrentDemo(null);
  };

  // Demo videos for each project
  const objectTrackingDemos = [
    { 
      id: 1, 
      title: "Soccer Player Tracking", 
      description: "AI tracking of player movements and distance covered during a match",
      media: videoAI,
      type: "video"
    },
    { 
      id: 2, 
      title: "Tennis Ball Trajectory", 
      description: "Real-time ball tracking and speed analysis in tennis matches",
      media: videoTennis,
      type: "video"
    },
    { 
      id: 3, 
      title: "Multi-Object Tracking", 
      description: "Simultaneous tracking of multiple players and the ball",
      media: videoAI,  // Using the same video as a fallback
      type: "video"
    }
  ];

  const lipReaderDemos = [
    { 
      id: 1, 
      title: "Pixel Clustering Demo", 
      description: "Visualization of the pixel clustering algorithm for lip detection",
      media: clusterGif,
      type: "image"
    },
    { 
      id: 2, 
      title: "Basic Lip Reading", 
      description: "Detection and interpretation of simple phrases",
      media: clusterGif,  // Using the gif as a fallback
      type: "image"
    },
    { 
      id: 3, 
      title: "Real-time Analysis", 
      description: "Live processing of lip movements for speech recognition",
      media: clusterGif,  // Using the gif as a fallback
      type: "image"
    }
  ];

  // Main projects
  const projects = [
    {
      id: "object-tracking",
      title: "Sports Object Tracking AI",
      icon: <Activity size={48} className="text-blue-500" />,
      description: "Advanced machine learning system that tracks players and balls in sports videos, calculating movement patterns and distances covered.",
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
      demos: objectTrackingDemos
    },
    {
      id: "lip-reader",
      title: "AI Lip Reader Detection",
      icon: <Mic size={48} className="text-green-500" />,
      description: "Cutting-edge lip reading AI that uses pixel clustering to detect and interpret speech from video.",
      color: "bg-gradient-to-br from-green-500 to-teal-600",
      demos: lipReaderDemos
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">ML Research Showcase</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">Explore cutting-edge machine learning applications in computer vision and audio processing</p>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {!activeProject ? (
          // Project Selection Screen
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className={`${project.color} rounded-xl p-1 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="bg-gray-800 rounded-lg p-8 h-full">
                  <div className="flex items-center mb-4">
                    {project.icon}
                    <h2 className="text-2xl font-bold ml-4">{project.title}</h2>
                  </div>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Brain size={20} className="text-gray-400 mr-2" />
                      <span className="text-gray-400">ML Powered</span>
                    </div>
                    <div className="flex items-center text-blue-400">
                      <span>Explore</span>
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : showVideoPlayer ? (
          // Video Player Screen
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowVideoPlayer(false)} 
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ChevronRight size={16} className="transform rotate-180 mr-2" />
                Back to demos
              </button>
              <button 
                onClick={resetView} 
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ChevronRight size={16} className="transform rotate-180 mr-2" />
                Main menu
              </button>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">{currentDemo.title}</h2>
            <p className="text-gray-300 mb-6">{currentDemo.description}</p>
            
            <div className="bg-black rounded-lg overflow-hidden aspect-video mb-8 flex items-center justify-center">
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
                  className="max-h-[500px] object-contain"
                />
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Technology Used</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>
                    Neural Networks
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>
                    Computer Vision
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>
                    Real-time Processing
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Accuracy Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Detection Rate</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Processing Speed</span>
                      <span>30fps</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Applications</h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-400 mr-2"></div>
                    Sports Analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-400 mr-2"></div>
                    Performance Tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-400 mr-2"></div>
                    Training Optimization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          // Demo Selection Screen
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={resetView} 
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ChevronRight size={16} className="transform rotate-180 mr-2" />
                Back to projects
              </button>
              <h2 className="text-3xl font-bold">{activeProject.title}</h2>
              <div className="w-24"></div> {/* Empty div for centering */}
            </div>
            
            <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">{activeProject.description}</p>
            
            <h3 className="text-2xl font-semibold mb-6 text-center">Select a Demo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeProject.demos.map((demo) => (
                <div 
                  key={demo.id}
                  className="bg-gray-700 rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-gray-600"
                  onClick={() => handleDemoClick(demo)}
                >
                  <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                    <Play size={24} className="text-blue-400" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-center">{demo.title}</h4>
                  <p className="text-gray-400 text-center">{demo.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500">
        <p>© 2025 Advanced ML Research • Interactive Showcase</p>
      </footer>
    </div>
  );
}