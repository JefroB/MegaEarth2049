# Registration and size consistency

## Material-specific acceptance

Mechanical bosses require pixel-perfect registration and stable rigid dimensions across poses and phases. Organic bosses may use fluid body animation: breathing, squash/stretch, recoil and other deliberate deformation are allowed. Do not impose identical torso/head pixels or a rigid cutout workflow on organic motion. Judge recognizable anatomy, continuous motion, convincing volume and intentional ground contact instead. Mixed bosses apply the mechanical rules to rigid hardware and the organic rules to soft tissue. Existing accepted bosses stay unchanged.

## Production contract

Record before animating:

- Master image and component sources; immutable reference pose.
- Working canvas width/height and intended runtime size/scale.
- Camera and facing; lighting direction.
- Ground contact and reference origin in source pixels.
- Rigid component dimensions and local pivots; organic regions allowed to deform and the intended motion envelope.
- Motion names, frame order and durations; intentional moving vs stationary regions.
- Phase differences and shared components.

Fixed-size equal cells are preferable. Irregular atlases can also work with exact rectangles and a shared coordinate system; automatic content bounding boxes are not registration. Maintain adequate gutters for the most extended pose. Never clip a strike to preserve a smaller idle cell.

A useful manifest records `image`, `rect`, `anchor`, `durationMs`, `phase`, and `motion` per frame plus one common runtime `scale`. Layered rigs also record component source, pivot, translation and rotation. Those fields are a suggested structure, not an existing ME_Boss loader schema; adapt them explicitly to the renderer.

## Keep real invariants

For a stationary mechanical attack, reuse the chassis and legs while the arm/scanner move. Invariant regions should remain identical at identical coordinates in the source composite, except for deliberate effects or occlusion. Overlay corresponding frames and examine shared regions; a whole-image difference will naturally include the moving arm and cannot by itself detect bad scale.

When an arm rotates, its screen-space bounding box changes. Compare rigid part dimensions in its local coordinates or reuse the same component; do not "correct" a legitimate projection change by stretching it. Frame bounds and total opaque area are not reliable body-size measures.

For damaged mechanical art, retain the source pose and rigid geometry; change armor/interior regions deliberately. Organic phase changes can deform tissue intentionally while retaining character identity and a coherent transition. Validate every phase, not just one reference image; matching style alone does not establish continuity or registration.

## Measurement and visual checks

1. Verify actual PNG dimensions and alpha. Ensure every source rectangle is in bounds and contains one complete intended frame.
2. Measure reference landmarks in source coordinates. Use the same definition and alpha threshold for all frames, and inspect the silhouette visually. A single outlying antialiased pixel can corrupt a naive alpha-bounds baseline.
3. Convert landmarks to the shared origin and runtime transform. Check planted contacts and stationary structural landmarks. Fix unintended source displacement or geometry drift rather than introducing changing runtime scale.
4. Step through frames against a fixed grid at 1x and magnified size. For mechanical regions, compare rigid dimensions, joint spacing and stationary contours. For organic regions, compare movement against the intended deformation envelope, anatomy and volume; deliberate breathing or squash/stretch is not a failure. Inspect the loop seam as carefully as intermediate frames.
5. Toggle normal/damaged at each identical pose. Check for translation, scaling, pose or camera jumps; isolate intentional armor changes.
6. Repeat in the actual battle renderer. Check fractional positioning, camera zoom, texture filtering, atlas sampling and child effects if source frames are correct but the game jitters.

For genuine pixel-art assets, use integer scale/translation and nearest-neighbor sampling when the game presentation permits it. For painted battlers, use one deliberate resampling/filtering policy across frames and phases; do not introduce pixel-art filtering merely to claim precision. If a fractional runtime scale produces a measurable one-pixel edge variation, document it and distinguish sampling from actual anatomy/size drift. Do not claim a zero-pixel result without verifying it.

## Generation is not registration

A prompt can request locked canvas, camera, proportions and planted feet, but cannot guarantee them. Use the master as the edit target, specify exactly which component changes, and preserve all other regions. Inspect the output before deriving runtime assets. If a model keeps redrawing stationary parts, prefer a reusable layered rig or controlled frame edits over repeated whole-body generation.

Per-frame anchor compensation can fix translation, not accidental anatomical redesign or camera changes. Mechanical heads, chassis and rigid limbs must not pulse in size merely because an anchor stays fixed. Organic contours may change intentionally; distinguish expressive deformation from uncontrolled source-image drift rather than rejecting all body movement.


Crop ownership and transparent-edge validation follow the shared [atlas-packing workflow](../../graphics/references/atlas-packing.md). Do not use silhouette auto-fit or largest-component deletion as a substitute for complete art, and retain the common frame canvas/scale/pivot when repacking.
