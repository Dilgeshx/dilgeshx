import './App.css'




import { useEffect, useState } from 'react';

const jsonData = {
  name: "Dilgeş Sarıbulak",
  title: "Frontend Developer",
  aboutMe: "Merhaba! Ben Dilgeş Sarıbulak. Yazılım ve teknolojiye ilgi duyuyorum.",
  github: "https://github.com/dilges",
  linkedin: "https://www.linkedin.com/in/dilges-saribulak/"
};

const jsonString = JSON.stringify(jsonData, null, 2);

function colorizeJson(json) {
  // Basit bir JSON renklendirme fonksiyonu; URL değerlerini <a> olarak döndürür
  return json
    .replace(/("[^"]+")(: )/g, '<span class="json-key">$1</span>$2')
    .replace(/: ("([^"]+)")/g, (match, quoted, inner) => {
      // quoted = "...", inner = ...
      if (/^https?:\/\//.test(inner)) {
        return `: <a href="${inner}" target="_blank" rel="noopener noreferrer" class="json-link-inline">"${inner}"</a>`;
      }
      return `: <span class="json-string">${quoted}</span>`;
    })
    .replace(/: (\d+)/g, ': <span class="json-number">$1</span>');
}

function App() {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < jsonString.length) {
        setTyped(jsonString.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="json-bg">
      <div className="json-window">
        <div className="json-header-left">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="json-header">
          <span className="json-title">Dilgeş-Saribulak.json</span>
        </div>
        <pre className="json-content" dangerouslySetInnerHTML={{ __html: colorizeJson(typed) + '<span class="blinking-cursor"></span>' }} />
  {/* links removed: URLs are inline in the JSON output and now clickable */}
      </div>
    </div>
  );
}

export default App;
