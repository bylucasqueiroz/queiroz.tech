"use client";

import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
// Light build: only the grammars registered below ship with the page (the full build is ~600 KB).
// A language that isn't registered still renders, just without highlighting; add it here first.
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const languages = { bash, csharp, docker, go, javascript, json, python, sql, typescript, yaml };
for (const [name, grammar] of Object.entries(languages)) SyntaxHighlighter.registerLanguage(name, grammar);

const ALLOWED_HOST = 'raw.githubusercontent.com';

interface GitHubCodeProps {
  url: string;
  language: string;
}

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname === ALLOWED_HOST;
  } catch {
    return false;
  }
}

export default function GitHubCode({ url, language }: GitHubCodeProps) {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const codeTheme = resolvedTheme === 'dark' ? materialDark : materialLight;

  useEffect(() => {
    if (!isSafeUrl(url)) {
      setCode("Invalid source URL.");
      setLoading(false);
      return;
    }

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

  if (loading) return <div className="my-6 h-24 animate-pulse rounded-xl border border-line bg-surface" />;

  return (
    <SyntaxHighlighter
      language={language}
      style={codeTheme}
      customStyle={{ borderRadius: "0.75rem", fontSize: "0.875rem", border: "1px solid var(--line)" }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
