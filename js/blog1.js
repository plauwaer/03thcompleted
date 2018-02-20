class BlogEntry {
	constructor(body) {
		this.body = body;
		this.date = new Date();
	}
}

// declareer klass Blog met twee properties
// -entries: een array van BlogEntry's, initieel leeg
// -creator: de naam van de creator van de blog in te stellen
//           via parameter van de constructor functie

class Blog {
	constructor(creator) {
		this.creator = creator;
		this.entries = [];
	}
}

// maak een Blog object (gebruik je eigen naam voor de creator)
// en voeg er twee BlogEntry's aan toe, voeg nieuwe entries steeds
// vooraan in de array entries toe

const myBlog = new Blog('Stefaan Samyn');
myBlog.entries.unshift(new BlogEntry('A first entry in the blog...'));
myBlog.entries.unshift(new BlogEntry('A second entry in the blog...'));

// zet een breakpoint in het script en bekijk de gemaakte blog...
