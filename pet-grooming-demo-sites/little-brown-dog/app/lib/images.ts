/** Client CDN portraits from lbdog.com (hotlinkable) + hero fallback. */
export const img = {
  hero: "https://lbdog.com/wp-content/uploads/2016/01/160121-max-img_3222-t.jpg",
  about: "https://lbdog.com/wp-content/uploads/2017/06/170627-banner-0810.jpg",
  max: "https://lbdog.com/wp-content/uploads/2016/01/160121-max-img_3222-t.jpg",
  owen: "https://lbdog.com/wp-content/uploads/2016/01/160102-owen-img_0802-t.jpg",
  cj: "https://lbdog.com/wp-content/uploads/2016/01/160120-cj-img_2938-t.jpg",
  gordon: "https://lbdog.com/wp-content/uploads/2016/02/160220-gordon-img_6537-t.jpg",
  banner: "https://lbdog.com/wp-content/uploads/2017/06/170627-banner-0810.jpg",
  abbey: "https://lbdog.com/wp-content/uploads/2016/02/160218-abbey-img_6277-t.jpg",
  max2: "https://lbdog.com/wp-content/uploads/2016/02/160130-max-img_4206-t.jpg",
  toby: "https://lbdog.com/wp-content/uploads/2016/02/160130-toby-img_4151-t.jpg",
  dexter: "https://lbdog.com/wp-content/uploads/2016/02/160220-dexter-img_6582-t.jpg",
  remy: "https://lbdog.com/wp-content/uploads/2016/01/160128-remy-img_3499-t.jpg",
  rommel: "https://lbdog.com/wp-content/uploads/2016/02/160210-rommel-img_4950-t.jpg",
  max3: "https://lbdog.com/wp-content/uploads/2016/01/160127-max-img_3419-t.jpg",
} as const;

export const portraits = [
  { name: "Max", src: img.max, note: "Studio portrait" },
  { name: "Owen", src: img.owen, note: "Studio portrait" },
  { name: "CJ", src: img.cj, note: "Studio portrait" },
  { name: "Gordon", src: img.gordon, note: "Studio portrait" },
  { name: "Banner", src: img.banner, note: "Studio portrait" },
  { name: "Abbey", src: img.abbey, note: "Studio portrait" },
  { name: "Max", src: img.max2, note: "Return visit", key: "max-2" },
  { name: "Toby", src: img.toby, note: "Studio portrait" },
  { name: "Dexter", src: img.dexter, note: "Studio portrait" },
  { name: "Remy", src: img.remy, note: "Studio portrait" },
  { name: "Rommel", src: img.rommel, note: "Studio portrait" },
  { name: "Max", src: img.max3, note: "Return visit", key: "max-3" },
] as const;
