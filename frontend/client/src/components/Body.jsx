import React from 'react';
import img1 from '../assets/body-1.jpg'
// import hero from '../assets/hero-image.png'
import air from '../assets/flight.png'
import logi from '../assets/logi.png'
import land from '../assets/land.png'
import sea from '../assets/sea.png'
import footer from '../assets/footer.png'
// import gml from '../assets/gml.avif'
// import logo1 from '../assets/logoipsum-335.png'
// import logo2 from '../assets/logoipsum-343.png'
// import logo3 from '../assets/logoipsum-285.png'
// import logo4 from '../assets/logoipsum-388.png'

import { Link } from 'react-router-dom';
// import footer from '../assets/footer.png'
import nightport from '../assets/capture-3.png'
import TruckLoader from './TruckLoader';
import Button from './Button';
import { ArrowUpRight } from 'lucide-react';
import Chatbot from './Chatbot';
// import blueback from '../assets/blue-back.png'

// import heroship from '../assets/hero-ship.mp4'

import numberOne from '../assets/image-1.png'
import numberTwo from '../assets/image-2.png'
import numberThree from '../assets/image-3.png'
import numberFour from '../assets/image-4.png'
import Button2 from './Button2';
import { useState } from 'react';

const Body = () => {
    // const logos = [logo1,logo2,logo3,logo4,logo1,logo2,logo3,logo4,logo1,logo2,logo3,logo4]
    const [loading,setLoading] = useState(false);

    const phoneNumber = "919944475934";
  const message = "Hello, I’d like to enquire about your services. Can you provide some details and pricing?";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className='font-sans bg-white'>
            

                <div className='relative h-screen overflow-hidden'>
                    <div className='hidden sm:block absolute h-[100vh] w-full overflowhidden z-0'>
                         {/* Background Image with Fade-Out */}
                        <img
                        src={nightport}
                        alt="Fallback"
                        className={` absolute w-full h-full object-cover z-0 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}
                        />

                        
                        {/* <img src={nightport} className='absolute z-0 w-full h-full object-cover' alt="" /> */}
                        <div className="absolute top-0 left-0 w-full h-full z-10 bg-black opacity-60"></div>

                    </div>

                    

                        <div className='block sm:hidden absolute h-[100vh] w-full '>
                            <img src={footer} alt=""  className='absolute z-0 w-full h-full object-cover'/>
                            <div className='absolute w-full h-full text-white opacity-70 bg-black'></div>
                        </div>
                 

                    <div className='hidden sm:flex flex-col gap-11 relative p-20 max-w-4xl text-white z-10' >
                        <div className=''>
                            <h1 className='text-6xl mt-10 z-10 tracking-wide'>A Comprehensive logistics company,
                            Carrying out the Freight Forwarding Business.</h1>
                        </div>
                        
                        <div className='text-xl mt-3 '>
                            <p><span style={{fontWeight: 530, fontSize: "30px"}}>I</span>nter <span style={{fontWeight: 530, fontSize: "30px"}}>F</span>reight <span style={{fontWeight: 530, fontSize: "30px"}}>F</span>orwarders Logistics offers solutions for all international logistics needs, including international multi-mode
                                transportation with a combination of land, ocean and air, trilateral transportation, air/ocean consolidation services, customs
                                services, storage, delivery and Packing.</p>
                        </div>

                        <div className='flex flex-row gap-6'>
        
                            <Link to='/enquiry'><Button/></Link>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                            <Button2/>
                            </a>
                        </div>   

                         <div>
                        </div>                                                                                                                                                                                                                                                                  
                    </div>

                    {/* For Mobile */}

                    <div className='sm:hidden text-5xl items-center flex flex-col justify-center h-screen relative p-20 w-screen  text-white z-10 gap-5'>
                        <h1 className='text-5xl text-center'>Welcome to</h1>
                        <h1>IFF</h1>
                        <h3 className='text-lg text-center '>A Comprehensive logistics company, Carrying out the Freight Forwarding Business.</h3>
                        <div className='flex flex-col gap-6'>
                            <Link to='/enquiry'><Button/></Link>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                            <Button2/>
                            </a>
                        </div>
                    </div>
                </div>
            {/* <img src={hero} alt="" /> */}

                

            <div
                id="about-section"
                className="w-full bg-blue-200"
                style={{
                backgroundImage: `
                linear-gradient(rgba(128, 128, 128, 0.2) 1px, transparent 0.5px),
                linear-gradient(90deg, rgba(128, 128, 128, 0.2) 1px, transparent 0.4px)
                `,
                backgroundSize: '30px 30px'
            }}
                >
    
            
                {/* One */}
                <div className='max-w-7xl mx-auto flex justify-center items-center sm:gap-8 md:gap-10 px-2 sm:px-8 z-10 lg:gap-20 flex-nowrap'>
                    <div className='hidden sm:block w-[200px] sm:w-[100px] md:w-[200px] lg:w-[200px]'>
                        <img src={numberOne} alt="" className='w-full h-auto opacity-65'/>
                    </div>
                    <div className='w-[200px] sm:w-[80px] md:w-[200px] lg:w-[250px]'>
                        <img src={sea} alt="" className='w-full h-auto'/>
                    </div>

                    {/* desktop */}
                    <div className='hidden sm:flex flex-col gap-5 p-10'>
                        <div>
                            <h1 style={{textShadow: "2.2px 2px 1.3px gray"}} className='text-2xl text-gray-800 font-medium sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mt-4 sm:mt-6 tracking-wide'>Sea Freight</h1>

                        </div>
                        <div className='text-xs sm:text-sm md:text-base lg:text:lg mt-3 space-y-2'>
                                <li>Full Container Load (FCL) and Less than Container Load (LCL) services.</li>
                                <li>Reliable connections with major international shipping lines.</li>
                                <li>Cost-effective solutions for bulk and heavy cargo.</li>
                                <li>End-to-end ocean freight management, including customs clearance.</li>
                        </div>
                    </div>


                    {/* mobile */}
                    <div className='flex flex-col justify-center items-center sm:hidden p-10'>
                        <div>
                            <h1 style={{textShadow: "2.2px 2px 1.3px gray"}} className='text-2xl text-gray-800 font-medium sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mt-4 sm:mt-6 tracking-wide'>Sea Freight</h1>

                        </div>
                        <div className='text-[12.5px] sm:text-sm md:text-base lg:text:lg mt-3 space-y-2'>
                            <li className='whitespace-nowrap'>FCL & LCL shipping options</li>
                            <li className='whitespace-nowrap'>Global ocean freight network</li>
                            <li className='whitespace-nowrap'>Cost-effective bulk transport</li>
                            <li className='whitespace-nowrap'>End-to-end customs clearance</li>


                        </div>
                    </div>
                </div>

                {/* Two */}
                <div className='max-w-7xl mx-auto flex items-center justify-center sm:gap-8 md:gap-10 px-2 sm:px-8 z-10 lg:gap-20 flex-nowrap'>
                    
                    {/* desktop */}
                    <div className='hidden sm:flex flex-col gap-5 p-10'>
                        <div>
                            <h1 style={{textShadow: "2.2px 2px 1.3px gray"}} className='text-2xl text-gray-800 font-medium sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mt-4 sm:mt-6 tracking-wide'>Road Cargo</h1>

                        </div>
                        <div className='text-xs sm:text-sm md:text-base lg:text:lg mt-3 space-y-2'>
                        <li>Domestic and cross-border trucking solutions.</li>
                        <li>Specialized fleet for heavy machinery and oversized cargo.</li>
                        <li>Flexible last-mile delivery options for businesses.</li>
                        <li>Temperature-controlled transport for perishable goods.</li>


                        </div>
                    </div>
                    
                    {/* mobile */}
                    <div className='flex flex-col justify-between sm:hidden p-10'>
                        
                        <div>
                            <h1 style={{textShadow: "2.2px 2px 1.3px gray"}} className='text-2xl text-gray-800 font-medium sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mt-4 sm:mt-6 tracking-wide whitespace-nowrap'>Road Cargo</h1>
                            
                        </div>
                        
                        <div className='text-[12.5px] sm:text-sm md:text-base lg:text:lg mt-3 space-y-2'>
                        <li className='whitespace-nowrap'>Cross-border trucking solutions</li>
                        <li className='whitespace-nowrap'>Special fleet for heavy loads</li>
                        <li className='whitespace-nowrap'>Flexible last-mile deliveries</li>
                        <li className='whitespace-nowrap'>Cold chain transport support</li>


                        </div>
                    </div>

                    <div className=' w-[200px] sm:w-[80px] md:w-[200px] lg:w-[250px]'>
                        <img src={land} alt="" className='w-full h-auto'/>
                    </div>
                    <div className='hidden sm:block w-[200px] sm:w-[100px] md:w-[200px] lg:w-[200px]'>
                        <img src={numberTwo} alt="" className='w-full h-auto  opacity-65'/>
                    </div>
                </div>
                
                {/* Three */}
                <div className='max-w-7xl mx-auto flex items-center justify-center sm:gap-8 md:gap-10 px-2 sm:px-8 z-10 lg:gap-20 flex-nowrap'>
                    <div className='hidden sm:block w-[200px] sm:w-[100px] md:w-[200px] lg:w-[200px]'>
                        <img src={numberThree} alt="" className='w-full h-auto opacity-65'/>
                    </div>
                    <div className=' w-[200px] sm:w-[80px] md:w-[200px] lg:w-[250px]'>
                        <img src={logi} alt="" className='w-full h-auto'/>
                    </div>

                    {/* desktop */}
                    <div className='hidden sm:flex flex-col gap-5 p-10'>
                        <div>
                            <h1 style={{textShadow: "2.2px 2px 1.3px gray"}} className='text-2xl text-gray-800 font-medium sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mt-4 sm:mt-6 tracking-wide whitespace-nowrap'>Customs Aid</h1>

                        </div>
                        <div className='text-xs sm:text-sm md:text-base lg:text:lg mt-3 space-y-2'>
                            <li>Integrated supply chain management solutions.</li>
                            <li>Custom warehousing and inventory management services.</li>
                            <li>Advanced tracking and real-time logistics visibility.</li>
                            <li>Tailored logistics solutions to meet unique business needs.</li>



                        </div>
                    </div>


                    {/* mobile */}
                    <div className='flex flex-col sm:hidden p-10'>
                        <div>
                            <h1 style={{textShadow: "2.2px 2px 1.3px gray"}} className='text-2xl text-gray-800 font-medium sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mt-4 sm:mt-6 tracking-wide whitespace-nowrap'>Customs Aid</h1>

                        </div>
                        <div className='text-[12.5px] sm:text-sm md:text-base lg:text:lg mt-3 space-y-2'>
                        <li className='whitespace-nowrap'>Integrated supply chain solutions</li>
                    <li className='whitespace-nowrap'>Custom warehousing options</li>
                    <li className='whitespace-nowrap'>Real-time tracking visibility</li>
                    <li className='whitespace-nowrap'>Tailored logistics planning</li>

                        </div>
                    </div>
                </div>

                {/* Four */}
                <div className='max-w-7xl mx-auto flex items-center justify-center sm:gap-8 md:gap-10 px-2 sm:px-8 z-10 lg:gap-20 flex-nowrap'>
                    
                    {/* desktop */}
                    <div className='hidden sm:flex flex-col gap-5 p-10'>
                        <div>
                            <h1 style={{textShadow: "2.2px 2px 1.3px gray"}} className='text-2xl text-gray-800 font-medium sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mt-4 sm:mt-6 tracking-wide'>Air Freight</h1>

                        </div>
                        <div className='text-xs sm:text-sm md:text-base lg:text:lg mt-3 space-y-2 list-disc list-inside'>
                            <li>Global air freight network ensuring timely deliveries.</li>
                            <li>Specialized handling of high-value and sensitive cargo.</li>
                            <li>Express solutions for urgent and time-critical shipments.</li>
                            <li>Door-to-door air cargo services with full tracking support.</li>

                        </div>
                    </div>


                    {/* mobile */}
                    <div className='flex flex-col sm:hidden p-10'>
                        <div>
                            <h1 style={{textShadow: "2.2px 2px 1.3px gray"}} className='text-2xl text-gray-800 font-medium sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mt-4 sm:mt-6 tracking-wide'>Air Freight</h1>
                        </div>
                        <div className='text-[12.5px] sm:text-sm md:text-base lg:text:lg mt-3 space-y-2'>
                        <li className='whitespace-nowrap'>Global air freight network</li>
                        <li className='whitespace-nowrap'>High-value cargo handling</li>
                        <li className='whitespace-nowrap'>Express time-critical shipments</li>
                        <li className='whitespace-nowrap'>Door-to-door air solutions</li>

                        </div>
                    </div>

                    <div className=' w-[200px] sm:w-[80px] md:w-[200px] lg:w-[250px]'>
                        <img src={air} alt="" className='w-full h-auto'/>
                    </div>

                    <div className='hidden sm:block w-[200px] sm:w-[100px] md:w-[200px] lg:w-[200px]'>
                        <img src={numberFour} alt="" className='w-full h-auto opacity-65'/>
                    </div>
                    
                </div>

            </div>

            <div id="footer" className="relative bg-blue-500 text-white"
            style={{
                backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
            }}>
            {/* Footer Content */}
            <footer className="relative z-10 px-6 py-16">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Company Name */}
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Inter Freight Forwarders</h2>
                        <p className="text-gray-300">Your Trusted Global Freight Forwarder</p>
                    </div>

                    {/* Quote */}
                    <div className="border-l-4 border-orange-400 pl-4 my-8">
                        <p className="text-lg italic text-gray-200">"Excellence in logistics, delivered with precision and care. We bridge distances and connect businesses across the globe."</p>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center  text-center">
                        <div>
                            <h3 className="font-semibold mb-2 text-orange-400">Email</h3>
                            <p className="text-gray-300">@interfreight.forwarders@gmail.com</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 text-orange-400">Phone</h3>
                            <p className="text-gray-300">+91 99444 75934</p>
                        </div>
                        
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6 mt-8">
                        <a href="https://wa.me/919944475934" target="_blank" className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            WhatsApp
                        </a>
                        <a href="mailto:interfreight.forwarders@gmail.com" className="text-white hover:text-blue-300 transition-colors flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2"/>
                                <path d="m22 7-10 5L2 7"/>
                            </svg>
                            Email
                        </a>
                    </div>
                </div>

                <div className="text-center text-gray-300 text-xs mt-12 border-t border-gray-700 pt-4">
                    &copy; {new Date().getFullYear()} Inter Freight Forwarders Co. All rights reserved.
                </div>
            </footer>
            </div>
            <Chatbot/>
        </div>
        
    );
}

export default Body;
