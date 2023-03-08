export const borderRadius = (radius, smooth= 8) => ({
  'border-radius': radius,
  '--smooth-corners': smooth,
  'mask-image': 'paint(smooth-corners)',
});

export const textOverflow = {
  whiteSpace: 'nowrap',
  overflow: 'hidden'
}