"use client";

import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface GitHubCodeProps {
  url: string;
  language: string
}

export default function GitHubCode({ url, language }: GitHubCodeProps) {
  const { theme } = useTheme();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const codeTheme = theme === 'dark' ? materialDark : materialLight;

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setCode(text);
      } catch (error) {
        console.error("Failed to load code:", error);
        setCode("Error loading code.");
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [url]);

  if (loading) return <p>Loading...</p>;

  return (
    <SyntaxHighlighter language={language} style={codeTheme}>
      {code}
    </SyntaxHighlighter>
  );
};
