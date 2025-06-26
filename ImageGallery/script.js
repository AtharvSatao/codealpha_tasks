const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const images = document.querySelectorAll(".gallery .image img");
let currentIndex = 0;

function openLightbox(img) {
  lightbox.style.display = "flex";
  lightboxImg.src = img.src;
  currentIndex = Array.from(images).indexOf(img);
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

function filterImages() {
  const category = document.getElementById("category").value;
  const imageCards = document.querySelectorAll(".gallery .image");

  imageCards.forEach(card => {
    if (category === "all" || card.classList.contains(category)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Optional: close lightbox on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});
