const galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxCaption = lightbox?.querySelector(".lightbox-caption");
const closeButton = lightbox?.querySelector(".lightbox-close");
const prevButton = lightbox?.querySelector(".lightbox-prev");
const nextButton = lightbox?.querySelector(".lightbox-next");

let activeIndex = 0;

function updateLightbox(index) {
  if (!galleryImages.length || !lightboxImage || !lightboxCaption) return;
  activeIndex = (index + galleryImages.length) % galleryImages.length;
  const activeImage = galleryImages[activeIndex];
  lightboxImage.src = activeImage.src;
  lightboxImage.alt = activeImage.alt;
  const captionText = activeImage.closest(".gallery-item")?.querySelector("figcaption")?.textContent || "";
  lightboxCaption.textContent = captionText;
}

function openLightbox(index) {
  if (!lightbox) return;
  updateLightbox(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

prevButton?.addEventListener("click", () => updateLightbox(activeIndex - 1));
nextButton?.addEventListener("click", () => updateLightbox(activeIndex + 1));
closeButton?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") updateLightbox(activeIndex - 1);
  if (event.key === "ArrowRight") updateLightbox(activeIndex + 1);
});
