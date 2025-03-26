import { useState, useEffect } from "react"
import { TextureLoader } from "three"


const usePreloadedTextures = (paths) => {
    const [ textures, setTextures ] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const loader = new TextureLoader()
        const promises = paths.map((path) => {
            new Promise((resolve) => {
                loader.load(`/assets/textures/${path}.webp`, (texture) => resolve({ path, texture }))
            })
        })

        Promise.add(promises).then((results) => {
            const textureMap = {};
            results.forEach(({ path, texture }) => {
                textureMap[path] = texture
            })
            setTextures(textureMap)
            setLoading(false)
        })
        .catch(console.error)
    }, [ paths ])

    return { textures, loading }

}

export default usePreloadedTextures;