// Smooth scroll for nav links
$(document).on("click", '.main-nav a[href^="#"]', function (e) {
  e.preventDefault();
  const target = $($(this).attr("href"));
  if (!target.length) return;

  $("html, body").animate(
    {
      scrollTop: target.offset().top - 70
    },
    500
  );

  // Close mobile nav after click
  $(".main-nav").removeClass("open");
});

// Mobile nav toggle
$(".nav-toggle").on("click", function () {
  $(".main-nav").toggleClass("open");
});

// Simple project carousel
let currentSlide = 0;

function showSlide(index) {
  const $slides = $(".slide");
  const total = $slides.length;

  if (index < 0) index = total - 1;
  if (index >= total) index = 0;

  currentSlide = index;
  $slides.removeClass("active").eq(currentSlide).addClass("active");
}

$(".carousel-control.next").on("click", function () {
  showSlide(currentSlide + 1);
});

$(".carousel-control.prev").on("click", function () {
  showSlide(currentSlide - 1);
});

// Auto-play every 6 seconds
setInterval(function () {
  showSlide(currentSlide + 1);
}, 6000);

// Set year in footer
$("#year").text(new Date().getFullYear());
