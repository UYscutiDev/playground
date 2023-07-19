import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';


@Component({
  selector: 'app-spinning-globe',
  template: '<div #globeContainer></div>',
  styleUrls: ['./spinning-globe.component.css'],
})
export class SpinningGlobeComponent implements OnInit {
  @ViewChild('globeContainer', { static: true }) globeContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private globe!: THREE.Mesh;
  private clock!: THREE.Clock;

  ngOnInit(): void {
    this.initThree();
    this.createGlobe();
    this.animate();
  }

  private initThree() {
    const width = this.globeContainer.nativeElement.offsetWidth;
    const height = this.globeContainer.nativeElement.offsetHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    this.globeContainer.nativeElement.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock();
  }

  private createGlobe() {
    const geometry = new THREE.SphereGeometry(2, 32, 32);

    const vertexShader = `
      varying vec2 vUV;

      void main() {
        vUV = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec2 vUV;
      uniform float time;

      void main() {
        vec2 p = -1.0 + 2.0 * vUV;
        float a = atan(p.y, p.x);
        float d = length(p);
        vec3 col = vec3(0.0);

        // You can replace this with your custom logic to generate binary (0 and 1) data
        // For this example, I'll use a sine wave as an example
        float binaryData = (sin(d * 50.0 - time) + 1.0) * 0.5;

        col = vec3(binaryData);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0.0 },
      },
    });

    this.globe = new THREE.Mesh(geometry, material);
    this.scene.add(this.globe);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    this.globe.rotation.y += 0.005;
    // this.globe.material.uniforms.time.value += this.clock.getDelta();

    this.renderer.render(this.scene, this.camera);
  }
}
