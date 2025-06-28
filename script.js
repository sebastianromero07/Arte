function changeImage(src) {
    document.getElementById('mainImage').src = src;
}

function showScreamer() {
    const screamer = document.getElementById('screamer');
    const video = document.getElementById('screamerVideo');
    screamer.style.display = 'block';
    video.play();
    
    video.onended = function() {
        screamer.style.display = 'none';
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.querySelector('.like');
    if (likeButton) {
        likeButton.addEventListener('click', function() {
            this.classList.toggle('liked');
        });
    }
});
