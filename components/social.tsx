export default function Social() {
    const links = [
      { name: '@bylucasqueiroz', url: 'https://x.com/bylucasqueiroz' },
      { name: 'linkedin', url: 'https://www.linkedin.com/in/bylucasqueiroz' },
      { name: 'github', url: 'https://github.com/bylucasqueiroz' },
    ];
  
    return (
      <div className="flex space-x-3 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#4493F8] transition-colors duration-200 no-underline hover:underline"
          >
            {link.name}
          </a>
        ))}
      </div>
    );
  }