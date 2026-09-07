export const preloadImages = (urls: string[]): Promise<HTMLImageElement[]> => {
  return Promise.all(
    urls.map((url) => {
      return new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.error(`Failed to load image: ${url}`);
          resolve(null);
        };
      });
    })
  ).then(results => results.filter((img): img is HTMLImageElement => img !== null));
};
