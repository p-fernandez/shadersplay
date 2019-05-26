import { useState } from 'react';

function useDetectWebGL() {
  return useState(() => window.WebGLRenderingContext);
};

export default useDetectWebGL;
