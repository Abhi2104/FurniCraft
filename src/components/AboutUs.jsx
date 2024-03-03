import NavigationBar from "./navigationBar";
import aboutus_img from './Assets/aboutus_img.webp'
import "../Styling/common.css"
import Footer from "./Footer";

const AboutUs = () =>{
    return(
        <div>
            <NavigationBar/>
        <div className="heading">
        <h1 style={{ textAlign: 'center' }}>About Us</h1>
        </div>

        <div className="para">
            <p >
            A joyful home is one that’s filled with beauty, memories and is an embodiment of the people living in it.
           We design for those who want to experience this joy all around them. Our products are created with an intention, a purpose, and a meaningful thought so
             that they can spark conversations and help people tell their stories through their homes.
             Our designs aim to echo the beauty of nature while enriching your space with authenticity. Whereas, our commitment lies in crafting pieces that not only grace your living spaces but also tell a story of tradition and innovation. Intertwining the stories of our master artisans, each of our creations bears the mark of their dedication and artistry. So, as we continue our journey, we are driven by the desire to create furniture that marries style and substance by blending timeless traditions with the modern sensibilities that make up our lives now.
            </p>
        
        </div>    
          
            <div className='img'>
                     <img src={aboutus_img} />
            </div>   

            <div className="para2">
                <p>
                    <br />
                We help curate spaces that reignite memories from family celebrations, laughter from dinner parties, and nostalgia about childhoods gone by. We design for homes that evoke a feeling. We design for homes that reflect a life of joy.
                At Home Canvas, we aim to inspire people to express their unique stories through their home.
                And so, we create with one purpose. Thoughtful design. Joyful living.
                </p>
            </div>

        <Footer/>
        </div>
        

    )
}

export default AboutUs