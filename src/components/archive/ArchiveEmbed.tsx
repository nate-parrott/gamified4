import "./archiveEmbed.css";
import React from "react";

export default function ArchiveEmbed() {
  return (
    <div className="archive-embed">
        <div className="archive-commute"></div>
        <div className="archive-container">
          <div className="archive-box">
            <ArchiveImage />
          </div>
        </div>
    </div>
  );
}


const ArchiveImage = () => (
  <>
    <div className="archive-mac-stand" />
    <div className="archive-mac-border" />
    <div className="archive-mac-frame" />
    <div className="archive-mac-circle" />
    <div className="archive-mac-screen">
      <iframe src="/archive" />
    </div>
  </>
);
