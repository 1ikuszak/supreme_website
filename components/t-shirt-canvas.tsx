"use client";

import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

// Add a type for valid box colors
type ValidBoxColor = "red" | "blue" | "green" | "black" | "skyBlue";

// Update the type for valid animation patterns
type AnimationPattern = "matrix" | "pulse" | "galaxy" | "plasma";

// Modified color scheme configuration
const colorSchemes: Record<ValidBoxColor, { colors: number[][] }> = {
  red: {
    colors: [
      [1.0, 0.2, 0.2], // Bright vibrant red
      [0.3, 0.05, 0.05], // Very dark red
      [0.8, 0.1, 0.1], // Medium bright red
      [0.6, 0.0, 0.0], // Deep red
      [1.0, 0.4, 0.4], // Light red
      [0.4, 0.1, 0.1], // Dark red accent
    ],
  },
  blue: {
    colors: [
      [0.15, 0.25, 0.8], // Supreme royal blue
      [0.04, 0.06, 0.2], // Very dark blue
      [0.1, 0.15, 0.6], // Medium royal blue
      [0.06, 0.1, 0.4], // Deep blue
      [0.2, 0.3, 0.9], // Light royal blue
      [0.08, 0.12, 0.3], // Dark blue accent
    ],
  },
  green: {
    colors: [
      [0.2, 0.8, 0.3], // Bright Supreme green
      [0.05, 0.2, 0.05], // Very dark green
      [0.15, 0.6, 0.2], // Medium Supreme green
      [0.1, 0.4, 0.1], // Deep green
      [0.3, 0.7, 0.4], // Light Supreme green
      [0.08, 0.3, 0.08], // Dark green accent
    ],
  },
  black: {
    colors: [
      [0.4, 0.4, 0.4], // Light gray
      [0.05, 0.05, 0.05], // Nearly black
      [0.2, 0.2, 0.2], // Medium gray
      [0.1, 0.1, 0.1], // Dark gray
      [0.3, 0.3, 0.3], // Medium light gray
      [0.15, 0.15, 0.15], // Dark accent
    ],
  },
  skyBlue: {
    colors: [
      [0.4, 0.7, 0.9], // Bright sky blue
      [0.1, 0.2, 0.3], // Very dark sky blue
      [0.3, 0.5, 0.7], // Medium sky blue
      [0.2, 0.4, 0.6], // Deep sky blue
      [0.5, 0.8, 1.0], // Light sky blue
      [0.15, 0.3, 0.4], // Dark sky blue accent
    ],
  },
};

// Update the type for TShirtCanvasProps
interface TShirtCanvasProps {
  tShirtColor: string;
  boxColor: ValidBoxColor;
  animationPattern?: AnimationPattern;
  size: string; // Add size prop
}

// Update component props default values
function Background({ boxColor = "red" }: { boxColor?: ValidBoxColor }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).color.set(boxColor);
    }
  }, [boxColor]);

  return (
    <mesh ref={meshRef} scale={[7, 1.8, 1]} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={boxColor} />
    </mesh>
  );
}

