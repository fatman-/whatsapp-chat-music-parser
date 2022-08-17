/*
 ** Paste the clipboard content after running this script into a spotify playlist
 ** Spotify will ask you if you want to skip duplicates
 */

import fs from 'fs';
import clipboard from 'clipboardy';

const data = fs.readFileSync('./_chat.txt', 'utf8');

const urlsBucket = {
	spotify: [],
	apple: [],
	amazon: [],
	youtube: [],
	soundcloud: [],
	bandcamp: [],
	vimeo: [],
	facebook: [],
	instagram: [],
	other: [],
};

const urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
data.match(urlRegex).forEach((url) => {
	if (url.includes('youtu.be') || url.includes('youtube')) {
		urlsBucket.youtube.push(url);
	} else if (url.includes('spotify')) {
		urlsBucket.spotify.push(url);
	} else if (url.includes('soundcloud')) {
		urlsBucket.soundcloud.push(url);
	} else if (url.includes('bandcamp')) {
		urlsBucket.bandcamp.push(url);
	} else if (url.includes('vimeo')) {
		urlsBucket.vimeo.push(url);
	} else if (url.includes('facebook')) {
		urlsBucket.facebook.push(url);
	} else if (url.includes('instagram')) {
		urlsBucket.instagram.push(url);
	} else if (url.includes('music.apple')) {
		urlsBucket.apple.push(url);
	} else if (url.includes('music.amazon')) {
		urlsBucket.amazon.push(url);
	} else {
		urlsBucket.other.push(url);
	}
});

const spotifyTrackRegex = /open\.spotify\.com\/track\/(.+)(?:\?.+)?/;
const spotifyTrackList = urlsBucket.spotify
	.filter((link) => spotifyTrackRegex.test(link))
	.map((trackLink) => `spotify:track:${spotifyTrackRegex.exec(trackLink)[1].split('?')[0]}`);
const nonTrackSpotifyLinks = urlsBucket.spotify.filter((link) => !spotifyTrackRegex.test(link));

clipboard.writeSync(spotifyTrackList.join('\n'));

console.log(`${spotifyTrackList.length} / ${urlsBucket.spotify.length} Spotify links parsed.`);
console.log('Track URIs have been copied to the clipboard.');
console.log(`${nonTrackSpotifyLinks.length} non-track (albums, playlists, artist links, etc...) Spotify links found.`);
