import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 space-y-6">
          {/* Logo/Brand area */}
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Coming Soon
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're working hard to bring you something amazing.
            <br />
            <span className="text-purple-300 font-semibold">Stay tuned for the big reveal!</span>
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Fast & Modern</h3>
              <p className="text-gray-300 text-sm">
                Built with the latest technologies for optimal performance
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Beautiful Design</h3>
              <p className="text-gray-300 text-sm">
                Carefully crafted user experience with attention to detail
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Purpose Driven</h3>
              <p className="text-gray-300 text-sm">
                Focused on delivering real value and exceptional results
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email for updates"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto">
                Notify Me
              </button>
            </div>
            <p className="text-gray-400 text-sm">Be the first to know when we launch!</p>
          </div>

          {/* Social links */}
          <div className="flex justify-center space-x-6 mt-8">
            <a
              href="mailto:ahmedqeshta1999@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20">
              <span className="text-xl">📧</span>
            </a>
            <a
              href="https://x.com/ahmedqeshta0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20">
              <span className="text-xl">🐦</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ahmedqeshta/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20">
              <span className="text-xl">💼</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-16 pt-8 border-t border-white/20">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ahmed Qeshta. Something great is coming.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
