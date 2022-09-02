import * as THREE from 'three'
import React from 'react'

export default function Floor() {
  return (
    <mesh position={[0, 0, 0]} rotation={[THREE.Math.degToRad(-90), 0, 0]} scale={[1000, 1000, 1]} receiveShadow>
      <planeGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="ivory" />
    </mesh>
  )
}
