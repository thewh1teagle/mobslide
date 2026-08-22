import logoSvg from "./assets/logo.svg";
import phoneSvg from './assets/phone.png';
function App() {
  return (
    <div className="bg-[#151C29] min-h-[100vh] pb-20">
      <div className="max-w-[1200px] flex flex-col justify-center m-auto px-5 md:px-20">
      <div className="navbar bg-[#151C29] pt-5 w-full px-0">
        <div className=" flex-1">
          <img alt="" src={logoSvg} className="w-12 h-10" />
          <a className="btn btn-ghost text-lg lg:text-xl p-0 tracking-wider">MobSlide</a>
        </div>
        <div className="flex flex-row text-white text-xl font-medium gap-8">
          <a aria-label="github" target="_blank" rel="noreferrer" href="https://github.com/thewh1teagle/mobslide"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" className="h-10 w-10 text-white opacity-100 duration-300 hover:opacity-50"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg></a>
        </div>
      </div>

      <div className="m-auto w-full bg-[#222B3D] h-[60vh] rounded-2xl mt-20 overflow-hidden flex flex-col justify-center items-center max-w-[1200px] self-center justify-center">
        <img alt="" src={phoneSvg} className="translate-y-20 w-[500px] max-w-[1000px] lg:w-[800px]" />
      </div>
      <div className="mt-8 text-white text-2xl lg:text-5xl leading-snug">
        Use your smartphonee
        <br />
        As slide remote controller
      </div>
      <div className="text-[#C5CBD6] text-xl mt-5">
      Enhance presentations with mobslide. sleek app turning your smartphone into a powerful slide remote. Download on PC, scan the QR code, and effortlessly control slides using your phone's volume buttons and arrow keys.
      </div>
      <div className="flex items-center justify-center mt-10">
        <a href="https://github.com/thewh1teagle/mobslide/releases" target="_blank" className="bg-primary text-white btn btn-primary lg:btn-lg">Get Latest Release</a>
      </div>
      </div>
    </div>
  );
}

export default App;
