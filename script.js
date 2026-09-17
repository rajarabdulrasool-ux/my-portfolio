const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
menu.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll("nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".gallery figure");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle("hide", filter !== "all" && card.dataset.category !== filter);
    });
  });
});
// const galleryImages = document.querySelectorAll(".gallery img");

// galleryImages.forEach((img) => {
//     img.addEventListener("click", function () {

//         // Create popup
//         const lightbox = document.createElement("div");
//         lightbox.classList.add("lightbox");

//         // Create large image
//         const largeImage = document.createElement("img");
//         largeImage.src = this.src;
//         largeImage.alt = this.alt;

//         // Close button
//         const closeBtn = document.createElement("span");
//         closeBtn.classList.add("lightbox-close");
//         closeBtn.innerHTML = "&times;";

//         // Add everything
//         lightbox.appendChild(closeBtn);
//         lightbox.appendChild(largeImage);
//         document.body.appendChild(lightbox);

//         // Close button
//         closeBtn.addEventListener("click", function () {
//             lightbox.remove();
//         });

//         // Click outside image to close
//         lightbox.addEventListener("click", function (e) {
//             if (e.target === lightbox) {
//                 lightbox.remove();
//             }
//         });

//         // ESC key to close
//         document.addEventListener("keydown", function escHandler(e) {
//             if (e.key === "Escape") {
//                 lightbox.remove();
//                 document.removeEventListener("keydown", escHandler);
//             }
//         });
//     });
// });

// ===============================
// GALLERY LIGHTBOX WITH NEXT/PREV
// ===============================

const galleryImages = document.querySelectorAll(".gallery img");

let currentImage = 0;

// Create lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="lightbox-prev">&#10094;</button>

    <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-caption"></div>
    </div>

    <button class="lightbox-next">&#10095;</button>
`;

document.body.appendChild(lightbox);

const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

// Open image
galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentImage = index;

        showImage(currentImage);

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    });

});


// Show selected image
function showImage(index) {

    if (index < 0) {
        index = galleryImages.length - 1;
    }

    if (index >= galleryImages.length) {
        index = 0;
    }

    currentImage = index;

    lightboxImage.src = galleryImages[index].src;
    lightboxImage.alt = galleryImages[index].alt;

    const figure = galleryImages[index].closest("figure");
    const caption = figure.querySelector("figcaption");

    lightboxCaption.textContent =
        caption ? caption.textContent : "";
}


// Previous
prevButton.addEventListener("click", () => {
    showImage(currentImage - 1);
});


// Next
nextButton.addEventListener("click", () => {
    showImage(currentImage + 1);
});


// Close
closeButton.addEventListener("click", closeLightbox);


// Click outside image
lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        closeLightbox();
    }

});


// ESC key
document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
        closeLightbox();
    }

    if (e.key === "ArrowRight") {
        showImage(currentImage + 1);
    }

    if (e.key === "ArrowLeft") {
        showImage(currentImage - 1);
    }

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + current));
});
