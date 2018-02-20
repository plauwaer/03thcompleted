class BlogEntry {
	constructor(body) {
		this.body = body;
		this._date = new Date();
	}
	get body() {
		return this._body;
	}
	set body(value) {
		this._body = value;
	}
	get date() {
		return this._date;
	}
	contains(searchText) {
		return searchText
			? this._body.toUpperCase().includes(searchText.toUpperCase())
			: false;
	}
	static createDummy() {
		return new this('Nothing much to say today...');
	}
}

// Maak van entries en creator 'private' properties, gebruik _ notatie
// Voorzie een getter voor creator, geen setter, zorg dat creator de waarde
// 'Anonymous' krijgt indien de parameter creator niet werd opegegeven of leeg is.
// Voorzie een getter voor entries en voorzie een methode addEntry met 1 parameter body
// die een entry maakt en toevoegt aan de blog

// class Blog {
// 	constructor(creator) {
// 		this._creator = creator ? creator : 'Anonymous';
// 		this._entries = [];
// 	}
// 	get creator() {
// 		return this._creator;
// 	}
// 	get entries() {
// 		return this._entries;
// 	}
// 	addEntry(body) {
// 		this.entries.unshift(new BlogEntry(body));
// 	}
// }

// Voeg een property title toe aan Blog. De waarde wordt voorzien via de constructor,
// voorzie hirvoor title als eerste parameter bij de constructor
// Voorzie een getter en setter voor title, indien de title leeg is wordt een
// error geworpen: throw new Error('You must give the blog a title')

// class Blog {
// 	constructor(title, creator) {
// 		this._creator = creator ? creator : 'Anonymous';
// 		this._entries = [];
// 		this.title = title;
// 	}
// 	get creator() {
// 		return this._creator;
// 	}
// 	get title() {
// 		return this._title;
// 	}
// 	set title(value) {
// 		if (!value) throw new Error('You must give the blog a title.');
// 		this._title = value;
// 	}
// 	get entries() {
// 		return this._entries;
// 	}
// 	addEntry(body) {
// 		this.entries.unshift(new BlogEntry(body));
// 	}
// }

// Voeg een method contains toe aan Blog die bepaalt of een zoekterm voorkomt in de blog (case insensitive)
// De Blog bevat een zoekterm indien deze voorkomt in de title
// of in 1 van de bodies van de entries

// class Blog {
// 	constructor(title, creator) {
// 		this._creator = creator ? creator : 'Anonymous';
// 		this._entries = [];
// 		this.title = title;
// 	}
// 	get creator() {
// 		return this._creator;
// 	}
// 	get title() {
// 		return this._title;
// 	}
// 	set title(value) {
// 		if (!value) throw new Error('You must give the blog a title.');
// 		this._title = value;
// 	}
// 	get entries() {
// 		return this._entries;
// 	}
// 	addEntry(body) {
// 		this.entries.unshift(new BlogEntry(body));
// 	}
// 	contains(searchText) {
// 		let found = this._title.toUpperCase().includes(searchText.toUpperCase());
// 		let index = 0;
// 		while (!found && index < this.entries.length) {
// 			found = this.entries[index].contains(searchText);
// 			index++;
// 		}
// 		return found;
// 	}
// }

// Voeg een static method createEmptyBlog toe aan Blog
// De methode retourneert een Blog met als creator Anonymous en als title 'A lazy blog...'
// en bevat 1 entry, namelijk een dummyEntry (gebruik createDummy uir BlogEntry)

class Blog {
	constructor(title, creator) {
		this._creator = creator ? creator : 'Anonymous';
		this._entries = [];
		this.title = title;
	}
	get creator() {
		return this._creator;
	}
	get title() {
		return this._title;
	}
	set title(value) {
		if (!value) throw new Error('You must give the blog a title.');
		this._title = value;
	}
	get entries() {
		return this._entries;
	}
	addEntry(body) {
		this.entries.unshift(new BlogEntry(body));
	}
	contains(searchText) {
		let found = this._title.toUpperCase().includes(searchText.toUpperCase());
		let index = 0;
		while (!found && index < this.entries.length) {
			found = this.entries[index].contains(searchText);
			index++;
		}
		return found;
	}
	static createEmptyBlog() {
		const blog = new Blog('A lazy blog...');
		blog._entries.unshift(BlogEntry.createDummy());
		return blog;
	}
}

// Test your code

// const noTitleBlog = new Blog(); // should throw an error
let myBlog = new Blog('ES6 is big fun!');
console.log(myBlog.creator); // Anonymous
console.log(myBlog.title); // ES6 is fun!
myBlog.title = 'Web II is fun!';
console.log(myBlog.title); // 'Web II is fun
myBlog.addEntry('ES6 classes: syntatic sugar atop of ES5');
myBlog.addEntry('JavaScript made easy for Java programmers');
console.log(myBlog.contains('fun')); // true
console.log(myBlog.contains('rubbish')); // false
console.log(myBlog.contains('sUGAR')); // true
console.log(myBlog.contains(' ')); // true
const emptyBlog = Blog.createEmptyBlog();
console.log(emptyBlog.creator); // Anonymous
console.log(emptyBlog.title); // A lazy blog...
console.log(emptyBlog.entries.length); // 1
