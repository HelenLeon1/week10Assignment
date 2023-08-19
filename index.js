
class Song {
    constructor(songName, artist, genre) {
        this.songName = songName;
        this.artist = artist;
        this.genre = genre;
    }
}

class Playlist {
    constructor(id, playlistName) {
        this.id = id;
        this.playlistName = playlistName;
        this.songs = [];
    }

    addSong(song) {
        this.songs.push(song);
    }

    deleteSong(song) {
        let index = this.songs.indexOf(song); 
        this.songs.splice(index, 1); 
    }
}


let playlists = [];
let playlistId = 0;


onClick('enter-button', () => { 
    playlists.push(new Playlist(playlistId++, getValue('playlist-name'))); 
    drawDOM();
});


function onClick(id, action) { 
    let element = document.getElementById(id);
    element.addEventListener('click', action); 
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let playlistDiv = document.getElementById('playlist');
    clearElement(playlistDiv);  //clears the playlist div
    for(playlist of playlists) {  //iterates over the playlist array and creates the new table for each playlist
        let table = playlistTable(playlist); 
        let title = document.createElement('h2'); 
        title.innerHTML = playlist.playlistName; 
        title.appendChild(deletePlaylist(playlist));
        playlistDiv.appendChild(title);
        playlistDiv.appendChild(table);
        for(song of playlist.songs) {
            songRow(playlist, table, song);
        }
    }
}

function songRow(playlist, table, song) {
    let row = table.insertRow(2); 
    row.insertCell(0).innerHTML = song.songName;
    row.insertCell(1).innerHTML = song.artist;
    row.insertCell(2).innerHTML = song.genre;
    let actions = row.insertCell(3);
    actions.appendChild(deleteRow(playlist, song));
}

function deleteRow(playlist, song) {
    let deleteRowButton = document.createElement('button');
    deleteRowButton.className = 'btn btn-outline-primary';
    deleteRowButton.innerHTML = 'Delete Song';
    deleteRowButton.onclick = () => {
        let index = playlist.songs.indexOf(song);
        playlist.songs.splice(index, 1);
        drawDOM();
    };
    return deleteRowButton;
}

function deletePlaylist(playlist) {
    let deletePlaylistButton = document.createElement('button');
    deletePlaylistButton.className = 'btn btn-primary';
    deletePlaylistButton.innerHTML = 'Delete Playlist';
    deletePlaylistButton.onclick = () => {
        let index = playlists.indexOf(playlist);
        playlists.splice(index, 1);
        drawDOM();
    };
    return deletePlaylistButton;
}

function newSong(playlist) {
    let newSongButton = document.createElement('button');
    newSongButton.className = 'btn btn-primary';
    newSongButton.innerHTML = 'Enter New Song';
    newSongButton.onclick = () => {
        playlist.songs.push(new Song(getValue(`songName-input-${playlist.id}`), getValue(`artist-input-${playlist.id}`), getValue(`genre-input-${playlist.id}`)));
        drawDOM();
    };
    return newSongButton;
}

function playlistTable(playlist) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-secondary table-hover');
    let row = table.insertRow(0);
    let songNameColumn = document.createElement('th');
    let artistColumn = document.createElement('th');
    let genreColumn = document.createElement('th');
    songNameColumn.innerHTML = 'Song Name';
    artistColumn.innerHTML = 'Artist';
    genreColumn.innerHTML = 'Genre';
    row.appendChild(songNameColumn);
    row.appendChild(artistColumn);
    row.appendChild(genreColumn);
    let playlistFormRow = table.insertRow(1); 
    let songNameHeading = document.createElement('th');
    let artistHeading = document.createElement('th');
    let genreHeading = document.createElement('th');
    let newSongHeading = document.createElement('th');
    let songNameInput = document.createElement('input');
    songNameInput.setAttribute('id', `songName-input-${playlist.id}`);
    songNameInput.setAttribute('type', 'text');
    songNameInput.setAttribute('class', 'form-control');
    let artistInput = document.createElement('input');
    artistInput.setAttribute('id', `artist-input-${playlist.id}`);
    artistInput.setAttribute('type', 'text');
    artistInput.setAttribute('class', 'form-control');
    let genreInput = document.createElement('input');
    genreInput.setAttribute('id', `genre-input-${playlist.id}`);
    genreInput.setAttribute('type', 'text');
    genreInput.setAttribute('class', 'form-control');
    let newSongButton = newSong(playlist);
    songNameHeading.appendChild(songNameInput); 
    artistHeading.appendChild(artistInput);
    genreHeading.appendChild(genreInput);
    newSongHeading.appendChild(newSongButton);
    playlistFormRow.appendChild(songNameHeading);
    playlistFormRow.appendChild(artistHeading);
    playlistFormRow.appendChild(genreHeading);
    playlistFormRow.appendChild(newSongHeading);
    return table;
 }

 function clearElement(element) { //clears code inside of element
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


