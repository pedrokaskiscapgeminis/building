import * as THREE from 'three'
import React, { useState, useMemo, useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useSpring, a } from 'react-spring/three'

export default function Story({ index, url }) {
  const [gltf, setGltf] = useState()
  const [toggle, setToggle] = useState(false)

  useMemo(
    () =>
      new GLTFLoader().load(url, file => {
        file.scene.traverse(node => node instanceof THREE.Mesh && (node.castShadow = true))
        setGltf(file)
      }),
    [url]
  )

  useEffect(() => {
    let timeOut
    if (gltf !== undefined) timeOut = setTimeout(() => setToggle(toggle => (toggle = true)), 100 * index)
    return () => clearTimeout(timeOut)
  }, [index, gltf])

  const { pos } = useSpring({ pos: toggle ? [0, index * 6, 0] : [0, 30 * (index + 1), 0] })
  return gltf ? <a.primitive object={gltf.scene} position={pos} onPointerOver={e => console.log('hover')} /> : null
}
