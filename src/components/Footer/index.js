import React from 'react';

class Footer extends React.Component{
  render(){
    return(
      <div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        <link rel="stylesheet" href="style/footer.css" />
        <link rel="stylesheet" href="style/demo.css" />
        <link href="http://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="style/homepage.css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
        <footer className="footer-distributed">
          <div className="footer-left">
            <h3>360Degree <span>House</span></h3>
            <p className="footer-links">
              <a href="#">Home</a>
              ·
        <a href="#">Blog</a>
              ·
        <a href="#">About</a>
              ·
        <a href="#">Faq</a>
              ·
        <a href="#">Contact</a>
            </p>
            <p className="footer-company-name">360DegreeHouse © 2018</p>
          </div>
          <div className="footer-center">
            <div>
              <i className="fa fa-map-marker" />
              <p><span>3637 Snell Avenue SPC364</span> San Jose, United States</p>
            </div>
            <div>
              <i className="fa fa-phone" />
              <p>+1 408 466 5588</p>
            </div>
            <div>
              <i className="fa fa-envelope" />
              <p><a href="mailto:support@company.com">support@360DegreeHouse.com</a></p>
            </div>
          </div>
          <div className="footer-right">
            <p className="footer-company-about">
              <span>About the company</span>
              We are an inspiring group of house dealers.
      </p>
            <div className="footer-icons">
              <a href="#"><i className="fab fa-facebook-square" /></a>
              <a href="#"><i className="fab fa-twitter-square" /></a>
              <a href="#"><i className="fab fa-linkedin" /></a>
            </div>
          </div>
        </footer>
      </div>


    );
    
  }
}
 export default Footer;



// const Footer = ({
//   render: function() {
//     return (
// <h1>Hello</h1>
//     );
//   }
// });
// export default Footer;











