export default function StyleBlock() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap');
      
      body {
        font-family: 'Space Grotesk', sans-serif;
        background-color: #09090B;
        color: #FAFAFA;
        overflow-x: hidden;
      }
  
      @keyframes marquee-left {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      @keyframes marquee-right {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0%); }
      }
      
      .animate-marquee-left {
        display: flex;
        width: max-content;
        animation: marquee-left 30s linear infinite;
      }
      
      .animate-marquee-right {
        display: flex;
        width: max-content;
        animation: marquee-right 30s linear infinite;
      }
  
      ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }
      ::-webkit-scrollbar-track {
        background: #09090B;
        border-left: 2px solid #3F3F46;
      }
      ::-webkit-scrollbar-thumb {
        background: #3F3F46;
        border: 2px solid #09090B;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #DFE104;
      }
  
      .noise-bg {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      }
      `
    }} />
  );
}
