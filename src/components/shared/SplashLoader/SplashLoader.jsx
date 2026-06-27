"use client";
import { useEffect, useRef, useState } from "react";

export default function SplashLoader() {
  const canvasRef = useRef(null);
  const [visible, setVisible]   = useState(true);
  const [fadeOut, setFadeOut]   = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animId;
    const disposables = [];

    const init = async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      // ── Renderer ───────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      disposables.push(() => renderer.dispose());

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.z = 9;

      // ── Lights ────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const sun = new THREE.DirectionalLight(0x9fc8e8, 2.0);
      sun.position.set(6, 8, 6);
      scene.add(sun);
      const fill = new THREE.DirectionalLight(0x264787, 0.6);
      fill.position.set(-4, -3, -6);
      scene.add(fill);

      // ── Materials ─────────────────────────────────────────────
      const whiteMat  = new THREE.MeshPhongMaterial({ color: 0xf0f4ff, shininess: 120 });
      const blueMat   = new THREE.MeshPhongMaterial({ color: 0x3B85C1, shininess: 80 });
      const darkBlue  = new THREE.MeshPhongMaterial({ color: 0x264787, shininess: 60 });
      const redMat    = new THREE.MeshPhongMaterial({ color: 0xE44C4A, shininess: 80 });
      const glassMat  = new THREE.MeshPhongMaterial({ color: 0x9dd4f7, shininess: 200, transparent: true, opacity: 0.85 });
      disposables.push(
        () => [whiteMat, blueMat, darkBlue, redMat, glassMat].forEach(m => m.dispose())
      );

      // ── Build Airplane ─────────────────────────────────────────
      const plane = new THREE.Group();

      // Fuselage — tapered cylinder (wide in middle, narrow at tail)
      const fuselageGeo = new THREE.CylinderGeometry(0.11, 0.09, 1.8, 16);
      const fuselage = new THREE.Mesh(fuselageGeo, whiteMat);
      fuselage.rotation.z = Math.PI / 2;
      plane.add(fuselage);

      // Nose cone
      const noseGeo = new THREE.ConeGeometry(0.11, 0.55, 16);
      const noseMesh = new THREE.Mesh(noseGeo, whiteMat);
      noseMesh.rotation.z = -Math.PI / 2;
      noseMesh.position.x = 1.17;
      plane.add(noseMesh);

      // Tail fairing (rear taper)
      const tailGeo = new THREE.ConeGeometry(0.09, 0.28, 16);
      const tail = new THREE.Mesh(tailGeo, whiteMat);
      tail.rotation.z = Math.PI / 2;
      tail.position.x = -1.04;
      plane.add(tail);

      // Cockpit windows (glass bumps on nose)
      const cockpitGeo = new THREE.SphereGeometry(0.075, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
      const cockpit = new THREE.Mesh(cockpitGeo, glassMat);
      cockpit.rotation.z = -Math.PI / 2;
      cockpit.position.set(0.7, 0.09, 0);
      plane.add(cockpit);

      // ── Wings (swept, tapered) ──────────────────────────────
      const makeWing = (side) => {
        const s = side === "L" ? 1 : -1;
        const shape = new THREE.Shape();
        shape.moveTo(0.25,  0);      // root leading edge
        shape.lineTo(-0.15, 0);      // root trailing edge
        shape.lineTo(-0.55, s * 1.25); // tip trailing edge
        shape.lineTo(0.05,  s * 1.25); // tip leading edge
        shape.closePath();

        const extSettings = { depth: 0.028, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 };
        const geo = new THREE.ExtrudeGeometry(shape, extSettings);
        const mesh = new THREE.Mesh(geo, blueMat);
        // Rotate so the wing lies flat and sweeps in Z
        mesh.rotation.x = Math.PI / 2;
        mesh.rotation.y = side === "L" ? 0 : Math.PI;
        mesh.position.set(-0.1, -0.018, side === "L" ? 0.014 : -0.014);
        return mesh;
      };
      plane.add(makeWing("L"));
      plane.add(makeWing("R"));

      // ── Winglets ────────────────────────────────────────────
      const makeWinglet = (side) => {
        const s = side === "L" ? 1 : -1;
        const geo = new THREE.BoxGeometry(0.12, 0.18, 0.025);
        const mesh = new THREE.Mesh(geo, darkBlue);
        mesh.position.set(-0.35, 0.09, s * 1.25);
        mesh.rotation.z = s * 0.25;
        return mesh;
      };
      plane.add(makeWinglet("L"));
      plane.add(makeWinglet("R"));

      // ── Horizontal Stabilizer ───────────────────────────────
      const makeHStab = (side) => {
        const s = side === "L" ? 1 : -1;
        const shape = new THREE.Shape();
        shape.moveTo(0.12,  0);
        shape.lineTo(-0.05, 0);
        shape.lineTo(-0.2,  s * 0.5);
        shape.lineTo(0.05,  s * 0.5);
        shape.closePath();
        const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.02, bevelEnabled: false });
        const mesh = new THREE.Mesh(geo, blueMat);
        mesh.rotation.x = Math.PI / 2;
        mesh.rotation.y = side === "L" ? 0 : Math.PI;
        mesh.position.set(-0.82, 0.02, side === "L" ? 0.01 : -0.01);
        return mesh;
      };
      plane.add(makeHStab("L"));
      plane.add(makeHStab("R"));

      // ── Vertical Tail Fin ───────────────────────────────────
      const finShape = new THREE.Shape();
      finShape.moveTo(0.18,  0);
      finShape.lineTo(-0.08, 0);
      finShape.lineTo(-0.35, 0.42);
      finShape.lineTo(0.06,  0.42);
      finShape.closePath();
      const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.022, bevelEnabled: false });
      const fin    = new THREE.Mesh(finGeo, blueMat);
      fin.rotation.y = Math.PI / 2;
      fin.position.set(-0.72, 0.1, 0.011);
      plane.add(fin);

      // ── Engines (nacelles under wings) ──────────────────────
      const makeEngine = (side) => {
        const s    = side === "L" ? 1 : -1;
        const group = new THREE.Group();

        // Nacelle body
        const nacGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.42, 12);
        const nacelle = new THREE.Mesh(nacGeo, darkBlue);
        nacelle.rotation.z = Math.PI / 2;
        group.add(nacelle);

        // Intake ring
        const intakeGeo = new THREE.TorusGeometry(0.075, 0.012, 8, 24);
        const intake    = new THREE.Mesh(intakeGeo, blueMat);
        intake.position.x = 0.21;
        group.add(intake);

        // Exhaust glow
        const glowGeo  = new THREE.CircleGeometry(0.055, 12);
        const glowMat  = new THREE.MeshBasicMaterial({ color: 0xff9944, transparent: true, opacity: 0.65 });
        const exhaust  = new THREE.Mesh(glowGeo, glowMat);
        exhaust.rotation.y = Math.PI / 2;
        exhaust.position.x = -0.215;
        group.add(exhaust);
        disposables.push(() => glowMat.dispose());

        group.position.set(0.05, -0.13, s * 0.72);
        return group;
      };
      plane.add(makeEngine("L"));
      plane.add(makeEngine("R"));

      // ── Stripe ──────────────────────────────────────────────
      const stripeGeo = new THREE.CylinderGeometry(0.112, 0.112, 0.18, 16);
      const stripe    = new THREE.Mesh(stripeGeo, redMat);
      stripe.rotation.z = Math.PI / 2;
      stripe.position.x = 0.3;
      plane.add(stripe);

      const stripe2 = new THREE.Mesh(stripeGeo, blueMat);
      stripe2.rotation.z = Math.PI / 2;
      stripe2.position.x = 0.0;
      plane.add(stripe2);

      plane.scale.setScalar(0.72);
      scene.add(plane);

      // ── Stars / Background particles ───────────────────────
      const STAR_COUNT = 280;
      const starPos    = new Float32Array(STAR_COUNT * 3);
      const starColors = new Float32Array(STAR_COUNT * 3);
      const palette    = [
        new THREE.Color("#7fb8e8"), new THREE.Color("#3B85C1"),
        new THREE.Color("#ffffff"), new THREE.Color("#5ba3d9"),
      ];
      for (let i = 0; i < STAR_COUNT; i++) {
        starPos[i*3]   = (Math.random()-0.5) * 22;
        starPos[i*3+1] = (Math.random()-0.5) * 16;
        starPos[i*3+2] = (Math.random()-0.5) * 10 - 3;
        const c        = palette[Math.floor(Math.random() * palette.length)];
        starColors[i*3]=c.r; starColors[i*3+1]=c.g; starColors[i*3+2]=c.b;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      starGeo.setAttribute("color",    new THREE.BufferAttribute(starColors, 3));
      const starMat = new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.75 });
      scene.add(new THREE.Points(starGeo, starMat));
      disposables.push(() => { starGeo.dispose(); starMat.dispose(); });

      // ── Contrail ───────────────────────────────────────────
      const TRAIL = 80;
      const trailPos    = new Float32Array(TRAIL * 3);
      const trailColors = new Float32Array(TRAIL * 3);
      const trailGeo    = new THREE.BufferGeometry();
      trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
      trailGeo.setAttribute("color",    new THREE.BufferAttribute(trailColors, 3));
      trailGeo.setDrawRange(0, 0);

      const trailMat  = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.6 });
      const trailLine = new THREE.Line(trailGeo, trailMat);
      scene.add(trailLine);
      disposables.push(() => { trailGeo.dispose(); trailMat.dispose(); });

      const posHistory = [];

      // ── Flight path — lemniscate of Bernoulli ───────────────
      const getPos = (t) => {
        const a    = 2.8;
        const denom = 1 + Math.sin(t) ** 2;
        return new THREE.Vector3(
          a * Math.cos(t) / denom,
          a * Math.sin(t) * Math.cos(t) / denom * 0.55,
          0
        );
      };

      // ── Resize ────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      };
      window.addEventListener("resize", onResize);
      disposables.push(() => window.removeEventListener("resize", onResize));

      // ── Animation loop ────────────────────────────────────
      const clock = new THREE.Clock();
      const up    = new THREE.Vector3(0, 0, 1);
      const mat4  = new THREE.Matrix4();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t    = clock.getElapsedTime() * 0.42 + Math.PI * 0.5;
        const pos  = getPos(t);
        const posN = getPos(t + 0.04);

        plane.position.copy(pos);

        // Align nose to velocity
        const dir   = new THREE.Vector3().subVectors(posN, pos).normalize();
        const right = new THREE.Vector3().crossVectors(dir, up).normalize();
        const newUp = new THREE.Vector3().crossVectors(right, dir);
        mat4.makeBasis(dir, newUp, right);
        plane.quaternion.setFromRotationMatrix(mat4);

        // Banking roll based on lateral curve (second derivative)
        const posP  = getPos(t - 0.04);
        const accel = new THREE.Vector3().subVectors(posN, pos).sub(new THREE.Vector3().subVectors(pos, posP));
        const bank  = Math.atan2(-accel.y, Math.abs(accel.x) + 0.001) * 1.8;
        plane.rotateX(bank);

        // Contrail — trail from each engine offset
        const eng1World = new THREE.Vector3(-0.36, -0.094, 0.518).applyMatrix4(plane.matrixWorld);
        const eng2World = new THREE.Vector3(-0.36, -0.094,-0.518).applyMatrix4(plane.matrixWorld);
        posHistory.unshift(
          { x: eng1World.x, y: eng1World.y, z: eng1World.z },
          { x: eng2World.x, y: eng2World.y, z: eng2World.z },
        );
        if (posHistory.length > TRAIL) posHistory.length = TRAIL;

        for (let i = 0; i < TRAIL; i++) {
          const p    = posHistory[i] ?? { x: eng1World.x, y: eng1World.y, z: eng1World.z };
          const fade = 1 - i / TRAIL;
          trailPos[i*3]=p.x; trailPos[i*3+1]=p.y; trailPos[i*3+2]=p.z;
          trailColors[i*3]=fade; trailColors[i*3+1]=fade; trailColors[i*3+2]=fade;
        }
        trailGeo.attributes.position.needsUpdate = true;
        trailGeo.attributes.color.needsUpdate    = true;
        trailGeo.setDrawRange(0, posHistory.length);

        // Slow star drift
        starPos[0] += 0; // (stars fixed — plane does all the moving)

        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    // ── Progress simulation ───────────────────────────────────
    let p = 0;
    const prog = setInterval(() => {
      p += Math.random() * 16;
      if (p > 92) p = 92;
      setProgress(Math.round(p));
    }, 200);

    const hide = () => {
      clearInterval(prog);
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 750);
      }, 380);
    };

    if (document.readyState === "complete") {
      setTimeout(hide, 700);
    } else {
      window.addEventListener("load", hide, { once: true });
      setTimeout(hide, 5000);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      disposables.forEach(fn => fn());
      clearInterval(prog);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #07101f 0%, #16294F 50%, #0d1f3c 100%)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.75s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Three.js canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Soft radial glow */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,133,193,0.14) 0%, transparent 70%)",
        filter: "blur(48px)", pointerEvents: "none",
      }} />

      {/* Center UI */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 20, userSelect: "none",
      }}>
        {/* Logo */}
        <div style={{
          filter: "drop-shadow(0 0 30px rgba(59,133,193,0.65)) drop-shadow(0 0 10px rgba(38,71,135,0.5))",
          animation: "logoPulse 2.8s ease-in-out infinite",
        }}>
          <img src="/images/logo hover.svg" alt="Uno Travel" style={{ width: 210, height: "auto" }} />
        </div>

        {/* Tagline */}
        <p style={{
          color: "rgba(255,255,255,0.38)", fontSize: 11,
          letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500, marginTop: 4,
        }}>
          Your Journey Begins Here
        </p>

        {/* Progress track */}
        <div style={{
          width: 210, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(90deg, #264787, #3B85C1, #7fc8f0)",
            borderRadius: 2, transition: "width 0.3s ease",
            boxShadow: "0 0 12px rgba(59,133,193,0.9)",
          }} />
        </div>

        {/* Bouncing dots */}
        <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: i === 1 ? "#E44C4A" : "#3B85C1",
              animation: `dot 1.4s ease-in-out ${i * 0.22}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes logoPulse {
          0%,100% { transform: scale(1);   }
          50%      { transform: scale(1.04); }
        }
        @keyframes dot {
          0%,60%,100% { transform: translateY(0);    opacity: .28; }
          30%          { transform: translateY(-11px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
