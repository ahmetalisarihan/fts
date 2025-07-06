'use client'

interface SimpleMapProps {
  height?: string;
  className?: string;
}

export default function SimpleMap({ height = "h-64 min-h-[280px]", className = "" }: SimpleMapProps) {
  const mapUrl = 'https://www.google.com/maps/place/Fetes+End%C3%BCstriyel+Yap%C4%B1+Malzemeleri/@36.6461896,29.1806881,21z/data=!4m6!3m5!1s0x14c045b36ce002f5:0x62510c5f96e3b3ca!8m2!3d36.6462017!4d29.1808406!16s%2Fg%2F11ldhj5tjj?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D';
  
  const handleClick = () => {
    window.open(mapUrl, '_blank');
  };

  return (
    <div className={`w-full ${height} rounded-lg overflow-hidden ${className} relative group`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d781.6154724012!2d29.180358569577848!3d36.646200865900266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c045b36ce002f5%3A0x62510c5f96e3b3ca!2sFetes%20End%C3%BCstriyel%20Yap%C4%B1%20Malzemeleri!5e0!3m2!1str!2str!4v1701234567890!5m2!1str!2str"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full rounded-lg"
        title="FTS Endüstriyel Yapı Malzemeleri Konum"
      />
      {/* Overlay with click handler for opening in new tab */}
      <div 
        className="absolute inset-0 bg-transparent cursor-pointer opacity-0 hover:opacity-10 hover:bg-blue-500 transition-opacity duration-200 flex items-center justify-center"
        onClick={handleClick}
        title="Google Maps'te aç"
      >
        <div className="bg-white bg-opacity-80 rounded-lg px-3 py-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Google Maps'te Aç
        </div>
      </div>
    </div>
  );
}
