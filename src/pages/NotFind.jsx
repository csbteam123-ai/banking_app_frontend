import React, { useEffect, useRef, useState } from 'react';

const Futuristic404 = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState('404');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };
    createParticles();

    // Draw grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(100, 255, 218, 0.1)';
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    };

    // Draw central vortex
    const drawVortex = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() / 1000;
      
      for (let i = 0; i < 5; i++) {
        const radius = 100 + i * 30 + Math.sin(time) * 10;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 - i * 0.02})`;
        ctx.stroke();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(10, 25, 47, 0)');
      gradient.addColorStop(1, 'rgba(10, 25, 47, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      drawVortex();
      
      // Update and draw particles
      particles.forEach(p => {
        // Mouse interaction
        const dx = mousePosition.x - p.x;
        const dy = mousePosition.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 100;
          p.x -= Math.cos(angle) * force * 2;
          p.y -= Math.sin(angle) * force * 2;
        }
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${p.opacity})`;
        ctx.fill();
        
        // Draw connecting lines
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Glitch effect on text
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchText('4😵4');
        setTimeout(() => setGlitchText('404'), 150);
      }
    }, 3000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(glitchInterval);
    };
  }, [mousePosition]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#0d1a2b] to-[#1a2f3f] overflow-hidden font-['Orbitron'] z-50">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />
      
      {/* Main Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-[90%] max-w-4xl animate-fadeIn">
        {/* Animated 404 */}
        <div className="mb-8 relative">
          <h1 className="text-[clamp(6rem,20vw,15rem)] font-black text-[#64ffda] animate-glitch relative tracking-[10px]"
              style={{
                textShadow: '0.05em 0 0 rgba(255,0,0,0.75), -0.025em -0.05em 0 rgba(0,255,255,0.75), 0.025em 0.05em 0 rgba(255,255,0,0.75)'
              }}>
            {glitchText}
          </h1>
          <div className="absolute inset-0 flex justify-center items-center opacity-20">
            <div className="w-64 h-64 border-2 border-[#64ffda] rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Subtitle */}
        <h2 className="text-[clamp(1.5rem,5vw,2.5rem)] text-white mb-6 font-['Rajdhani'] uppercase tracking-[8px] animate-glow">
          Lost in Space
        </h2>
        
        {/* Message */}
        <p className="text-[clamp(1rem,3vw,1.2rem)] text-[#b0e0ff] mb-12 leading-relaxed font-['Rajdhani'] tracking-wide max-w-2xl mx-auto">
          The page you're looking for has drifted into the cosmic void.
          <br />
          Let's get you back to civilization.
        </p>
        
        {/* Buttons */}
        <div className="flex gap-5 justify-center flex-wrap mb-12">
          <button 
            onClick={() => window.location.href = '/'}
            className="group relative px-10 py-4 bg-transparent border-2 border-[#64ffda] text-[#64ffda] font-['Orbitron'] text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:bg-[#64ffda] hover:text-[#0a0f1e] hover:shadow-[0_0_20px_#64ffda]"
          >
            <span className="relative z-10">Return Home</span>
            <span className="absolute inset-0 bg-[#64ffda] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          
          <button 
            onClick={() => window.history.back()}
            className="group relative px-10 py-4 bg-transparent border-2 border-[#ff64b4] text-[#ff64b4] font-['Orbitron'] text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:bg-[#ff64b4] hover:text-[#0a0f1e] hover:shadow-[0_0_20px_#ff64b4]"
          >
            <span className="relative z-10">Go Back</span>
            <span className="absolute inset-0 bg-[#ff64b4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </div>
        
        {/* Error Code with Glitch Effect */}
        <div className="flex justify-center gap-4 text-3xl font-['Orbitron']">
          <span className="text-[#64ffda] animate-pulse">4</span>
          <span className="text-[#ff64b4] animate-bounce">0</span>
          <span className="text-[#64ffda] animate-pulse">4</span>
        </div>
      </div>
      
      {/* Corner Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-[#64ffda] opacity-50"></div>
      <div className="absolute top-10 right-10 w-20 h-20 border-r-4 border-t-4 border-[#64ffda] opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-4 border-b-4 border-[#64ffda] opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-[#64ffda] opacity-50"></div>
      
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#64ffda] to-transparent opacity-30 animate-scan"></div>
      </div>
      
      {/* Floating Numbers */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute text-[#64ffda] opacity-10 text-2xl font-bold animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        >
          {Math.random() > 0.5 ? '4' : '0'}
        </div>
      ))}
    </div>
  );
};

// Add these animations to your global CSS file or create a new one
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 10px #64ffda, 0 0 20px #64ffda, 0 0 30px #64ffda;
    }
    to {
      text-shadow: 0 0 20px #64ffda, 0 0 30px #64ffda, 0 0 40px #64ffda;
    }
  }

  @keyframes scan {
    0% {
      top: -5%;
    }
    100% {
      top: 105%;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(10deg);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 1s ease-out;
  }

  .animate-glitch {
    animation: glitch 500ms infinite;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite alternate;
  }

  .animate-scan {
    animation: scan 4s linear infinite;
  }

  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
`;

export default Futuristic404;