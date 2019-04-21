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
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
            euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>

          <div class="footer-icons">
            <a href="#">
              <i class="fa fa-facebook" />
            </a>
            <a href="#">
              <i class="fa fa-twitter" />
            </a>
            <a href="#">
              <i class="fa fa-linkedin" />
            </a>
            <a href="#">
              <i class="fa fa-github" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterPage;
