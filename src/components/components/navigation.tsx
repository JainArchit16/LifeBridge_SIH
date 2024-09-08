export const Navigation = () => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {' '}
            <span className="sr-only">Toggle navigation</span>{' '}
            <span className="icon-bar"></span>{' '}
            <span className="icon-bar"></span>{' '}
            <span className="icon-bar"></span>{' '}
          </button>
          <a
            className="page-scroll flex flex-row justify-center items-center gap-4"
            href="#page-top"
          >
            <img
              src="/img/blueLogo.jpg"
              alt="Logo"
              style={{
                height: '50px',
                width: '60px',
                padding: '0px',
                margin: '0px',
              }}
            />
            <span className="text-4xl font-bold">Life Bridge</span>
          </a>
          {/* <a className="navbar-brand page-scroll" href="#page-top">
            Life Bridge
          </a>{" "} */}
        </div>

        <div
        // className="collapse navbar-collapse"
        // id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            {/* <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li> */}
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            {/* <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li> */}
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
