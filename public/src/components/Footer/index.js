import React from "react";
import "./style.css";


const FooterPage = () => {
  return (
    <div>
      
      <footer class="footer-distributed">
        <div class="footer-left">
          <h3>
            360Degree <span>House</span>
          </h3>

          <p class="footer-links">
            <a href="#">Home</a>·<a href="#">Blog</a>·<a href="#">About</a>·
            <a href="#">Faq</a>·<a href="#">Contact</a>
          </p>

          <p class="footer-company-name">360DegreeHouse &copy; 2018</p>
        </div>

        <div class="footer-center">
          <div>
            <i class="fa fa-map-marker" />
            <p>
              <span>3637 Snell Avenue SPC364</span> San Jose, United States
            </p>
          </div>

          <div>
            <i class="fa fa-phone" />
            <p>+1 408 466 5588</p>
          </div>

          <div>
            <i class="fa fa-envelope" />
            <p>
              <a href="mailto:support@company.com">
                support@360DegreeHouse.com
              </a>
            </p>
          </div>
        </div>

        <div class="footer-right">
          <p class="footer-company-about">
            <span>About the company</span>
            360 degree house is a team of inspiring students in pursue of quality products and seamless user experience.
          </p>

          <div class="footer-icons">
          <img src="https://img.icons8.com/color/52/000000/facebook.png"/>
          <img src="https://img.icons8.com/color/52/000000/twitter.png"/>
          <img src="https://img.icons8.com/color/52/000000/youtube.png"/>
          <img src="https://img.icons8.com/color/52/000000/message-group.png"/>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterPage;
