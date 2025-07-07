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
            { text: "¡Qué linda foto! 🌟", video: 'video/feed2/THANKS.mp4' },
            { text: "Cambia de cuerpo mejor 😂", video: 'video/feed2/SAD.mp4' },
            { text: "Mejor métete anabolicos 👎", action: 'showScreamer' },
            { text: "Metele una papa más al caldo 🍲", video: 'video/feed2/ANGRY.mp4' }
        ]
    },
    {
        image: './images/PREDETERMINADO3.jpg',
        comments: [
            { text: "Mejor toma tu leche 🤮", action: 'showScreamer' }
        ]
    },
    {
        image: './images/PREDETERMINADO4.png',
        comments: [
            { text: "Mejor ponte botox no se ve bien tu piel 😱", action: 'showScreamer' }
        ]
    },
    {
        image: './images/PREDETERMINADO5.png',
        comments: [
            { text: "Deja de subir fotos, nadie quiere verte 🤢", action: 'showScreamer' }
        ]
    }
];

let currentFeedIndex = 0;

// Agregar estado de likes para cada feed
let feedLikes = [
    { count: 0, isLiked: false },
    { count: 0, isLiked: false },
    { count: 0, isLiked: false },
    { count: 0, isLiked: false },
    { count: 0, isLiked: false }
];

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
    
    // Actualizar estado de likes para el nuevo feed
    const currentFeed = feedLikes[currentFeedIndex];
    document.querySelector('.likes-count').textContent = currentFeed.count + ' Me gusta';
    document.querySelector('.like').src = currentFeed.isLiked ? 'svgs/like-color.svg' : 'svgs/like.svg';
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

function toggleEmojiPicker() {
    const picker = document.getElementById('emoji-picker');
    if (!picker) return;
    
    if (picker.style.display === 'none' || !picker.style.display) {
        picker.style.display = 'grid';
    } else {
        picker.style.display = 'none';
    }
}

function addEmoji(emoji) {
    const input = document.getElementById('commentInput');
    if (!input) return;
    
    const cursorPos = input.selectionStart;
    const textBefore = input.value.substring(0, cursorPos);
    const textAfter = input.value.substring(cursorPos);
    
    input.value = textBefore + emoji + textAfter;
    input.focus();
}

// Actualizar la función showScreamer para manejar diferentes screamers según el feed
function showScreamer() {
    const screamer = document.getElementById('screamer');
    const video = document.getElementById('screamerVideo');
    
    if (currentFeedIndex === 0) {
        video.src = 'video/feed1/screamer.mp4';
    } else if (currentFeedIndex === 1) {
        video.src = 'video/feed2/screamerM.mp4';
    } else if (currentFeedIndex === 2) {
        video.src = 'video/feed3/screamerBajo.mp4';
    } else if (currentFeedIndex === 3) {
        video.src = 'video/feed4/screamerA.mp4';
    } else {
        video.src = 'video/feed5/screamerN.mp4';
    }
    
    screamer.style.display = 'block';
    // Asegurarnos de que el video se cargue antes de reproducirlo
    video.load();
    
    // Usar la promesa de play() para manejar la reproducción
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // La reproducción comenzó con éxito
        }).catch(error => {
            console.log("Error reproduciendo el video:", error);
        });
    }
    
    video.onended = function() {
        screamer.style.display = 'none';
    };
}

function playNotificationSound() {
    const audio = new Audio('audio/notifi.mp3');
    audio.play();
}

function playLikeSound() {
    const audio = new Audio('audio/like.mp3');
    audio.play();
}

function addComment() {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    
    if (text) {
        const commentsSidebar = document.querySelector('.comments-sidebar');
        const newComment = document.createElement('div');
        newComment.className = 'comment-pill';
        
        // Agregar efecto alternado (izquierda/derecha) basado en la cantidad de comentarios
        const commentsCount = commentsSidebar.querySelectorAll('.comment-pill').length;
        if (commentsCount % 2 === 0) {
            newComment.style.marginLeft = '0';
            newComment.style.marginRight = '40px';
            newComment.style.animation = 'float 3s ease-in-out infinite';
        } else {
            newComment.style.marginLeft = '40px';
            newComment.style.marginRight = '0';
            newComment.style.animation = 'float 3.5s ease-in-out infinite';
        }
        
        // Agregar el texto con formato igual a los otros comentarios
        newComment.textContent = `"${text}"`;
        
        // Insertar el nuevo comentario después del título
        const title = commentsSidebar.querySelector('h3');
        title.insertAdjacentElement('afterend', newComment);
        
        // Limpiar el input y cerrar el emoji picker si está abierto
        input.value = '';
        const emojiPicker = document.getElementById('emoji-picker');
        if (emojiPicker) {
            emojiPicker.style.display = 'none';
        }
        
        // Reproducir sonido de notificación
        playNotificationSound();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.querySelector('.like');
    const likesCount = document.querySelector('.likes-count');

    if (likeButton) {
        likeButton.addEventListener('click', function() {
            const currentFeed = feedLikes[currentFeedIndex];
            if (!currentFeed.isLiked) {
                this.src = 'svgs/like-color.svg';
                currentFeed.isLiked = true;
            }
            currentFeed.count++;
            likesCount.textContent = currentFeed.count + ' Me gusta';
            playLikeSound(); // Reproducir sonido al dar like
        });
    }
});
