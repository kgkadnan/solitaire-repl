export async function checkImage(url: string): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    const img = new window.Image(); // Use window.Image to access the regular Image constructor
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
