import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center space-y-12 max-w-6xl mx-auto w-full">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 space-y-8">
          {/* Logo/Brand area */}
          <div className="space-y-4 pt-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent animate-pulse px-4">
              Coming Soon
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Description */}
          <div className="px-4 py-6">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're working hard to bring you something amazing.
              <br />
              <span className="text-purple-300 font-semibold">Stay tuned for the big reveal!</span>
            </p>
          </div>

          {/* Feature highlights */}
          <div className="px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 mx-4 md:mx-0">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-white font-semibold mb-3 text-lg">Fast & Modern</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Built with the latest technologies for optimal performance
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 mx-4 md:mx-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-white font-semibold mb-3 text-lg">Beautiful Design</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Carefully crafted user experience with attention to detail
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 mx-4 md:mx-0">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-white font-semibold mb-3 text-lg">Purpose Driven</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Focused on delivering real value and exceptional results
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="px-4 py-8">
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email for updates"
                  className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto">
                  Notify Me
                </button>
              </div>
              <p className="text-gray-400 text-sm">Be the first to know when we launch!</p>
            </div>
          </div>

          {/* Social links */}
          <div className="px-4 py-6">
            <div className="flex justify-center space-x-8">
              <a
                href="mailto:ahmedqeshta1999@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20">
                <span className="text-2xl">📧</span>
              </a>
              <a
                href="https://x.com/ahmedqeshta0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20">
                <span className="text-2xl">🐦</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ahmedqeshta/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20">
                <span className="text-2xl">💼</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-16 pt-8 border-t border-white/20 px-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ahmed Qeshta. Something great is coming.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
