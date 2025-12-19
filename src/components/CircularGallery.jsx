import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from "ogl";
import { useEffect, useRef } from "react";

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(gl, text, font = "bold 30px sans-serif", color = "white") {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  ctx.font = font;
  const metrics = ctx.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.3);

  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

// ---------------- TITLE BELOW IMAGE ----------------
class Title {
  constructor({ gl, plane, text, textColor, font }) {
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    autoBind(this);
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    );

    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision mediump float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if(color.a < 0.2) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    this.mesh = new Mesh(this.gl, { geometry, program });

    const aspect = width / height;
    const h = this.plane.scale.y * 0.15;
    const w = h * aspect;

    this.mesh.scale.set(w, h, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.55;
    this.mesh.setParent(this.plane);
  }
}

// ---------------- IMAGE CARD CLASS ----------------
class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius,
    font,
  }) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.screen = screen;

    this.extra = 0;

    autoBind(this);
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = sin(p.x * 4.0 + uTime) * 0.15;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBox(vec2 p, float r){
          return smoothstep(r, r+0.005, length(max(abs(p)-r, 0.0)));
        }

        void main() {
          vec2 uv = vUv;
          vec4 color = texture2D(tMap, uv);

          float mask = roundedBox(vUv - 0.5, 0.48 - uBorderRadius);
          if(mask > 0.98) discard;

          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uTime: { value: 0 },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });

    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const max = this.viewport.width * 0.5;

    if (this.bend !== 0) {
      // Circular bending
      this.plane.position.y = Math.sin((this.plane.position.x / max) * Math.PI) * -this.bend;
      this.plane.rotation.z = (this.plane.position.x / max) * -0.4;
    }

    this.program.uniforms.uTime.value += 0.03;

    const totalWidth = this.plane.scale.x + 2;
    if (direction === "right" && this.plane.position.x < -max - totalWidth)
      this.extra -= totalWidth * this.length;
    else if (direction === "left" && this.plane.position.x > max + totalWidth)
      this.extra += totalWidth * this.length;
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    const base = this.viewport.width * 0.22;
    this.plane.scale.set(base, base * 0.65, 1);
    this.width = this.plane.scale.x + 1.8;
    this.x = this.width * this.index;
  }
}

// ---------------- MAIN APP ----------------
class App {
  constructor(container, opts) {
    autoBind(this);

    this.container = container;
    this.settings = opts;

    this.scroll = { current: 0, target: 0, last: 0, ease: opts.scrollEase };

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedia();
    this.addEvents();
    this.update();
  }

  createRenderer() {
    this.renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      antialias: true,
    });
    this.gl = this.renderer.gl;
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      widthSegments: 50,
      heightSegments: 20,
    });
  }

  createMedia() {
    const items = this.settings.items || [
      { image: "https://picsum.photos/id/33/800", text: "Sample 01" },
      { image: "https://picsum.photos/id/25/800", text: "Sample 02" },
      { image: "https://picsum.photos/id/41/800", text: "Sample 03" },
      { image: "https://picsum.photos/id/52/800", text: "Sample 04" },
    ];

    this.galleryItems = items.concat(items);

    this.medias = this.galleryItems.map((data, i) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index: i,
        length: this.galleryItems.length,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend: this.settings.bend || 3,
        textColor: this.settings.textColor,
        borderRadius: this.settings.borderRadius,
        font: this.settings.font,
      });
    });
  }

  addEvents() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("wheel", this.onWheel);
    window.addEventListener("mousedown", this.onTouchDown);
    window.addEventListener("mousemove", this.onTouchMove);
    window.addEventListener("mouseup", this.onTouchUp);
    window.addEventListener("touchstart", this.onTouchDown);
    window.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchUp);
  }

  onWheel(e) {
    this.scroll.target += (e.deltaY > 0 ? 1 : -1) * this.settings.scrollSpeed;
  }

  onTouchDown(e) {
    this.isDown = true;
    this.startX = e.touches ? e.touches[0].clientX : e.clientX;
    this.scroll.start = this.scroll.current;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const move = (this.startX - x) * 0.03;
    this.scroll.target = this.scroll.start + move;
  }

  onTouchUp() {
    this.isDown = false;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);

    const aspect = this.screen.width / this.screen.height;
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;

    this.viewport = {
      width: height * aspect,
      height,
    };

    if (this.medias) {
      this.medias.forEach((m) =>
        m.onResize({ screen: this.screen, viewport: this.viewport })
      );
    }
  }

  update() {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    const dir = this.scroll.current > this.scroll.last ? "right" : "left";

    if (this.medias) {
      this.medias.forEach((m) => m.update(this.scroll, dir));
    }

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });

    this.scroll.last = this.scroll.current;

    this.raf = requestAnimationFrame(this.update);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.renderer.gl.canvas.remove();
  }
}

export default function CircularGallery(props) {
  const ref = useRef(null);

  useEffect(() => {
    const instance = new App(ref.current, props);
    return () => instance.destroy();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "60vh", // You can change this height
        position: "relative",
        overflow: "hidden",
      }}
    />
  );
}
