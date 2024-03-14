import NavigationBar from "./navigationBar";

import "../Styling/homepage.css"

const HomePage = () =>{
    return(
        <div>
           
        <div className="heading">
        <h1 style={{ textAlign: 'center' }}>We Believe You Are Unique</h1>
        </div>
         
         <div className="newclass">
         <span><b>Why settle for a furniture that is made for someone else?</b></span>
         <br /> With aesthetic designs, premium materials and skilled artisanship, our team is committed to improve your shopping experience.
         <br />
         </div>
         
          <div className="photos">
            <div className='imgs'>
                     <img src="https://img.freepik.com/free-photo/luxury-authentic-dining-room-interior-design_53876-129844.jpg?w=996&t=st=1708264668~exp=1708265268~hmac=0a86139868583c70d7036d45190d62e52fedc196d954f8c2d606aa46f3451681" />
            </div>   

            <div className='imgs'>
                     <img src="https://static.asianpaints.com/content/dam/asianpaintsbeautifulhomes/home-decor-advice/guides-and-how-tos/how-to-keep-wooden-furniture-safe-during-monsoons/Title-wooden-bed-design.jpg" />
            </div>

            <div className='imgs'>
                <img src="https://media.licdn.com/dms/image/D4D12AQFRX56h6CLV_w/article-cover_image-shrink_720_1280/0/1697196643092?e=2147483647&v=beta&t=jRnDLJpjDpBBWO-ZiLdIthbasBzZz_ybrDhGGo9VxrY" alt="" />
            </div>

            </div>
            <div className="para3">
                <p>
                We help curate spaces that reignite memories from family celebrations, laughter from dinner parties, and nostalgia about childhoods gone by. We design for homes that evoke a feeling. We design for homes that reflect a life of joy.
                At Home Canvas, we aim to inspire people to express their unique stories through their home.
                And so, we create with one purpose. Thoughtful design. Joyful living.
                </p>
            </div>


        </div>
        

    )
}

export default HomePage