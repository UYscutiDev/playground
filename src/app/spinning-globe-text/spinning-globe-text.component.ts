import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-spinning-globe-text',
  templateUrl: './spinning-globe-text.component.html',
  styleUrls: ['./spinning-globe-text.component.css'],
})
export class SpinningGlobeTextComponent implements OnInit {
  @ViewChild('globeContainer', { static: true }) globeContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private globeMesh!: THREE.Mesh;

  ngOnInit(): void {
    this.initScene();
    this.createGlobe();
    this.animate();
  }

  ngOnDestroy(): void {
    // Clean up the scene and memory to avoid potential memory leaks
    this.scene.remove(this.globeMesh);
    this.scene.remove();
    this.renderer.dispose();
  }

  private initScene(): void {
    const width = this.globeContainer.nativeElement.offsetWidth;
    const height = this.globeContainer.nativeElement.offsetHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 9;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);

    this.globeContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  private createGlobe(): void {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/assets/earth-map.jpg');

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    this.globeMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.globeMesh);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.globeMesh.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
  }
}

