import React from 'react';

interface VideoUrlInputProps {
  label: string;
  videoUrl: string;
  onChange: (url: string) => void;
}

const VideoUrlInput: React.FC<VideoUrlInputProps> = ({ label, videoUrl, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      value={videoUrl}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 w-full"
      placeholder="Enter video URL"
    />
  </div>
);

export default VideoUrlInput;