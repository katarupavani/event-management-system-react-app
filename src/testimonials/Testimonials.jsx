import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch testimonials data
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api');
      const result = await response.json();

      if (result.status === 'success' && Array.isArray(result.data)) {
        setTestimonials(result.data); // Initially show all testimonials
      } else {
        throw new Error('Invalid data format from server.');
      }
    } catch (err) {
      setError(err.message || 'Failed to load testimonials.');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Search function to filter testimonials based on user name or event name
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredTestimonials = testimonials.filter(
      (testimonial) =>
        testimonial.userName.toLowerCase().includes(query.toLowerCase()) ||
        testimonial.eventName.toLowerCase().includes(query.toLowerCase())
    );

    setTestimonials(filteredTestimonials); // Update with filtered testimonials
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Section Title */}
      <h2 className="text-center mb-4 text-success fw-bold">
        What Our Participants Are Saying
      </h2>

      {/* Search Box */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name or Event"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Display Error Message */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Display No Testimonials Message */}
      {!error && testimonials.length === 0 && (
        <div className="text-center">No testimonials available.</div>
      )}

      {/* Testimonials Carousel */}
      <Slider {...settings}>
        {testimonials.map((t, index) => (
          <div key={index} className="p-3">
            <div className="card shadow-lg border-light p-4" style={cardStyle}>
              <div className="card-body">
                {/* User Profile Image */}
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-user fa-3x text-info me-3"></i>
                  <div>
                    <h5 className="mb-0 text-primary" style={userNameStyle}>
                      {t.userName}
                    </h5>
                    {/* Conditionally render the designation if available */}
                    {t.designation && <p className="text-muted">{t.designation}</p>}
                  </div>
                </div>

                {/* Testimonial Text with Quote Marks */}
                <div className="testimonial-box position-relative bg-light p-4 rounded-3 mb-3" style={testimonialBoxStyle}>
                  <div className="position-absolute top-0 start-0 translate-middle">
                    <i className="fas fa-quote-left text-muted" style={{ fontSize: '30px' }}></i>
                  </div>
                  <p className="card-text">{t.comment || 'Great event, loved the experience!'}</p>
                </div>

                {/* Event Name */}
                <h6 className="card-subtitle mb-2 text-muted">{t.eventName || 'Event'}</h6>

                {/* Star Rating */}
                <div className="d-flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star ${i < t.rating ? 'fas text-warning' : 'far text-muted'}`}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const cardStyle = {
  background: 'linear-gradient(135deg, #f0f8ff, #add8e6)', 
  borderRadius: '15px',
  transition: 'transform 0.3s ease',
};

const userNameStyle = {
  fontWeight: 'bold',
  color: '#2d68e6', 
};

const testimonialBoxStyle = {
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  transition: 'transform 0.2s ease-in-out',
};


const hoverEffect = {
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

export default Testimonials;
