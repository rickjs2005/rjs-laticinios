"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Variant = "photo" | "chip" | "free";

/**
 * Renderiza um asset raster real (render 3D / foto) e, se o arquivo ainda não
 * existir, mostra um placeholder premium no lugar — trocando sozinho assim que
 * o PNG/JPG for adicionado em /public. Os assets são criados por IA de imagem
 * (Midjourney/DALL·E/Firefly) e apenas integrados aqui.
 */
export function AssetImage({
  src,
  alt,
  className,
  style,
  variant = "free",
  emoji = "🖼️",
  label,
  eager = true,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  variant?: Variant;
  emoji?: string;
  label?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // captura erros que aconteceram antes da hidratação (img já quebrada)
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        className={className}
        style={style}
        data-ph={variant}
        role="img"
        aria-label={alt}
      >
        <span aria-hidden>{emoji}</span>
        {label && <small>{label}</small>}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
