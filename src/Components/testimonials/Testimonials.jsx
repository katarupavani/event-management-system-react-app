import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";

const Testimonials = () => {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("/api");
      const result = await response.json();

      if (result.status === "success" && Array.isArray(result.data)) {
        setAllTestimonials(result.data);
        setFilteredTestimonials(result.data);
        setError("");
      } else {
        throw new Error("Invalid data format from server.");
      }
    } catch (err) {
      setError(err.message || "Failed to load testimonials.");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredTestimonials(allTestimonials);
      return;
    }

    const filtered = allTestimonials.filter(
      (testimonial) =>
        testimonial.userName.toLowerCase().includes(query) ||
        testimonial.eventName.toLowerCase().includes(query)
    );

    setFilteredTestimonials(filtered);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center text-primary fw-bold mb-4 fs-2">
        What Our Participants Are Saying
      </h2>

      {/* Search Input */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Search by participant or event name..."
          className="form-control w-50 border-primary"
          value={searchQuery}
          onChange={handleSearch}
          style={{ maxWidth: "400px" }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-center text-danger fw-semibold fs-5">{error}</p>
      )}

      {/* No testimonials */}
      {!error && filteredTestimonials.length === 0 && (
        <p className="text-center text-muted fs-5">No testimonials available.</p>
      )}

      {/* Testimonials Slider */}
      {filteredTestimonials.length > 0 && (
        <Slider {...settings}>
          {filteredTestimonials.map((t, idx) => (
            <div key={idx} className="p-3">
              <div className="card shadow-sm rounded-4 border-0 h-100">
                <div className="card-body d-flex flex-column">
                  {/* Header: User icon + Name */}
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-user fa-3x text-primary me-3"></i>
                    <div>
                      <h5 className="mb-0 fw-bold text-primary">{t.userName}</h5>
                      {t.designation && (
                        <small className="text-muted">{t.designation}</small>
                      )}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div
                    className="flex-grow-1 bg-light rounded-3 p-3 position-relative mb-3"
                    style={{
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      fontStyle: "italic",
                      fontSize: "0.95rem",
                    }}
                  >
                    <i
                      className="fas fa-quote-left position-absolute"
                      style={{ fontSize: "28px", top: "-10px", left: "10px", color: "#0d6efd" }}
                    ></i>
                    <p className="mb-0 ps-4">{t.comment || "Great event, loved the experience!"}</p>
                  </div>

                  {/* Event Name */}
                  <h6 className="text-secondary mb-3 fst-italic">{t.eventName || "Event"}</h6>

                  {/* Star Rating */}
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-star ${
                          i < t.rating ? "fas text-warning" : "far text-muted"
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Testimonials;
