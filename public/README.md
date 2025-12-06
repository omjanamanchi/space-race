# 3D Model Assets

Place your Unity Asset Store starship model files here.

## Instructions:

1. **Export from Unity**: Export your Unity Asset Store starship Prefab as a GLB or GLTF file
   - In Unity, select your Prefab and export it as FBX (File → Export Package, or use FBX Exporter package)
   - Convert FBX to GLB/GLTF using online converters like:
     - https://products.aspose.app/3d/conversion/fbx-to-gltf
     - https://www.gltf.report/ (for validation)
   - Or use Blender: Import FBX → Export as GLB

2. **Place the file**: Put your `.glb` or `.gltf` file in this `public` folder
   - Default expected filename: `starship.glb`
   - If using a different name, update `UNITY_MODEL_PATH` in `src/pages/StarshipHangarPage.tsx`

3. **The Unity model is now the PRIMARY/default model!**
   - The code will automatically try to load your Unity model first
   - If the model file doesn't exist or fails to load, it will automatically fall back to the procedural model
   - No configuration needed - just add the file and it will work!

4. **Optional - Adjust scale/position**: If needed, adjust the `scale`, `position`, or `rotation` values in the `UnityStarship` component in `StarshipHangarPage.tsx` to fit your model properly in the scene.

5. **Optional - Enable preload**: Once your model is working, uncomment the preload line in `StarshipHangarPage.tsx` for better performance:
   ```typescript
   useGLTF.preload(UNITY_MODEL_PATH);
   ```

## Recommended Model Format:
- **GLB** (binary GLTF) - preferred for web (smaller file size, single file)
- **GLTF** (text-based) - also supported

## File Size Tips:
- Compress textures if the model is too large
- Use tools like gltf-pipeline to optimize: `npx gltf-pipeline -i model.glb -o model-optimized.glb`

