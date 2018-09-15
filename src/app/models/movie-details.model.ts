export interface MovieDetails {
  id: number;
  title: string;
  budget: number;
  revenue: number;
  homepage: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  voter_average: number;
}

// budget: 150000000
// genres: [{id: 28, name: "Action"}, {id: 12, name: "Adventure"}, {id: 878, name: "Science Fiction"},…]
// homepage: "http://www.madmaxmovie.com/"
// id: 76341
// overview: "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order. There's Max, a man of action and a man of few words, who seeks peace of mind following the loss of his wife and child in the aftermath of the chaos. And Furiosa, a woman of action and a woman who believes her path to survival may be achieved if she can make it across the desert back to her childhood homeland."
// poster_path: "/kqjL17yufvn9OVLyXYpvtyrFfak.jpg"
// release_date: "2015-05-13"
// revenue: 378858340
// runtime: 120
// title: "Mad Max: Fury Road"
// vote_average: 7.4
