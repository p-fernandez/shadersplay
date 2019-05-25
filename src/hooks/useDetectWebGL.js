import { useEffect } from 'react';

function useDetectWebGL() {
  useEffect(() => window.WebGLRenderingContext, [])
};

export default useDetectWebGL;
