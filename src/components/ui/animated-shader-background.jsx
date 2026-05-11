import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Infinity, Rocket, Shield, Brain, Play, ChevronDown } from 'lucide-react';

const AnoAI = () => {
  const containerRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const isDark = document.documentElement.classList.contains('dark');

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iDarkMode: { value: isDark ? 1.0 : 0.0 }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        uniform float iDarkMode;

        #define NUM_OCTAVES 3

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);

          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2 shift = vec2(100);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec2 v;
          vec4 o = vec4(0.0);

          // Star layer
          vec2 st = gl_FragCoord.xy / iResolution.y * 2.0;
          float stars = 0.0;
          for (float i = 0.0; i < 3.0; i++) {
            vec2 q = st * (1.0 + i) + vec2(iTime * 0.05, iTime * 0.02);
            float n = rand(floor(q));
            if (n > 0.995) {
              float twinkle = sin(iTime * 2.0 + n * 100.0) * 0.5 + 0.5;
              stars += twinkle * (1.0 - length(fract(q) - 0.5) * 5.0);
            }
          }
          o += vec4(stars) * 0.5 * (1.0 - iDarkMode * 0.5); // More stars in dark mode

          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

          for (float i = 0.0; i < 35.0; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));
            
            // Adjust colors based on theme
            vec4 auroraColors;
            if (iDarkMode > 0.5) {
              // Dark mode: Deep blues and purples
              auroraColors = vec4(
                0.05 + 0.1 * sin(i * 0.2 + iTime * 0.4),
                0.1 + 0.2 * cos(i * 0.3 + iTime * 0.5),
                0.4 + 0.3 * sin(i * 0.4 + iTime * 0.3),
                1.0
              );
            } else {
              // Light mode: Lighter, softer colors
              auroraColors = vec4(
                0.3 + 0.2 * sin(i * 0.2 + iTime * 0.4),
                0.4 + 0.3 * cos(i * 0.3 + iTime * 0.5),
                0.7 + 0.2 * sin(i * 0.4 + iTime * 0.3),
                1.0
              );
            }
            
            vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
            float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
            o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          
          // Final brightness adjustment
          float brightness = mix(1.0, 0.7, iDarkMode);
          gl_FragColor = o * brightness;
        }
      `
    });

    materialRef.current = material;
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId;
    const animate = () => {
      material.uniforms.iTime.value += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Theme observer
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains('dark');
      if (materialRef.current) {
        materialRef.current.uniforms.iDarkMode.value = isDarkNow ? 1.0 : 0.0;
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-700 bg-white dark:bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 opacity-40 dark:opacity-100" />
    </div>
  );
};

export default AnoAI;
