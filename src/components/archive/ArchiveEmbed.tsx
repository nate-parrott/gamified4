import "./archiveEmbed.css";
import "./archive.css";
import React, { useCallback, useMemo, useState } from "react";
import archiveManifest from "../../data/archive-manifest.json";
import { ArchiveItem, ArchiveManifest, WindowState } from "./types";
import ClickableArchiveItem from "./ClickableArchiveItem";
import Window from "./Window";

export default function ArchiveEmbed() {
  const manifest = archiveManifest as unknown as ArchiveManifest;
  const filteredItems = useMemo(
    () => manifest.items.filter((item) => !item.name.startsWith("_")),
    [manifest.items]
  );

  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1000);

  const openWindow = useCallback(
    (item: ArchiveItem) => {
      const windowId = `window-${item.path}-${Date.now()}`;
      const newWindow: WindowState = {
        id: windowId,
        item,
        x: 100 + windows.length * 30,
        y: 100 + windows.length * 30,
        zIndex: maxZIndex + 1,
      };
      setWindows((prev) => [...prev, newWindow]);
      setMaxZIndex((prev) => prev + 1);
    },
    [windows.length, maxZIndex]
  );

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const bringToFront = useCallback((windowId: string) => {
    setWindows((prev) => {
      const currentMax = prev.reduce((m, w) => Math.max(m, w.zIndex), 0);
      const target = prev.find((w) => w.id === windowId);
      if (!target || target.zIndex === currentMax) return prev;
      const newZ = currentMax + 1;
      setMaxZIndex(newZ);
      return prev.map((w) => (w.id === windowId ? { ...w, zIndex: newZ } : w));
    });
  }, []);

  const updateWindowPosition = useCallback((windowId: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, x, y } : w)));
  }, []);

  return (
    <div className="archive-embed">
      <div className="archive-commute"></div>
      <div className="archive-container">
        {/* one full viewport */}
        {/* Desktop icons render within the Mac screen; windows render in this container */}
        <div className="archive-box">
          {/* aspect fit to a square */}
          <ArchiveImage>
            <div className="archive-desktop-stack">
                <div className="menubar" />
                <div className="archive-desktop">
                  <div className="icon-grid">
                  {filteredItems.map((item) => (
                    <ClickableArchiveItem key={item.path} item={item} onOpen={openWindow} />
                  ))}
                </div>
              </div>
            </div>
          </ArchiveImage>
        </div>

        {/* WINDOWS LAYER */}
        {windows.map((window) => (
          <Window
            key={window.id}
            window={window}
            onClose={closeWindow}
            onBringToFront={bringToFront}
            onUpdatePosition={updateWindowPosition}
            onItemOpen={openWindow}
          />
        ))}
      </div>
    </div>
  );
}

const ArchiveImage: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <div className="archive-mac-stand" />
    <div className="archive-mac-border" />
    <div className="archive-mac-frame" />
    <div className="archive-mac-circle" />
    <div className="archive-mac-screen">{children}</div>
  </>
);
