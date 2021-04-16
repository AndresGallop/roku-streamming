export default {
    name: "TheMusicComponent",

    props: ['currentuser'],

    template: `
    
    <section class="main_body">
        <div class="hero_wrapper">
            <video width="100vw" height="100vh" autoplay muted loop :src="'./video/' + currentMediaDetails.music_trailer"></video>
        </div>
        <div class="gradient_wrapper"></div>
        <div class="gradient_reverse_wrapper"></div>
        <section class="category_gallery_wrapper">
            <div class="category_filter_select">
                <h2 @click.prevent="filtermusic('2016')">2016</h2>
                <h2 @click.prevent="filtermusic('2015')">2015</h2>
                <h2 @click.prevent="filtermusic('2014')">2014</h2>
                <h2 @click.prevent="filtermusic('2013')">2013</h2>
            </div>
            <hr>
        </section>
        <section class="category_gallery_wrapper">
            <div class="category_gallery_container">
                <div class="movie_thumb">
                    <img @click="switchCurrentMedia(media)" v-for="media in filteredMedia" :src="'images/' + media.music_cover" alt="media thumb">
                </div>
            </div>
        </section>
    </section>
`,

data() {
    return {
        // push first (or random) media object here (selected / filtered on create)
        currentMediaDetails: {},
        // could add more media types here in future

        retrievedMedia: [],
        filteredMedia: []
    }
},

created: function() {

    this.loadMedia(null, 'music');
    //debugger;
    //this.$emit('setuser', this.currentuser);
    
},

methods: {
    
    loadMedia(filter, mediaType) {
        // fetch data here
        let url = (filter == null) ? `/api/${mediaType}` : `/api/${mediaType}/${filter}`;

        fetch(url)
            .then(res => res.json())
            .then(data => { this.retrievedMedia = this.filteredMedia = data;

                // pick a random media object from the array
                this.currentMediaDetails = data[Math.floor(Math.random() * data.length)];

                this.filtermusic(year);
    
            })
        .catch((err) => console.error(err));

        
    },

    switchCurrentMedia(media) {
        this.currentMediaDetails = media;
    },

    filtermusic(year){
        this.filteredMedia = this.retrievedMedia.filter(music => music.music_year === (year));
    }

}
}