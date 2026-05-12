"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const ThreeHero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const cloudsRef = useRef(null);
  const mainBuildingRef = useRef(null);
  const buildingsRef = useRef([]);
  const fxaaPassRef = useRef(null);
  const glowWindowMatRef = useRef(null);
  const rafIdRef = useRef(null);

  // DOM refs for direct style updates (avoids React re-renders)
  const heroContentRef = useRef(null);
  const scrollHintRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);
  const vignetteRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const videoPortalRef = useRef(null);
  const videoPortalInnerRef = useRef(null);

  const totalScrollHeight = 5000;

  useEffect(() => {
    // Initial entrance animation
    gsap.from(heroContentRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
      ease: "power4.out"
    });

    gsap.from([bottomLeftRef.current, bottomRightRef.current], {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 1.2,
      stagger: 0.2,
      ease: "power3.out"
    });

    if (!canvasRef.current) return;

    // ============ SETUP ============
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0xd8e8f0, 0.0012);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    cameraRef.current = camera;
    camera.position.set(0, 60, 300);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xd8e8f0, 1); // Match fog color to prevent white flash
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // ============ POST PROCESSING ============
    const composer = new EffectComposer(renderer);
    composerRef.current = composer;
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3, 0.8, 0.7
    );
    composer.addPass(bloomPass);

    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPassRef.current = fxaaPass;
    fxaaPass.material.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(fxaaPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // ============ SKY ============
    const skyGeo = new THREE.SphereGeometry(900, 64, 64);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color(0x87CEEB) },
        midColor: { value: new THREE.Color(0xc8dff0) },
        bottomColor: { value: new THREE.Color(0xe8eff5) },
        sunColor: { value: new THREE.Color(0xfff8e7) },
        sunDir: { value: new THREE.Vector3(0.3, 0.6, -0.5).normalize() }
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 topColor, midColor, bottomColor, sunColor;
        uniform vec3 sunDir;
        varying vec3 vWorldPos;
        void main() {
          vec3 dir = normalize(vWorldPos);
          float y = dir.y;
          vec3 col = mix(bottomColor, midColor, smoothstep(-0.1, 0.15, y));
          col = mix(col, topColor, smoothstep(0.15, 0.7, y));
          float sunDot = max(dot(dir, sunDir), 0.0);
          col += sunColor * pow(sunDot, 64.0) * 0.8;
          col += sunColor * pow(sunDot, 8.0) * 0.15;
          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // ============ MATERIALS ============
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0xe8edf2,
      roughness: 0.25,
      metalness: 0.6,
      envMapIntensity: 1.0
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xc8dce8,
      roughness: 0.05,
      metalness: 0.3,
      transmission: 0.4,
      transparent: true,
      opacity: 0.7,
      reflectivity: 0.9,
      ior: 1.5,
      thickness: 0.5
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x3aabd4,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x1a5570,
      emissiveIntensity: 0.15
    });

    const glowWindowMat = new THREE.MeshStandardMaterial({
      color: 0x40e0d0,
      emissive: 0x00cccc,
      emissiveIntensity: 0.0,
      roughness: 0.1,
      metalness: 0.5,
      transparent: true,
      opacity: 0.85
    });
    glowWindowMatRef.current = glowWindowMat;

    // ============ BUILDING GENERATORS ============
    function createTowerA(height, width, depth) {
      const group = new THREE.Group();
      const bodyGeo = new THREE.BoxGeometry(width, height, depth);
      const body = new THREE.Mesh(bodyGeo, buildingMat);
      body.position.y = height / 2;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);
      const stripCount = Math.floor(height / 12);
      for (let i = 0; i < stripCount; i++) {
        const stripGeo = new THREE.BoxGeometry(width + 0.3, 1.5, depth + 0.3);
        const strip = new THREE.Mesh(stripGeo, glassMat);
        strip.position.y = 8 + i * 12;
        group.add(strip);
      }
      const crownGeo = new THREE.BoxGeometry(width * 0.6, 8, depth * 0.6);
      const crown = new THREE.Mesh(crownGeo, accentMat);
      crown.position.y = height + 4;
      group.add(crown);
      const spireGeo = new THREE.CylinderGeometry(0.3, 1.5, 20, 8);
      const spire = new THREE.Mesh(spireGeo, accentMat);
      spire.position.y = height + 18;
      group.add(spire);
      return group;
    }

    function createTowerB(height, radius) {
      const group = new THREE.Group();
      const bodyGeo = new THREE.CylinderGeometry(radius * 0.85, radius, height, 24);
      const body = new THREE.Mesh(bodyGeo, buildingMat);
      body.position.y = height / 2;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);
      for (let i = 0; i < Math.floor(height / 20); i++) {
        const ringGeo = new THREE.TorusGeometry(radius + 0.5, 0.4, 8, 24);
        const ring = new THREE.Mesh(ringGeo, glassMat);
        ring.position.y = 15 + i * 20;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }
      const domeGeo = new THREE.SphereGeometry(radius * 0.85, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const dome = new THREE.Mesh(domeGeo, glassMat);
      dome.position.y = height;
      group.add(dome);
      return group;
    }

    function createTowerC(height, width) {
      const group = new THREE.Group();
      const segH = height / 8;
      for (let i = 0; i < 8; i++) {
        const segGeo = new THREE.BoxGeometry(width, segH, width);
        const seg = new THREE.Mesh(segGeo, i % 2 === 0 ? buildingMat : glassMat);
        seg.position.y = segH / 2 + i * segH;
        seg.rotation.y = i * 0.06;
        seg.castShadow = true;
        seg.receiveShadow = true;
        group.add(seg);
      }
      const topGeo = new THREE.OctahedronGeometry(width * 0.4, 0);
      const top = new THREE.Mesh(topGeo, accentMat);
      top.position.y = height + width * 0.4;
      group.add(top);
      return group;
    }

    function createSkyscraperD(height, width, depth) {
      const group = new THREE.Group();
      const bodyGeo = new THREE.BoxGeometry(width, height, depth);
      const body = new THREE.Mesh(bodyGeo, glassMat);
      body.position.y = height / 2;
      body.castShadow = true;
      group.add(body);
      const edgeMat = new THREE.MeshStandardMaterial({ color: 0xf0f4f8, roughness: 0.3, metalness: 0.7 });
      const frameGeo = new THREE.BoxGeometry(width + 1, height + 1, 1);
      const frameFront = new THREE.Mesh(frameGeo, edgeMat);
      frameFront.position.set(0, height / 2, depth / 2);
      group.add(frameFront);
      const frameBack = frameFront.clone();
      frameBack.position.z = -depth / 2;
      group.add(frameBack);
      return group;
    }

    // ============ CLOUDS ============
    const cloudGroup = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 1,
      metalness: 0,
      depthWrite: false
    });
    for (let i = 0; i < 60; i++) {
      const group = new THREE.Group();
      const numPuffs = 3 + Math.floor(Math.random() * 5);
      for (let j = 0; j < numPuffs; j++) {
        const s = 15 + Math.random() * 30;
        const geo = new THREE.SphereGeometry(s, 8, 6);
        const puff = new THREE.Mesh(geo, cloudMat);
        puff.position.set((Math.random() - 0.5) * s * 2, (Math.random() - 0.5) * s * 0.3, (Math.random() - 0.5) * s * 1.5);
        puff.scale.y = 0.4;
        group.add(puff);
      }
      group.position.set((Math.random() - 0.5) * 1400, 120 + Math.random() * 200, (Math.random() - 0.5) * 1400);
      cloudGroup.add(group);
    }
    scene.add(cloudGroup);
    cloudsRef.current = cloudGroup;

    // ============ LIGHTS ============
    const ambientLight = new THREE.AmbientLight(0xd0e4f0, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e0, 2.0);
    sunLight.position.set(150, 300, -200);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.left = -300;
    sunLight.shadow.camera.right = 300;
    sunLight.shadow.camera.top = 300;
    sunLight.shadow.camera.bottom = -50;
    sunLight.shadow.camera.far = 800;
    sunLight.shadow.bias = -0.001;
    sunLight.shadow.normalBias = 0.02;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xadd8e6, 0.4);
    fillLight.position.set(-100, 100, 100);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0xe0e8ef, 0.3);
    scene.add(hemiLight);

    // ============ MAIN FOCUS BUILDING ============
    const mainBuilding = new THREE.Group();
    const mbHeight = 220;
    const mbWidth = 30;
    const mbDepth = 30;

    const baseGeo = new THREE.BoxGeometry(mbWidth + 10, 15, mbDepth + 10);
    const base = new THREE.Mesh(baseGeo, buildingMat);
    base.position.y = 7.5;
    base.castShadow = true;
    base.receiveShadow = true;
    mainBuilding.add(base);

    const bodyGeo = new THREE.BoxGeometry(mbWidth, mbHeight, mbDepth);
    const body = new THREE.Mesh(bodyGeo, buildingMat);
    body.position.y = 15 + mbHeight / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    mainBuilding.add(body);

    const glassGeo = new THREE.BoxGeometry(mbWidth - 4, mbHeight - 20, 0.5);
    const glassFacade = new THREE.Mesh(glassGeo, glassMat);
    glassFacade.position.set(0, 25 + (mbHeight - 20) / 2, mbDepth / 2 + 0.3);
    mainBuilding.add(glassFacade);

    const winW = 22;
    const winH = 14;
    const windowGeo = new THREE.BoxGeometry(winW, winH, 0.6);
    const glowWindow = new THREE.Mesh(windowGeo, glowWindowMat);
    glowWindow.position.set(0, 140, mbDepth / 2 + 0.6);
    glowWindow.name = 'glowWindow';
    mainBuilding.add(glowWindow);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0xd0d8e0, roughness: 0.2, metalness: 0.8 });
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(winW + 2, 0.5, 1), frameMat);
    frameTop.position.set(0, 140 + winH / 2 + 0.25, mbDepth / 2 + 0.6);
    mainBuilding.add(frameTop);
    const frameBot = frameTop.clone();
    frameBot.position.y = 140 - winH / 2 - 0.25;
    mainBuilding.add(frameBot);
    const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.5, winH + 1, 1), frameMat);
    frameL.position.set(-winW / 2 - 0.25, 140, mbDepth / 2 + 0.6);
    mainBuilding.add(frameL);
    const frameR = frameL.clone();
    frameR.position.x = winW / 2 + 0.25;
    mainBuilding.add(frameR);

    for (let i = 0; i < 10; i++) {
      const lineGeo = new THREE.BoxGeometry(mbWidth + 2, 0.3, mbDepth + 2);
      const line = new THREE.Mesh(lineGeo, accentMat);
      line.position.y = 30 + i * 22;
      mainBuilding.add(line);
    }
    const crownGeo = new THREE.BoxGeometry(mbWidth * 0.5, 15, mbDepth * 0.5);
    const crown = new THREE.Mesh(crownGeo, glassMat);
    crown.position.y = 15 + mbHeight + 7.5;
    mainBuilding.add(crown);
    const spireGeo = new THREE.CylinderGeometry(0.4, 2, 35, 8);
    const spire = new THREE.Mesh(spireGeo, accentMat);
    spire.position.y = 15 + mbHeight + 15 + 17.5;
    mainBuilding.add(spire);

    mainBuilding.position.set(0, 0, -50);
    scene.add(mainBuilding);
    mainBuildingRef.current = mainBuilding;

    // ============ CITY LAYOUT ============
    const buildings = [];
    function addB(tower, x, z, rotY = 0) {
      tower.position.set(x, 0, z);
      tower.rotation.y = rotY;
      scene.add(tower);
      buildings.push(tower);
    }

    addB(createTowerA(180, 20, 20), -70, -80);
    addB(createTowerB(160, 12), 65, -60);
    addB(createTowerC(140, 18), -50, 20);
    addB(createSkyscraperD(170, 22, 16), 80, 30);
    addB(createTowerA(120, 16, 16), -110, -40);
    addB(createTowerB(200, 14), 120, -90, 0.3);

    const midPositions = [
      [-160, -150], [150, -170], [-130, 80], [170, 100], [-200, -30],
      [200, -50], [-80, -180], [100, -200], [-180, 120], [220, 60],
      [40, -180], [-40, 140], [160, 160], [-220, -120], [250, -130],
      [-250, 60], [180, -20], [-160, 180], [60, 180], [-100, -250]
    ];
    midPositions.forEach((pos, i) => {
      const type = i % 4;
      let tower;
      const h = 80 + Math.random() * 140;
      if (type === 0) tower = createTowerA(h, 14 + Math.random() * 10, 14 + Math.random() * 10);
      else if (type === 1) tower = createTowerB(h, 8 + Math.random() * 6);
      else if (type === 2) tower = createTowerC(h, 12 + Math.random() * 8);
      else tower = createSkyscraperD(h, 16 + Math.random() * 8, 12 + Math.random() * 6);
      addB(tower, pos[0], pos[1], Math.random() * 0.5);
    });

    const distantGeo = new THREE.BoxGeometry(1, 1, 1);
    const distantMat = new THREE.MeshLambertMaterial({ color: 0xd0d8e0 });
    const iCount = 200;
    const distantMesh = new THREE.InstancedMesh(distantGeo, distantMat, iCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < iCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 300 + Math.random() * 500;
      const w = 8 + Math.random() * 18;
      const h = 40 + Math.random() * 180;
      const d = 8 + Math.random() * 18;
      dummy.position.set(Math.cos(angle) * dist, h / 2, Math.sin(angle) * dist);
      dummy.scale.set(w, h, d);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      distantMesh.setMatrixAt(i, dummy.matrix);
    }
    distantMesh.instanceMatrix.needsUpdate = true;
    distantMesh.receiveShadow = true;
    scene.add(distantMesh);

    const groundGeo = new THREE.PlaneGeometry(2000, 2000);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xc8d4de, roughness: 0.6, metalness: 0.2 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    buildingsRef.current = buildings;

    // ============ CAMERA PATH ============
    const cameraPath = [
      { pos: new THREE.Vector3(0, 80, 300), lookAt: new THREE.Vector3(0, 100, 0) },
      { pos: new THREE.Vector3(-50, 90, 180), lookAt: new THREE.Vector3(0, 120, -50) },
      { pos: new THREE.Vector3(-30, 95, 90), lookAt: new THREE.Vector3(0, 130, -50) },
      { pos: new THREE.Vector3(20, 110, 40), lookAt: new THREE.Vector3(0, 140, -50) },
      { pos: new THREE.Vector3(10, 128, 10), lookAt: new THREE.Vector3(0, 140, -40) },
      { pos: new THREE.Vector3(3, 140, -10), lookAt: new THREE.Vector3(0, 140, -34) },
      { pos: new THREE.Vector3(1, 140, -28), lookAt: new THREE.Vector3(0, 140, -34) },
      { pos: new THREE.Vector3(0, 140, -33), lookAt: new THREE.Vector3(0, 140, -34) },
      { pos: new THREE.Vector3(0, 140, -36), lookAt: new THREE.Vector3(0, 140, -50) },
      { pos: new THREE.Vector3(0, 140, -60), lookAt: new THREE.Vector3(0, 140, -80) }
    ];

    function lerpVec3(a, b, t) {
      return new THREE.Vector3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
    }
    function smoothstep(t) { return t * t * (3 - 2 * t); }
    function getCameraState(progress) {
      const numSegments = cameraPath.length - 1;
      const rawIndex = progress * numSegments;
      const index = Math.min(Math.floor(rawIndex), numSegments - 1);
      const localT = smoothstep(rawIndex - index);
      const pos = lerpVec3(cameraPath[index].pos, cameraPath[index + 1].pos, localT);
      const look = lerpVec3(cameraPath[index].lookAt, cameraPath[index + 1].lookAt, localT);
      return { pos, look };
    }

    // ============ ANIMATION LOOP ============
    let time = 0;
    const animate = () => {
      rafIdRef.current = requestAnimationFrame(animate);
      time += 0.01;

      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.12;
      if (Math.abs(targetScroll.current - currentScroll.current) < 0.0005) {
        currentScroll.current = targetScroll.current;
      }

      const sp = currentScroll.current;

      const heroFade = Math.max(0, 1 - sp * 5);
      const scrollHintFade = Math.max(0, 1 - sp * 8);
      const uiFade = Math.max(0, 1 - sp * 3);
      const videoProgress = Math.max(0, Math.min(1, (sp - 0.72) / 0.16));
      const vignetteOpacity = Math.max(0, Math.min(0.85, (sp - 0.55) / 0.2));

      if (heroContentRef.current) heroContentRef.current.style.opacity = heroFade;
      if (scrollHintRef.current) scrollHintRef.current.style.opacity = scrollHintFade;
      if (bottomLeftRef.current) bottomLeftRef.current.style.opacity = uiFade;
      if (bottomRightRef.current) bottomRightRef.current.style.opacity = uiFade;
      if (vignetteRef.current) vignetteRef.current.style.opacity = vignetteOpacity;

      if (videoOverlayRef.current) {
        videoOverlayRef.current.style.opacity = videoProgress;
        videoOverlayRef.current.style.pointerEvents = videoProgress > 0.4 ? 'auto' : 'none';
      }
      if (videoPortalRef.current) videoPortalRef.current.style.opacity = videoProgress;
      if (videoPortalInnerRef.current) {
        const w = Math.min(100, 20 + videoProgress * 80);
        videoPortalInnerRef.current.style.width = w + '%';
        videoPortalInnerRef.current.style.borderColor = `rgba(58,171,212,${0.6 - videoProgress * 0.5})`;
        videoPortalInnerRef.current.style.borderRadius = (8 - videoProgress * 7) + 'px';
        videoPortalInnerRef.current.style.boxShadow = `0 0 ${60 + videoProgress * 80}px rgba(58,171,212,${0.2 + videoProgress * 0.15})`;
      }

      const camState = getCameraState(sp);
      camera.position.lerp(camState.pos, 0.18);
      const currentLookAt = new THREE.Vector3();
      camera.getWorldDirection(currentLookAt);
      currentLookAt.multiplyScalar(100).add(camera.position);
      currentLookAt.lerp(camState.look, 0.18);
      camera.lookAt(currentLookAt);

      if (cloudsRef.current) {
        cloudsRef.current.children.forEach((c, i) => {
          c.position.x += 0.02 * (i % 2 === 0 ? 1 : -1);
          if (c.position.x > 700) c.position.x = -700;
          if (c.position.x < -700) c.position.x = 700;
        });
      }

      if (glowWindowMatRef.current) {
        const glowProgress = Math.max(0, (sp - 0.35) / 0.3);
        const glowIntensity = Math.min(1, glowProgress) * (0.85 + 0.15 * Math.sin(time * 2));
        glowWindowMatRef.current.emissiveIntensity = glowIntensity * 2.5;
        glowWindowMatRef.current.opacity = 0.85 + glowIntensity * 0.15;
      }

      buildingsRef.current.forEach((b, i) => {
        b.rotation.y = Math.sin(time * 0.3 + i) * 0.001;
      });

      composer.render();
    };
    rafIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      fxaaPass.material.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = -rect.top / (totalScrollHeight - window.innerHeight);
      targetScroll.current = Math.max(0, Math.min(1, progress));
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      renderer.dispose();
      composer.dispose();
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="three-hero-section" style={{ height: totalScrollHeight, position: 'relative' }} id="hero">
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#d8e8f0' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 10, fontFamily: "var(--font-inter), sans-serif"
        }}>

          <div ref={heroContentRef} style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            textAlign: 'center', transition: 'opacity 0.8s ease', opacity: 1,
            width: '100%', maxWidth: '1000px'
          }}>
            <div style={{
              fontSize: '18px', letterSpacing: '6px', textTransform: 'uppercase',
              marginBottom: '16px', fontWeight: 700, fontFamily: "var(--font-montserrat), sans-serif",
              background: 'linear-gradient(135deg, #1a2a3a 0%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              GOHIGH
            </div>
            <h1 style={{
              fontFamily: "var(--font-montserrat), sans-serif", fontSize: 'clamp(32px, 6vw, 68px)',
              fontWeight: 600, color: '#1a2a3a', margin: 0, lineHeight: 1.1, textTransform: 'uppercase',
              letterSpacing: '-1px'
            }}>
              Elevating Brands Through<br />
              <span style={{
                background: 'linear-gradient(135deg, #00ffff, #3aabd4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Scalable Digital</span> Systems
            </h1>
            <p style={{
              marginTop: '16px', fontSize: '18px', fontWeight: 500, color: '#1a2a3a',
              fontFamily: "var(--font-montserrat), sans-serif", maxWidth: '750px', margin: '16px auto',
              lineHeight: '32px'
            }}>
              GoHigh helps businesses scale with AI automation, software development, DevOps, and intelligent digital solutions.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                className="hero-btn-primary"
                style={{
                  width: '210px', padding: '14px 0', borderRadius: '2px', background: '#1a2a3a', color: 'white',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer', pointerEvents: 'auto', transition: 'all 0.3s ease',
                  fontFamily: "var(--font-montserrat), sans-serif"
                }}>Talk to us</button>
              <button
                className="hero-btn-secondary"
                style={{
                  width: '210px', padding: '14px 0', borderRadius: '2px', background: 'white', color: '#1a2a3a',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer', pointerEvents: 'auto', transition: 'all 0.3s ease',
                  fontFamily: "var(--font-montserrat), sans-serif"
                }}>Explore Services</button>
            </div>
          </div>



          <div ref={bottomLeftRef} style={{
            position: 'absolute', bottom: '24px', left: '40px', fontSize: '11px', color: '#3a5a6a80',
            transition: 'opacity 0.5s ease', opacity: 1, zIndex: 20
          }}>
            <div style={{
              width: '36px', height: '36px', border: '1px solid #3a5a6a30', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px',
              fontSize: '10px', cursor: 'pointer', pointerEvents: 'auto'
            }}>↗</div>
            Read about our visions
          </div>
          <div ref={bottomRightRef} style={{
            position: 'absolute', bottom: '24px', right: '40px', fontSize: '11px', color: '#3a5a6a60',
            transition: 'opacity 0.5s ease', opacity: 1, zIndex: 20
          }}>©2026</div>

          <div ref={vignetteRef} style={{
            position: 'absolute', inset: 0, zIndex: 12, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 30%, #000 100%)',
            opacity: 0, transition: 'opacity 0.2s ease'
          }} />
        </div>

        <div ref={videoOverlayRef} style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: '#040d18',
          opacity: 0,
          pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 16
        }}>
          <div ref={videoPortalRef} style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0
          }}>
            <div ref={videoPortalInnerRef} style={{
              width: '20%',
              maxWidth: '1200px',
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #040d18 0%, #0d2535 40%, #0a1e30 100%)',
              border: '1px solid rgba(58,171,212,0.6)',
              borderRadius: '8px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 60px rgba(58,171,212,0.2)',
              transition: 'width 0.1s ease'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(58,171,212,0.03) 3px, rgba(58,171,212,0.03) 4px)',
                pointerEvents: 'none'
              }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(58,171,212,0.12) 0%, transparent 65%)' }} />

              {[['0', '0', 'right', 'bottom'], ['0', 'auto', 'right', 'top'], ['auto', '0', 'left', 'bottom'], ['auto', 'auto', 'left', 'top']].map(([t, b, bR, bL], i) => (
                <div key={i} style={{
                  position: 'absolute', top: t === '0' ? '12px' : 'auto', bottom: b === '0' ? '12px' : 'auto',
                  left: bL === 'left' ? '12px' : 'auto', right: bR === 'right' ? '12px' : 'auto',
                  width: '20px', height: '20px',
                  borderTop: (t === '0') ? '1px solid #3aabd460' : 'none',
                  borderBottom: (b === '0') ? '1px solid #3aabd460' : 'none',
                  borderLeft: (bL === 'left') ? '1px solid #3aabd460' : 'none',
                  borderRight: (bR === 'right') ? '1px solid #3aabd460' : 'none',
                }} />
              ))}

              <div style={{
                width: '72px', height: '72px',
                border: '2px solid rgba(58,171,212,0.7)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 1,
                background: 'rgba(58,171,212,0.08)',
                boxShadow: '0 0 30px rgba(58,171,212,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}>
                <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid #3aabd4', marginLeft: '5px' }} />
              </div>

              <div style={{ marginTop: '24px', zIndex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(58,171,212,0.9)', marginBottom: '8px' }}>Experience the Vision</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>GoHigh Engineering · 2026</div>
              </div>

              <div style={{
                position: 'absolute', left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(58,171,212,0.6), transparent)',
                animation: 'scanline 3s linear infinite',
                top: '0'
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeHero;
