"use client";

import { useEffect, useRef } from "react";
import { pipeline, type Matrix } from "./dct";
import styles from "./ImageDemo.module.css";

/** Grayscale JPEG round trip of a whole image: DCT, quantize, back. */
function compress(src: ImageData): ImageData {
  const { width, height, data } = src;
  const luma = (x: number, y: number) => {
    // Blocks past the image edge repeat the border pixels.
    const i = (Math.min(y, height - 1) * width + Math.min(x, width - 1)) * 4;
    return (data[i] + data[i + 1] + data[i + 2]) / 3;
  };
  const out = new ImageData(width, height);
  for (let by = 0; by < height; by += 8) {
    for (let bx = 0; bx < width; bx += 8) {
      const block: Matrix = Array.from({ length: 8 }, (_, y) =>
        Array.from({ length: 8 }, (_, x) => luma(bx + x, by + y)),
      );
      const decoded = pipeline(["dct", "quant", "unquant", "idct"], block);
      for (let y = 0; y < 8 && by + y < height; y++) {
        for (let x = 0; x < 8 && bx + x < width; x++) {
          const i = ((by + y) * width + bx + x) * 4;
          out.data.fill(decoded[y][x], i, i + 3);
          out.data[i + 3] = 255;
        }
      }
    }
  }
  return out;
}

/** The original image next to its compressed version. */
export function ImageDemo({ src, alt = "" }: { src: string; alt?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const c = canvas.current;
      if (!c) return;
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.putImageData(
        compress(ctx.getImageData(0, 0, c.width, c.height)),
        0,
        0,
      );
    };
    img.src = src;
  }, [src]);

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
      <img src={src} alt={alt} />
      <canvas ref={canvas} aria-label={alt && `${alt} po kompresji`} />
    </div>
  );
}
