var index = 0;

const gallery = document.getElementById('gallery');

getNextImages();

function getNextImages(){
    fetch('/artwork?index=' + index)
    .then(response => response.json())
    .then(data => {


        if(data.length == 0){
            console.log("Nothing here");
            return;
        }


        data.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Artwork';
            img.style.backgroundColor = "white";

            var aspectRatio = img.height / img.width;

            var newWidth = Math.random() * 300;
            var newHeight = aspectRatio * newWidth;

            img.width = newWidth;
            img.height = newHeight;

            

            

            
            img.style.left = Math.random() * (gallery.clientWidth - img.width);
            img.style.top = Math.random() * (gallery.clientHeight - img.height);



            img.className = "artwork";

            gallery.appendChild(img);
        });

        index++;


    })
    .catch(error => {
        console.error('Error fetching artwork:', error);
    });

}


