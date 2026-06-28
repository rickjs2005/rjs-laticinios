"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";

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
  eager = false,
  width,
  height,
  aspectRatio,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  variant?: Variant;
  emoji?: string;
  label?: string;
  /** carregamento ansioso — use só em imagens acima da dobra (LCP) */
  eager?: boolean;
  /** dimensões intrínsecas — reservam espaço e evitam CLS */
  width?: number;
  height?: number;
  /** alternativa a width/height quando só a proporção importa (ex.: "1 / 1") */
  aspectRatio?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // captura erros que aconteceram antes da hidratação (img já quebrada)
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  // reserva de espaço p/ não causar layout shift enquanto o PNG carrega
  const boxStyle: CSSProperties = aspectRatio ? { aspectRatio, ...style } : { ...style };

  if (failed) {
    return (
      <div
        className={className}
        style={boxStyle}
        data-ph={variant}
        role="img"
        aria-label={alt}
      >
        <span aria-hidden>{emoji}</span>
        {label && <small>{label}</small>}
      </div>
    );
  }

  // Imagem local + dimensões conhecidas → next/image (WebP/AVIF, srcset, lazy).
  // O className controla o tamanho exibido (width:100%/height:auto nos módulos).
  const isLocal = src.startsWith("/");
  if (isLocal && width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={boxStyle}
        priority={eager}
        loading={eager ? undefined : "lazy"}
        draggable={false}
        onError={() => setFailed(true)}
      />
    );
  }

  // Demais casos (sem dimensão / remoto / decorativo) → <img> simples.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={boxStyle}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
