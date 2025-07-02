function playVideo(src) {
    const videoElement = document.getElementById('mainVideo');
    const defaultImage = document.getElementById('defaultImage');
    
    // Ocultar imagen y mostrar video
    defaultImage.style.display = 'none';
    videoElement.style.display = 'block';
    
    // Configurar video
    videoElement.src = src;
    videoElement.play();
    
    // Cuando termine el video, mostrar imagen predeterminada
    videoElement.onended = function() {
        videoElement.style.display = 'none';
        defaultImage.style.display = 'block';
    };
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
    const likesCount = document.querySelector('.likes-count');
    let likes = 0;
    let isLiked = false;

    if (likeButton) {
        likeButton.addEventListener('click', function() {
            if (!isLiked) {
                this.src = 'svgs/like-color.svg';
                isLiked = true;
            }
            likes++;
            likesCount.textContent = likes + ' Me gusta';
        });
    }
});

const feeds = [
    {
        image: './images/PREDETERMINADO.webp',
        comments: [
            { text: "Te ves genial, me gusta mucho tu estilo 😍", video: 'video/feed1/FELIZ.mp4' },
            { text: "Te ves terrible deberías hacer dieta 😢", video: 'video/feed1/LLORANDO.mp4' },
            { text: "Si estuvieras flaca te vería mejor 😂👎", action: 'showScreamer' },
            { text: "Borra mejor tu foto, no te ves bien 😭", video: 'video/feed1/ENOJADA.mp4' }
        ]
    },
    {
        image: './images/PREDETERMINADO2.webp',
        comments: [
            { text: "¡Qué linda foto! 🌟", video: 'video/feed2/FELIZ.mp4' },
            { text: "No me gusta tu outfit 😒", video: 'video/feed2/TRISTE.mp4' },
            { text: "Deberías cambiar tu estilo 🤔", video: 'video/feed2/ENOJADA.mp4' },
            { text: "Me encanta como te ves 💕", video: 'video/feed2/FELIZ.mp4' }
        ]
    }
];

let currentFeedIndex = 0;

function changeFeed(direction) {
    currentFeedIndex = (currentFeedIndex + direction + feeds.length) % feeds.length;
    const feed = feeds[currentFeedIndex];
    
    // Actualizar imagen
    document.getElementById('defaultImage').src = feed.image;
    
    // Actualizar comentarios
    const commentsSidebar = document.querySelector('.comments-sidebar');
    commentsSidebar.innerHTML = '<h3>Comentarios del público</h3>';
    
    feed.comments.forEach(comment => {
        const div = document.createElement('div');
        div.className = 'comment-pill';
        if (comment.video) {
            div.setAttribute('onclick', `playVideo('${comment.video}')`);
        } else if (comment.action) {
            div.setAttribute('onclick', comment.action + '()');
        }
        div.textContent = comment.text;
        commentsSidebar.appendChild(div);
    });
    
    // Resetear likes
    document.querySelector('.likes-count').textContent = '0 Me gusta';
    document.querySelector('.like').src = 'svgs/like.svg';
}

// Al cargar la página, asegurarse de que solo se muestren los comentarios originales
window.onload = function() {
    if (!localStorage.getItem('username')) {
        window.location.href = 'login.html';
    }
    
    const commentsSidebar = document.querySelector('.comments-sidebar');
    commentsSidebar.innerHTML = '<h3>Comentarios del público</h3>';
    
    feeds[currentFeedIndex].comments.forEach(comment => {
        const div = document.createElement('div');
        div.className = 'comment-pill';
        if (comment.video) {
            div.setAttribute('onclick', `playVideo('${comment.video}')`);
        } else if (comment.action) {
            div.setAttribute('onclick', comment.action + '()');
        }
        div.textContent = comment.text;
        commentsSidebar.appendChild(div);
    });
};
