import React from 'react';
import { LightboxViewer } from '../components/archive/LightboxViewer';

// Dedicated page for viewing archive items in a lightbox
export default function ArchiveViewPage() {
  return <LightboxViewer />;
}

// Disable the default layout wrapper
export const Head = () => (
  <>
    <title>Archive Viewer</title>
    <meta name="robots" content="noindex" />
    <style>{`
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    `}</style>
  </>
);

