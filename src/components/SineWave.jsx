import React, { useRef, useEffect, useState } from 'react';
import { motion,animate, easeIn } from "motion/react"
import '../App.css'

const SineWave = () => {
  const canvasRef = useRef(null);
  
  const [phase, setPhase] = useState(0); // State to control wave movement
  const [noiseLevel , setNoiseLevel] = useState(0);
  const[amplitudeLevel, setAmplitudeLevel] = useState(150)
  const [attenuationLevel, setattenuationLevel] = useState(0);
  const[frequency, setfrequencyLevel] = useState(0.03);
 const[mixFactor , setMixFactor] = useState(0.0)
 const[isCircle, setCircle] = useState(false)
 
  const handleToggleDisplay = () => {
         let targetMixFactor;
     
         if(isCircle === false) { 
           targetMixFactor = 1; 
         } else {
           targetMixFactor = 0; // FIX: Changed == to =
         }
     
        animate(mixFactor, targetMixFactor, {
          duration: 0.5,
          onUpdate: (latestValue) => {
           setMixFactor(latestValue)
          }
        });
    
        setCircle(prevIsCircle => !prevIsCircle);
     };

  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
     

    ; // How tall the wave is
     // How many waves there are
    const verticalOffset = height / 2; // Move the wave to the middle
   
   
    

    let animationFrameId; // To store the ID for cancellation

    const draw = () => {
      // Clear the canvas before drawing


      
         ctx.clearRect(0, 0, width, height);
        

      // Start drawing
      ctx.beginPath();
      ctx.moveTo(0, verticalOffset); // Start at the left-middle
       

      // Loop through the width of the canvas
     
           for (let x = 0; x < width; x++) {
             const noise = ((Math.random() - 0.5) * noiseLevel)
             const  attenuationFactor = Math.pow(1 - attenuationLevel, x / width)
             // Calculate the y position for each x, using the phase for movement
             const ySine = verticalOffset + (amplitudeLevel * attenuationFactor) * Math.sin(x * frequency +
      phase) + noise;
     
             const centerX = width/2;
             const centerY = height/2;
             const radius = (amplitudeLevel * 0.5 * attenuationFactor) + noise;
            const angle = (x/width) * (2*Math.PI);
    
            const xCircle= centerX + radius * Math.cos(angle)
            const yCircle = centerY + radius * Math.sin(angle)
    
            const yFinal = ySine * (1 - mixFactor) + yCircle * mixFactor;
            // Draw a line to the new point
           ctx.lineTo(xCircle, yFinal) 
         }

      // Make the line visible with glow
      ctx.strokeStyle = '#00BFFF'; // A vibrant blue
      ctx.lineWidth = 3.5; // Slightly thicker line
      ctx.shadowBlur = 55;
      ctx.shadowColor = 'rgba(0, 191, 255, 0.8)'; // Blue glow
      ctx.stroke();

      // Reset shadow properties to avoid affecting other drawings
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'rgba(0, 0, 0, 0)';
 
      // Update the phase for the next frame
      setPhase(prevPhase => prevPhase + 0.005); // Increment phase for movement

 
     

        
   

      
        
      
       animationFrameId = requestAnimationFrame(draw);
      
    };

    // Start the animation loop
    draw();

    // Cleanup function: runs when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase,noiseLevel, amplitudeLevel, attenuationLevel, frequency, mixFactor]); 

  return (
<div className='text-white'>

<motion.div onClick={handleToggleDisplay}

animate={{
  boxShadow: "0 0 10px rgba(0, 191, 255, 0.6), 0 0 20px rgba(0, 191, 255, 0.4), 0 0 30px rgba(0, 191, 255,0.2)"
}}
transition={{
  ease: easeIn
}}
className='bg-transparent '>
  <motion.h1 
  animate={{
textShadow: "0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.3), 0 0 15px rgba(255,255,255,0.1)"
  }}

  transition={{
    duration: "infinity"
  }}
  
  className='noise-simulation-title  flex flex-row justify-center text-8xl'>
  {"Noise Simulation".split("").map((char, index) => (
    <motion.span
      key={index}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</motion.h1></motion.div>
    <motion.canvas ref={canvasRef} width="800" height="300"  className='rounded-3xl mt-12  ml-88    absolute' 
    animate={{
      boxShadow: "0 0 15px rgba(79, 70, 229, 0.7), 0 0 30px rgba(79, 70, 229, 0.5), 0 0 45px rgba(79, 70, 229,0.3)",
    }}

    whileHover={{
      scale: 1.02,
      opacity:[0,1]
    }}
     transition={{ type: "spring", stiffness: 400, damping: 10 }}

    
    >
      
      Your browser does not support the HTML canvas tag.


      
    </motion.canvas>
<div className='flex flex-row justify-center pt-22 gap-12 rang1 text-2xl relative mt-88 text-red-300'>
    <motion.div whileHover={{ scale: 1.05,
      boxShadow:"0 0 15px rgba(229, 70, 29, 0.7), 0 0 30px rgba(279, 70, 29, 0.5), 0 0 45px rgba(279, 70, 29,0.3)"
     }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        Noise:
        <input
            type="range"
            className="range-slider"
            value={noiseLevel}
            max={50}
            min={0}
            onChange={(e) => {
                setNoiseLevel(Number(e.target.value));
            }}
        />
    </motion.div>
    <motion.div whileHover={{ scale: 1.05,
      boxShadow:"0 0 15px rgba(229, 70, 229, 0.7), 0 0 30px rgba(279, 70, 229, 0.5), 0 0 45px rgba(279, 70, 229,0.3)"
     }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        Amplitude:
        <input
            type="range"
            className="range-slider"
            value={amplitudeLevel}
            max={250}
            min={150}
            onChange={(e) => {
                setAmplitudeLevel(Number(e.target.value));
            }}
        />
    </motion.div>
    <motion.div whileHover={{ scale: 1.05,
      boxShadow:"0 0 15px rgba(229, 270, 29, 0.7), 0 0 30px rgba(279, 270, 29, 0.5), 0 0 45px rgba(279, 70, 229,0.3)"
     }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        Attenuation:
        <input
            type="range"
            className="range-slider "
            value={attenuationLevel}
            max={1}
            min={0}
            step={0.01}
            onChange={(e) => {
                setattenuationLevel(Number(e.target.value));
            }}
        />
    </motion.div>
</div>

    </div>
   
  );
};

export default SineWave;

