export function generateContrastingColor() {
  let r = Math.floor(Math.random() * 150);
  let g = Math.floor(Math.random() * 150);
  let b = Math.floor(Math.random() * 120);

  return `rgba(${r}, ${g}, ${b}`;
}


export function getDate(date: number, full: boolean): string {
    const dateStr = date.toString()
    let y = ''
    let m = ''
    let d = ''
    for (let i = 0; i < dateStr.length; i++) {
        if (i < 4) {
            y += dateStr[i]
        } else if (i < 6) {
            m += dateStr[i]
        } else {
            d += dateStr[i]
        }
    }
    if(full) {
        return `${y}/${m}/${d}`
    }
    return `${y}/${m}`
}