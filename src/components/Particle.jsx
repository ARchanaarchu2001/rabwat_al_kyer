import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

const COLORS = ["#A3801E", "#cfa54a", "#ffffff"];

const vertex = `
attribute vec3 position;
attribute vec3 color;
uniform float uTime;

varying vec3 vColor;

void main() {
  vColor = color;

  vec3 pos = position;

  pos.x += sin(uTime + position.y * 4.0) * 0.15;
  pos.y += cos(uTime + position.x * 4.0) * 0.15;

  gl_PointSize = 5.5;

  gl_Position = vec4(pos, 1.0);
}
`;

const fragment = `
precision mediump float;
varying vec3 vColor;

void main() {
  float dist = distance(gl_PointCoord, vec2(0.5));
  float alpha = smoothstep(0.5, 0.2, dist);
  gl_FragColor = vec4(vColor, alpha);
}
`;

export default function Particles() {
  const ref = useRef();

  useEffect(() => {
    const container = ref.current;
    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;

    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl);
    camera.position.z = 3;

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    // Create Particles
    const count = 260;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.replace("#",""), 16);
      return [
        ((bigint >> 16) & 255) / 255,
        ((bigint >> 8) & 255) / 255,
        (bigint & 255) / 255
      ];
    };

    for (let i = 0; i < count; i++) {
      positions.set(
        [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 0],
        i * 3
      );

      const color =
        COLORS[Math.floor(Math.random() * COLORS.length)];

      colors.set(hexToRgb(color), i * 3);
    }


    

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      color: { size: 3, data: colors }
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 }
      },
      transparent: true
    });

    const mesh = new Mesh(gl, { geometry, program });

    let time = 0;

    const loop = () => {
      time += 0.02;
      program.uniforms.uTime.value = time;
      renderer.render({ scene: mesh, camera });
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      container.innerHTML = "";
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
