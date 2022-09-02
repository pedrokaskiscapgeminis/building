import * as THREE from 'three'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import Floor from './3d/Floor'
import Story from './3d/Story'
import { useSpring, a } from 'react-spring/three'

function Scene({ top }) {
  const stories = ['white', 'snow', 'ivory', 'linen']

  const camera = useRef()
  const { size, setDefaultCamera } = useThree()
  const [camZ, setCamZ] = useState(20)

  const scrollMax = size.height * 4.5
  const objectWidth = 50
  useEffect(() => void setDefaultCamera(camera.current), [])
  useEffect(() => void setCamZ(-objectWidth / (2 * Math.tan(55 / 2) * (size.width / size.height))), [size, objectWidth])

  return (
    <>
      <a.perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        fov={55}
        position-x={0}
        position-y={top.interpolate([0, scrollMax], [20, 0])}
        position-z={camZ}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      <ambientLight intensity={0.5} color="lightblue" />
      <directionalLight intensity={2} position={[-10, 2, 5]} penumbra={1} castShadow />
      {stories.map((c, i) => (
        <Story key={i} index={i} url={`./building_${i === stories.length - 1 ? 'top' : 'floor'}.glb`} />
      ))}
      <Floor />
    </>
  )
}

export default function App() {
  const [{ top }, set] = useSpring(() => ({ top: 0 }))
  const onScroll = useCallback(e => set({ top: e.target.scrollTop }), [])

  return (
    <div className="scroll-container" onScroll={onScroll}>
      <Canvas
        style={{ position: 'sticky', top: 0, background: 'lightblue' }}
        onCreated={({ gl }) => ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))}>
        <Scene top={top} />
      </Canvas>
      <div style={{ height: '400vh' }} />
    </div>
  )
}