function AnimatedPattern({
  boxColor = "red",
  animationPattern = "matrix",
}: {
  boxColor?: ValidBoxColor;
  animationPattern?: AnimationPattern;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.needsUpdate = true;
    }
  }, [boxColor]);

  const shader = {
    vertex: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragment: `
      uniform float time;
      varying vec2 vUv;
      
      float pixelate(float value, float segments) {
        return floor(value * segments) / segments;
      }
      
      vec2 rotateUV(vec2 uv, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return vec2(
          uv.x * c - uv.y * s,
          uv.x * s + uv.y * c
        );
      }
      
      void main() {
        float pixelSize = 32.0;
        vec2 pixelatedUV = vec2(
          pixelate(vUv.x, pixelSize),
          pixelate(vUv.y, pixelSize)
        );
        vec2 centered = pixelatedUV - 0.5;
        vec2 rotatedUV = rotateUV(pixelatedUV, time * 0.5);
        
        float pattern;
        ${getPatternCode(animationPattern, boxColor)}
        
        // Add subtle scan lines
        float scanLine = step(0.5, sin(vUv.y * 32.0 + time * 2.0));
        finalColor *= (0.8 + scanLine * 0.2);
        
        // Sharp alpha transitions for 8-bit feel
        float alpha = step(0.2, pattern);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
  };

  return (
    <mesh ref={meshRef} scale={[7, 1.72, 1]} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={shader.vertex}
        fragmentShader={shader.fragment}
        uniforms={{
          time: { value: 0 },
        }}
        transparent={true}
      />
    </mesh>
  );
}

// Update the getPatternCode function to ensure it has access to boxColor
function getPatternCode(
  pattern: AnimationPattern,
  boxColor: ValidBoxColor
): string {
  const colors = colorSchemes[boxColor].colors;

  switch (pattern) {
    case "matrix":
      return `
        // Define colors for the palette
        vec3 color1 = vec3(${colors[0].join(", ")});
        vec3 color2 = vec3(${colors[1].join(", ")});
        vec3 color3 = vec3(${colors[2].join(", ")});
        vec3 color4 = vec3(${colors[3].join(", ")});
        vec3 color5 = vec3(${colors[4].join(", ")});
        vec3 color6 = vec3(${colors[5].join(", ")});

        // Matrix effect calculation
        float cell = floor(vUv.y * 32.0);
        float speed = 2.0 + mod(cell * 6.11, 3.0);
        float offset = mod(cell * 3.7, 8.0);
        float x = mod(vUv.x * 32.0 + time * speed + offset, 1.0);
        
        // Create falling characters effect
        float matrixPattern = step(0.5, x);
        
        // Mix colors based on the pattern
        vec3 finalColor = mix(
          mix(color1, color2, matrixPattern),
          mix(color3, color4, step(0.8, x)),
          step(0.95, sin(time + vUv.y * 10.0))
        );
        
        // Add highlights
        finalColor += color5 * step(0.98, x);
        finalColor = mix(finalColor, color6, step(0.99, sin(time * 2.0 + vUv.y * 20.0)));

        pattern = length(finalColor) * 0.5;
      `;
    case "pulse":
      return `
        vec3 color1 = vec3(${colorSchemes[boxColor].colors[0].join(", ")});
        vec3 color2 = vec3(${colorSchemes[boxColor].colors[1].join(", ")});
        vec3 color3 = vec3(${colorSchemes[boxColor].colors[2].join(", ")});
        vec3 color4 = vec3(${colorSchemes[boxColor].colors[3].join(", ")});
        vec3 color5 = vec3(${colorSchemes[boxColor].colors[4].join(", ")});
        vec3 color6 = vec3(${colorSchemes[boxColor].colors[5].join(", ")});
        
        float squarePattern = fract(length(centered) * 4.0 - time);
        vec3 finalColor = mix(
          mix(
            mix(color1, color2, squarePattern),
            mix(color3, color4, squarePattern * 2.0),
            step(0.3, squarePattern)
          ),
          mix(color5, color6, squarePattern * 0.5),
          step(0.7, squarePattern)
        );
        pattern = length(finalColor) * 0.5;
      `;
    case "galaxy":
      return `
        vec3 color1 = vec3(${colorSchemes[boxColor].colors[0].join(", ")});
        vec3 color2 = vec3(${colorSchemes[boxColor].colors[1].join(", ")});
        vec3 color3 = vec3(${colorSchemes[boxColor].colors[2].join(", ")});
        vec3 color4 = vec3(${colorSchemes[boxColor].colors[3].join(", ")});
        vec3 color5 = vec3(${colorSchemes[boxColor].colors[4].join(", ")});
        vec3 color6 = vec3(${colorSchemes[boxColor].colors[5].join(", ")});
        
        float wavePattern = sin(
          atan(centered.y, centered.x) * 8.0 + 
          length(centered) * 10.0 - 
          time * 2.0
        );
        
        vec3 finalColor = mix(
          mix(
            mix(color1, color2, wavePattern),
            mix(color3, color4, wavePattern * 1.5),
            step(0.3, wavePattern)
          ),
          mix(color5, color6, wavePattern * 0.7),
          step(0.7, wavePattern)
        );
        pattern = length(finalColor) * 0.5;
      `;
    case "plasma":
      return `
        vec3 color2 = vec3(${colorSchemes[boxColor].colors[1].join(", ")});
        vec3 color3 = vec3(${colorSchemes[boxColor].colors[2].join(", ")});
        vec3 color4 = vec3(${colorSchemes[boxColor].colors[3].join(", ")});
        vec3 color6 = vec3(${colorSchemes[boxColor].colors[5].join(", ")});
        
        // Create base coordinates
        vec2 center = centered * 2.0;
        float dist = length(center);
        float angle = atan(center.y, center.x);
        
        // Create multiple pulse layers with different speeds and sizes
        float mainPulse = 1.0 - step(0.6 + sin(time * 2.0) * 0.2, dist);
        
        // Spiral pulse effect
        float spiralTime = time * 2.0;
        float spiral = step(0.95, sin(
          angle * 6.0 + 
          dist * 8.0 + 
          spiralTime
        ));
        
        // Create ripple waves
        float ripples = 0.0;
        for(int i = 0; i < 3; i++) {
            float speed = float(i) * 0.5 + 1.0;
            float scale = float(i) * 0.4 + 3.0;
            ripples += step(0.98, sin(dist * scale - time * speed));
        }
        
        // Geometric pattern overlay
        float geo = step(0.93, sin(angle * 8.0) * sin(dist * 10.0 - time));
        
        // Create energy rings
        float rings = 0.0;
        for(int i = 0; i < 4; i++) {
            float ringSize = 0.2 + float(i) * 0.2;
            float ringPulse = sin(time * (1.0 + float(i) * 0.5)) * 0.05;
            rings += step(0.02, abs(dist - (ringSize + ringPulse)));
        }
        rings = 1.0 - rings;
        
        // Add rotating beams
        float beams = step(0.95, sin(
          angle * 12.0 + 
          time * 3.0
        ));
        
        // Create shockwave effect
        float shockwave = step(0.98, sin(
          dist * 20.0 - 
          time * 4.0
        ));
        
        // Add symmetric patterns
        float symmetry = step(0.97, sin(
          angle * 16.0 + 
          dist * 5.0 - 
          time * 2.0
        ));
        
        // Create energy core
        float core = smoothstep(0.0, 0.3, 0.3 - dist) * 
                    (sin(time * 4.0) * 0.5 + 0.5);
        
        // Add orbital particles
        float particles = 0.0;
        for(int i = 0; i < 3; i++) {
            float orbitSpeed = float(i) * 2.0 + time * 2.0;
            float orbitDist = 0.3 + float(i) * 0.2;
            vec2 orbitPos = vec2(
                cos(orbitSpeed) * orbitDist,
                sin(orbitSpeed) * orbitDist
            );
            particles += smoothstep(0.1, 0.0, length(center - orbitPos));
        }
        
        // Create dynamic edge glow
        float edgeGlow = smoothstep(0.5, 0.8, dist) * 
                        (sin(angle * 20.0 + time * 3.0) * 0.5 + 0.5);
        
        // Enhanced color mixing for pulse pattern (modified)
        vec3 pulseColor = mix(color2, color3, mainPulse);
        vec3 spiralColor = mix(color3, color4, spiral);
        vec3 particleColor = mix(color4, color6, particles);
        
        // Mix colors based on different effects
        vec3 finalColor = mix(
          mix(pulseColor, spiralColor, ripples),
          particleColor,
          core
        );
        
        // Add color variation for rings and beams
        finalColor = mix(finalColor, color4, rings * 0.5);
        finalColor = mix(finalColor, color3, beams * 0.7);
        finalColor = mix(finalColor, color6, shockwave * 0.8);
        
        pattern = length(finalColor) * 0.5;
      `;
    default:
      return "";
  }
}

// Update the component to receive size prop
export function TShirtCanvas({
  tShirtColor,
  boxColor,
  animationPattern,
  size,
}: TShirtCanvasProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(10);
  const progressInterval = useRef<NodeJS.Timeout>();

  // Handle loading state and progress with exponential increase
  useEffect(() => {
    setIsLoading(true);
    setProgress(10);

    // Simulate loading progress with exponential increase
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval.current);
          return 100;
        }
        // Exponential increase: faster at start, slower near end
        const increment = Math.max(1, Math.floor((100 - prev) / 4));
        return Math.min(100, prev + increment);
      });
    }, 100);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [tShirtColor]);

  // Map color names to image paths
  const tShirtImages = {
    white: "/t_shirt_white.png",
    black: "/t_shirt_black.png",
    red: "/t_shirt_red.png",
    navy: "/t_shirt_navy.png",
  };

  return (
    <div className="relative w-full h-full">
      {/* Updated Loading Animation */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="font-mono text-black">
            LOADING DESIGN {progress}%
            <br />
            {Array(Math.floor(progress / 5))
              .fill("▓")
              .join("")}
            {Array(20 - Math.floor(progress / 5))
              .fill("░")
              .join("")}
          </div>
        </div>
      )}

      {/* T-shirt PNG Base */}
      <div
        className={`absolute inset-0 scale-75 -translate-y-[13%] transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          key={tShirtColor}
          src={tShirtImages[tShirtColor as keyof typeof tShirtImages]}
          alt={`${tShirtColor} T-shirt`}
          fill
          className="object-contain"
          priority
          onLoadingComplete={() => {
            // Add a minimum loading time of 2 seconds
            setTimeout(() => {
              setIsLoading(false);
              if (progressInterval.current) {
                clearInterval(progressInterval.current);
              }
            }, 2000);
          }}
        />
      </div>

      {/* Supreme-style Box Logo */}
      <div
        className={`absolute inset-0 flex items-center justify-center translate-y-[-22%] transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className="relative w-[220px] h-[62px]"
          style={{ backgroundColor: "transparent" }}
        >
          {/* 3D Pattern Container */}
          <div className="absolute inset-0 w-full h-full">
            <Canvas
              key={`${tShirtColor}-${boxColor}-${animationPattern}-${size}`}
              camera={{ position: [0, 0, 2], fov: 75 }}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                background: "transparent",
              }}
            >
              <color args={["transparent"]} />
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
              <Background boxColor={boxColor} />
              {!isLoading && (
                <AnimatedPattern
                  key={`${boxColor}-${animationPattern}-${size}`}
                  boxColor={boxColor}
                  animationPattern={animationPattern}
                />
              )}
            </Canvas>
          </div>

          {/* Supreme Text - always white */}
          <div
            className="absolute inset-0 flex items-center justify-center text-2xl"
            style={{
              fontFamily: 'Futura, "Helvetica Neue", sans-serif',
              fontWeight: "bold",
              zIndex: 10,
              color: "white",
            }}
          >
            Supreme
          </div>
        </div>
      </div>

      {/* Updated Size Guide and Care Instructions */}
      <div
        className={`absolute flex bottom-0 w-full h-[164px] transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center w-full px-8">
          <div>
            <pre className="font-mono text-[10px] text-[#cc0000] whitespace-pre opacity-90 hover:opacity-100 transition-opacity">
              {`┌──────────── SIZE DETAILS ───────────────┐
│                                         │
| SMALL    - 27.5" LENGTH / 34-36" CHEST  │
│ MEDIUM   - 28.5" LENGTH / 38-40" CHEST  │
│ LARGE    - 29.5" LENGTH / 42-44" CHEST  │
│ XLARGE   - 30.5" LENGTH / 46-48" CHEST  │
│ XXLARGE  - 31.5" LENGTH / 50-52" CHEST  │
│                                         │
└─────────────────────────────────────────┘`}
            </pre>
          </div>

          <div>
            <pre className="font-mono text-[10px] text-[#cc0000] whitespace-pre opacity-90 hover:opacity-100 transition-opacity">
              {`┌──────────── CARE DETAILS ───────────────┐
│                                         │
│ ⌘ MACHINE WASH COLD WITH LIKE COLORS    │
│ ⌘ WASH INSIDE OUT FOR LOGO PROTECTION   │
│ ⌘ DO NOT BLEACH OR DRY CLEAN            │
│ ⌘ TUMBLE DRY LOW HEAT ONLY              │
│ ⌘ WARM IRON IF NEEDED, AVOID LOGO       │
│                                         │
└─────────────────────────────────────────┘`}
            </pre>
          </div>

          <div>
            <pre className="font-mono text-[10px] text-[#cc0000] whitespace-pre opacity-90 hover:opacity-100 transition-opacity">
              {`■□■□■□■□■□■□■□■□■□■
━━━━━━━━━━━━━━━━━━━
░█░[╋━╋━╋━╋━╋━╋]░█░
░█░|  SUPREME  |░█░
░█░|  HOLIDAY  |░█░
░█░|  2024×××  |░█░
░█░[╋━╋━╋━╋━╋━╋]░█░
━━━━━━━━━━━━━━━━━━
■□■□■□■□■□■□■□■□■□■`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
