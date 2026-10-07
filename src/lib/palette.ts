// Window event that opens the command palette from anywhere (nav search buttons, terminal, etc.).
export const OPEN_PALETTE_EVENT = 'palette:open';
export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
