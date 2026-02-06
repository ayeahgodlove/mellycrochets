// import { Button } from '@/components/ui';

const BlogHero = ({ title, description }) => {
  return (
    <div className="relative w-full bg-gray-100 py-20 px-6 flex flex-col items-center text-center rounded-br-[40%] rounded-bl-[40%]">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-200 opacity-80 rounded-br-[40%] rounded-bl-[40%]"></div>

      {/* Fade-in Slide-up Animation */}
      <div className="relative z-10 text-center max-w-3xl p-6 md:p-12 lg:p-16 animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-6">{description}</p>
      </div>
    </div>
  );
};

export default BlogHero;
