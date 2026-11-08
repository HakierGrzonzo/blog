import type { Metadata } from "next";

/** Shared Open Graph fields. Pages that set their own `openGraph` must spread this, since Next replaces it rather than merging. */
export const baseOpenGraph: Metadata["openGraph"] = {
  locale: "en_US",
  siteName: "Grzegorz Koperwas Blog",
  description: "HakierGrzonzo's Personal Website",
  images: "/hakiergrzonzo.png",
};
