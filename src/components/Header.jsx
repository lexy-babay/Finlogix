const Header = () => {
    return (
      <header className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg hover:scale-105 transform transition duration-300">
              <span className="text-white font-bold text-xl tracking-wider drop-shadow-sm">F₦</span>
            </div>
            <h1 className="text-3xl font-bold tracking-wide">FinLogix</h1>
          </div>
  
          {/* Tagline */}
          <p className="text-sm sm:text-base text-blue-100 italic text-center sm:text-right">
            Your smart finance tracker
          </p>
        </div>
      </header>
    );
  };
  
  export default Header;
  