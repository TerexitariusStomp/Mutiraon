const DecorativeElements = () => {
  return (
    <>
      {/* Container for background eco elements (leaves & trees) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* floating leaves */}
        <svg className="absolute top-[10%] left-[8%] opacity-30" width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 40c10-18 30-18 40-28-4 14-10 24-26 30-6 2-10 0-14-2z" fill="#34d399"/>
        </svg>
        <svg className="absolute top-[35%] right-[12%] rotate-12 opacity-25" width="90" height="90" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 42c12-16 30-14 42-26-6 16-14 24-30 28-6 1-8 0-12-2z" fill="#86efac"/>
        </svg>
        <svg className="absolute bottom-[30%] left-[18%] -rotate-6 opacity-20" width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 38c12-14 28-12 38-22-4 12-12 20-26 24-4 1-8 0-12-2z" fill="#22c55e"/>
        </svg>

        {/* minimal trees at bottom corners */}
        <svg className="absolute bottom-[-10px] left-[40px] opacity-70" width="140" height="140" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="46" y="60" width="8" height="30" fill="#166534"/>
          <circle cx="50" cy="55" r="20" fill="#22c55e"/>
          <circle cx="38" cy="62" r="12" fill="#16a34a"/>
          <circle cx="62" cy="62" r="12" fill="#16a34a"/>
        </svg>
        <svg className="absolute bottom-[-12px] right-[60px] opacity-60" width="160" height="160" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="46" y="60" width="8" height="30" fill="#14532d"/>
          <circle cx="50" cy="50" r="22" fill="#34d399"/>
          <circle cx="35" cy="60" r="14" fill="#22c55e"/>
          <circle cx="65" cy="60" r="14" fill="#22c55e"/>
        </svg>
      </div>
    </>
  );
};

export default DecorativeElements;
